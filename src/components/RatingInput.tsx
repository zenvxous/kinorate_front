import React, { useState } from 'react';

interface RatingInputProps {
  rating: number;
  setRating: (rating: number) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="rating-input">
      {[...Array(10)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={ratingValue}
            className={`rating-circle ${ratingValue <= (hoverRating || rating) ? 'active' : ''}`}
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(0)}
          />
        );
      })}
      <span className="rating-text">{rating > 0 ? `${rating}/10` : 'No rating'}</span>
    </div>
  );
};

export default RatingInput;