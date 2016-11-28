/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
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


var API = require('./../api');
var Session = require('./../session');

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
  }
};

module.exports = UsersHelper;
