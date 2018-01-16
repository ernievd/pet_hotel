const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');






router.delete('/:id', (req, res)=>{
    let queryText = `
    DELETE FROM pet
    WHERE id = $1`;
    pool.query(queryText, [req.params.id])
        .then((resulst)=>{
            res.sendStatus(200);
        })
        .catch((err)=>{
            console.log('Error deleting pet: ', 500);
            res.sendStatus(500);
        })
})
module.exports = router;