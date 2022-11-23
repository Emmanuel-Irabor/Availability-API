const router = require("express").Router();
const moment = require('moment');
require('dotenv').config();
const gcalCountries = require('../gcal_countries.json');
const holidayChecker = require('../middlewares/holidayChecker');
const dateConverter = require('../middlewares/dateConverter')




async function verifyDate(gcalName, date) {
  const googleAPIkey = process.env.GOOGLE_API_KEY
  const check = await holidayChecker.checkHoliday(googleAPIkey, gcalName, date);

  return check
}


function getGcalName(countryCode){  
  for (let x in gcalCountries) {
    if(x = countryCode){
      console.log(gcalCountries[x]);
      var gcalName = gcalCountries[x];
    }
    return gcalName;
  }
}

function checkForWeekend(dateAndTz){
  //.
  // var utcDate = dateConverter.parseGoogleDate('2022-11-22T23:48:00.0+01:00')
  var utcTimestamp = dateConverter.parseGoogleDate(dateAndTz)
  // var day = moment(utcDate); 
  // var day = moment(utcTimestamp).format('YYYY-MM-DD');
  var dayOfWeek = moment(utcTimestamp).weekday()

  return dayOfWeek;
}


function getAvailableSlots(data){
  //..
  let max_date = [];
  let min_date = [];

  console.log(data)
  
  for (let i = 0; i < data.length; i++) {
    max_date.push(data[i].from);
    min_date.push(data[i].to);
  }
  console.log(max_date);
  console.log(min_date);
  
}

router.get('/', (req, res) => {
    res.json({message: 'Availability API server is running!'})
})

router.post("/check-availability", async (req, res) => {

  const data = (req.body);
  
  for (let i = 0; i < data.length; i++) {
    //..get the country code
    var countryCode = (data[i].CC).toLowerCase();
    var gcalName = getGcalName(countryCode);
    var dateAndTz = data[i].from;

    //..Check for weekend
    var dayOfWeek = checkForWeekend(dateAndTz);
    console.log(dayOfWeek)

    if(dayOfWeek >= 6){
      //.. 
      res.json({message: `Date for '${countryCode.toUpperCase()}' is a weekend`});        
      break;
    }
    if(dayOfWeek < 6){
      //..Then check for Holiday
      var utcTimestamp = dateConverter.parseGoogleDate(dateAndTz)
      var date = moment(utcTimestamp).format('YYYY-MM-DD');
      console.log(date)

      var isHoliday = await verifyDate(gcalName, date);
      console.log(isHoliday)
      if(isHoliday === true){
        res.json({message: `Date for '${countryCode.toUpperCase()}' is a Holiday`});        
        break;
      }
      // else{
      //   let data = req.body
      //   getAvailableSlots(data);
      // }
    }
  }
  getAvailableSlots(data);
})







module.exports = router