/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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

describe('Smoke', function () {

  describe('Purge Cached Objects', function () {

    var users = [
      config.get('portal.users.revAdmin'),
      config.get('portal.users.admin'),
      config.get('portal.users.reseller'),
      config.get('portal.users.roUser')
    ];

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        var myDomain = Constants.domain;

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToPurgeCache();
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
        });

        it('should "Purge Cached Objects" title be visible',
          function () {
            var title = Portal.purgeCacheBasicPage.getTitle();
            expect(title).toEqual('Purge Cached Objects');
          });

        it('should "Advanced mode" button be visible',
          function () {
            var advancedButton = Portal.purgeCacheBasicPage.getAdvancedModeBtn();
            expect(advancedButton.isPresent()).toBe(true);
          });

        it('should "Purge All Objects" button is exists',
          function () {
            var btnPurgeAllObjects = Portal.purgeCacheBasicPage.getPurgeAllObjectsBtn();
            expect(btnPurgeAllObjects.isPresent()).toBe(true);
          });

        it('should "Example" paragraph be visible',
          function () {
            var exampleText = Portal.purgeCacheBasicPage.getExampleText();
            var paragraph1 = 'Example';
            var paragraph2 = 'Purge all PNG files under';
            var paragraph3 = 'Purge everything, recursively';
            expect(exampleText).toContain(paragraph1);
            expect(exampleText).toContain(paragraph2);
            expect(exampleText).toContain(paragraph3);
          });

        it('should "Purge Image Engine Secondary Cache" checkbox is exists and disabled',
          function () {
            var ChBoxPurgeImageEngineSecondaryCache  = Portal.purgeCacheBasicPage
              .getPurgeImageEngineSecondaryCacheChBox();
            expect(ChBoxPurgeImageEngineSecondaryCache.isPresent()).toBe(true);
            expect(ChBoxPurgeImageEngineSecondaryCache.isEnabled()).toBe(false);
          });

        switch (user.role) {

          case 'RO User':
            it('should "Purge" button is disabled',
              function () {
                var btnPurge = Portal.purgeCacheBasicPage.getPurgeBtn();
                expect(btnPurge.getAttribute('class')).toMatch('btn-disabled');
              });
            it('should "Purge All Objects" button is disabled',
              function () {
                var btnPurgeAllObjects = Portal.purgeCacheBasicPage.getPurgeAllObjectsBtn();
                expect(btnPurgeAllObjects.getAttribute('class')).toMatch('btn-disabled');
              });
            break;

          default:
            it('should "Purge" button is not disabled',
              function () {
                var btnPurge = Portal.purgeCacheBasicPage.getPurgeBtn();
                expect(btnPurge.getAttribute('class')).not.toMatch('btn-disabled');
              });
            it('should "Purge All Objects" button is not disabled',
              function () {
                var btnPurgeAllObjects = Portal.purgeCacheBasicPage.getPurgeAllObjectsBtn();
                expect(btnPurgeAllObjects.getAttribute('class')).not.toMatch('btn-disabled');
              });
            break;
        }
      });
    });
  });
});
