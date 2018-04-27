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

// # Portal App object
var Promise = require('bluebird');

var BROWSER_WAIT_TIMEOUT = 30000; // 30 secs

// Requiring config and constants
var Constants = require('./constants');
var Session = require('./../common/session');
var Utils = require('./../common/helpers/utils');

// Requiring components
var Header = require('./common/header');
var SideBar = require('./common/sidebar');
var SideMenu = require('./common/sidebar/sidebar');
var Alerts = require('./common/alerts');
var Dialog = require('./common/dialog');
var GlobalSearcher = require('./common/globalSearcher');

// Requiring page objects
var LoginPage = require('./loginPage');
var GoodByePage = require('./goodByePage');

var ListUsersPage = require('./user/listPage');
var EditUserPage = require('./user/editPage');
var AddUserPage = require('./user/addPage');

var SecuritySettingsPage = require('./user/securitySettingsPage');
var UpdatePasswordPage = require('./user/updatePasswordPage');

var Dashboards = require('./dashboards');
var AddDomainPage = require('./domain/addPage');
var ConfigureDomainPage = require('./domain/configurePage');
var DomainStatsPage = require('./domain/statsPage');
var DomainVersionsPage = require('./domain/versionsPage');
var EditDomainPage = require('./domain/editPage');
var ListDomainsPage = require('./domain/listPage');
var PurgeCacheBasicPage = require('./domain/purgeCacheBasicPage');
var PurgeCacheAdvancedPage = require('./domain/purgeCacheAdvancedPage');
var ProxyTrafficPage = require('./analytics/proxyTrafficPage');
var TopReportsPage = require('./analytics/topReportsPage');
var TopObjectsPage = require('./analytics/topObjectsPage');
var FBTReportsPage = require('./analytics/fbtReportsPage');
var TrafficHeatmapsPage = require('./analytics/trafficHeatmapsPage');
var RTTHeatmapsPage = require('./analytics/rttHeatmapsPage');
var HelpSupportPage = require('./helpSupport/helpSupportPage');
var HelpPage = require('./help/helpPage');
var Accounts = require('./admin/accounts');
var AccountResourcesPage = require('./accountresources');
var AdminSettingsPage = require('./admin/securitySettings');
var ApiKeysListPage = require('./admin/apiKeys');
var CDNIPBlocksPage = require('./cdnIPBlocks/cdnIPBlocksPage');
var ActivityLogPage = require('./admin/activityLog');
var MobileAppListPage = require('./mobileApp/listPage');
var MobileAppAddPage = require('./mobileApp/addPage');
var MobileAppEditPage = require('./mobileApp/editPage');
var MobileAppAdvancedEditPage = require('./mobileApp/advancedEditPage');
var MobileAnalyticsTrafficLevelsPage = require('./mobileAnalytics/trafficLevelsPage');
var MobileAnalyticsTopReportsPage = require('./mobileAnalytics/topReportsPage');
var MobileAnalyticsTopObjectsPage = require('./mobileAnalytics/topObjectsPage');
var MobileAnalyticsTrafficDistributionsPage = require('./mobileAnalytics/trafficDistributionsPage');
var UsageReportPage = require('./billing/usageReportPage');
var UsageReportDomainsPage = require('./billing/usageReportDomainsPage');
var AccountProfilePage = require('./account/profile/page');
var BillingPlanPage = require('./account/billingPlanPage');
var AccountBillingStatementsPage = require('./account/billingStatements/page');

var SSLCertListPage = require('./sslCerts/listPage');
var SSLCertAddPage = require('./sslCerts/addPage');
var SSLCertEditPage = require('./sslCerts/editPage');

var SSLNamesListPage = require('./sslNames/listPage');
var SSLNamesAddPage = require('./sslNames/addPage');

var WAFRulePage = require('./wafRule/listPage');
var WAFRuleAddPage = require('./wafRule/addPage');
var WAFRuleEditPage = require('./wafRule/editPage');

var WAFAnalitycs = require('./wafAnalytics/wafAnalyticsPage');
var WAFEventsList = require('./wafEvents/listPage');
var WAFHeatmaps = require('./wafHeatmaps/wafHeatmapPage');

var StagingEnvPage = require('./stagingEnv/stagingEnvPage');

var LogShippingListPage = require('./logShipping/listPage');
var LogShippingAddPage = require('./logShipping/addPage');
var LogShippingEditPage = require('./logShipping/editPage');

var DNSAnalyticsPage = require('./dnsAnalytics/dnsAnalyticsPage');
var DNSZonesListPage = require('./dnsZones/listPage');
var DNSZonesAddPage = require('./dnsZones/addPage');
var DNSZonesEditPage = require('./dnsZones/editPage');

var ZoneRecordsListPage = require('./dnsZones/zoneRecords/listPage');
var ZoneRecordsAddPage = require('./dnsZones/zoneRecords/addPage');
var ZoneRecordsEditPage = require('./dnsZones/zoneRecords/editPage');

var PlansPage = require('./signUp/plansPage');
var SignUpPage = require('./signUp/signUpPage');

var ResetPasswordPage = require('./resetPassword/resetPasswordPage');

var MailinatorHelper = require('./../mailinator/helper');
var LocalStorageHelper = require('./../common/helpers/localStorage');
var DataProvider = require('./../common/providers/data');

var PortalHelpers = require('./../common/helpers/portal');

var BrowserTabsHelpers = require('./../common/helpers/browserTabs');

var PortalDataProviders = require('./../common/providers/data/portal');

var ImageOptimizationPage = require('./analytics/imageOptimizationPage');

var SubscriptionsPage = require('./azure/Subscriptions/listPage');
var ResourcesPerSubscriptionPage = require('./azure/ResourcesPerSubscription/listPage');
var ResourcesPage = require('./azure/Resources/listPage');
var Intro = require('./intro');
var ApiKeysHelpers = require('./../common/helpers/apiKeys.js');
var DomainsHelpers = require('./../common/helpers/domains.js');
var SSLCertsHelpers = require('./../common/helpers/sslCerts');
var UsageReportHelpers = require('./../common/helpers/usageReport.js');
var InvitationPage = require('./../page_objects/invitation/setPasswordPage');
var ListGroupsPage = require('./../page_objects/group/listPage');
var AddGroupsPage = require('./../page_objects/group/addPage');
var EditGroupsPage = require('./../page_objects/group/editPage');
// This `Portal` Page Object is the entry point to use all other Page Objects
// that abstract all components from the Portal App.
var Portal = {
  usageReportHelpers: UsageReportHelpers,
  apiKeysHelpers: ApiKeysHelpers,
  domainsHelpers: DomainsHelpers,
  sslCertHelpers: SSLCertsHelpers,
  constants: Constants,
  localStorage: LocalStorageHelper,
  session: Session,

  // Properties
  baseUrl: Utils.getBaseUrl(),
  baseUrlNuubit: Constants.baseUrlNuubit,

  // Common components that are used in more than one page in this Portal object
  header: Header,
  sideBar: SideBar,
  sideMenu: SideMenu,
  alerts: Alerts,
  dialog: Dialog,
  globalSearcher: GlobalSearcher,

  // Pages that compound this Portal app/site
  invitationPage: InvitationPage,
  loginPage: LoginPage,
  goodByePage: GoodByePage,
  userListPage: ListUsersPage,
  editUserPage: EditUserPage,
  addUserPage: AddUserPage,
  groups: {
    listPage: ListGroupsPage,
    addPage:  AddGroupsPage,
    editPage: EditGroupsPage
  },
  securitySettingsPage: SecuritySettingsPage,
  updatePasswordPage: UpdatePasswordPage,
  dashboards: Dashboards,
  domains: {
    addPage: AddDomainPage,
    configurePage: ConfigureDomainPage,
    editPage: EditDomainPage,
    listPage: ListDomainsPage,
    statsPage: DomainStatsPage,
    versionsPage: DomainVersionsPage
  },
  proxyTrafficPage: ProxyTrafficPage,
  imageOptimizationPage: ImageOptimizationPage,
  topReportsPage: TopReportsPage,
  topObjectsPage: TopObjectsPage,
  fbtReportsPage: FBTReportsPage,
  trafficHeatmapsPage: TrafficHeatmapsPage,
  rttHeatmapsPage: RTTHeatmapsPage,
  purgeCacheBasicPage: PurgeCacheBasicPage,
  purgeCacheAdvancedPage: PurgeCacheAdvancedPage,
  helpSupportPage: HelpSupportPage,
  helpPage: HelpPage,
  resetPasswordPage: ResetPasswordPage,
  mobileApps: {
    listPage: MobileAppListPage,
    addPage: MobileAppAddPage,
    editPage: MobileAppEditPage,
    advancedEditPage: MobileAppAdvancedEditPage
  },
  signUp: {
    plansPage: PlansPage,
    formPage: SignUpPage
  },
  admin: {
    accounts: Accounts,
    apiKeys: ApiKeysListPage,
    settingsPage: AdminSettingsPage,
    activityLog: ActivityLogPage
  },
  cdnIPBlocks: {
    page: CDNIPBlocksPage
  },
  accounts: {
    profilePage: AccountProfilePage,
    billingPlanPage: BillingPlanPage,
    billingStatements: AccountBillingStatementsPage
  },
  billing: {
    usageReportPage: UsageReportPage,
    usageReportDomainsPage: UsageReportDomainsPage
  },
  sslCerts: {
    listPage: SSLCertListPage,
    addPage: SSLCertAddPage,
    editPage: SSLCertEditPage
  },
  sslNames: {
    listPage: SSLNamesListPage,
    addPage: SSLNamesAddPage
  },
  wafRules: {
    listPage: WAFRulePage,
    addPage: WAFRuleAddPage,
    editPage: WAFRuleEditPage
  },

  wafAnalitycs: WAFAnalitycs,
  wafEvents: WAFEventsList,
  wafHeatmaps: WAFHeatmaps,

  logShipping: {
    listPage: LogShippingListPage,
    addPage: LogShippingAddPage,
    editPage: LogShippingEditPage
  },
  stagingEnv: {
    page: StagingEnvPage
  },
  dnsAnalyticsPage: DNSAnalyticsPage,
  dnsZones: {
    listPage: DNSZonesListPage,
    addPage: DNSZonesAddPage,
    editPage: DNSZonesEditPage
  },
  zoneRecords: {
    listPage: ZoneRecordsListPage,
    addPage: ZoneRecordsAddPage,
    editPage: ZoneRecordsEditPage
  },
  mobileAnalytics: {
    trafficLevelsPage: MobileAnalyticsTrafficLevelsPage,
    topReportsPage: MobileAnalyticsTopReportsPage,
    topObjectsPage: MobileAnalyticsTopObjectsPage,
    trafficDistributions: MobileAnalyticsTrafficDistributionsPage,
    ImageOptimizationPage: ImageOptimizationPage
  },
  azureMarketplace: {
    SubscriptionsPage: SubscriptionsPage,
    ResourcesPerSubscriptionPage: ResourcesPerSubscriptionPage,
    ResourcesPage: ResourcesPage
  },

  accountResourcesPage: AccountResourcesPage,

  helpers: PortalHelpers,
  browserTabs: BrowserTabsHelpers,

  dataProviders: PortalDataProviders,
  intro: Intro,
  // ## Authentication Helper methods

  /**
   * ### Portal.signIn()
   *
   * Signs in the specified user into the Portal app
   * @param {Object} user, object with the following schema
   *
   *     {
   *         email: String,
   *         password: String
   *     }
   *
   * @returns {Promise}
   */
  signIn: function (user, introSkip) {
    introSkip = introSkip === undefined ? true : false;
    var me = this;
    var promise = this.header
      .isPresent()
      .then(function (isPresent) {
        if (isPresent) {
          // Session is already open.
          // So, closing it and starting new session for user.
          me.signOut();
        }
        else {
          // There is not any session created yet.
          me.load();
        }
        return me.loginPage
          .signIn(user)
          .then(function () {
            me.session.setCurrentUser(user);
            if (introSkip) {
              // Check for intro
              var until = protractor.ExpectedConditions;
              // Wait up to 1 minute for login to finish
              browser.wait(until.presenceOf(Portal.header.getHeaderBar()), 60000);
              Portal.intro.getIntroContainer().isPresent().then(function (val) {
                if (val) {
                  Portal.intro.clickSkipBtn();
                  browser.sleep(2000);
                }
              });
            }
          });
      });
    return Promise.resolve(promise);
  },

  /**
   * ### Portal.signInNuubit()
   *
   * Signs in the specified user into the Portal Nuubit app
   * @param {Object} user, object with the following schema
   *
   *     {
   *         email: String,
   *         password: String
   *     }
   *
   * @returns {Promise}
   */
  signInNuubit: function (user) {
    var me = this;
    var promise = this.header
      .isPresent()
      .then(function (isPresent) {
        if (isPresent) {
          // Session is already open.
          // So, closing it and starting new session for user.
          me.signOut();
        }
        else {
          // There is not any session created yet.
          me.loadNuubit();
        }
        return me.loginPage
          .signIn(user)
          .then(function () {
            me.session.setCurrentUser(user);
          });
      });
    return Promise.resolve(promise);
  },

  /**
   * ### Portal.signOut()
   *
   * Sings the currently logged in user from the Portal app.
   *
   * @returns {Promise}
   */
  signOut: function () {
    this.closeUnexpectedModal();
    return this.header.clickLogout();
  },

  /**
   * ### Portal.closeUnexpectedModal()
   *
   * Closes unexpected modal windows that prevents to trigger click events to
   * logout user from the Portal App.
   *
   * @returns {Object} Promise if modal found, undefined otherwise
   */
  closeUnexpectedModal: function () {
    var me = this;
    return this.dialog
      .isDisplayed()
      .then(function (isPresent) {
        if (isPresent) {
          return me.dialog.getModalEl().sendKeys(protractor.Key.ESCAPE);
        }
      });
  },

  // ## URL navigation Helper methods

  /**
   * ### Portal.load()
   *
   * Loads the Base URL for Portal App under test.
   *
   * @returns {Promise}
   */
  load: function () {
    return browser.get(this.baseUrl);
  },

  /**
   * ### Portal.loadNuubit()
   *
   * Loads the Nuubit URL for Portal App under test.
   *
   * @returns {Promise}
   */
  loadNuubit: function () {
    return browser.get(this.baseUrlNuubit);
  },

  /**
   * ### Portal.goToCustomUrl()
   *
   * Loads the URL for Portal App under test (like manual user set)
   *
   * @param {String} appPathUrl app path url
   * @returns {Promise}
   */
  goToCustomUrl: function (appPathUrl) {
    return browser.get(this.baseUrl + appPathUrl);
  },
  // ## User Helper methods

  /**
   * ### Portal.createDomain()
   *
   * Helper method that executes all steps required to create a new Domain from
   * Portal app.
   *
   * @param {Object} newDomain, data applying the schema defined in
   * `DataProvider.generateDomain()`
   *
   * @returns {Object} Promise
   */
  createDomain: function (newDomain) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.helpers.nav.goToDomains();
      me.domains.listPage.clickAddNewDomain();
      me.domains.addPage.createDomain(newDomain);
      me.domains.addPage.clickBackToList();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.createDomainIfNotExist()
   *
   * Helper method that executes all steps required to create a new Domain from
   * Portal app. This method creates the domain only if it does not exist (it
   * validates the existence by doing a search by the domain name).
   *
   * @param {Object} domain, data applying the schema defined in
   * `DataProvider.generateDomain()`
   *
   * @returns {Object} Promise
   */
  createDomainIfNotExist: function (domain) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.helpers.nav.goToDomains();
      me.domains.listPage.searcher.setSearchCriteria(domain.name);
      me.domains.listPage.table
        .getRows()
        .count()
        .then(function (totalResults) {
          if (totalResults === 0) {
            me.domains.listPage.clickAddNewDomain();
            me.domains.addPage.createDomain(domain);
            me.domains.addPage.clickBackToList();
          }
          browser.getCurrentUrl().then(function (currentUrl) {
            if (initialUrl !== currentUrl) {
              browser.get(initialUrl);
            }
          });
        });
    });
  },

  /**
   * ### Portal.updateDomain()
   *
   * Helper method that executes all steps required to update an existing
   * domain for Portal app.
   *
   * @param {Object} domain, data applying the schema defined in
   * `DataProvider.generateDomain()`
   *
   * @returns {Object} Promise
   */
  updateDomain: function (domain) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.helpers.nav.goToDomains();
      me.domains.listPage.searchAndClickEdit(domain.name);
      delete domain.name;
      me.domains.editPage.updateDomain(domain);
      me.dialog.clickOk();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.createAccounts()
   *
   * Helper method that executes all steps required to create
   * new Accounts from Portal Admin.
   *
   * @param {String} accounts, accounts objects.
   *
   * @param {Object} accounts, data applying the schema defined in
   * `DataProvider.generateAccountProfileData()`
   *
   * @returns {Object} Promise
   */
  createAccounts: function (accounts) {
    var me = this;
    me.helpers.nav.goToAccounts();
    me.admin.accounts.listPage.clickAddNewCompany();
    return browser.getCurrentUrl().then(function (initialUrl) {
      accounts.forEach(function (account) {
        // me.header.goTo(platform);
        me.admin.accounts.addCompany.createCompany(account);
      });
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.createDashboard(arrayDashboards)
   *
   * Helper method that executes all steps required to create
   * new Dashboard from Portal Dashboards.
   *
   * @param {String} arrayDashboards, arrayDashboards objects.
   *
   * @param {Object} arrayDashboards, data applying the schema defined in
   * `DataProvider.generateDashboardData()`
   *
   * @returns {Object} Promise
   */
  createDashboard: function (arrayDashboards) {
    var me = this;
    me.helpers.nav.goToDashboards();
    return browser.getCurrentUrl().then(function (initialUrl) {
      arrayDashboards.forEach(function (dashboard) {
        me.helpers.nav.goToDashboards();
        me.dashboards.listPage.addNewDashboard(dashboard);
      });
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.signUpUser()
   *
   * Signs up a test (auto-generated) user
   *
   * @param {String} plan, to which the user is going to be subscribed.
   * Defaults to `Gold`
   *
   * @returns {Object} user signed up
   */
  signUpUser: function (plan) {
    var _plan = plan || 'Gold';
    var me = this;
    var user = DataProvider.generateUserToSignUp();
    me.load();
    me.loginPage.clickSignUp();
    me.signUp.plansPage
      .getPlanEl(_plan)
      .clickSubscribe();
    me.signUp.formPage.form.fill(user);
    return me.signUp.formPage.form
      .clickSignUp()
      .then(function () {
        return user;
      });
  },

  /**
   * ### Portal.signUpAndVerifyUser()
   *
   * Signs up and verifies a test (auto-generated) user
   *
   * @param {String} plan, to which the user is going to be subscribed.
   * Defaults to `Gold`
   *
   * @returns {Object} user signed up and verified
   */
  signUpAndVerifyUser: function (plan, introSkip) {
    introSkip = introSkip === undefined ? true : false;
    var me = this;
    return me
      .signUpUser(plan)
      .then(function (user) {
        return MailinatorHelper
          .getVerificationTokenUrl(user.email)
          .then(function (verificationUrl) {
            return browser
              .get(verificationUrl)
              .then(function () {
                return me.header
                  .waitToDisplay()
                  .then(function () {
                    // Check for intro
                    if (introSkip) {
                      var until = protractor.ExpectedConditions;
                      // Wait up to 1 minute for login to finish
                      browser.wait(until.presenceOf(Portal.header.getHeaderBar()), 60000);
                      return Portal.intro.getIntroContainer().isPresent()
                        .then(function (val) {
                          if (val) {
                            Portal.intro.clickSkipBtn();
                            browser.sleep(2000);
                          }
                        });
                    }
                  })
                  .then(function() {
                    return user;
                  });
              });
          });
      });
  },

  /**
   * ### Portal.applyResetURL()
   *
   * Gets the verification URL and navigates to it
   *
   * @param {String} user
   *
   * @returns {Object} user signed up and verified
   */
  applyResetURL: function (user) {
    return MailinatorHelper
      .getVerificationTokenUrl(user.email)
      .then(function (verificationUrl) {
        return browser
          .get(verificationUrl);
      });
  },

  /**
   * ### Portal.createApiKey(apiKey)
   *
   * Helper method that executes all steps required to create
   * new API Key in the Portal Dashboards.
   *
   * @param {String} apiKey, apiKey objects.
   *
   * @param {Object} apiKey, data applying the schema defined in
   * `DataProvider.generateApiKeyData()`
   *
   * @returns {Object} Promise
   */
  createApiKey: function (apiKey, isUserAdmin, account) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.helpers.nav.goToAPIKeys();
      me.admin.apiKeys.listPage.clickAddNewApiKey();

      me.admin.apiKeys.addPage.getModalEl().isPresent()
        .then(function (value) {
          if (isUserAdmin && account && value) {
            me.admin.apiKeys.addPage.createAccount(account);
          }
        });

      me.admin.apiKeys.listPage.searcher.clearSearchCriteria();
      me.admin.apiKeys.listPage.searchAndClickEdit('New API Key');

      Portal.admin.apiKeys.editPage.form.setName(apiKey.name);
      Portal.admin.apiKeys.editPage.form.clickUpdate();
      Portal.admin.apiKeys.editPage.clickBackToList();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  createSSLCert: function (sslCert) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.helpers.nav.goToSSLCertificates();
      Portal.sslCerts.listPage.clickAddNewSSLCert();
      Portal.sslCerts.addPage.form.fill(sslCert);
      Portal.sslCerts.addPage.clickCreateSSLCert();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.createSSLName(sslName)
   *
   * Helper method that executes all steps required to create
   * new SSL Name in the Portal
   *
   * @param {Object} sslName, data applying the schema defined in
   * `DataProvider.generateSSLNameData()`
   *
   * @returns {Object} Promise
   */
  createSSLName: function (sslName) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.helpers.nav.goToSSLNames();
      Portal.sslNames.listPage.clickAddNewSSLName();
      Portal.sslNames.addPage.createSSLName(sslName);
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.createLogShippingJob(logShippingJob)
   *
   * Helper method that executes all steps required to create
   * new Log Shipping Job in the Portal
   *
   * @param {Object} logShippingJob, data applying the schema defined in
   * `DataProvider.generateLogShippingJobData()`
   *
   * @returns {Object} Promise
   */
  createLogShippingJob: function (logShippingJob) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.helpers.nav.goToLogShipping();
      Portal.logShipping.listPage.clickAddNewLogShippingJob();
      Portal.logShipping.addPage.form.fill(logShippingJob);
      Portal.logShipping.addPage.clickCreateJobBtn();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.createDNSZone(zone)
   *
   * Helper method that executes all steps required to create
   * new DNS Zone in the Portal
   *
   * @param {Object} zone, data applying the schema defined in
   * `DataProvider.generateDNSZoneData()`
   *
   * @returns {Object} Promise
   */
  createDNSZone: function (zone) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.helpers.nav.goToDNSZones();
      Portal.dnsZones.listPage.clickAddNewDNSZone();
      Portal.dnsZones.addPage.form.fill(zone);
      Portal.dnsZones.addPage.clickCreateDNSZone();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.createDNSZoneRecord(record)
   *
   * Helper method that executes all steps required to create
   * new DNS Zone Record in the Portal
   *
   * * @param {Object} dnsZone, dns zone to which the record is connected
   *
   * @param {Object} record, data applying the schema defined in
   * `DataProvider.generateDNSZoneRecordData()`
   *
   * @returns {Object} Promise
   */
  createDNSZoneRecord: function (dnsZone, record) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.helpers.nav.goToDNSZones();
      Portal.dnsZones.listPage.searcher.clearSearchCriteria();
      Portal.dnsZones.listPage.searcher.setSearchCriteria(dnsZone.domain);
      Portal.dnsZones.listPage.table
        .getFirstRow()
        .clickManageRecords();

      Portal.zoneRecords.listPage.clickAddNewRecord();
      Portal.zoneRecords.addPage.form.fill(record);
      Portal.zoneRecords.addPage.clickAddNewRecord();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * Waits for specified number of browser windows/tabs are displayed/opened.
   * It times out if there are not the amount specified of windows.
   *
   * @param numOfWindows, expected number of windows/tabs (handles) to exist
   * @returns {Object} Promise
   */
  waitForNumberOfWindowsToEqual: function (numOfWindows) {
    return browser.wait(function () {
      return browser
        .getAllWindowHandles()
        .then(function (handles) {
          return handles.length === numOfWindows;
        });
    }, BROWSER_WAIT_TIMEOUT);
  },

  /**
   * ### Portal.openDNSZoneRecords()
   *
   * Executes all steps to navigate to `Records` page for specified `DNS Zone`
   *
   * @param {user} zone, DNS zone to manage
   * @returns {Promise}
   */
  openDNSZoneRecords: function (zone) {
    var me = this;
    return this.helpers.nav.goToDNSZones()
      .then(function () {
        me.dnsZones.listPage.searcher.setSearchCriteria(zone.domain);
        me.dnsZones.listPage.table
          .getFirstRow()
          .clickManageRecords();
      });
  },
};

module.exports = Portal;
