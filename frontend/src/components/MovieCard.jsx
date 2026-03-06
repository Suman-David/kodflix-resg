import { useState } from 'react';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={`movie-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="movie-card-image-container">
        {!imageLoaded && (
          <div className="movie-card-skeleton"></div>
        )}
        {movie.posterPath ? (
          <img 
            src={movie.posterPath} 
            alt={movie.title}
            className={`movie-card-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        ) : (
          <div className="movie-card-placeholder">
            <span>{movie.title}</span>
          </div>
        )}
      </div>
      
      {isHovered && (
        <div className="movie-card-info">
          <h3 className="movie-card-title">{movie.title}</h3>
          <div className="movie-card-meta">
            <span className="movie-card-rating">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {movie.rating?.toFixed(1) || 'N/A'}
            </span>
            <span className="movie-card-year">
              {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : ''}
            </span>
          </div>
          <div className="movie-card-actions">
            <button className="action-btn play-btn" title="Play">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <button className="action-btn add-btn" title="Add to My List">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </button>
            <button className="action-btn like-btn" title="Like">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
