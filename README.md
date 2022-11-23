# Availability-API
Working internationally comes with its own set of challenges, among them the challenge of figuring out when people are available.  This API calculates the best meeting slots across time zones. This API takes into account holidays for any of the countries selected based on the date input.

## Tools & Technologies used for this project
- Docker
- NodeJS
- Google Cloud Platform (GCP)

## Third Party APIs/Libraries used
- Google Calendar Holiday Library: The reason for usind this library is because it leverages on the Google Calendar Public API which is updated and maintained by google.
This means the information returned is very accurate. This API helps to check for holidays in various countries around the world.
