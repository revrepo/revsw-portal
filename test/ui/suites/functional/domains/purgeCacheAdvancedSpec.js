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

describe('Functional', function () {
  describe('Purge Cached Objects - Advanced', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = Constants.domain;

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToPurgeCache();
    });

    it('should have the "Purge" button disabled when there is empty JSON ' +
      'specified',
      function () {
        Portal.purgeCacheAdvancedPage.clickAdvancedMode();
        Portal.purgeCacheAdvancedPage.selectDomain(myDomain);
        var purgeBtn = Portal.purgeCacheAdvancedPage.getPurgeBtn();
        expect(purgeBtn.isEnabled()).toBeFalsy();
      });

    it('should purge an object in Code mode',
      function () {
        Portal.purgeCacheAdvancedPage.clickAdvancedMode();
        Portal.purgeCacheAdvancedPage.selectDomain(myDomain);
        Portal.purgeCacheAdvancedPage.clickUseThisExample(0);
        Portal.purgeCacheAdvancedPage.clickPurge();
        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'The purge request has been successfully queued';
        expect(alert.getText()).toEqual(expectedMsg);
      });

    it('should purge a default json data in Ace Editor in View mode',
      function () {
        Portal.purgeCacheAdvancedPage.clickAdvancedMode();
        Portal.purgeCacheAdvancedPage.selectDomain(myDomain);
        Portal.purgeCacheAdvancedPage.changeToView();
        Portal.purgeCacheAdvancedPage.clickPurge();
        expect(Portal.purgeCacheAdvancedPage.getPurgeBtn().isEnabled()).toBeFalsy();
      });

    it('should cancel in "Ace Editor" go to "List Domains" Page',
      function () {
        Portal.purgeCacheAdvancedPage.clickAdvancedMode();
        Portal.purgeCacheAdvancedPage.selectDomain(myDomain);
        Portal.purgeCacheAdvancedPage.clickCancel();

        var title = 'Domains List';
        expect(Portal.domains.listPage.getTitle()).toEqual(title);
      });

    // TODO: change test for domain with enabled ImageEngine - need to create new test domain
    xdescribe('domain with enabled ImageEngine configurations', function() {
      xit('should change value of "Purge Image Engine Secondary Cache" checkbox '+
        'after click to this checkbox',
        function () {
          Portal.purgeCacheAdvancedPage.setPurgeImageEngineSecondaryCache(true);
          Portal.purgeCacheAdvancedPage.clickPurgeImageEngineSecondaryCache();
          var ChBoxPurgeImageEngineSecondaryCache = Portal.purgeCacheAdvancedPage
            .getPurgeImageEngineSecondaryCacheChBox();
          expect(ChBoxPurgeImageEngineSecondaryCache.isSelected()).toBeFalsy();
          Portal.purgeCacheAdvancedPage.clickPurgeImageEngineSecondaryCache();
          expect(ChBoxPurgeImageEngineSecondaryCache.isSelected()).toBeTruthy();
        });
    });
  });
});
