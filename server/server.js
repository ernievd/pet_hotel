const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8000;
const pets = require('./routes/pets.router');
const visits = require('./routes/visits.router');


// body parser
app.use(bodyParser.urlencoded({extended: true}));

//serve static files
app.use(express.static('server/public'));

// routes
app.use('/pets', pets);
app.use('/visits', visits);


app.listen(PORT, function(){
    console.log('server running on port:', PORT);
});