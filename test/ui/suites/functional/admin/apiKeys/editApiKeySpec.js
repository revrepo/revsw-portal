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

var config = require('config');
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');
var API = require('./../../../../common/api').API;
var DataProvider = require('./../../../../common/api').DataProvider;
var AccountsDP = require('./../../../../common/api').AccountsDP;
var APIKeyDP = require('./../../../../common/api').APIKeyDP;

describe('Functional ', function () { // jshint ignore:line

  var resellerUser = config.get('portal.users.reseller');
  var accountFirst, accountSecond;
  var userReseller = DataProvider.generateUser('reseller');

  describe('Edit API Keys', function () {
    var EditPage = Portal.admin.apiKeys.editPage;
    var form = EditPage.form;
    var checkDisplay = function (elem, val) {
      return EditPage.elementIsDisplayed(elem, val);
    };

    beforeAll(function (done) {
      API.helpers
        .authenticateUser(resellerUser)
        .then(function () {
          // create account 1
          accountFirst = AccountsDP.generateOne();
          return API.resources.accounts
            .createOne(accountFirst)
            .then(function (response) {
              accountFirst.id = response.body.object_id;
              return accountFirst;
            });
        })
        .then(function () {
          // create account 2
          accountSecond = AccountsDP.generateOne();
          return API.resources.accounts
            .createOne(accountSecond)
            .then(function (response) {
              accountSecond.id = response.body.object_id;
              return accountSecond;
            });
        })
        .then(function () {
          // create user with role "resseler" and access to Account First and Account Second
          userReseller.companyId = [accountFirst.id + '', accountSecond.id + ''];
          userReseller.access_control_list.readOnly = false;
          return API.resources.users
            .createOne(userReseller);
        })
        .then(function () {
          return Portal.signIn(userReseller);
        })
        .then(function () {
          done();
        })
        .catch(done);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToAPIKeys();
    });

    afterEach(function () {});

    describe('work with data - "Additional Accounts To Manage"', function () {

      var apiKey;
      beforeAll(function (done) {
        API.helpers.authenticateUser(userReseller)
          .then(function () {
            // create API Key for Account 1
            return API.helpers.apiKeys.createOneForAccount(accountFirst)
              .then(function (response) {
                apiKey = response;
                return apiKey;
              });
          })
          .then(function () {
            return API.resources.apiKeys
              .getOne(apiKey.id)
              .then(function (response) {
                apiKey.key = response.body.key;
              });
          })
          .then(function () {
            done();
          })
          .catch(done);
      });

      it('should display "Additional Accounts To Manage"', function () {
        Portal.admin.apiKeys.listPage.searchAndClickEdit(apiKey.key);
        expect(checkDisplay('getAdditionalAccountsToManageInputTxt')).toBe(true);
      });

      it('should edit additional account into "Additional Accounts To Manage"', function () {
        Portal.admin.apiKeys.listPage.searchAndClickEdit(apiKey.key);
        Portal.admin.apiKeys.editPage.form.setAdditionalAccounts(accountSecond.companyName);
        var additionalAccounts = Portal.admin.apiKeys
          .editPage.form.getAdditionalAccountsToManageInputTxt();
        expect(additionalAccounts.getText())
          .toContain(accountSecond.companyName);
      });

      it('should save additional account into "Additional Accounts To Manage"', function () {
        Portal.admin.apiKeys.listPage.searchAndClickEdit(apiKey.key);
        expect(checkDisplay('getAdditionalAccountsToManageInputTxt')).toBe(true);
        Portal.admin.apiKeys.editPage.form.setAdditionalAccounts(accountSecond.companyName);
        Portal.admin.apiKeys.editPage.clickUpdate();
        var alert = Portal.alerts.getFirst();
        expect(alert.getText())
          .toContain(Constants.alertMessages.apiKeys.MSG_SUCCESS_UPDATE);
        Portal.admin.apiKeys.editPage.clickBackToList();
        Portal.admin.apiKeys.listPage.searchAndClickEdit(apiKey.key);
        var additionalAccounts = Portal.admin.apiKeys
          .editPage.form.getAdditionalAccountsToManageInputTxt();
        expect(additionalAccounts.getText())
          .toContain(accountSecond.companyName);
        expect(checkDisplay('getAdditionalAccountsToManageInputTxt'), accountSecond.companyName).toBe(true);
      });
    });

  });
});
