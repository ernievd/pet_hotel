const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET all pets from DB
router.get('/', (req, res) => {
    const queryText = `SELECT pet.id, pet.name, pet.color, pet.breed, pet.is_checked_in, owner.first_name, owner.last_name FROM pet
    JOIN owner_pet ON owner_pet.pet_id = pet.id
    JOIN owner ON owner_pet.owner_id = owner.id`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
}); //end get


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



router.put('/:id/:boolean', (req, res)=>{
    console.log(req.params.id, req.params.boolean);
    
    let queryText = `
    UPDATE pet
    SET is_checked_in = $1
    WHERE id = $2;
    `;
    pool.query(queryText, [req.params.boolean, req.params.id])
        .then((result)=>{
            res.sendStatus(200);
        })
        .catch((err)=>{
            console.log('Error deleting pet: ', 500);
            res.sendStatus(500);
        })
})

router.delete('/:id', (req, res)=>{
    let queryText = `
    DELETE FROM owner_pet
    WHERE pet_id = $1`;
    pool.query(queryText, [req.params.id])
        .then((result)=>{
            const queryTwo = 'DELETE FROM pet WHERE id = $1';
            pool.query(queryTwo, [req.params.id])
                .then((result) => {
                    res.sendStatus(200);
                })
        })
        .catch((err)=>{
            console.log('Error deleting pet: ', 500);
            res.sendStatus(500);
        })
})
module.exports = router;