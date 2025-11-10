import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api';
import { useDebounce } from '../hooks/useDebounce';
import { AxiosError } from 'axios';

interface TmdbMovieSearchResult {
  id: number;
  title: string;
  poster_path: string | null;
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

let genreMap: Map<number, string> | null = null;

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TmdbMovieSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState<number | null>(null);

  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();

  const fetchAndCacheGenres = useCallback(async () => {
    if (genreMap) return;
    try {
      const response = await apiClient.get<Genre[]>('/tmdb/genres');
      genreMap = new Map(response.data.map(g => [g.id, g.name]));
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  }, []);

  useEffect(() => {
    fetchAndCacheGenres();
  }, [fetchAndCacheGenres]);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setIsLoading(true);
      const searchMovies = async () => {
        try {
          const response = await apiClient.get(`/tmdb/by_title/${debouncedQuery}/1`);
          setResults(response.data.results.slice(0, 10));
        } catch (error) {
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      };
      searchMovies();
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const handleMovieClick = async (tmdbMovie: TmdbMovieSearchResult) => {
    setIsNavigating(tmdbMovie.id);
    try {
      const response = await apiClient.get<LocalMovie>(`/movies/by_tmdb_id/${tmdbMovie.id}`);
      navigate(`/movies/${response.data.id}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        try {
          const genresAsStrings = tmdbMovie.genre_ids
            .map(id => genreMap?.get(id))
            .filter((name): name is string => !!name);

          const createResponse = await apiClient.post<LocalMovie>('/movies/create', {
            tmdb_id: tmdbMovie.id,
            title: tmdbMovie.title,
            genres: genresAsStrings,
            poster_path: tmdbMovie.poster_path || '',
          });
          navigate(`/movies/${createResponse.data.id}`);
        } catch (createError) {
          console.error('Failed to create movie in local DB:', createError);
        }
      } else {
        console.error('Error fetching local movie:', error);
      }
    } finally {
      setIsNavigating(null);
      setQuery('');
      setResults([]);
    }
  };

  const handleSeeAll = () => {
    if (query.trim()) {
      navigate(`/search?query=${query.trim()}`);
      setQuery('');
      setResults([]);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
      />

      {(isLoading || results.length > 0) && (
        <div className="search-dropdown">
          {isLoading && <div className="search-loading">Searching...</div>}
          
          {results.length > 0 && (
            <>
              <ul className="search-results-list">
                {results.map((movie) => (
                  <li
                    key={movie.id}
                    onClick={() => handleMovieClick(movie)}
                    className={`preview-item ${isNavigating === movie.id ? 'navigating' : ''}`}
                    style={{ cursor: 'pointer' }}
                  >
                    {movie.title}
                    {isNavigating === movie.id && <span className="loader" />}
                  </li>
                ))}
              </ul>
              <div className="see-all-container">
                <button onClick={handleSeeAll} className="see-all-button">
                  See all results
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;