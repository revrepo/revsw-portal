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
var Constants = require('./../../../page_objects/constants');
var DataProvider = require('./../../../common/providers/data');

describe('Functional', function() {
  describe('Usage Report/Domains', function() {

    var user = config.get('portal.users.admin');
    var USAGE_REPORT = Constants.sideBar.billing.USAGE_REPORT;

    var testDomain = 'www.google-test.com';
    var testDomains = config.get('portal.usageReport.testDomains');
    var testDomainsNum = testDomains.length;
    var denom = parseInt(config.get('portal.usageReport.hits_denominator'));

    beforeAll(function() {
      Portal.signIn(user);
      Portal.helpers.nav.goToUsageReport();
    });

    afterAll(function() {
      Portal.signOut();
    });


    it('should get some Usage Report page', function() {
      Portal.billing.usageReportPage.setCompanyName('API QA Account');
      Portal.billing.usageReportPage.clickUpdateReport();
      Portal.billing.usageReportDomainsPage.getDomainsList().then(function(list) {
        expect(list.length > 0).toBe(true);
      });
    });

    it('should get title "Domains Usage" from Usage Report page', function() {
      var title = Portal.billing.usageReportDomainsPage.getTitle();
      expect(title).toEqual('Domains Usage');
    });

    describe('Domains data ', function() {
      //  cached
      var rows, tds, row1, totalHits;

      beforeAll(function(done) {
        var reportData = DataProvider.generateUsageReportData(user);
        Portal.billing.usageReportPage.updateReport(reportData);
        rows = testDomains.map(function(domain) {
          var r = Portal.billing.usageReportDomainsPage.getDomainRows(domain);
          var tds = r.get(0).all(by.css('td'));
          return {
            domain: domain,
            rows: r,
            tds: tds
          };
        });
        done();
      });

      it('should contain data for each testing domain', function() {
        expect(rows.length).toEqual(testDomains.length);
      });

      it('should contain equals reporting data properties(columns)', function() {
        var colCount = 7;
        testDomains.forEach(function(domain) {
          var r = Portal.billing.usageReportDomainsPage.getDomainRows(domain);
          var tds = r.get(0).all(by.css('td'));
          expect(tds.count()).toEqual(colCount);
        });
      });

      it('should contain correct total hits num', function() {
        rows.forEach(function(r) {
          r.tds.get(2).getText()
            .then(function(hits) {
              r.hits = parseInt(hits.replace(/'/g, ''));
              expect(r.hits).not.toEqual(0);
              // TODO : проверить правило возврата на UI чисел заканчивающихся на 000
              expect(r.hits % denom).toEqual(0);
            });
        });
      });

      it('should contain correct sent traffic volume', function() {

        var unit = parseInt(config.get('portal.usageReport.sent_unit'));
        rows.forEach(function(r) {
          r.tds.get(3).getText()
            .then(function(sent) {
              sent = parseFloat(sent.slice(0, -3).replace(/'/g, ''));
              r.sent = Math.round(r.hits * unit / 1024 / 1024 / 1024 * 1000) / 1000;
              expect(r.sent).toEqual(sent);
            });
        });

      });

      it('should contain correct received traffic volume', function() {

        var unit = parseInt(config.get('portal.usageReport.received_unit'));
        rows.forEach(function(r) {
          r.tds.get(4).getText()
            .then(function(received) {
              received = parseFloat(received.slice(0, -3).replace(/'/g, ''));
              r.received = Math.round(r.hits * unit / 1024 / 1024 / 1024 * 1000) / 1000;
              expect(r.received).toEqual(received);
            });
        });

      });

      it('should contain correct cache HIT/MISS hits number', function() {

        rows.forEach(function(r) {
          r.tds.get(0).element(by.css('a')).click()
            .then(function() {
              r.rows.get(1).element(by.id('cache_miss')).getText()
                .then(function(hits) {
                  hits = parseInt(hits.replace(/'/g, ''));
                  expect(hits).toEqual(r.hits / 2);
                });
              r.rows.get(1).element(by.id('cache_hit')).getText()
                .then(function(hits) {
                  hits = parseInt(hits.replace(/'/g, ''));
                  expect(hits).toEqual(r.hits / 2);
                });
            });
        });

      });

      it('should contain correct HTTP/HTTPS hits number', function() {

        rows.forEach(function(r) {
          //  must be clicked in the previous test:
          // r.tds.get(0).element(by.css('a')).click()
          //   .then( function() { .........
          r.rows.get(1).element(by.id('port_80')).getText()
            .then(function(hits) {
              hits = parseInt(hits.replace(/'/g, ''));
              expect(hits).toEqual(r.hits / 2);
            });
          r.rows.get(1).element(by.id('port_443')).getText()
            .then(function(hits) {
              hits = parseInt(hits.replace(/'/g, ''));
              expect(hits).toEqual(r.hits / 2);
            });
        });

      });
    });
  });
});
