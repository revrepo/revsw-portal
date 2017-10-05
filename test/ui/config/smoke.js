var smoke = require('./base');
smoke.specs = [
  '../suites/functional/mobileApps/editAppSpec.js',
  '../suites/functional/users/resetPasswordSpec.js'

];

exports.config = smoke;