import React from 'react';
import DefaultPoster from './DefaultPoster';

interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

interface SearchResultItemProps {
  movie: TmdbMovie;
  onClick: () => void;
  isNavigating: boolean;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ movie, onClick, isNavigating }) => {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className={`search-result-item ${isNavigating ? 'navigating' : ''}`} onClick={onClick}>
      <div className="item-poster">
        {movie.poster_path ? (
          <img src={`http://localhost:8000/tmdb/poster/${movie.poster_path.substring(1)}`} alt={movie.title} />
        ) : (
          <DefaultPoster />
        )}
        {isNavigating && <div className="item-loader"><span className="loader" /></div>}
      </div>
      <div className="item-info">
        <p className="item-title">{movie.title}</p>
        <p className="item-year">{year}</p>
      </div>
    </div>
  );
};

export default SearchResultItem;