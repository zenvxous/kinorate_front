import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface MovieItem {
  id: string;
  rate: number | null;
  movie: {
    id: string;
    title: string;
  };
}

interface MovieListSectionProps {
  title: string;
  movies: MovieItem[];
}

const MovieListSection: React.FC<MovieListSectionProps> = ({ title, movies }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const contentRef = useRef<HTMLDivElement>(null);

  if (movies.length === 0) {
    return null;
  }

  return (
    <div className={isOpen ? 'movie-list-section open' : 'movie-list-section'}>
      <header className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{`${title} (${movies.length})`}</h3>
        <span className="toggle-icon" />
      </header>
      <div
        ref={contentRef}
        className="table-container"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px'
        }}
      >
        <table className="movies-table">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th>Title</th>
              <th style={{ width: '15%' }}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((recention, index) => (
              <tr key={recention.id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/movies/${recention.movie.id}`}>{recention.movie.title}</Link>
                </td>
                <td>{recention.rate !== null && recention.rate > 0 ? recention.rate : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieListSection;