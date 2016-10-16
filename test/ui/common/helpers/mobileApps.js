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

var MobileAppsHelper = {

  createOne: function (appData) {
    var user = Session.getCurrentUser();
    return API.helpers
      .authenticateUser(user)
      .then(function () {
        return API.helpers.apps.createOne(user.account.id, appData)
      })
      .then(function (newApp) {
        return {
          name: newApp.app_name,
          platform: newApp.app_platform,
          title: '>>> APP TITLE <<<',
          comment: newApp.comment,
          companyName: newApp.account_id
        };
      });
  }
};

module.exports = MobileAppsHelper;
