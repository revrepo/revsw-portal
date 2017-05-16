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

      describe('Tabs switching (ImageEngine)', function () {

        var EditPage = Portal.domains.editPage;
        var form = EditPage.form;
        var checkDisplay = function (elem) {
          return EditPage.elementIsDisplayed(elem);
        };

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToDomains();
          EditPage.clickEditDomain();
          EditPage.clickTabImageEngine();
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should display switch "ImageEngine"', function () {
          expect(checkDisplay('getImageEngineSw')).toBe(true);
        });

        describe('Then  switch "ImageEngine" is "ON"', function () {
          beforeAll(function () {
            EditPage.switchBtns(form.getImageEngineSw(), true);
          });

          it('should display input for "ImageEngine Token"',
            function () {
              expect(checkDisplay('getImageEngineTokenTxtIn')).toBe(true);
            });

          it('should display input for "ImageEngine Purge API Secret Key"',
            function () {
              expect(checkDisplay('getImageEngineAPIKeyTxtIn')).toBe(true);
            });

          it('should display input for "Origin Server"',
            function () {
              expect(checkDisplay('getImageEngineOriginServerTxtIn')).toBe(true);
            });

        });
      });
    });
  });
});
