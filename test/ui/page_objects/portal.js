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

var ListUsersPage = require('./user/listPage');
var EditUserPage = require('./user/editPage');
var AddUserPage = require('./user/addPage');

var SecuritySettingsPage = require('./user/securitySettingsPage');
var UpdatePasswordPage = require('./user/updatePasswordPage');

var AddDomainPage = require('./domain/addPage');
var ConfigureDomainPage = require('./domain/configurePage');
var DomainStatsPage= require('./domain/statsPage');
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
  userListPage: ListUsersPage,
  editUserPage: EditUserPage,
  addUserPage: AddUserPage,
  securitySettingsPage: SecuritySettingsPage,
  updatePasswordPage: UpdatePasswordPage,
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
      var hashFragmentRegExp =new RegExp('^.*' + location + '$');
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

  // ## Portal APP navigation Helper methods

  /**
   * ### Portal.goToAccountSettings()
   *
   * Navigation helper method that executes all steps to navigate to `Account
   * Settings` section
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
   * @returns {Promise}
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
   * ### Portal.deleteUser()
   *
   * Helper method that executes all steps required to delete a User from
   * Portal app.
   *
   * @param {user} user, data applying the schema defined in
   * `DataProvider.generateUser()`
   *
   * @returns {Promise}
   */
  deleteUser: function (user) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.getUsersPage();
      me.userListPage.searcher.clearSearchCriteria();
      me.userListPage.searcher.setSearchCriteria(user.email);
      me.userListPage.userTbl
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
   * @param {user} newDomain, data applying the schema defined in
   * `DataProvider.generateDomain()`
   *
   * @returns {Promise}
   */
  createDomain: function (newDomain) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.getDomainsPage();
      me.domains.listPage.clickAddNewDomain();
      me.domains.addPage.createDomain(newDomain);
      browser.sleep(10000);
      me.domains.addPage.clickBackToList();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  },

  /**
   * ### Portal.updateDomain()
   *
   * Helper method that executes all steps required to update an existing
   * domain for Portal app.
   *
   * @param {domain object} domain, data applying the schema defined in
   * `DataProvider.generateDomain()`
   *
   * @returns {Promise}
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
   * @param {user} domain, data applying the schema defined in
   * `DataProvider.generateDomain()`
   *
   * @returns {Promise}
   */
  deleteDomain: function (domain) {
    var me = this;
    return browser.getCurrentUrl().then(function (initialUrl) {
      me.getDomainsPage();
      me.domains.listPage.searcher.clearSearchCriteria();
      me.domains.listPage.searcher.setSearchCriteria(domain.name);
      me.domains.listPage.domainsTbl
        .getFirstRow()
        .clickDelete();
      me.dialog.clickOk();
      browser.getCurrentUrl().then(function (currentUrl) {
        if (initialUrl !== currentUrl) {
          browser.get(initialUrl);
        }
      });
    });
  }
};

module.exports = Portal;
