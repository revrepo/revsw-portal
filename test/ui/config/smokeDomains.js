var smoke = require('./base');

smoke.specs = [
  '../suites/smoke/dnsZones/*Spec.js',
  '../suites/smoke/dnsZonesRecords/*Spec.js',
  '../suites/smoke/domains/*Spec.js',
  '../suites/smoke/sslCerts/*Spec.js',
  '../suites/smoke/sslNames/*Spec.js'
];

exports.config = smoke;
