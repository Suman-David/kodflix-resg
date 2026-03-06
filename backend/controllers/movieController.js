const axios = require('axios');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: process.env.TMDB_KEY,
    language: 'en-US'
  }
});

const formatMovie = (movie) => ({
  id: movie.id,
  title: movie.title || movie.name,
  overview: movie.overview,
  posterPath: movie.poster_path ? `${TMDB_IMAGE_BASE}/w500${movie.poster_path}` : null,
  backdropPath: movie.backdrop_path ? `${TMDB_IMAGE_BASE}/original${movie.backdrop_path}` : null,
  rating: movie.vote_average,
  releaseDate: movie.release_date || movie.first_air_date,
  genreIds: movie.genre_ids
});

const getTrending = async (req, res) => {
  try {
    const response = await tmdbApi.get('/trending/movie/week');
    const movies = response.data.results.map(formatMovie);
    res.json({ success: true, movies });
  } catch (error) {
    console.error('Trending error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch trending movies' });
  }
};

const getPopular = async (req, res) => {
  try {
    const response = await tmdbApi.get('/movie/popular');
    const movies = response.data.results.map(formatMovie);
    res.json({ success: true, movies });
  } catch (error) {
    console.error('Popular error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch popular movies' });
  }
};

const getTopRated = async (req, res) => {
  try {
    const response = await tmdbApi.get('/movie/top_rated');
    const movies = response.data.results.map(formatMovie);
    res.json({ success: true, movies });
  } catch (error) {
    console.error('Top rated error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch top rated movies' });
  }
};

const getUpcoming = async (req, res) => {
  try {
    const response = await tmdbApi.get('/movie/upcoming');
    const movies = response.data.results.map(formatMovie);
    res.json({ success: true, movies });
  } catch (error) {
    console.error('Upcoming error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch upcoming movies' });
  }
};

const getActionMovies = async (req, res) => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: { with_genres: 28 }
    });
    const movies = response.data.results.map(formatMovie);
    res.json({ success: true, movies });
  } catch (error) {
    console.error('Action movies error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch action movies' });
  }
};

const getComedyMovies = async (req, res) => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: { with_genres: 35 }
    });
    const movies = response.data.results.map(formatMovie);
    res.json({ success: true, movies });
  } catch (error) {
    console.error('Comedy movies error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch comedy movies' });
  }
};

const getTVShows = async (req, res) => {
  try {
    const response = await tmdbApi.get('/trending/tv/week');
    const movies = response.data.results.map(formatMovie);
    res.json({ success: true, movies });
  } catch (error) {
    console.error('TV shows error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch TV shows' });
  }
};

const getHeroMovie = async (req, res) => {
  try {
    const response = await tmdbApi.get('/trending/movie/week');
    const randomIndex = Math.floor(Math.random() * Math.min(5, response.data.results.length));
    const heroMovie = formatMovie(response.data.results[randomIndex]);
    res.json({ success: true, movie: heroMovie });
  } catch (error) {
    console.error('Hero movie error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch hero movie' });
  }
};

module.exports = {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getActionMovies,
  getComedyMovies,
  getTVShows,
  getHeroMovie
};
