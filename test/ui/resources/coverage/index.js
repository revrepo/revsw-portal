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

// Required third-party libraries.
var request = require('supertest-as-promised');

// Requiring config.
var config = require('config');

var host = config.get('portal.host');
var BASE_URL = host.protocol + '://' + host.name + ':' + host.port;

// # Portal Coverage Resource Object
var PortalCoverageResource = {

  /**
   * Posts/Logs all coverage info collected so far to the Coverage server
   *
   * @param {Object} data, collected by client handler from istanbul-middleware
   * @returns {Promise}
   */
  logClientInfo: function (data) {
    return request(BASE_URL)
      .post('/coverage/client')
      .send(JSON.stringify(data))
      .set('Content-Type', 'application/json')
      .then(function (res) {
        return res.body;
      });
  },
};

module.exports = PortalCoverageResource;
