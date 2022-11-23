//..import required modules
const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
const apiRoutes = require('./router/index');


//..App
const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use("/api", apiRoutes);


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on ${port}`));