const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/:id', (req, res)=>{
    let queryText = `
    INSERT INTO visit(check_in_date, pet_id)
    VALUES(NOW(),$1)
    `;
    pool.query(queryText, [req.params.id])
        .then((result)=>{
            res.sendStatus(201);
        })
        .catch((err)=>{
            console.log('err', err);
            res.sendStatus(500);
        })
})
router.get('/', (req, res)=>{
    let queryText = `
    SELECT * FROM visit;
    `;
    pool.query(queryText)
        .then((result)=>{
            res.send(result.rows);
        })
        .catch((err)=>{
            console.log('err', err);
            res.sendStatus(500);
        })
})

router.put('/:id', (req, res)=>{
    let queryText = `
    UPDATE visit
    SET check_out_date = NOW()
    WHERE pet_id = $1;
    `;
    pool.query(queryText, [req.params.id])
        .then((result)=>{
            res.sendStatus(201);
        })
        .catch((err)=>{
            console.log('err', err);
            res.sendStatus(500);
        })
})


module.exports = router;