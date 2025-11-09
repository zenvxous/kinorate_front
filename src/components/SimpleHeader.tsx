import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const SimpleHeader: React.FC = () => {
  return (
    <header className="app-header">
      <Link to="/">
        <Logo />
      </Link>
    </header>
  );
};

export default SimpleHeader;