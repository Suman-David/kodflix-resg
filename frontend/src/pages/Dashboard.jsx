import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import { movieAPI } from '../services/api';

const Dashboard = () => {
  const [movies, setMovies] = useState({
    trending: [],
    popular: [],
    topRated: [],
    upcoming: [],
    action: [],
    comedy: [],
    tvShows: []
  });
  const [loading, setLoading] = useState({
    trending: true,
    popular: true,
    topRated: true,
    upcoming: true,
    action: true,
    comedy: true,
    tvShows: true
  });

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    const fetchMovieData = async (key, apiMethod) => {
      try {
        const response = await apiMethod();
        if (response.data.success) {
          setMovies(prev => ({ ...prev, [key]: response.data.movies }));
        }
      } catch (error) {
        console.error(`Error fetching ${key}:`, error);
      } finally {
        setLoading(prev => ({ ...prev, [key]: false }));
      }
    };

    await Promise.all([
      fetchMovieData('trending', movieAPI.getTrending),
      fetchMovieData('popular', movieAPI.getPopular),
      fetchMovieData('topRated', movieAPI.getTopRated),
      fetchMovieData('upcoming', movieAPI.getUpcoming),
      fetchMovieData('action', movieAPI.getActionMovies),
      fetchMovieData('comedy', movieAPI.getComedyMovies),
      fetchMovieData('tvShows', movieAPI.getTVShows)
    ]);
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <main className="dashboard-content">
        <HeroBanner />
        
        <div className="movie-rows">
          <MovieRow 
            title="Trending Now" 
            movies={movies.trending} 
            loading={loading.trending} 
          />
          
          <MovieRow 
            title="Popular on KodFlix" 
            movies={movies.popular} 
            loading={loading.popular} 
          />
          
          <MovieRow 
            title="Top Rated" 
            movies={movies.topRated} 
            loading={loading.topRated} 
          />
          
          <MovieRow 
            title="Upcoming" 
            movies={movies.upcoming} 
            loading={loading.upcoming} 
          />
          
          <MovieRow 
            title="Action Movies" 
            movies={movies.action} 
            loading={loading.action} 
          />
          
          <MovieRow 
            title="Comedy Movies" 
            movies={movies.comedy} 
            loading={loading.comedy} 
          />
          
          <MovieRow 
            title="TV Shows" 
            movies={movies.tvShows} 
            loading={loading.tvShows} 
          />
        </div>
      </main>
      
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#">Audio Description</a>
            <a href="#">Help Center</a>
            <a href="#">Gift Cards</a>
            <a href="#">Media Center</a>
            <a href="#">Investor Relations</a>
            <a href="#">Jobs</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy</a>
            <a href="#">Legal Notices</a>
            <a href="#">Cookie Preferences</a>
            <a href="#">Corporate Information</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} KodFlix, Inc.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
