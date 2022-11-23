# Availability-API
Working internationally comes with its own set of challenges, among them the challenge of figuring out when people are available.  This API calculates the best meeting slots across time zones. This API takes into account holidays for any of the countries selected based on the date input.

## Tools & Technologies used for this project
- Docker
- Docker Compose
- NodeJS
- Google Cloud Platform (GCP)
- Postman

## Third Party APIs/Libraries used
- Google Calendar Holiday Library: The reason for usind this library is because it leverages on the Google Calendar Public API which is updated and maintained by google.
This means the information returned is very accurate. This API helps to check for holidays in various countries around the world.
- MomentJS: MomentJS is a JavaScript library which helps is parsing, validating, manipulating and displaying date/time in JavaScript in a very easy way.
Moment JS allows displaying of date as per localization and in human readable format. You can use MomentJS inside a browser using the script method. It is also available with Node.js and can be installed using npm. In this project we use moment JS to assist in our datetime manipulations.

## Postman Documentation
- [Click Here](https://documenter.getpostman.com/view/23777914/2s8YsnYwsa)

## Design Assupmtions
- The API can accept a json array of objects containing from/to/CC as keys
- The 'from' and 'to' are hashed date input in RFC 3339 format. This represents the available date, time and timezone offset of the specific input
- The 'CC' represents the country code of the particular input.
- The API Returns all available countries codes which are supported by the service.
- The API takes into account local holidays and weekends.
- If no holidays, weekends or intersection between all timezones, then the API calculates and returns the available time for a meeting.

## Project Use Case
This Availabilty API provides a wide range of benefits and solves most common problems in our digital world today. Some of which include;
- Recruiting 
- Training
- Project Management
- Collaboration with customers
- Sales presentations and negotiations etc.

## Running the Project
- First clone the repository
- Ensure you have docker and docker-compose installed in your environment
- Use the command below to start the project
 ```
  docker-compose up -d
 ```
## Implementation choice reasons
- The use of 3rd Party APIs for this project as opposed to a local storage or database ensures that the data remains updated as it is provided by Google and also used 
by other parties around the world.
- Reduction of Complexity and Inconsistency

## Running Tests
- Run test with the following command
```
 npm run test
```
## Note
I would love to state that this project is still a Work in Progress and can still be very much improved. Thanks.
