const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.put('/:id', (req, res) => {
    const queryText = `UPDATE pet SET name=$1, breed=$2, color=$3 WHERE id=$4`;
    pool.query(queryText, [req.body.name, req.body.breed, req.body.color, req.params.id])
    .then((result) => {
        console.log('Edit complete: ', req.params.id);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error Editing.', error);
        res.sendStatus(500);
    })
});

module.exports = router;