/***************************************************
 *   THIS MODULE TESTS THE HOLIDAY CHECKER FEATURE
 * ***************************************************/

const isHoliday = require('../middlewares/holidayChecker');
require('dotenv').config();

test('Properly checks that a date is a holiday', async () => {
    //..
    const apiKey = process.env.GOOGLE_API_KEY;
    const gcalName = 'ng';
    const date = '2022-12-25';

    const result = await isHoliday.checkHoliday(apiKey, gcalName, date);
    console.log(result);
    expect(result).toBe(true);
})