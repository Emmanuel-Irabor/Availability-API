//..import required modules
const router = require("express").Router();
const moment = require('moment');
require('dotenv').config();
const gcalCountries = require('../gcal_countries.json');
const holidayChecker = require('../middlewares/holidayChecker');
const dateConverter = require('../middlewares/dateConverter')


/*********************************************
 *  FXN TO GET THE CORRECT GOOGLE CALENDAR ID
 *  USED BY THE GOOGLE CALENDAR API
 * *******************************************/
 function getGcalName(countryCode){  
  for (let x in gcalCountries) {
    if(x = countryCode){
      var gcalName = gcalCountries[x];
    }
    return gcalName;
  }
}

/*********************************
 *   CALL THE HOLIDAY CHECKER FXN
 * ********************************/
async function verifyDate(gcalName, date) {
  // eslint-disable-next-line no-undef
  const googleAPIkey = process.env.GOOGLE_API_KEY
  const check = await holidayChecker.checkHoliday(googleAPIkey, gcalName, date);

  return check
}


/*******************************
 *   FXN TO CHECK FOR WEEKENDS
 * *******************************/
function checkForWeekend(dateAndTz){
  //.
  var utcTimestamp = dateConverter.parseGoogleDate(dateAndTz)
  var dayOfWeek = moment(utcTimestamp).weekday()

  return dayOfWeek;
}

/***********************************
 *   FXN TO CHECK FOR BEST TIME SLOT
 * **********************************/
function getAvailableSlots(data){
  //..
  let maxDate = [];
  let minDate = [];
  
  for (let i = 0; i < data.length; i++) {

    var maxUtcTimestamp = dateConverter.parseGoogleDate(data[i].from)
    var minUtcTimestamp = dateConverter.parseGoogleDate(data[i].to)

    maxDate.push(maxUtcTimestamp);
    minDate.push(minUtcTimestamp);
  }

  var startTime = Math.max.apply(null, maxDate)
  startTime = moment.utc(startTime).format()

  var endTime = Math.min.apply(null, minDate)
  endTime = moment.utc(endTime).format()

  if(startTime == endTime){
    //..This means there is no overlap
    return false;
  }

  let bestSlot = [
    {
      "from": startTime,
      "to": endTime
    }
  ]

  return bestSlot
}

/***************************************
 *   ROUTE TO RETURN SUPPORTED COUNTRIES
 * ***************************************/
router.get('/list-supported-countries', (req, res) => {
    res.json(gcalCountries);
})


/***********************************************
 *   ROUTE TO HANDLE CHECK-AVAILABILITY REQUESTS
 * ***********************************************/
router.post("/check-availability", async (req, res) => {

  try{
    const data = (req.body);
    
    for (let i = 0; i < data.length; i++) {
      //..get the country code
      var countryCode = (data[i].CC).toLowerCase();
      var gcalName = getGcalName(countryCode);
      var dateAndTz = data[i].from;
 
      //..Check for weekend
      var dayOfWeek = checkForWeekend(dateAndTz);

      if(dayOfWeek >= 6){
        //.. 
        res.json({message: `Date for '${countryCode.toUpperCase()}' is a weekend`});        
        return;
      }
      if(dayOfWeek < 6){
        //..Then check for Holiday
        var utcTimestamp = dateConverter.parseGoogleDate(dateAndTz)
        var date = moment(utcTimestamp).format('YYYY-MM-DD');

        var isHoliday = await verifyDate(gcalName, date);
        if(isHoliday === true){
          res.json({message: `Date for '${countryCode.toUpperCase()}' is a Holiday`});        
          return;
        }
      }
    }

    // getAvailableSlots
    let avialableSlot = getAvailableSlots(data);
    if(Array.isArray(avialableSlot)){
      //..
      res.json(avialableSlot);
      return;
    }
    else if(avialableSlot == false){
      res.json({'message': 'There is no overlapping time across the timezones inserted!'})
    }
  }
  catch(err) {
    res.status(500).json({message: err});
  }
})




module.exports = router