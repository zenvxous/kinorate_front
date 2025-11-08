import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api';

interface FoundMovie {
  id: number;
  title: string;
}

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoundMovie[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.length > 2) {
      try {
        const response = await apiClient.get(`/tmdb/by_title/${newQuery}/1`);
        setResults(response.data.results.slice(0, 10));
      } catch (error) {
        console.error("Error searching movies:", error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for movies..."
      />
      {results.length > 0 && (
        <div className="search-results">
          <ul>
            {results.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
          <Link to={`/search?query=${query}`}>See more</Link>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;