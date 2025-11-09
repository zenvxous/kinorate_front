import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api';
import Header from '../components/Header';

interface ErrorResponse {
  detail?: string;
  details?: { error?: string };
}

const EditProfilePage: React.FC = () => {
  const { user, fetchUser } = useAuth();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (nickname === user?.nickname && email === user?.email) {
      setError("No changes detected.");
      return;
    }

    try {
      await apiClient.put('/users/me', { nickname, email });
      setSuccess("Profile updated successfully!");
      
      await fetchUser(); 

    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;
      const errorMessage = errorData?.details?.error || errorData?.detail || 'Failed to update profile.';
      setError(errorMessage);
    }
  };
  
  return (
    <>
      <Header />
      <div className="form-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}
          <div className="form-group">
            <label htmlFor="nickname">Nickname:</label>
            <input 
              id="nickname" 
              type="text" 
              value={nickname} 
              onChange={(e) => setNickname(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default EditProfilePage;