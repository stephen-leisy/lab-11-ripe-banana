const { Router } = require('express');
const Film = require('../models/Film');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', (req, res, next) => {
    Film.create(req.body)
      .then((film) => res.send(film))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Film.findAll(
      { attributes: ['id', 'title', 'released', 'studio'] },
      {
        include: { model: Studio, attributes: ['id']},
      }
    )
      .then((films) => res.send(films))
      .catch(next);
  });
