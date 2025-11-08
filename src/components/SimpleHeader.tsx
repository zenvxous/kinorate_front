import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHeader: React.FC = () => {
  return (
    <header className="app-header">
      <Link to="/">
        <h1>Kinorate</h1>
      </Link>
    </header>
  );
};

export default SimpleHeader;