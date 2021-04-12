const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
    .post('/', (req, res, next) => {
        Reviewer.create(req.body)
            .then((reviewer) => res.send(reviewer))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Reviewer.findAll()
            .then((reviewers) => res.send(reviewers))
            .catch(next);
    })