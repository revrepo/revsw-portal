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
var user = config.get('portal.users.admin');
var request = require('supertest-as-promised');
var Utils = require('./utils');
var UsersHelper = {

  /**
   * Creates a new User (pre-requisite) through REST API end-point.
   *
   * @param data, user data
   * @returns {Object} Promise
   */
  create: function (data) {
    if (data === undefined) {
      data = {};
    }
    var user = Session.getCurrentUser();
    return API.helpers
      .authenticateUser(user)
      .then(function () {
        // Special case when the portal user is creating a new user
        // is a rev-admin which require the specify the
        // company the new user should be associated with
        if (user.role === 'Rev Admin') {
          data.companyId = [user.account.id];
        }
        return API.helpers.users.create(data);
      })
      .then(function (user) {
        return {
          email: user.email,
          firstName: user.firstname,
          lastName: user.lastname,
          role: user.role,
          password: user.password,
          passwordConfirm: user.password
          // company: ??
        };
      });
  },

  /**
   * ### users.getUser()
   *
   * Returns a User JSON object
   *
   */
  getUser: function (email) {
    return Utils.getItem(email, 'email', user, '/v1/users');
  }
};

module.exports = UsersHelper;
