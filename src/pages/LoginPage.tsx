import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import apiClient from '../api';

interface ErrorResponse {
  detail?: string;
  details?: { error?: string };
}

const LoginPage: React.FC = () => {
  // ... (логика хуков остается без изменений) ...
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    try {
      await apiClient.post('/users/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      navigate('/');
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;
      const errorMessage = errorData?.details?.error || errorData?.detail || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    }
  };


  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-error">{error}</div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Log In</button>
      </form>
       <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;