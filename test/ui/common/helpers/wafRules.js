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
var request = require('supertest-as-promised');
var apiWAFRulesDP = require('./../api').WAFRulesDP;
var Session = require('./../session');
var config = require('config');
var user = config.get('portal.users.admin');
var apiUrl = config.get('api.host.protocol') +
  '://' +
  config.get('api.host.name');
var WAFRulesHelper = {

  /**
   * Creates a new WAF Rule through REST API end-point for Account current user.
   *
   * @param data, WAR Rule data
   * @returns {Object} Promise
   */
  createOneForUser: function (data) {
    user = Session.getCurrentUser();
    if (data === undefined) {
      data = apiWAFRulesDP.generateOne();
    }
    return API.helpers
      .authenticateUser(user)
      .then(function () {
        // Special case when the portal user is creating a new user
        // is a rev-admin which require the specify the
        // company the new user should be associated with
        if (user.role === 'Rev Admin') {
          data.accountId = [user.account.id];
        }
        return API.helpers.wafRules.createOne(data);
      })
      .then(function (wafRule) {
        return wafRule;
      });
  },
  /**
           * ### wafRules.getWafRule()
           *
           * Returns a WAF Rule JSON object
           *
           */
  getWafRule: function (wafRuleName) {
    /*jshint camelcase: false */
    return API.helpers.authenticateUser(user).then(function () {
      return request(apiUrl)
        .get('/v1/waf_rules')
        .set('Authorization', 'Bearer ' + user.token)
        .expect(200)
        .then(function (res) {
          var wafRules = res.body;
          var returnRule;
          wafRules.forEach(function (rule) {
            if (rule.rule_name === wafRuleName) {
              returnRule = rule;
            }
          });
          return request(apiUrl)
            .get('/v1/waf_rules/' + returnRule.id)
            .set('Authorization', 'Bearer ' + user.token)
            .expect(200)
            .then(function (res) {
              var rul = res.body;
              rul.id = returnRule.id;
              return rul;
            });
        });
    });

  }
};

module.exports = WAFRulesHelper;
