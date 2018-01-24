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
var API = require('./../../../../common/api').API;

describe('Functional', function () {
  var user = config.get('portal.users.admin');
  describe('Usage Report API Keys', function () {
    describe('With user: ' + user.role, function () {
      var defaultName = 'New API Key';
      var keyData = DataProvider.generateApiKeyData();
      var activeKeys = 0;
      var inactiveKeys = 0;

      beforeAll(function (done) {
        // get the amount of API keys we have
        API.helpers.authenticate(user)
          .then(function () {
            API.resources.apiKeys
              .getAll()
              .expect(200)
              .then(function (res) {
                var keys = res.body;
                for (var i = 0; i < keys.length; i++) {
                  if (keys[i].active) {
                    activeKeys++;
                  } else {
                    inactiveKeys++;
                  }
                }
                Portal.signIn(user);
                done();
              })
              .catch(done);
          })
          .catch(done);
      });      

      afterAll(function () {
        Portal.signOut();
      });

      it('should display correct amount of active API keys', function (done) {
        Portal.usageReportHelpers.generateReport(user).then(function () {
          Portal.helpers.nav.goToUsageReport().then(function () {
            Portal
              .usageReportHelpers
              .expectValue(Portal
                .billing
                .usageReportPage, 'Active\n' + activeKeys, done, 'API Keys');
          });
        });
      });

      it('should display correct amount of  inactive API keys', function (done) {
        Portal.usageReportHelpers.generateReport(user).then(function () {
          Portal.helpers.nav.goToUsageReport().then(function () {
            Portal
              .usageReportHelpers
              .expectValue(Portal
                .billing
                .usageReportPage, 'Inactive\n' + inactiveKeys, done, 'API Keys');
          });
        });
      });

      it('should display correct amount of API keys after adding a new key', function (done) {
        Portal.helpers.nav.goToAPIKeys();

        Portal.admin.apiKeys.listPage.clickAddNewApiKey();
        Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
        Portal.admin.apiKeys.listPage.searchAndClickEdit(defaultName);

        Portal.admin.apiKeys.editPage.form.setName(keyData.name);
        Portal.admin.apiKeys.editPage.form.clickUpdate().then(function () {
          Portal.usageReportHelpers.generateReport(user).then(function () {
            Portal.helpers.nav.goToUsageReport().then(function () {
              Portal
                .usageReportHelpers
                .expectValue(Portal
                  .billing
                  .usageReportPage, 'Active\n' + (activeKeys + 1), done, 'API Keys');
            });
          });
        });
      });

      it('should display correct amount of inactive ' +
        ' API keys after updating API key status', function (done) {
          Portal.helpers.nav.goToAPIKeys();

          Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
          Portal.admin.apiKeys.listPage.searchAndClickEdit(keyData.name);
          Portal.admin.apiKeys.editPage.form.checkActive();
          Portal.admin.apiKeys.editPage.clickUpdate().then(function () {
            Portal.usageReportHelpers.generateReport(user).then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal
                  .usageReportHelpers
                  .expectValue(Portal
                    .billing
                    .usageReportPage, 'Inactive\n' + (inactiveKeys + 1), done, 'API Keys');
              });
            });
          });
        });

      it('should display correct amount of API keys after deleting an API key', function (done) {
        Portal.helpers.nav.goToAPIKeys();

        Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
        Portal.admin.apiKeys.listPage.searchAndClickDelete(keyData.name);
        Portal.dialog.clickOk().then(function () {
          Portal.usageReportHelpers.generateReport(user).then(function () {
            Portal.helpers.nav.goToUsageReport().then(function () {
              Portal
                .usageReportHelpers
                .expectValue(Portal
                  .billing
                  .usageReportPage, 'Active\n' + activeKeys, done, 'API Keys');
            });
          });
        });
      });
    });
  });
});
