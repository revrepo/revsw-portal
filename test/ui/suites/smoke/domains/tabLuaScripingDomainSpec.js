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

      describe('Tabs switching (Lua Scripting)', function () {

        var EditPage = Portal.domains.editPage;
        var form = EditPage.form;
        var checkDisplay = function(elem) {
          return EditPage.elementIsDisplayed(elem);
        };

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToDomains();
          EditPage.clickEditDomain();
          EditPage.clickTabLuaScripting();
        });


        it('should display "Enable Lua Scripting On Edge (Last Mile) Proxies"', function () {
          expect(checkDisplay('getEnableLuaScriptingOnEdgeLastMile')).toBe(true);
        });

        it('should display "Enable Lua Scripting On Origin (First Mile) Proxies"', function () {
          expect(checkDisplay('getEnableLuaScriptingOriginFirstMile')).toBe(true);
        });


        it('if "Enable Lua Scripting On Edge (Last Mile) Proxies" is "ON" then should'+
          ' display "Lua Scripts Executed On Edge (Last Mile) Proxies"', function () {
          EditPage.switchBtns(form.getEnableLuaScriptingOnEdgeLastMile(),
          function(value) {
            if (value === 'true') {
              expect(checkDisplay('getLuaScriptsExecutedLastMile')).toBe(true);
            }
          });
        });



        it('if "Enable Lua Scripting On Edge (Last Mile) Proxies" is "ON" then should'+
          ' display "Enable This Code Block" in "Last Mile"', function () {
          EditPage.switchBtns(form.getEnableLuaScriptingOnEdgeLastMile(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewItemBP();
              expect(checkDisplay('getEnableThisCodeBlockBP')).toBe(true);
            }
          });
        });

        it('if "Enable Lua Scripting On Edge (Last Mile) Proxies" is "ON" then '+
          'should display "URL Location" in "Last Mile"', function () {
          EditPage.switchBtns(form.getEnableLuaScriptingOnEdgeLastMile(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewItemBP();
              expect(checkDisplay('getUrlLocationBP')).toBe(true);
            }
          });
        });

        it('if "Enable Lua Scripting On Edge (Last Mile) Proxies" is "ON" then'+
          ' should display "Lua Code" in "Last Mile"', function () {
          EditPage.switchBtns(form.getEnableLuaScriptingOnEdgeLastMile(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewItemBP();
              expect(checkDisplay('getLuaCodeBP')).toBe(true);
            }
          });
        });

        it('if "Enable Lua Scripting On Edge (Last Mile) Proxies" is "ON" then should'+
          ' display "RevAPM Admin Approval" in "Last Mile"', function () {
          EditPage.switchBtns(form.getEnableLuaScriptingOnEdgeLastMile(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewItemBP();
              expect(checkDisplay('getRevAPMadminApprovalBP')).toBe(true);
            }
          });
        });




        it('if "Enable Lua Scripting On Origin (First Mile) Proxies" is "ON" then should'+
          ' display "Lua Scripts Executed On Origin (First Mile) Proxies"', function () {
          EditPage.switchBtns(form.getEnableLuaScriptingOriginFirstMile(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewItemCO();
              expect(checkDisplay('getLuaScriptsExecutedFirstMile')).toBe(true);
            }
          });
        });

        it('if "Enable Lua Scripting On Origin (First Mile) Proxies" is "ON" then should'+
          ' display "Enable This Code Block" in "First Mile"', function () {
          EditPage.switchBtns(form.getEnableLuaScriptingOriginFirstMile(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewItemCO();
              expect(checkDisplay('getEnableThisCodeBlockCO')).toBe(true);
            }
          });
        });

        it('if "Enable Lua Scripting On Origin (First Mile) Proxies" is "ON" then should '+
          'display "URL Location" in "First Mile"', function () {
          EditPage.switchBtns(form.getEnableLuaScriptingOriginFirstMile(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewItemCO();
              expect(checkDisplay('getUrlLocationCO')).toBe(true);
            }
          });
        });

        it('if "Enable Lua Scripting On Origin (First Mile) Proxies" is "ON" then '+
          'should display "Lua Code" in "First Mile"', function () {
          EditPage.switchBtns(form.getEnableLuaScriptingOriginFirstMile(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewItemCO();
              expect(checkDisplay('getLuaCodeCO')).toBe(true);
            }
          });
        });

        it('if "Enable Lua Scripting On Origin (First Mile) Proxies" is "ON" then should '+
          'display "RevAPM Admin Approval" in "First Mile"', function () {
          EditPage.switchBtns(form.getEnableLuaScriptingOriginFirstMile(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewItemCO();
              expect(checkDisplay('getRevAPMadminApprovalCO')).toBe(true);
            }
          });
        });


      });
    });
  });
});