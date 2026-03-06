import { useState, useEffect } from 'react';
import { movieAPI } from '../services/api';
import SkeletonLoader from './SkeletonLoader';

const HeroBanner = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHeroMovie();
  }, []);

  const fetchHeroMovie = async () => {
    try {
      setLoading(true);
      const response = await movieAPI.getHeroMovie();
      if (response.data.success) {
        setMovie(response.data.movie);
      }
    } catch (err) {
      setError('Failed to load featured movie');
    } finally {
      setLoading(false);
    }
  };

  const truncateOverview = (text, maxLength = 150) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return <SkeletonLoader type="hero" />;
  }

  if (error || !movie) {
    return (
      <div className="hero-banner error">
        <p>{error || 'No movie available'}</p>
      </div>
    );
  }

  return (
    <div 
      className="hero-banner"
      style={{
        backgroundImage: movie.backdropPath 
          ? `linear-gradient(to bottom, rgba(20, 20, 20, 0.3), rgba(20, 20, 20, 1)), url(${movie.backdropPath})`
          : 'linear-gradient(to bottom, #333, #141414)'
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{movie.title}</h1>
        
        <div className="hero-meta">
          <span className="hero-rating">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {movie.rating?.toFixed(1) || 'N/A'}
          </span>
          <span className="hero-year">
            {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
          </span>
        </div>
        
        <p className="hero-description">
          {truncateOverview(movie.overview)}
        </p>
        
        <div className="hero-buttons">
          <button className="btn btn-play">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Play
          </button>
          <button className="btn btn-more-info">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            More Info
          </button>
        </div>
      </div>
      
      <div className="hero-fade"></div>
    </div>
  );
};

export default HeroBanner;
