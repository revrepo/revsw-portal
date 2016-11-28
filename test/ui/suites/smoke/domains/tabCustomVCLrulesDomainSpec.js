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

      describe('Tabs switching (Custom VCL Rules)', function () {

        var EditPage = Portal.domains.editPage;
        var form = EditPage.form;
        var checkDisplay = function(elem, value) {
          return EditPage.elementIsDisplayed(elem, value);
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
          EditPage.clickTabVCL();
        });

        it('should display "Custom VCL Rules"', function () {
          expect(checkDisplay('getCustomVCLrulesTxtIn')).toBe(true);
        }); 

        it('if "Custom VCL Rules" is "ON" then should display block "Custom VCL Rules"', function () {
          
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              expect(checkDisplay('getBlockCustomVCLrulesTxtIn')).toBe(true);
            }
          });

        }); 

        it('if "Custom VCL Rules" is "ON" then should display "Open only one rule at a time"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              expect(checkDisplay('getOneAtATimeTxtIn')).toBe(true);
            }
          });
        }); 

        it('if "Custom VCL Rules" is "ON" then should display "\'Recv\' Function"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              expect(checkDisplay('getBlockFunctionBlock', 'Recv')).toBe(true);
            }
          });
        });

        it('if "Custom VCL Rules" is "ON" then should display "\'Hit\' Function"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {             
              expect(checkDisplay('getBlockFunctionBlock', 'Hit')).toBe(true);
            }
          });
        }); 

        it('if "Custom VCL Rules" is "ON" then should display "\'Miss\' Function"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              expect(checkDisplay('getBlockFunctionBlock', 'Miss')).toBe(true);
            }
          });
        }); 

        it('if "Custom VCL Rules" is "ON" then should display "\'Deliver\' Function"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              expect(checkDisplay('getBlockFunctionBlock', 'Deliver')).toBe(true);
            }
          });
        }); 
       
        it('if "Custom VCL Rules" is "ON" then should display "\'Pass\' Function"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              expect(checkDisplay('getBlockFunctionBlock', 'Pass')).toBe(true);
            }
          });        
        }); 

        it('if "Custom VCL Rules" is "ON" then should display "\'Pipe\' Function"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              expect(checkDisplay('getBlockFunctionBlock', 'Pipe')).toBe(true);
            }
          });
        }); 

        it('if "Custom VCL Rules" is "ON" then should display "\'Hash\' Function"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              expect(checkDisplay('getBlockFunctionBlock', 'Hash')).toBe(true);
            }
          });
        }); 

        it('if "Custom VCL Rules" is "ON" then should display "\'Synth\' Function"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              expect(checkDisplay('getBlockFunctionBlock', 'Synth')).toBe(true);
            }
          });
        }); 

        it('if "Custom VCL Rules" is "ON" then should display "\'Backend Error\' Function"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              expect(checkDisplay('getBlockFunctionBlock', 'Backend Error')).toBe(true);
            }
          });
        });


        it('if "Custom VCL Rules" is "ON" then should display "Backends"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              expect(checkDisplay('getBackends')).toBe(true);
            }
          });
        });

        it('if "Custom VCL Rules" is "ON" then should display "Backend Name" in "Backends"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewBackendBlock();
              expect(checkDisplay('getBackends')).toBe(true);
            }
          });
        });

        it('if "Custom VCL Rules" is "ON" then should display "Backend VCL Code" in "Backends"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewBackendBlock();
              expect(checkDisplay('getBackendVCLcode')).toBe(true);
            }
          });
        });

        it('if "Custom VCL Rules" is "ON" then should display "Dynamic Origin DNS Name Lookups" in "Backends"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewBackendBlock();
              expect(checkDisplay('getDynamicOriginDNSnameLookupsTxtIn')).toBe(true);
            }
          });
        });

        it('if "Custom VCL Rules" is "ON" then should display "Origin TCP Port" in "Backends"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewBackendBlock();
              expect(checkDisplay('getOriginTCPportTxtIn')).toBe(true);
            }
          });
        });

        it('if "Custom VCL Rules" is "ON" then should display "Origin Host" in "Backends"', function () {
          EditPage.switchBtns(form.getCustomVCLrulesTxtIn(),
          function(value) {
            if (value === 'true') {
              EditPage.clickOnAddNewBackendBlock();
              expect(checkDisplay('getOriginHostTxtIn')).toBe(true);
            }
          });
        });

      });
    });
  });
});