/********************************************
 *   THIS MODULE TESTS THE DATE CONVERTER
 * ********************************************/

const dateConverter = require('../middlewares/dateConverter')

test('Properly converts RFC 3339 to UTC timestamp', () => {
    //..
    const result = dateConverter.parseGoogleDate('2022-11-23T09:00:00.0+08:00');
    expect(result).toBe(1669165200000);
})
