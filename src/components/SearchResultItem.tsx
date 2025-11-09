import React from 'react';

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
  const posterPath = movie.poster_path
    ? `http://localhost:8000/tmdb/poster/${movie.poster_path.substring(1)}`
    : 'https://via.placeholder.com/200x300.png?text=No+Image';

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className={`search-result-item ${isNavigating ? 'navigating' : ''}`} onClick={onClick}>
      <div className="item-poster">
        <img src={posterPath} alt={movie.title} />
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