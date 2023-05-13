const express = require('express');
const { check, validationResult } = require('express-validator');
const MovieService = require('../../services/MovieService');

const router = express.Router();

router.put(
  '/:id',
  [check('name', 'name is required').exists(), check('rank', 'rank is required').exists()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, summary, mainActors } = req.body;
    const { id } = req.params;
    try {
      const movie = await MovieService.getMovieById(id);
      if (!movie) return res.status(404).json({ error: 'movie not found' });

      await MovieService.updateById(id, { name, summary, mainActors });
      return res.status(200).json({ status: 'Updated successfully' });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }
);

module.exports = router;
