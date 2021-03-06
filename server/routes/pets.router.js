const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


//GET all pets from DB
router.get('/', (req, res) => {
    const queryText = `SELECT pet.id, pet.name, pet.color, pet.breed, pet.is_checked_in, owner.first_name, owner.last_name FROM pet
    JOIN owner_pet ON owner_pet.pet_id = pet.id
    JOIN owner ON owner_pet.owner_id = owner.id
    ORDER BY is_checked_in DESC`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
}); //end get

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

router.post('/', function(req, res) {
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

router.post('/newPet', function(req, res) {
    const queryText = 'INSERT INTO pet (name, breed, color) VALUES($1, $2, $3) RETURNING id';
    pool.query(queryText, [req.body.name, req.body.breed, req.body.color])
    // runs on successful query
        .then((result) => {

            const queryText2 = 'INSERT INTO owner_pet (owner_id, pet_id) VALUES($1, $2)';
            pool.query(queryText2, [req.body.ownerId, result.rows[0].id])
            // runs on successful query
                .then((result) => {
                })
            res.sendStatus(201);
        })
        // error handling
        .catch((err) => {
            console.log('error posting to owner table:', err);
            res.sendStatus(500);
        });
});// End router.post

router.put('/:id/:boolean', (req, res)=>{
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
            const queryTwo = 'DELETE FROM visit WHERE pet_id = $1';
            pool.query(queryTwo, [req.params.id])
                .then((result) => {
                    const queryTwo = 'DELETE FROM pet WHERE id = $1';
                    pool.query(queryTwo, [req.params.id])
                        .then((result) => {
                            res.sendStatus(200);
                     })
                    res.sendStatus(200);
            })
        })
        .catch((err)=>{
            console.log('Error deleting pet: ', 500);
            res.sendStatus(500);
        })
})

//GET all owners from DB
router.get('/owners', (req, res) => {
    const queryText = 'SELECT first_name, last_name, id FROM owner ORDER BY last_name';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
}); //end get
module.exports = router;