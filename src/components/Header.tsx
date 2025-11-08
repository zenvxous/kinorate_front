import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MovieSearch from './MovieSearch';
import AuthButtons from './AuthButtons';
import ProfileDropdown from './ProfileDropdown';

const Header: React.FC = () => {
  const { user, isLoading } = useAuth();

  const renderAuthSection = () => {
    if (isLoading) {
      return <div style={{ width: '120px', textAlign: 'right' }}>Loading...</div>;
    }
    return user ? <ProfileDropdown /> : <AuthButtons />;
  };

  return (
    <header className="app-header">
      <Link to="/">
        <h1>Kinorate</h1>
      </Link>
      <nav>
        <MovieSearch />
        {renderAuthSection()}
      </nav>
    </header>
  );
};

export default Header;