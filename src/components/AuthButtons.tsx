import React from 'react';
import { Link } from 'react-router-dom';

const AuthButtons: React.FC = () => {
  return (
    <div className="auth-buttons">
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default AuthButtons;