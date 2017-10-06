var smoke = require('./base');

smoke.specs = [
  '../suites/functional/logShipping/**/*Spec.js',
  '../suites/functional/intro/**/*Spec.js',
  '../suites/negative/logShipping/**/*Spec.js',
  '../suites/smoke/intro/introSpec.js',

];

exports.config = smoke;