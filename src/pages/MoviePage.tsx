import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api';
import Header from '../components/Header';
import RatingInput from '../components/RatingInput';

interface LocalMovie {
  id: string;
  tmdb_id: number;
  title: string;
  genres: string[];
  poster_path: string;
}

interface MovieInRecention {
  id: string;
  title: string;
}

interface BriefRecention {
  id: string;
  movie: MovieInRecention;
}

interface FullRecention {
  id: string;
  rate: number | null;
  comment: string | null;
  movie_status: string;
}

interface TmdbMovieDetails {
  release_date?: string;
  overview?: string;
  runtime?: number;
  tagline?: string;
}

const MoviePage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [localMovie, setLocalMovie] = useState<LocalMovie | null>(null);
  const [recention, setRecention] = useState<FullRecention | null>(null);
  const [tmdbDetails, setTmdbDetails] = useState<TmdbMovieDetails | null>(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('watched');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMovieData = async () => {
      if (!movieId) return;
      try {
        const movieResponse = await apiClient.get<LocalMovie>(`/movies/${movieId}`);
        const movieData = movieResponse.data;
        setLocalMovie(movieData);

        const tmdbResponse = await apiClient.get<TmdbMovieDetails>(`/tmdb/by_id/${movieData.tmdb_id}`);
        setTmdbDetails(tmdbResponse.data);

        try {
          const briefRecentionsResponse = await apiClient.get<BriefRecention[]>(`/recentions/users/me`);
          const briefRecention = briefRecentionsResponse.data.find(r => r.movie.id === movieId);

          if (briefRecention) {
            const fullRecentionResponse = await apiClient.get<FullRecention>(`/recentions/${briefRecention.id}`);
            const fullRecention = fullRecentionResponse.data;
            
            setRecention(fullRecention);
            setRating(fullRecention.rate || 0);
            setComment(fullRecention.comment || '');
            setStatus(fullRecention.movie_status);
          }
        } catch (recentionError) {
          console.log("No existing review found for this movie.");
        }

      } catch (err) {
        setError('Failed to load movie data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieData();
  }, [movieId]);

  const handleSave = async () => {
    if (!localMovie) return;
    setError(null);
    setSuccess(null);
    
    const payload = { rate: rating, comment, movie_status: status };

    try {
      let updatedRecention;
      if (recention) {
        const response = await apiClient.put(`/recentions/${recention.id}`, { ...payload, movie_id: localMovie.id });
        updatedRecention = response.data;
      } else {
        const response = await apiClient.post('/recentions/create', { ...payload, movie_id: localMovie.id });
        updatedRecention = response.data;
      }
      setRecention(updatedRecention);
      setSuccess('Your review has been saved!');
    } catch (err) {
      setError('Failed to save your review.');
    }
  };

  if (isLoading) return <div className="page-container">Loading movie...</div>;
  if (error) return <div className="page-container" style={{ color: 'var(--error-color)' }}>{error}</div>;
  if (!localMovie) return <div className="page-container">Movie not found.</div>;

  const posterPath = localMovie.poster_path.startsWith('/') 
    ? localMovie.poster_path.substring(1) 
    : localMovie.poster_path;

  return (
    <>
      <Header />
      <div className="page-container movie-page">
        <div className="movie-header">
          <div className="movie-poster">
            <img src={`http://localhost:8000/tmdb/poster/${posterPath}`} alt={localMovie.title} />
          </div>
          <div className="movie-info">
            <h1>{localMovie.title}</h1>
            {tmdbDetails?.release_date && <p><strong>Year:</strong> {new Date(tmdbDetails.release_date).getFullYear()}</p>}
            {tmdbDetails?.runtime && <p><strong>Runtime:</strong> {tmdbDetails.runtime} minutes</p>}
            {localMovie.genres.length > 0 && <p><strong>Genres:</strong> {localMovie.genres.join(', ')}</p>}
            {tmdbDetails?.tagline && <p className="tagline"><em>"{tmdbDetails.tagline}"</em></p>}
            {tmdbDetails?.overview && <p className="overview">{tmdbDetails.overview}</p>}
          </div>
        </div>

        <div className="movie-review-section">
          <h3>My Review</h3>
          <div className="review-form">
            <div className="form-group">
              <label>Your Rating</label>
              <RatingInput rating={rating} setRating={setRating} />
            </div>
            <div className="form-group">
              <label htmlFor="movie-status">Status</label>
              <select id="movie-status" value={status} onChange={e => setStatus(e.target.value)} className="status-select">
                <option value="watched">Watched</option>
                <option value="watching">Watching</option>
                <option value="planned">Planned</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Write your thoughts here..."
                rows={6}
              />
            </div>
            {success && <div className="form-success">{success}</div>}
            <button onClick={handleSave} className="save-button">Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviePage;