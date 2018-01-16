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