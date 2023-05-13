const express = require('express');
const { check, validationResult } = require('express-validator');
const MovieService = require('../../services/MovieService');

const router = express.Router();

router.patch(
  '/rank/:id',
  [check('rank', 'rank is required').exists(), check('id', 'The id of movie is required').exists()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rank } = req.body;
    const { id } = req.params;
    try {
      const movie = await MovieService.getMovieById(id);
      if (!movie) return res.status(404).json({ error: 'movie not found' });

      const updatedMovie = await MovieService.updateById(id, { rank });
      return res.status(200).json({ movie: updatedMovie });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }
);

module.exports = router;
