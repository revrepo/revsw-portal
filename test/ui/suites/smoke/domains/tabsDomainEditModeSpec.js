/*************************************************************************
 */

var config = require('config');
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.user'),
    config.get('portal.users.admin'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Tabs switching', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToDomains();
        });

        it('should display Edit Domain page', function () {
          Portal.domains.editPage.clickEditDomain();
          expect(Portal.domains.editPage.isDisplayed()).toEqual(true);
        });

        it('should display tabs to Edit Domain page', function () {
          Portal.domains.editPage.clickEditDomain();
          expect(Portal.domains.editPage.getAllTabsCountDomain()).toEqual('5');
        });

      });
    });
  });
});