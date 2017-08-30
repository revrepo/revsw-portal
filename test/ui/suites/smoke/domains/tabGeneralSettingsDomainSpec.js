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

      describe('Tabs switching (General Settings)', function () {

        var EditPage = Portal.domains.editPage;
        var form = EditPage.form;
        var checkDisplay = function(elem) {
          return EditPage.elementIsDisplayed(elem);
        };

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToDomains();
          Portal.domains.editPage.clickEditDomain();
          Portal.domains.editPage.clickTabGeneralSettings();
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should display "Domain Name"', function () {
          expect(checkDisplay('getDomainNameTxtIn')).toBe(true);
        });

        it('should display "Domain CNAME"', function () {
          expect(checkDisplay('getDomainCnameTxtIn')).toBe(true);
        });

        it('should display button "Click to copy the CNAME to the clipboard"', function () {
          expect(checkDisplay('getBtnCopyCname')).toBe(true);
        });

        if (user.role !== 'Normal User' && user.role !== 'Admin') {
          it('should display "Account"', function () {
            expect(checkDisplay('getCompanyNameDDownTxtIn')).toBe(true);
          });
        }

        it('should display "Origin Server Name/IP"', function () {
          expect(checkDisplay('getOriginServerTxtIn')).toBe(true);
        });

        it('should display "Origin Host Header"', function () {
          expect(checkDisplay('getOriginHostHeaderTxtIn')).toBe(true);
        });

        it('should display "Domain Origin Location"', function () {
          expect(checkDisplay('getDomainOriginLocationDDown')).toBe(true);
        });

        it('should display "Enhanced Traffic Analytics"', function () {
          expect(checkDisplay('getEnableEnhancedAnalytics')).toBe(true);
        });

        it('should display "Use End User Protocol" (input-radio)', function () {
          expect(checkDisplay('getUseEndUserProtocolTxtIn')).toBe(true);
        });

        it('should display "HTTPS Only" (input-radio)', function () {
          expect(checkDisplay('getHttpsOnlyTxtIn')).toBe(true);
        });

        it('should display "HTTP Only" (input-radio)', function () {
          expect(checkDisplay('getHttpOnlyTxtIn')).toBe(true);
        });


        it('should display "Non-Wildcard Domain Aliases"', function () {
          expect(checkDisplay('getNonWildcardDomainAliasesTxtIn')).toBe(true);
        });

        it('should display "Wildcard Domain Alias"', function () {
          expect(checkDisplay('getWildcardDomainAliasTxtIn')).toBe(true);
        });

        it('should display "Data Read Timeout"', function () {
          expect(checkDisplay('getDataReadTimeoutTxtIn')).toBe(true);
        });


        it('should display "Last Mile QUIC Protocol"', function () {
          expect(checkDisplay('getLastMileQUICprotocolTxtIn')).toBe(true);
        });

        it('should display "Block All Web Crawlers"', function () {
          expect(checkDisplay('getBlockAllWebCrawlersTxtIn')).toBe(true);
        });

        it('should display "RUM Data Collection"', function () {
          expect(checkDisplay('getRUMdataCollectionTxtIn')).toBe(true);
        });

        it('should display "Decompress Objects Fetched From The Origin"', function () {
          expect(checkDisplay('getDecompressObjectsFetchedFromTheOriginTxtIn')).toBe(true);
        });

        it('should display "comment"', function () {
          expect(checkDisplay('getCommentTxtIn')).toBe(true);
        });

        it('should display "Blue Triangle Tech. Key"', function () {
          expect(checkDisplay('getBlueTriangleTechKeyTxtIn')).toBe(true);
        });


      });
    });
  });
});
