import React from 'react';
import { useParams } from 'react-router-dom';
import MoviePage from './MoviePage';

const MoviePageWrapper: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  
  return <MoviePage key={movieId} />;
};

export default MoviePageWrapper;