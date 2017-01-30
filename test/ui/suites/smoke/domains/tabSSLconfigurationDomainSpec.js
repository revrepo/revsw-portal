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

      describe('Tabs switching (SSL Configuration)', function () {

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToDomains();
          Portal.domains.editPage.clickEditDomain();
          Portal.domains.editPage.clickTabSSLconfiguration();
        });

        afterAll(function () {
          Portal.signOut();
        });

        var checkDisplay = function(elem) {
          var editPage = Portal.domains.editPage;
          return editPage.elementIsDisplayed(elem);
        };

        it('should display "Accept SSL Requests"', function () {
          expect(checkDisplay('getAcceptSSLrequestsTxtIn')).toBe(true);
        });

        it('should display "SSL Certificate"', function () {
          expect(checkDisplay('getSslCertDDown')).toBe(true);
        });

        it('should display "Manage SSL Certificates"', function () {
          expect(checkDisplay('getManageSSLcertificatesTxtIn')).toBe(true);
        });

        it('should display "Predefined SSL Configuration Profile"', function () {
          expect(checkDisplay('getPredefinedSSLconfigurationTxtIn')).toBe(true);
        });

        it('should display "Custom SSL Configuration Profile"', function () {
          expect(checkDisplay('getCustomSSLconfigurationTxtIn')).toBe(true);
        });

        it('should display "Predefined SSL Configuration Profile" for select element', function () {
          expect(checkDisplay('getSslConfProfileTxtIn')).toBe(true);
        });

        it('should display "Allowed SSL Protocols (in Nginx format)"', function () {
          expect(checkDisplay('getAllowedSSLprotocolsTxtIn')).toBe(true);
        });

        it('should display "Allowed SSL Ciphers (in Nginx format)"', function () {
          expect(checkDisplay('getAllowedSSLciphersTxtIn')).toBe(true);
        });

        it('should display "Prefer Server-Side Ciphers"', function () {
          expect(checkDisplay('getPreferServerSideCiphersTxtIn')).toBe(true);
        });


      });
    });
  });
});