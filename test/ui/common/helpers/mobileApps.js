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

var MobileAppsHelper = {

  /**
   * Creates a new Mobile App (pre-requisite) through REST API end-point.
   *
   * @param appData, mobileApp data
   * @returns {Object} Promise
   */
  create: function (appData) {
    var user = Session.getCurrentUser();
    return API.helpers
      .authenticateUser(user)
      .then(function () {
        appData.accountId = user.account.id;
        return API.helpers.apps.create(appData);
      })
      .then(function (newApp) {
        return {
          /* jshint ignore:start */
          name: newApp.app_name,
          platform: newApp.app_platform,
          // title: '>>> APP TITLE <<<',
          comment: newApp.comment,
          companyName: newApp.account_id
          /* jshint ignore:end */
        };
      });
  }
};

module.exports = MobileAppsHelper;
