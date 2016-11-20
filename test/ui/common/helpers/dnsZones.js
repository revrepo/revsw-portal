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

var DNSZonesHelper = {

  /**
   * ### DNSZonesHelper.cleanup(namePattern)
   *
   * Cleans up all DNS Zones that matches with the given name pattern.
   *
   * @param namePattern, name pattern of the DNS zones to delete
   * @returns {Object} Promise
   */
  cleanup: function (namePattern) {
    if (namePattern === undefined) {
      namePattern = /[0-9]{13}/;
    }
    var user = Session.getCurrentUser();
    return API.helpers
      .authenticateUser(user)
      .then(function () {
        return API.helpers.dnsZones.cleanup(namePattern);
      });
  }
};

module.exports = DNSZonesHelper;
