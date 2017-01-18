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

      describe('Tabs switching (Edge Caching)', function () {

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
          EditPage.clickTabEdgeCaching();
        });

        it('should display "Edge Caching"', function () {
          expect(checkDisplay('getEdgeCachingTxtIn')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "URL" in "Caching Rules"', function () {
          
          EditPage.switchBtns(form.getEdgeCachingTxtIn(),
          function(value) {
            if (value === 'true') {
              EditPage.clickAddNewCachingRule();
              expect(checkDisplay('getURLtxtIn')).toBe(true);  
            }
          });

        });

        it('if "Edge Caching" is "ON" then should display '+
          '"Override Origin Caching Headers" in "Caching Rules"', function () {
          expect(checkDisplay('getOverrideOriginCachingHeadersTxtIn')).toBe(true); 
        });

        it('if "Edge Caching" is "ON" then should display '+
          '"Edge Cache TTL" in "Caching Rules"', function () {
          expect(checkDisplay('getEdgeCacheTTLTxtIn')).toBe(true); 
        });

        it('if "Edge Caching" is "ON" then should display "Enforce New'+
          ' Edge Cache TTL If Origin Caching Headers Are Missing" in "Caching Rules"', function () {
          expect(checkDisplay('getEdgeCachingHeadersMissingTxtIn')).toBe(true); 
        });

        it('if "Edge Caching" is "ON" then should display "Keep Or Drop'+
          ' Query String Parameters" in "Caching Rules"', function () {
          expect(checkDisplay('getKeepOrDropQueryStringParametersTxtIn')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "Query String '+
          'Parameters To Drop/Keep" in "Caching Rules"', function () {
          expect(checkDisplay('getQueryStringParametersToDropKeepTxtIn')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "Override'+
          ' HTTP Cookies" in "Caching Rules"', function () {
          expect(checkDisplay('getOverrideHTTPcookiesTxtIn')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "Override '+
          'Edge Caching" in "Caching Rules"', function () {
          expect(checkDisplay('getOverrideEdgeCachingTxtIn')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "Force'+
          ' Revalidation" in "Caching Rules"', function () {
          expect(checkDisplay('getForceRevalidationTxtIn')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "Enable The '+
          'Serving of Stale Content" in "Caching Rules"', function () {
          expect(checkDisplay('getEnableServingStaleContentTxtIn')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display '+
          '"Enable ESI" in "Caching Rules"', function () {
          expect(checkDisplay('getEnableESITxtIn')).toBe(true);
        });


      });
    });
  });
});