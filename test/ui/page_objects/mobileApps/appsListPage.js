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

// # Apps List Page Object

// Requiring `Apps List Table` component page object.
var AppsListTable = require('./appsListTable');
// Requiring `Add New Aapp` component page object.
var AddNewAppPage = require('./addNewAppPage');

// This `Apps List` Page Object abstracts all operations or actions
// that a common Two-Factor Authentication could do in the Portal app/site.
var AppsList = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
      panelHeading: {
        css: '.col-md-12 .panel .panel-heading',
        pullLeft: '.pull-left',
        pullRight: '.pull-right'
      },
      panelBody: {
        css: '.col-md-12 .panel .panel-body'
      }
    },
    buttons: {
      addNewApp:{
        linkText: 'Add New App'
      },
      clearSearch: {
        css: '[ng-click=\"filter.filter = ""\"]'
      }
    },
    inputs: {
      search: {
        id: 'search'
      }
    }
  },

  // `Apps List Table` Page is compound mainly by a table. This property makes
  // reference to the AppsListPage Page Object to interact with it.
  appsTable: AppsListTable,

  // `Apps List Form` Page is compound mainly by a form. This property makes
  // reference to the AddNewAppPage Page Object to interact with it.
  appsForm: AddNewAppPage,

  /**
   * ### AppsList.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Apps List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(0);
  },

  /**
   * ### AppsList.getPanelHeadingElem()
   *
   * Returns the reference to the `Panel Heading` element (Selenium WebDriver
   * Element) from the Apps List page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelHeadingElem: function () {
    return element
      .all(by.css(this.locators.views.container))
      .get(1)
      .element(by.css(this.locators.views.panelHeading.css));
  },

  /**
   * ### AppsList.getAddNewAppBtn()
   *
   * Gets the reference to `Add New App` button element.
   *
   * @returns {Promise}
   */
  getAddNewAppBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.addNewApp.linkText));
  },

  /**
   * ### AppsList.getSearchTxt()
   *
   * Gets the reference to `Search` button element.
   *
   * @returns {Promise}
   */
  getSearchTxt: function () {
    return element(by.id(this.locators.inputs.search.id));
  },

  /**
   * ### AppsList.getClearSearchTxt()
   *
   * Gets the reference to `Clear Search` button element.
   *
   * @returns {Promise}
   */
  getClearSearchTxt: function () {
    return element(by.id(this.locators.buttons.clearSearch.css));
  },

  // ## Helper Methods

  /**
   * ### AppsList.getTitle()
   *
   * Gets the title from `Title` label element.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### AppsList.clickAddNewApp()
   *
   * Clicks on `Add New App` button element.
   *
   * @returns {Promise}
   */
  clickAddNewApp: function () {
    return this
      .getAddNewAppBtn()
      .click();
  },

/**
 * ### AppsList.clickClearSearch()
 *
 * Clicks on `Clear Search` X button element.
 *
 * @returns {Promise}
 */
clickClearSearch: function () {
  return this
    .getClearSearchTxt()
    .click();
},

  /**
   * ### AppsList.setSearch(value)
   *
   * Sets value in `Search` text input element.
   *
   * @param {String} value
   *
   * @returns {Promise}
   */
  setSearch: function (value) {
    this.getSearchTxt().clear();
    return this
      .getSearchTxt()
      .sendKeys(value);
  },

  /**
   * ### AppsList.addNewApp(app)
   *
   * Adds new app in the `Apps List App` Page.
   *
   * @param {object} app, app data with following schema.
   *
   *    {
   *        name: String,
   *        platform: String
   *    }
   * @returns {Promise}
   */
  addNewApp: function (app) {
    this.clickAddNewApp();
    this.appsForm.fill(app);
    this.appsForm.clickRegister(app);
  },

  /**
   * ### AppsList.findApp(app)
   *
   * Finds an app in the `Apps List App` Page.
   *
   * @returns {Promise}
   */
  findApp: function (app) {
    this.setSearch(app.name);
    return this.appsTable.countTotalRows();
  },

  /**
   * ### AppsList.searchAndDelete(app)
   *
   * Deletes an app in the `Apps List App` Page.
   *
   * @param {object} app, app data.
   *
   * @returns {Promise}
   */
  searchAndDelete: function (app) {
    this.setSearch(app.name);
    this.appsTable.clickDeleteApp();
  },

  /**
   * ### AppsList.searchAndEdit(app)
   *
   * Edits an existing app in the `Apps List App` Page.
   *
   * @param {object} app, app data.
   *
   * @returns {Promise}
   */
  searchAndEdit: function (app) {
    this.setSearch(app.name);
    this.appsTable.clickEditApp();
  },

  /**
   * ### AppsList.searchAndAdvancedEdit(app)
   *
   * Advanced Edits an existing app in the `Apps List App` Page.
   *
   * @param {object} app, app data.
   *
   * @returns {Promise}
   */
  searchAndAdvancedEdit: function (app) {
    this.setSearch(app.name);
    this.appsTable.clickAdvancedEditApp();
  }
};

module.exports = AppsList;
