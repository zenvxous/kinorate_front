import React, { useState, useEffect } from 'react';
import apiClient from '../api';
import Header from '../components/Header';
import StatCard from '../components/StatCard';

interface UserStats {
  movies_watched: number;
  average_rating: number | null;
  reviews_written: number;
}

const MyProfilePage: React.FC = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileStats = async () => {
      try {
        const response = await apiClient.get<UserStats>('/users/me/stats');
        setStats(response.data);
      } catch (err) {
        setError('Failed to load profile data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileStats();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading profile...</div>;
    }
    if (error) {
      return <div style={{ color: 'var(--error-color)' }}>{error}</div>;
    }
    if (stats) {
      return (
        <div className="stats-container">
          <StatCard
            title="Movies watched"
            value={stats.movies_watched}
            subtitle="for all time"
          />
          <StatCard
            title="Average rating"
            value={stats.average_rating !== null ? stats.average_rating : 'N/A'}
            subtitle="out of 10"
          />
          <StatCard
            title="Reviews written"
            value={stats.reviews_written}
            subtitle="personal notes"
          />
        </div>
      );
    }
    return <div>No statistics available.</div>;
  };

  return (
    <>
      <Header />
      <div className="page-container">
        <h2 className="page-title">Profile</h2>
        {renderContent()}
      </div>
    </>
  );
};

export default MyProfilePage;