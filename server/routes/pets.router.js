const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', function(req, res) {
    console.log('req.body is', req.body)
    const queryText = 'INSERT INTO owner (first_name, last_name) VALUES($1, $2)';
    pool.query(queryText, [req.body.firstName, req.body.lastName])
    // runs on successful query
        .then((result) => {
            //console.log('query results: ', result);
            res.sendStatus(201);
        })
        // error handling
        .catch((err) => {
            console.log('error posting to owner table:', err);
            res.sendStatus(500);
        });
});// End router.post

module.exports = router;