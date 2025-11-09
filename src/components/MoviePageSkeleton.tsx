import React from 'react';

const MoviePageSkeleton: React.FC = () => {
  return (
    <div className="page-container movie-page">
      <div className="movie-header">
        <div className="movie-poster">
          <div className="skeleton skeleton-poster" />
        </div>
        <div className="movie-info">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text" style={{ width: '80%' }} />
          <div className="skeleton skeleton-text" style={{ width: '90%' }} />
          <div className="skeleton skeleton-text" style={{ width: '70%' }} />
        </div>
      </div>
      <div className="movie-review-section">
        <div className="skeleton skeleton-subtitle" />
        <div className="review-form">
          <div className="form-group">
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-rating" />
          </div>
          <div className="form-group">
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-input" />
          </div>
          <div className="form-group">
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-textarea" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePageSkeleton;