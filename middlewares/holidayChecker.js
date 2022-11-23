const GoolgeCalendarHoliday = require('google-calendar-holiday');

/******************************
 *    MAKE CALL TO GOOGLE API
 * *****************************/
async function checkHoliday(apiKey, gcalName, date) {

    const holiday = new GoolgeCalendarHoliday(
        apiKey,
        {
            Holiday: `en.${gcalName}%23holiday%40group.v.calendar.google.com`
        }
    );
    const result = await holiday.isHoliday(date) // returns true or false
    
    return result
}



module.exports = { checkHoliday };