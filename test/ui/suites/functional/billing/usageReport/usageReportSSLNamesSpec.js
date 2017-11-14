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

var config = require('config');
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');

describe('Functional', function () {
  var user = config.get('portal.users.admin');
  describe('Usage Report SSL Names', function () {
    describe('With user: ' + user.role, function () {
      var sslCertsCount = 0;
      beforeAll(function (done) {
        // get the amount of SSL names we have
        Portal.signIn(user);
        Portal.helpers.nav.goToSSLNames();
        Portal.sslNames.listPage.table.getRows().count().then(function (count) {
            sslCertsCount = count;
            done();
        });
      });

      afterAll(function () {
        Portal.signOut();
      });

      it('should display correct amount of SSL Names', function () {
        Portal.helpers.nav.goToUsageReport();
        Portal.billing.usageReportPage.getSSLNamesForm().then(function (text) {
          expect(text).toContain(sslCertsCount);
        });
      });
    });
  });
});