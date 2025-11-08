import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import apiClient from '../api';
import SimpleHeader from '../components/SimpleHeader';

interface ErrorResponse {
  detail?: string;
  details?: { error?: string };
}

const RegisterPage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
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
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      setIsSuccess(true);
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;
      const errorMessage = errorData?.details?.error || errorData?.detail || 'Registration failed. Please try again.';
      setError(errorMessage);
    }
  };

  if (isSuccess) {
    return (
      <div>
        <SimpleHeader />
        <div className="form-container">
          <h2 style={{ color: '#4CAF50' }}>Success!</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Your account has been created. You can now log in.
          </p>
          <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SimpleHeader />
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
            <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input id="confirm-password" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="form-show-password">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="show-password">Show Passwords</label>
          </div>
          <button type="submit">Register</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;