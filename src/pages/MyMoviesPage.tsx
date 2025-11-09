import React, { useState, useEffect } from 'react';
import apiClient from '../api';
import Header from '../components/Header';
import MovieListSection from '../components/MovieListSection';

interface Recention {
  id: string;
  rate: number | null;
  movie_status: string;
  movie: {
    id: string;
    title: string;
  };
}

type GroupedMovies = {
  [status: string]: Recention[];
};

const statusMap: { [key: string]: string } = {
  watching: 'Watching',
  planned: 'Planned',
  watched: 'Watched',
  delayed: 'Delayed',
};

const statusOrder = ['watching', 'planned', 'watched', 'delayed'];

const MyMoviesPage: React.FC = () => {
  const [groupedMovies, setGroupedMovies] = useState<GroupedMovies>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyMovies = async () => {
      try {
        const response = await apiClient.get<Recention[]>('/recentions/users/me');
        const recentions = response.data;
        
        const groups = recentions.reduce((acc, current) => {
          const status = current.movie_status;
          if (!acc[status]) {
            acc[status] = [];
          }
          acc[status].push(current);
          return acc;
        }, {} as GroupedMovies);

        setGroupedMovies(groups);
      } catch (err) {
        setError('Failed to load your movie list.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyMovies();
  }, []);

  const renderContent = () => {
    if (isLoading) return <div>Loading your movies...</div>;
    if (error) return <div style={{ color: 'var(--error-color)' }}>{error}</div>;
    
    return statusOrder.map(status => (
      <MovieListSection
        key={status}
        title={statusMap[status]}
        movies={groupedMovies[status] || []}
      />
    ));
  };

  return (
    <>
      <Header />
      <div className="page-container my-movies-page">
        <h2 className="page-title">My Movies</h2>
        {renderContent()}
      </div>
    </>
  );
};

export default MyMoviesPage;