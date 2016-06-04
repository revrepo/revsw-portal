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

// # Portal App object

// Requiring config and constants
var Constants = require('./constants');
var Utils = require('./../common/helpers/utils');

// Requiring components
var Header = require('./common/header');
var SideBar = require('./common/sidebar');
var Alerts = require('./common/alerts');
var Dialog = require('./common/dialog');

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
var AdminSettingsPage = require('./admin/securitySettings');
var ApiKeysListPage = require('./admin/apiKeys');
var ActivityLogPage = require('./admin/activityLog');
var ListPage = require('./mobileApp/listPage');
var AddPage = require('./mobileApp/addPage');
var EditPage = require('./mobileApp/editPage');
var AdvancedEditPage = require('./mobileApp/advancedEditPage');
var UsageReportPage = require('./billing/usageReportPage');
var UsageReportDomainsPage = require('./billing/usageReportDomainsPage');
var AccountProfilePage = require('./account/profile/page');
var BillingPlanPage = require('./account/billingPlanPage');

var PlansPage = require('./signUp/plansPage');
var SignUpPage = require('./signUp/signUpPage');

var MailinatorHelper = require('./../mailinator/helper');

var DataProvider = require('./../common/providers/data');

// This `Portal` Page Object is the entry point to use all other Page Objects
// that abstract all components from the Portal App.
var Portal = {

  // Properties
  baseUrl: Utils.getBaseUrl(),

  // Common components that are used in more than one page in this Portal object
  header: Header,
  sideBar: SideBar,
  alerts: Alerts,
  dialog: Dialog,

  // Pages that compound this Portal app/site
  loginPage: LoginPage,
  goodByePage: GoodByePage,
  userListPage: ListUsersPage,
  editUserPage: EditUserPage,
  addUserPage: AddUserPage,
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
  topReportsPage: TopReportsPage,
  topObjectsPage: TopObjectsPage,
  fbtReportsPage: FBTReportsPage,
  trafficHeatmapsPage: TrafficHeatmapsPage,
  rttHeatmapsPage: RTTHeatmapsPage,
  purgeCacheBasicPage: PurgeCacheBasicPage,
  purgeCacheAdvancedPage: PurgeCacheAdvancedPage,
  helpSupportPage: HelpSupportPage,
  helpPage: HelpPage,
  mobileApps: {
    listPage: ListPage,
    addPage: AddPage,
    editPage: EditPage,
    advancedEditPage: AdvancedEditPage
  },
  signUp: {
    plansPage: PlansPage,
    formPage: SignUpPage,
  },
  admin: {
    accounts: Accounts,
    apiKeys: ApiKeysListPage,
    settingsPage: AdminSettingsPage,
    activityLog: ActivityLogPage,
  },
  accounts: {
    profilePage: AccountProfilePage,
    billingPlanPage: BillingPlanPage
  },
  billing: {
    usageReportPage: UsageReportPage,
    usageReportDomainsPage: UsageReportDomainsPage
  },

  // ## Authentication Helper methods

  /**
   * ### Portal.signIn()
   *
   * Signs in the specified user into the Portal app
   * @param {user} user, object with the following schema
   *
   *     {
   *         email: String,
   *         password: String
   *     }
   *
   * @returns {Promise}
   */
  signIn: function (user) {
    this.load();
    return this.loginPage.signIn(user);
  },

  /**
   * ### Portal.signOut()
   *
   * Sings the currently logged in user from the Portal app.
   *
   * @returns {Promise}
   */
  signOut: function () {
    return this.header.clickLogout();
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
   * ### Portal.getPage()
   *
   * Loads specified URL or hash fragment in the active browser window
   *
   * @param {String} location, URL or hash fragment to load
   *
   * @returns {Promise}
   */
  getPage: function (location) {
    return browser.getCurrentUrl().then(function (currentUrl) {
      var hashFragmentRegExp = new RegExp('^.*' + location + '$');
      if (hashFragmentRegExp.test(currentUrl)) {
        return;
      }
      if (location.substring(0, 4) === 'http') {
        return browser.get(location);
      }
      return browser.get(Utils.getBaseUrl() + location);
    });
  },

  getDomainsPage: function () {
    return this.getPage(Constants.hashFragments.domains.list);
  },

  /**
   * ### Portal.getDashboardsPage()
   *
   * Loads the hash fragment for the Dashboards page.
   *
   * @returns {Promise}
   */
  getDashboardsPage: function () {
    return this.getPage(Constants.hashFragments.dashboard);
  },

  /**
   * ### Portal.getAdminPage()
   *
   * Loads the hash fragment for the Admin page.
   *
   * @returns {Promise}
   */
  getAdminPage: function () {
    return this.getPage(Constants.hashFragments.admin.users);
  },

  /**
   * ### Portal.getApiKeysPage()
   *
   * Loads the hash fragment for the API Keys page.
   *
   * @returns {Promise}
   */
  getApiKeysPage: function () {
    return this.getPage(Constants.hashFragments.admin.apiKeys);
  },

  /**
   * ### Portal.getUsersPage()
   *
   * Loads the hash fragment for the User List page
   *
   * @returns {Promise}
   */
  getUsersPage: function () {
    return this.getPage(Constants.hashFragments.users);
  },

  /**
   * ### Portal.getUpdatePasswordPage()
   *
   * Loads the hash fragment for the Update Password page
   *
   * @returns {Promise}
   */
  getUpdatePasswordPage: function () {
    return this.getPage(Constants.hashFragments.profile);
  },

  /**
   * ### Portal.getMobileApps()
   *
   * Loads the hash fragment for the Mobile Apps page.
   *
   * @param {String} appName, name of app like ios, android and wm.
   *
   * @returns {Promise}
   */
  getMobileApps: function (appName) {
    return this.getPage(Constants.hashFragments.mobileApps + appName);
  },

  // ## Portal APP navigation Helper methods

  /**
   * ### Portal.goToAccountSettings()
   *
   * Navigation helper method that executes all steps to navigate to `Account
   * Settings` section.
   *
   * @returns {Promise}
   */
  goToAccountSettings: function () {
    return Portal.header.goTo(Constants.header.appMenu.ACCOUNT_SETTINGS);
  },

  /**
   * ### Portal.goToUsers()
   *
   * Navigation helper method that executes all steps to navigate to `Users
   * List` page
   *
   * @returns {Promise}
   */
  goToUsers: function () {
    this.goToAccountSettings();
    return Portal.sideBar.goTo(Constants.sideBar.menu.USERS);
  },

  /**
   * ### Portal.goToUsersThroughClassNameLocator()
   *
   * Navigates to Users Page avoiding direct link browsing
   *
   * @returns {Promise}
   */
  goToUsersThroughClassNameLocator: function () {
    return this
      .sideBar.gotoThroughClassNameLocator(Constants.header.appMenu.ACCOUNT_SETTINGS,
        Constants.sideBar.menu.USERS);
  },

  /**
   * ### Portal.goToMobileApps()
   *
   * Navigation helper method that executes all steps to navigate to `Mobile
   * Apps` page.
   *
   * @returns {Promise}
   */
  goToMobileApps: function () {
    return Portal.sideBar.goTo(Constants.sideBar.mobileApps.MOBILE_APPS);
  },

  /**
   * ### Portal.goToBilling()
   *
   * Navigation helper method that executes all steps to navigate to `Billing`
   * page.
   *
   * @returns {Promise}
   */
  goToBilling: function () {
    return Portal.sideBar.goTo(Constants.sideBar.billing.BILLING);
  },

  goToAccountProfile: function () {
    this.goToBilling();
    return Portal.sideBar.goTo(Constants.sideBar.billing.ACCOUNT_PROFILE);
  },

  goToChangeBillingPlan: function () {
    this.goToBilling();
    return Portal.sideBar.goTo(Constants.sideBar.billing.CHANGE_BILLING_PLAN);
  },

  /**
   * ### Portal.goToSecuritySettings()
   *
   * Navigation helper method that executes all steps to navigate to `Security
   * Settings` page
   *
   * @returns {Promise}
   */
  goToSecuritySettings: function () {
    this.goToAccountSettings();
    return Portal.sideBar.goTo(Constants.sideBar.menu.SECURITY_SETTINGS);
  },

  /**
   * ### Portal.goToUpdatePassword()
   *
   * Navigation helper method that executes all steps to navigate to `Update
   * Password` page
   *
   * @returns {Promise}
   */
  goToUpdatePassword: function () {
    this.goToAccountSettings();
    return Portal.sideBar.goTo(Constants.sideBar.menu.UPDATE_PASSWORD);
  },

  // ## User Helper methods

  /**
   * ### Portal.createUser()
   *
   * Helper method that executes all steps required to create a new User from
   * Portal app.
   *
   * @param {user} newUser, data applying the schema defined in
   * `DataProvider.generateUser()`
   *
   * @returns {Object} Promise
   */
  createUser: function (newUser) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.getUsersPage();
      me.userListPage.clickAddNewUser();
      me.addUserPage.createUser(newUser);
      me.addUserPage.clickBackToList();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.createUserThroughClassNameLocators()
   *
   * Helper method that navigates to Users page avoiding direct link browsing
   * and executes all steps required to create a new User from
   * Portal app.
   *
   * @param {user} newUser, data applying the schema defined in
   * `DataProvider.generateUser()`
   *
   * @returns {Object} Promise
   */
  createUserThroughClassNameLocators: function (newUser) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.goToUsersThroughClassNameLocator();
      me.userListPage.clickAddNewUserThroughClassName();
      me.addUserPage.createUser(newUser);
      me.addUserPage.clickBackToList();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.createUserIfNotExist()
   *
   * Helper method that executes all steps required to create a new User from
   * Portal app. This method creates the user only if it does not exist (it
   * validates the existence by doing a search by the user email).
   *
   * @param {Object} user, data applying the schema defined in
   * `DataProvider.generateUser()`
   *
   * @returns {Object} Promise
   */
  createUserIfNotExist: function (user) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.getUsersPage();
      me.userListPage.searcher.setSearchCriteria(user.email);
      me.userListPage.table
        .getRows()
        .count()
        .then(function (totalResults) {
          if (totalResults === 0) {
            me.userListPage.clickAddNewUser();
            me.addUserPage.createUser(user);
            me.addUserPage.clickBackToList();
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
   * ### Portal.deleteUser()
   *
   * Helper method that executes all steps required to delete a User from
   * Portal app.
   *
   * @param {Object} user, data applying the schema defined in
   * `DataProvider.generateUser()`
   *
   * @returns {Object} Promise
   */
  deleteUser: function (user) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.getUsersPage();
      me.userListPage.searcher.clearSearchCriteria();
      me.userListPage.searcher.setSearchCriteria(user.email);
      me.userListPage.table
        .getFirstRow()
        .clickDelete();
      me.dialog.clickOk();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.deleteUserThroughClassNameLocators()
   *
   * Helper method that executes all steps required to delete a User from
   * Portal app avoiding direct link browsing.
   *
   * @param {Object} user, data applying the schema defined in
   * `DataProvider.generateUser()`
   *
   * @returns {Object} Promise
   */
  deleteUserThroughClassNameLocators: function (user) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.goToUsersThroughClassNameLocator();
      me.userListPage.searcher.clearSearchCriteria();
      me.userListPage.searcher.setSearchCriteria(user.email);
      me.userListPage.table
        .getFirstRow()
        .clickDelete();
      me.dialog.clickOk();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

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
      me.getDomainsPage();
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
      me.getDomainsPage();
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
      me.getDomainsPage();
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
   * ### Portal.deleteDomain()
   *
   * Helper method that executes all steps required to delete a Domain from
   * Portal app.
   *
   * @param {Object} domain, data applying the schema defined in
   * `DataProvider.generateDomain()`
   *
   * @returns {Object} Promise
   */
  deleteDomain: function (domain) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.getDomainsPage();
      me.domains.listPage.searcher.clearSearchCriteria();
      me.domains.listPage.searcher.setSearchCriteria(domain.name);
      me.domains.listPage.table
        .getFirstRow()
        .clickDelete();
      me.dialog.clickOk();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.createMobileApps()
   *
   * Helper method that executes all steps required to create
   * new Mobile Apps from Portal app.
   *
   * @param {String} platform, platform name of Mobile App.
   *
   * @param {Object} apps, data applying the schema defined in
   * `DataProvider.generateMobileApps()`
   *
   * @returns {Object} Promise
   */
  createMobileApps: function (platform, apps) {
    var me = this;
    me.getMobileApps(platform.toLowerCase());
    return browser.getCurrentUrl().then(function (initialUrl) {
      apps.forEach(function (app) {
        me.header.goTo(platform);
        me.mobileApps.listPage.addNew(app);
      });
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.deleteMobileApps()
   *
   * Helper method that executes all steps required to delete
   * an existing Mobile Apps from Portal app.
   *
   * @param {Object} apps, data applying the schema defined in
   * `DataProvider.generateMobileApps()`
   *
   * @returns {Object} Promise
   */
  deleteMobileApps: function (apps) {
    var me = this;
    browser.getCurrentUrl().then(function (initialUrl) {
      apps.forEach(function (app) {
        me.getMobileApps(app.platform.toLowerCase());
        me.header.goTo(app.platform);
        me.mobileApps.listPage.searchAndDelete(app);
        me.dialog.clickOk();
        browser.sleep(3000);
      });
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.createMobileAppIfNotExist()
   *
   * Helper method that executes all steps required to create a new App from
   * Portal app. This method creates the Mobile App only if it does not exist
   * (it validates the existence by doing a search by the domain name).
   *
   * @param {Object} app, data applying the schema defined in
   * `DataProvider.generateMobileApp()`
   *
   * @returns {Object} Promise
   */
  createMobileAppIfNotExist: function (app) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.goToMobileApps();
      me.header.goTo(app.platform);
      me.mobileApps.listPage.setSearch(app.name);
      me.mobileApps.listPage.table
        .countTotalRows()
        .then(function (totalResults) {
          if (totalResults === 0) {
            me.mobileApps.listPage.addNew(app);
            me.mobileApps.addPage.clickBackToList();
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
    me.getAdminPage();
    me.header.goTo(Constants.sideBar.admin.ACCOUNTS);
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
   * ### Portal.deleteAccounts()
   *
   * Helper method that executes all steps required to delete
   * new Accounts from Portal Admin.
   *
   * @param {String} accounts, accounts objects.
   *
   * @param {Object} accounts, data applying the schema defined in
   * `DataProvider.generateAccountProfileData()`
   *
   * @returns {Object} Promise
   */
  deleteAccounts: function (accounts) {
    var me = this;
    me.getAdminPage();
    return browser.getCurrentUrl().then(function (initialUrl) {
      accounts.forEach(function (account) {
        me.header.goTo(Constants.sideBar.admin.ACCOUNTS);
        me.admin.accounts.listPage.searchAndClickDelete(account.companyName);
        Portal.dialog.clickOk();
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
    me.getDashboardsPage();
    return browser.getCurrentUrl().then(function (initialUrl) {
      arrayDashboards.forEach(function (dashboard) {
        me.getDashboardsPage();
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
   * ### Portal.deleteDashboard(arrayDashboards)
   *
   * Helper method that executes all steps required to delete an existing
   * Dashboard from Portal Dashboards.
   *
   * @param {String} arrayDashboards, arrayDashboards objects.
   *
   * @param {Object} arrayDashboards, data applying the schema defined in
   * `DataProvider.generateDashboardData()`
   *
   * @returns {Object} Promise
   */
  deleteDashboard: function (arrayDashboards) {
    var me = this;
    me.getDashboardsPage();
    return browser.getCurrentUrl().then(function (initialUrl) {
      arrayDashboards.forEach(function (dashboard) {
        me.getDashboardsPage();
        me.dashboards.listPage.deleteDashboard(dashboard);
        me.dashboards.dialogPage.clickDelete();
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
  signUpAndVerifyUser: function (plan) {
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
                    return user;
                  });
              });
          });
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
      me.getApiKeysPage();
      me.admin.apiKeys.listPage.clickAddNewApiKey();

      if (isUserAdmin && account) {
        me.admin.apiKeys.addPage.createAccount(account);
      }

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

  /**
   * ### Portal.deleteAPIKey()
   *
   * Helper method that executes all steps required to delete an existing
   * Dashboard from Portal Dashboards.
   *
   * @param {String} apiKey, apiKey objects.
   *
   * @param {Object} apiKey, data applying the schema defined in
   * `DataProvider.generateApiKeyData()`
   *
   * @returns {Object} Promise
   */
  deleteAPIKey: function (apiKey) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.getApiKeysPage();
      Portal.admin.apiKeys.listPage.searchAndClickDelete(apiKey.name);
      Portal.dialog.clickOk();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  }
};

module.exports = Portal;
