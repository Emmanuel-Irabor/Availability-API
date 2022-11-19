const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 8080;

//..App
const app = express();
app.get('/', function (req, res) {
    res.send('Availability API server is running!')
  })

app.listen(port, () => console.log(`Server running on ${port}`));