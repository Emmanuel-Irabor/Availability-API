/***************************************
 *   THIS MODULE TESTS ALL API ROUTES 
 * **************************************/

const app = require('../server');
const supertest = require('supertest');
const requestBody = [
    {
        "from": "2022-11-23T09:00:00.0+08:00",
        "to": "2022-11-23T17:00:00.0+08:00",
        "CC": "SG"
    },
    {
        "from": "2022-11-23T09:00:00.0+01:00",
        "to": "2022-11-23T17:00:00.0+01:00",
        "CC": "NG"
    },
    {
        "from": "2022-11-23T09:00:00.0+05:30",
        "to": "2022-11-23T17:00:00.0+05:30",
        "CC": "IN"
    }
]
 
describe('TEST API ROUTES', () => {
    //..
    test('GET /List Supported Countries', async () => {
        //..Test if this route returns all supported countries
        await supertest(app)
        .get('/api/list-supported-countries')
        .expect(200)
        .then(result=>{
            expect(result && result.body && typeof result.body === 'object')
        })
    })

    test('POST /Check Availabilty', async () => {
        jest.setTimeout(30000);
        //..Test if this route returns best slot for a meeting
        await supertest(app)
        .post('/api/check-availability')
        .send(requestBody)
        .expect(200)
        .then(result=>{
            expect(result && result.body && typeof result.body === 'object')
            })
    })
})