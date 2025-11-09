import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../api';
import Header from '../components/Header';
import SearchResultItem from '../components/SearchResultItem';
import Pagination from '../components/Pagination';
import { AxiosError } from 'axios';

interface TmdbMovieSearchResult {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  genre_ids: number[];
}

interface LocalMovie {
  id: string;
  tmdb_id: number;
  title: string;
  genres: string[];
  poster_path: string;
}

interface Genre {
  id: number;
  name: string;
}

const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = useMemo(() => searchParams.get('query') || '', [searchParams]);
  const currentPage = useMemo(() => parseInt(searchParams.get('page') || '1', 10), [searchParams]);

  const [results, setResults] = useState<TmdbMovieSearchResult[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState<number | null>(null);

  const [genreMap, setGenreMap] = useState<Map<number, string> | null>(null);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await apiClient.get<Genre[]>('/tmdb/genres');
        setGenreMap(new Map(response.data.map(g => [g.id, g.name])));
      } catch (error) {
        console.error("Failed to load genres. Movie creation may not include genres.", error);
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    const searchMovies = async () => {
      try {
        const response = await apiClient.get(`/tmdb/by_title/${query}/${currentPage}`);
        setResults(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError('Failed to fetch search results.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    searchMovies();
  }, [query, currentPage]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query, page: newPage.toString() });
  };

  const handleMovieClick = async (tmdbMovie: TmdbMovieSearchResult) => {
    if (!genreMap) {
      console.error("Genres are not loaded yet. Please wait a moment and try again.");
      return;
    }

    setIsNavigating(tmdbMovie.id);
    try {
      const response = await apiClient.get<LocalMovie>(`/movies/by_tmdb_id/${tmdbMovie.id}`);
      navigate(`/movies/${response.data.id}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        try {
          const genresAsStrings = tmdbMovie.genre_ids.map(id => genreMap.get(id)).filter((name): name is string => !!name);
          const createResponse = await apiClient.post<LocalMovie>('/movies/create', {
            tmdb_id: tmdbMovie.id,
            title: tmdbMovie.title,
            genres: genresAsStrings,
            poster_path: tmdbMovie.poster_path || '',
          });
          navigate(`/movies/${createResponse.data.id}`);
        } catch (createError) {
          console.error("Failed to create movie in local DB:", createError);
        }
      } else {
        console.error("Error fetching local movie:", error);
      }
    } finally {
      setIsNavigating(null);
    }
  };

  const renderContent = () => {
    if (isLoading) return <div>Loading results...</div>;
    if (error) return <div style={{ color: 'var(--error-color)' }}>{error}</div>;
    if (results.length === 0) return <div>No results found for "{query}".</div>;
    
    return (
      <div className="search-results-grid">
        {results.map(movie => (
          <SearchResultItem
            key={movie.id}
            movie={movie}
            onClick={() => handleMovieClick(movie)}
            isNavigating={isNavigating === movie.id}
          />
        ))}
      </div>
    );
  };
  
  return (
    <>
      <Header />
      <div className="page-container search-page">
        <h2 className="page-title">Search results for "{query}"</h2>
        {renderContent()}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </>
  );
};

export default SearchResultsPage;