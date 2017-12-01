/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Rev Software, Inc. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Rev Software, Inc.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Rev Software, Inc.
 */


var API = require('./../api').API;
var Session = require('./../session');
var config = require('config');
var user = config.get('portal.users.revAdmin');
var apiUrl = config.get('api.host.protocol') +
  '://' +
  config.get('api.host.name');
var request = require('supertest-as-promised');
var LogShippingHelper = {
  
  /**
           * ### logShipping.getJob()
           *
           * Returns a Log Shipping Job JSON object
           *
           */
  getJob: function (name) {
    /*jshint camelcase: false */
    return API.helpers.authenticateUser(user).then(function () {
      return request(apiUrl)
        .get('/v1/log_shipping_jobs')
        .set('Authorization', 'Bearer ' + user.token)
        .expect(200)
        .then(function (res) {
          var jobs = res.body;
          var returnJob;
          jobs.forEach(function (job) {
            if (job.job_name === name) {
              returnJob = job;              
            }
          });
          return request(apiUrl)
            .get('/v1/log_shipping_jobs/' + returnJob.id)
            .set('Authorization', 'Bearer ' + user.token)
            .expect(200)
            .then(function (res) {
              var jb = res.body;
              jb.id = returnJob.id;
              return jb;
            });
        });
    });

  }
};

module.exports = LogShippingHelper;
