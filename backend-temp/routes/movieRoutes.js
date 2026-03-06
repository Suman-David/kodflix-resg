const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getActionMovies,
  getComedyMovies,
  getTVShows,
  getHeroMovie
} = require('../controllers/movieController');

router.use(authMiddleware);

router.get('/trending', getTrending);
router.get('/popular', getPopular);
router.get('/top-rated', getTopRated);
router.get('/upcoming', getUpcoming);
router.get('/action', getActionMovies);
router.get('/comedy', getComedyMovies);
router.get('/tv-shows', getTVShows);
router.get('/hero', getHeroMovie);

module.exports = router;
