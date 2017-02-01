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

        var EditPage = Portal.domains.editPage;
        var form = EditPage.form;
        var checkDisplay = function(elem) {
          return EditPage.elementIsDisplayed(elem);
        };

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToDomains();
          EditPage.clickEditDomain();
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should display Edit Domain page', function () {
          browser.getLocationAbsUrl().then(function(url) {
            var arrayUrl = url.split('/');
            var idCountSymbols = arrayUrl[arrayUrl.length - 1].length;
            expect(idCountSymbols).toBe(24);
          });
        });

        it('should display tabs to Edit Domain page', function () {
          expect(EditPage.getAllTabsCountDomain()).toEqual('5');
        });

        it('click tab "General Settings"', function () {
          EditPage.clickTabGeneralSettings();
          expect(EditPage.tabIsActive('generalSettings')).toEqual(true);
        });

        it('click tab "Origin Health Monitoring"', function () {
          EditPage.clickTabOriginHealthMonitoring();
          expect(EditPage.tabIsActive('originHealthMonitoring')).toEqual(true);
        });

        it('click tab "Edge Caching"', function () {
          EditPage.clickTabEdgeCaching();
          expect(EditPage.tabIsActive('edgeCaching')).toEqual(true);
        });

        it('click tab "SSL Configuration"', function () {
          EditPage.clickTabSSLconfiguration();
          expect(EditPage.tabIsActive('sslConfiguration')).toEqual(true);
        });

        it('click tab "Custom VCL Rules"', function () {
          EditPage.clickTabVCL();
          expect(EditPage.tabIsActive('customVCLRules')).toEqual(true);
        });

        it('click tab "Lua Scripting"', function () {
          EditPage.clickTabLuaScripting();
          expect(EditPage.tabIsActive('luaScripting')).toEqual(true);
        });

        
      });
    });
  });
});