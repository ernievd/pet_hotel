const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8000;
const petHotelRouter = require('./routes/pets.router');

// body parser
app.use(bodyParser.urlencoded({extended: true}));

//serve static files
app.use(express.static('server/public'));

// routes
app.use('/pets', petHotelRouter);

app.listen(PORT, function(){
    console.log('server running on port:', PORT);
});