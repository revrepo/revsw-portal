/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2015] Rev Software, Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Rev Software, Inc. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Rev Software, Inc.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Rev Software, Inc.
 */

var config = require('config');
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function() {
  describe('Help and Support', function() {

    var adminUser = config.get('portal.users.admin');
    var myDomain = Constants.domain;

    beforeAll(function() {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToSupport();
    });

    afterAll(function() {
      Portal.signOut();
    });

    it('should display "Help And Support" page',
      function() {
        var expectedTitle = 'Help And Support';
        var title = Portal.helpSupportPage.getTitle();
        expect(title).toEqual(expectedTitle);
      });

    it('should check if "link" link exist in "Help And Support" page',
      function() {
        var link = 'link';
        expect(Portal.helpSupportPage.existLink(link)).toBe(true);
      });

    it('should check if "electronic address" links exist in "Help And Support"',
      function() {
        var expectedEmail = 'support@revapm.com';
        var expectedCall = '+1 (408) 477-1738';
        expect(Portal.helpSupportPage.existLink(expectedEmail)).toBe(true);
        expect(Portal.helpSupportPage.existLink(expectedCall)).toBe(true);
      });

    it('should check if "Full documentation" link exists in "Help And Support"',
      function() {
        var expectedLink = 'Full documentation on the API service';
        expect(Portal.helpSupportPage.existLink(expectedLink)).toBe(true);
      });

    it('should check "RevAPM Knowledge Base" link exist in "Help And Support"',
      function() {
        var expectedLink = 'RevAPM Knowledge Base';
        expect(Portal.helpSupportPage.existLink(expectedLink)).toBe(true);
      });

    it('should check "Network Status" link exist in "Help And Support"',
      function() {
        var expectedLink = 'Network Status';
        expect(Portal.helpSupportPage.existLink(expectedLink)).toBe(true);
      });

    it('should check "Detailed Information About Billing Zones" link exist in "Help And Support"',
      function() {
        var expectedLink = 'Detailed Information About Billing Zones';
        expect(Portal.helpSupportPage.existLink(expectedLink)).toBe(true);
      });

    it('should open dialog "Detailed Information About Billing Zones" in "Help And Support"',
      function() {
        var expectedLink = 'Detailed Information About Billing Zones';
        var link = Portal.helpSupportPage.getLink(expectedLink);
        expect(link.isPresent()).toBe(true);
        link.click();
        expect(Portal.helpSupportPage.dialogBilligZones.isDisplayed()).toBe(true);
      });

    describe('Dialog "Detailed Information About Billing Zones"', function() {
      beforeAll(function() {
        var expectedLink = 'Detailed Information About Billing Zones';
        var link = Portal.helpSupportPage.getLink(expectedLink);
      });

      var arrayText = [
        'Asia',
        'Europe',
        'North America',
        'South America',
        'San Jose, California, USA',
      ];

      arrayText.forEach(function(textDisplay) {
        it('should display text "' + textDisplay + '"',
          function() {
            var bodyText = Portal.helpSupportPage.dialogBilligZones.getBodyText();
            expect(bodyText.isPresent()).toBe(true);
            bodyText.then(function(text) {
              expect(text).toContain(textDisplay);
            });
          });
      });
    });
  });
});
