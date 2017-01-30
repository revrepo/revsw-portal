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
    // config.get('portal.users.admin'),
    // config.get('portal.users.revAdmin'),
    // config.get('portal.users.reseller')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Tabs switching (Lua Scripting)', function () {

        var EditPage = Portal.domains.editPage;
        var form = EditPage.form;
        var checkDisplay = function(elem) {
          return EditPage.elementIsDisplayed(elem);
        };

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToDomains();
          EditPage.clickEditDomain();
          EditPage.clickTabLuaScripting();
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should display "Enable Lua Scripting On Edge (Last Mile) Proxies"', function () {
          EditPage.switchBtns(form.getEnableLuaScriptingOnEdgeLastMile(), true);
          expect(checkDisplay('getEnableLuaScriptingOnEdgeLastMile')).toBe(true);
        });

        it('should display "Enable Lua Scripting On Origin (First Mile) Proxies"', function () {
          EditPage.switchBtns(form.getEnableLuaScriptingOriginFirstMile(), true);
          expect(checkDisplay('getEnableLuaScriptingOriginFirstMile')).toBe(true);
        });



        it('if "Enable Lua Scripting On Edge (Last Mile, First Mile) Proxies" is "ON" then should'+
          ' display "Lua Scripts Executed On Edge (Last Mile, First Mile) Proxies"', function () {
          form.getLuaScriptsExecutedEdgeLastFirstMilesProxies().getAttribute('id').then(function(idBlocks) {
            expect(idBlocks).toEqual(['luaScriptingLastMileBlock', 'luaScriptingFirstMileBlock']);
          });
        });


        it('if "Enable Lua Scripting On Edge (Last Mile) Proxies" is "ON" then should'+
          ' display FIELDS "Lua Scripts Executed On Edge (Last Mile) Proxies"', function () {
          EditPage.clickOnAddNewItemBP();
          form.getLuaScriptsExecutedEdgeLastMilefields().getAttribute('name').then(function(fieldsName) {
            expect(fieldsName).toEqual(['customVcl', 'luaBPlocation', 'luaBlockCode']);
          });

        });


        it('if "Enable Lua Scripting On Edge (First Mile) Proxies" is "ON" then should'+
          ' display FIELDS "Lua Scripts Executed On Edge (First Mile) Proxies"', function () {
          form.getLuaScriptsExecutedEdgeFirstMilefields().getAttribute('name').then(function(fieldsName) {
            expect(fieldsName).toEqual(['customVcl', 'luaBPlocation', 'luaBlockCode']);
          });

        });


      });
    });
  });
});