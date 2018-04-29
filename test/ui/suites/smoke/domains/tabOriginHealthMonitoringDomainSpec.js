/*************************************************************************
 */

var config = require('config');
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Tabs switching (Origin Health Monitoring)', function () {

        var EditPage = Portal.domains.editPage;
        var form = EditPage.form;
        var checkDisplay = function(elem) {
          return EditPage.elementIsDisplayed(elem);
        };

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToDomains();
          EditPage.clickEditDomain();
          EditPage.clickTabOriginHealthMonitoring();
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should display "Origin Health Monitoring"', function () {
          expect(checkDisplay('getOriginHealthMonitoringTxtIn')).toBe(true);
          EditPage.switchBtns(form.getOriginHealthMonitoringTxtIn(), true);
        });
      
        it('if "Origin Health Monitoring" is "ON" then should '+
          'display "Origin Monitoring HTTP Request"', function () {
          expect(checkDisplay('getOriginMonitoringHTTPrequestTxtIn')).toBe(true);
        });

        it('if "Origin Health Monitoring" is "ON" then'+
          ' should display "Probe Timeout"', function () {
          expect(checkDisplay('getProbeTimeoutTxtIn')).toBe(true);
        });

        it('if "Origin Health Monitoring" is "ON" then'+
          ' should display "Probe Interval"', function () {
          expect(checkDisplay('getProbeIntervalTxtIn')).toBe(true);
        });

        it('if "Origin Health Monitoring" is "ON" then should'+
          ' display "Expected HTTP Response Code"', function () {
          expect(checkDisplay('getExpectedHTTPresponseCodeTxtIn')).toBe(true);
        });
        

      });
    });
  });
});