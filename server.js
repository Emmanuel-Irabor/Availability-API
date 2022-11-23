//..import required modules
const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const apiRoutes = require('./router/index')


//var day = new Date(utcDate); 
// console.log(dayOfWeek);

const port = process.env.PORT || 8080;

//..App
const app = express();
app.use(express.json())
app.use(bodyParser.json());
// parse request body which is in plain text
app.use(bodyParser.text({ type: 'text/plain' }))
app.use("/api", apiRoutes);




app.listen(port, () => console.log(`Server running on ${port}`));