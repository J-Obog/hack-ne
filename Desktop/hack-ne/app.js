const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;

const routes = require('./routes.js');


//Routing
app.use('', routes);
app.use(cors());

//Body parser 
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});








