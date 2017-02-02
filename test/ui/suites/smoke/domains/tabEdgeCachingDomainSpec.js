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
          Portal.helpers.nav.goToDomains();
          EditPage.clickEditDomain();
          EditPage.clickTabEdgeCaching();
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should display "Edge Caching"', function () {
          expect(checkDisplay('getEdgeCachingTxtIn')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "Cache Bypass Locations"', function () {
          EditPage.switchBtns(form.getEdgeCachingTxtIn(), true);
          expect(checkDisplay('getCacheBypassLocationsTxtIn')).toBe(true);  
        });

        it('if "Edge Caching" is "ON" then should display "Caching Rules block"', function () {
          expect(checkDisplay('getCachingRulesBlock')).toBe(true);  
        });

        it('if "Edge Caching" is "ON" then should display "URL" in "Caching Rules"', function () {
          expect(checkDisplay('getURLtxtIn')).toBe(true);  
        });


        it('if "Edge Caching" is "ON" then should display '+
          '"Override Origin Caching Headers" in "Caching Rules"', function () {
          EditPage.clickAddNewCachingRule();
          EditPage.clickOpenUrlOfCachingRule();
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


        it('if "Edge Caching" is "ON" then should display "'+
          ' Ignore All HTTP Cookies" in "Caching Rules"', function () {
          EditPage.switchBtns(form.getOverrideHTTPcookiesTxtIn(), true);
          expect(checkDisplay('getIgnoreAllHTTPcookiesTxtIn')).toBe(true);
        });


        it('if "Edge Caching" is "ON" then should display "'+
          'Keep or Drop Specific HTTP Cookies" in "Caching Rules"', function () {
          expect(checkDisplay('getKeepOrDropSpecificHTTPcookiesTxtIn')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "'+
          'List Of Cookies To Drop" in "Caching Rules"', function () {
          expect(checkDisplay('getListOfCookiesToDrop')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "'+
          'Remove Ignored Cookies From Origin Requests" in "Caching Rules"', function () {
          EditPage.switchBtns(form.getIgnoreAllHTTPcookiesTxtIn(), true);
          expect(checkDisplay('getRemoveIgnoredCookiesFromOriginRequests')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "'+
          'Remove Ignored Cookies From Edge Responses" in "Caching Rules"', function () {
          expect(checkDisplay('getRemoveIgnoredCookiesFromEdgeResponses')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "Override '+
          'Edge Caching" in "Caching Rules"', function () {
          expect(checkDisplay('getOverrideEdgeCachingTxtIn')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "'+
          ' Browser Caching TTL" in "Caching Rules"', function () {
          EditPage.switchBtns(form.getOverrideEdgeCachingTxtIn(), true);
          expect(checkDisplay('getBrowserCachingTTL')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "'+
          ' Force Revalidation" in "Caching Rules"', function () {
          expect(checkDisplay('getForceRevalidation')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "'+
          'Enable The Serving of Stale Content" in "Caching Rules"', function () {
          expect(checkDisplay('getEnableServingStaleContentTxtIn')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "'+
          ' Stale Object TTL While Fetching New Object" in "Caching Rules"', function () {
          EditPage.switchBtns(form.getEnableServingStaleContentTxtIn(), true);
          expect(checkDisplay('getStaleObjectTTLwhileFetchingNewObject')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display "'+
          ' Stale Object TTL When Origin Is Down" in "Caching Rules"', function () {
          expect(checkDisplay('getStaleObjectTTLwhenOriginIsDown')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display '+
          '"Enable ESI" in "Caching Rules"', function () {
          expect(checkDisplay('getEnableESITxtIn')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display '+
          '"Manage Origin Request Headers" in "Caching Rules"', function () {
          expect(checkDisplay('getManageOriginRequestHeaders')).toBe(true);
        });

        it('if "Edge Caching" is "ON" then should display '+
          '"Manage End User Response Headers" in "Caching Rules"', function () {
          expect(checkDisplay('getManageEndUserResponseHeaders')).toBe(true);
        });       


      });
    });
  });
});