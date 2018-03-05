/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2018] Rev Software, Inc.
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
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');
var API = require('./../../../../common/api').API;

describe('Functional', function () {
  var user = config.get('portal.users.admin');
  describe('Usage Report Domains', function () {
    describe('With user: ' + user.role, function () {
      var myDomain = DataProvider.generateDomain('my-domain');
      /*jshint camelcase: false */
      myDomain.enable_enhanced_analytics = false;
      var domainCount = 0;
      var domainValues;
      beforeAll(function (done) {
        // get the amount of domains we have
        API.helpers.authenticate(user).then(function () {
          API.resources.domainConfigs
            .getAll()
            .expect(200)
            .then(function (res) {
              domainCount = res.body.length;
              Portal.signIn(user);
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal.billing.usageReportPage.getAllDomainsValues().then(function (res) {
                  // get the domain values from usage report page
                  domainValues = res;
                  done();
                });
              });
            })
            .catch(done);
        });
      });

      afterAll(function () {
        Portal.signOut();
      });

      it('should display correct amount of active domains', function (done) {
        Portal.usageReportHelpers.generateReport({accountId:user.account.id}).then(function () {
          Portal.helpers.nav.goToUsageReport().then(function () {
            Portal
              .usageReportHelpers
              .expectValue(domainCount, Constants
                .USAGE_REPORT_IDS
                .ACTIVE_DOMAINS,
                user.account.id)
              .then(function () {
                expect(true).toBeTruthy();
                done();
              })
              .catch(function (err) {
                throw new Error(err);
              });
          });
        });
      });

      it('should display correct amount of active ' +
        ' domains after creating a new domain', function (done) {
          Portal.helpers.nav.goToDomains();
          Portal.domains.listPage.clickAddNewDomain();
          Portal.domains.addPage.createDomain(myDomain);
          Portal.alerts.waitToDisplay().then(function () {
            Portal.usageReportHelpers.generateReport({accountId:user.account.id}).then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal
                  .usageReportHelpers
                  .expectValue(domainCount + 1, Constants
                    .USAGE_REPORT_IDS
                    .ACTIVE_DOMAINS,
                    user.account.id)
                  .then(function () {
                    expect(true).toBeTruthy();
                    done();
                  })
                  .catch(function (err) {
                    throw new Error(err);
                  });
              });
            });
          });
        });

      it('should display correct amount of SSL Enabled ' +
        ' domains after creating a domain', function (done) {
          Portal.usageReportHelpers.generateReport({accountId:user.account.id}).then(function () {
            Portal.helpers.nav.goToUsageReport().then(function () {
              Portal
                .usageReportHelpers
                .expectValue(parseInt(domainValues.sslEnabled) + 1, Constants
                  .USAGE_REPORT_IDS
                  .SSL_ENABLED_DOMAINS,
                  user.account.id)
                .then(function () {
                  expect(true).toBeTruthy();
                  done();
                })
                .catch(function (err) {
                  throw new Error(err);
                });
            });
          });
        });

      it('should display correct amount of Custom VCL Rules ' +
        ' domains after updating a domain', function (done) {
          Portal.helpers.nav.goToDomains();
          Portal.domains.listPage.searchAndClickEdit(myDomain.name).then(function () {
            Portal.domains.editPage.enableVCL();
            Portal.domains.editPage.clickUpdateDomain();
            Portal.dialog.clickOk();
            Portal.alerts.waitToDisplay().then(function () {
              Portal.usageReportHelpers.generateReport({accountId:user.account.id})
                .then(function () {
                  Portal.helpers.nav.goToUsageReport().then(function () {
                    Portal
                      .usageReportHelpers
                      .expectValue(parseInt(domainValues.customVCLRules) + 1, Constants
                        .USAGE_REPORT_IDS
                        .CUSTOM_VCL_RULES,
                        user.account.id)
                      .then(function () {
                        expect(true).toBeTruthy();
                        done();
                      })
                      .catch(function (err) {
                        throw new Error(err);
                      });
                  });
                });
            });
          });
        });

      it('should display correct amount of Enhanced Analytics Enabled ' +
        ' domains after updating a domain', function (done) {
          Portal.helpers.nav.goToDomains();
          Portal.domains.listPage.searchAndClickEdit(myDomain.name).then(function () {
            Portal.domains.editPage.enableEnhancedAnalytics();
            Portal.domains.editPage.clickUpdateDomain();
            Portal.dialog.clickOk();
            Portal.alerts.waitToDisplay().then(function () {
              Portal.usageReportHelpers.generateReport({accountId:user.account.id})
                .then(function () {
                  Portal.helpers.nav.goToUsageReport().then(function () {
                    Portal
                      .usageReportHelpers
                      .expectValue(parseInt(domainValues.analyticsEnhanced) + 1, Constants
                        .USAGE_REPORT_IDS
                        .ANALYTICS_ENHANCED_DOMAINS,
                        user.account.id)
                      .then(function () {
                        expect(true).toBeTruthy();
                        done();
                      })
                      .catch(function (err) {
                        throw new Error(err);
                      });
                  });
                });
            });
          });
        });

      it('should display correct amount of WAF Enabled ' +
        ' domains after updating a domain', function (done) {
          Portal.helpers.nav.goToDomains();
          Portal.domains.listPage.searchAndClickEdit(myDomain.name).then(function () {
            Portal.domains.editPage.enableWAF();
            Portal.domains.editPage.clickUpdateDomain();
            Portal.dialog.clickOk();
            Portal.alerts.waitToDisplay().then(function () {
              Portal.usageReportHelpers.generateReport({accountId:user.account.id})
                .then(function () {
                  Portal.helpers.nav.goToUsageReport().then(function () {
                    Portal
                      .usageReportHelpers
                      .expectValue(parseInt(domainValues.wafEnabled) + 1, Constants
                        .USAGE_REPORT_IDS
                        .WAF_ENABLED_DOMAINS,
                        user.account.id)
                      .then(function () {
                        expect(true).toBeTruthy();
                        done();
                      })
                      .catch(function (err) {
                        throw new Error(err);
                      });
                  });
                });
            });
          });
        });

      it('should display correct amount of Lua Feature Enabled ' +
        ' domains after updating a domain', function (done) {
          Portal.helpers.nav.goToDomains();
          Portal.domains.listPage.searchAndClickEdit(myDomain.name).then(function () {
            Portal.domains.editPage.enableLua();
            Portal.domains.editPage.clickUpdateDomain();
            Portal.dialog.clickOk();
            Portal.alerts.waitToDisplay().then(function () {
              Portal.usageReportHelpers.generateReport({accountId:user.account.id})
                .then(function () {
                  Portal.helpers.nav.goToUsageReport().then(function () {
                    Portal
                      .usageReportHelpers
                      .expectValue(parseInt(domainValues.luaEnabled) + 1, Constants
                        .USAGE_REPORT_IDS
                        .LUA_ENABLED_DOMAINS,
                        user.account.id)
                      .then(function () {
                        expect(true).toBeTruthy();
                        done();
                      })
                      .catch(function (err) {
                        throw new Error(err);
                      });
                  });
                });
            });
          });
        });

      it('should display correct amount of active ' +
        ' domains after deleting a domain', function (done) {
          Portal.helpers.nav.goToDomains();
          Portal.domains.listPage.searchAndClickDelete(myDomain.name);
          Portal.dialog.clickOk();
          Portal.alerts.waitToDisplay().then(function () {
            Portal.usageReportHelpers.generateReport({accountId:user.account.id})
              .then(function () {
                Portal.helpers.nav.goToUsageReport().then(function () {
                  Portal
                    .usageReportHelpers
                    .expectValue(domainCount, Constants
                      .USAGE_REPORT_IDS
                      .ACTIVE_DOMAINS,
                      user.account.id)
                    .then(function () {
                      expect(true).toBeTruthy();
                      done();
                    })
                    .catch(function (err) {
                      throw new Error(err);
                    });
                });
              });
          });
        });

      it('should display correct amount of deleted ' +
        ' domains after deleting a domain', function (done) {
          Portal.usageReportHelpers.generateReport({accountId:user.account.id})
            .then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal
                  .usageReportHelpers
                  .expectValue(parseInt(domainValues.deleted) + 1, Constants
                    .USAGE_REPORT_IDS
                    .DELETED_DOMAINS,
                    user.account.id)
                  .then(function () {
                    expect(true).toBeTruthy();
                    done();
                  })
                  .catch(function (err) {
                    throw new Error(err);
                  });
              });
            });
        });
    });
  });
});
