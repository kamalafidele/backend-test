const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const MovieService = require('../../services/MovieService');

router.get('/:id', [check('id', 'The id of movie is required')], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  try {
    const movie = await MovieService.getMovieById(id);

    return res.status(200).json(movie);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = router;
