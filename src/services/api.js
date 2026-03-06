import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't redirect on auth endpoints (login, register)
    const isAuthEndpoint = error.config?.url?.includes('/auth/');
    if (error.response?.status === 401 && !isAuthEndpoint) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  verifyToken: () => api.get('/auth/verify')
};

export const movieAPI = {
  getTrending: () => api.get('/movies/trending'),
  getPopular: () => api.get('/movies/popular'),
  getTopRated: () => api.get('/movies/top-rated'),
  getUpcoming: () => api.get('/movies/upcoming'),
  getActionMovies: () => api.get('/movies/action'),
  getComedyMovies: () => api.get('/movies/comedy'),
  getTVShows: () => api.get('/movies/tv-shows'),
  getHeroMovie: () => api.get('/movies/hero')
};

export default api;
