import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api';
import { useDebounce } from '../hooks/useDebounce';

interface TmdbMovieSearchResult {
  id: number;
  title: string;
}

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TmdbMovieSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();

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
                  <li key={movie.id} className="preview-item">{movie.title}</li>
                ))}
              </ul>
              <div className="see-all-container">
                <button onClick={handleSeeAll} className="see-all-button">See all results</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;