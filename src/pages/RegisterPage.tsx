import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import apiClient from '../api';

interface ErrorResponse {
  detail?: string;
  details?: { error?: string };
}

const RegisterPage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return; 
    }

    const formData = new URLSearchParams();
    formData.append('nickname', nickname);
    formData.append('email', email);
    formData.append('password', password);

    try {
      await apiClient.post('/users/register', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      navigate('/login');
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;
      const errorMessage = errorData?.details?.error || errorData?.detail || 'Registration failed. Please try again.';
      setError(errorMessage);
    }
  };


  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-error">{error}</div>
        <div className="form-group">
          <label htmlFor="nickname">Nickname:</label>
          <input id="nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input 
            id="confirm-password" 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default RegisterPage;