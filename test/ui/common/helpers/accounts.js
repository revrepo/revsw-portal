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
var AccountsHelper = {
  
  /**
           * ### accounts.getAccount()
           *
           * Returns an Account JSON object
           *
           */
  getAccount: function (name) {
    /*jshint camelcase: false */
    return API.helpers.authenticateUser(user).then(function () {
      return request(apiUrl)
        .get('/v1/accounts')
        .set('Authorization', 'Bearer ' + user.token)
        .expect(200)
        .then(function (res) {
          var accs = res.body;
          var returnAcc;
          accs.forEach(function (acc) {
            if (acc.companyName === name) {
              returnAcc = acc;              
            }
          });
          return request(apiUrl)
            .get('/v1/accounts/' + returnAcc.id)
            .set('Authorization', 'Bearer ' + user.token)
            .expect(200)
            .then(function (res) {
              var ac = res.body;
              ac.id = returnAcc.id;
              return ac;
            });
        });
    });

  }
};

module.exports = AccountsHelper;
