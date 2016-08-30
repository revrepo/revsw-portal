
// PLEASE DON'T MODIFY THE FILE TO FIT YOUR DEVELOPMENT ENVIRONMENT - PLEASE MAKE
// CHANGES IN FILE /dev/config.js

// THIS USE IS COPIED TO public/ DIRECTORY BY gulp build COMMAND

// QA API server
window.API_URL = 'https://testsjc20-api01.revsw.net/v1';

// Victor's Development server
// window.API_URL = 'https://testsjc20-victordev01.revsw.net:8000/v1';

// Local development server
// window.API_URL = 'https://localhost:8000/v1';

// Production staging API server
// window.API_URL = 'https://iad02-api03.revsw.net/v1';

// Production API server - NEVER USE IT FOR TESTING
// window.API_URL = 'https://api.revapm.net/v1';
//
// Google Analytic Account ID
window.gaAccount = 'UA-68856309-2'; // testing environment

// Intro configuration flag (true=on, false=off)
// should be disabled in the testing env and enabled in production
// window.intro = false;
//

// Configuration parameter to set timeout value for POST and PUT requests to the API
window.resourcePostPutTimeout = 120 * 1000;
