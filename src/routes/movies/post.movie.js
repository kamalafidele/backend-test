const express = require('express');
const { check, validationResult } = require('express-validator');
const MovieService = require('../../services/MovieService');

const router = express.Router();

router.post(
  '/',
  [
    check('name', 'The name of movie is required').exists().notEmpty(),
    check('summary', 'The summary of movie is required').exists().notEmpty(),
    check('mainActors', 'mainActors is required').exists().isArray().notEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, summary, mainActors } = req.body;
    try {
      const movie = await MovieService.save({ name, summary, mainActors });

      return res.status(201).json(movie);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e });
    }
  }
);

module.exports = router;
