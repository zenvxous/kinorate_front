import React from 'react';
import { Link } from 'react-router-dom';
import MovieSearch from './MovieSearch';
import AuthButtons from './AuthButtons';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <Link to="/">
        <h1>Kinorate</h1>
      </Link>
      <nav>
        <MovieSearch />
        <AuthButtons />
      </nav>
    </header>
  );
};

export default Header;