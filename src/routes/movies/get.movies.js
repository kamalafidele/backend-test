const express = require('express');
const MovieService = require('../../services/MovieService');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await MovieService.getAllMovies();
    return res.status(200).json(movies);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = router;
