const express = require('express');
require('dotenv').config();

const holidayChecker = require('./middlewares/holidayChecker');

const port = process.env.PORT || 8080;
const googleAPIkey = process.env.GOOGLE_API_KEY
const gcalName = 'usa'
const date = '2022-10-10'

//..App
const app = express();
app.get('/', (req, res) => {
    res.send('Availability API server is running!')
  })

async function verifyDate() {
  const check = await holidayChecker.checkHoliday(googleAPIkey, gcalName, date);
  console.log(check)
  if(check === true){
  console.log('date is a public holiday')
  }
  else if(check !== true){
    console.log('Check if it is a weekend')
  }
}
verifyDate();


app.listen(port, () => console.log(`Server running on ${port}`));