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


var Session = require('./../../session');

var index = 100;

var MobileAppProvider = {

  /**
   * Generate Mobile App data based on given values
   * @param platform, for which data will be generated
   * @returns {Object} app data
   */
  getOne: function (platform) {
    var app = {};
    var user = Session.getCurrentUser();
    app.name = platform + '-' + index;
    app.companyName = user.account.companyName;
    app.comment = 'Test comment (' + platform + ' ' + index + ')';
    index++;
    return app;
  },

  /**
   * Generates a set of Mobile Apps data based on given values
   * @param platform, for which data will be generated
   * @param total, number of mobile apps to generate
   * @returns [{Object}], array of apps objects
   */
  getMany: function (platform, total) {
    var apps = [];
    for (var i = 0; i < total; i++) {
      apps.push(this.getOne(platform));
    }
    return apps;
  }
};

module.exports = MobileAppProvider;

