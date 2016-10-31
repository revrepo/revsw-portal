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

// Requiring other Page Objects that compound the Apps List Page
var AppsTable = require('./table/table');
var AddAppPage = require('./addPage'); // TODO: AddPage is not part of ListPage
var Pager = require('./../common/pager');
var Searcher = require('./../common/searcher');

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
  // reference to the AppsTable Page Object to interact with it.
  table: AppsTable,
  pager: Pager,
  searcher: Searcher,

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
   * ### AppsList.isDisplayed()
   *
   * Checks whether the Add App page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
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
   * ### AppsList.addNew(app)
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
  addNew: function (app) {
    this.clickAddNewApp();
    // TODO: This does not apply to this section. Nee to improve the usage of
    // AddPage from mobile apps.
    AddAppPage.fill(app);
    AddAppPage.clickRegister(app);
  },

  /**
   * ### AppsList.searchAndCount(criteria)
   *
   * Searches an app in the `Apps List App` Page given a search criteria
   * and return the count of the results.
   *
   * @param criteria, search criteria
   * @returns {Promise}
   */
  searchAndCount: function (criteria) {
    this.searcher.setSearchCriteria(criteria);
    return this.table
      .getRows()
      .count();
  },

  /**
   * ### AppsList.searchAndDelete(name)
   *
   * Deletes an app in the `Apps List App` Page.
   *
   * @param {String} name, app name.
   * @returns {Promise}
   */
  searchAndDelete: function (name) {
    this.searcher.setSearchCriteria(name);
    this.table
      .getFirstRow()
      .clickDelete();
  },

  /**
   * ### AppsList.searchAndEdit(app.name)
   *
   * Edits an existing app in the `Apps List App` Page.
   *
   * @param {String} name, app name.
   *
   * @returns {Promise}
   */
  searchAndEdit: function (name) {
    this.searcher.setSearchCriteria(name);
    return this.table
      .getFirstRow()
      .clickEdit();
  },

  /**
   * ### AppsList.searchAndAdvancedEdit(name)
   *
   * Advanced Edits an existing name in the `Apps List App` Page.
   *
   * @param {String} name, app name.
   *
   * @returns {Promise}
   */
  searchAndAdvancedEdit: function (name) {
    this.searcher.setSearchCriteria(name);
    this.table
      .getFirstRow()
      .clickConfigure();
  },

  /**
   * ### AppsList.sortByName()
   *
   * Clicks on `Name Column` header element from apps table, in Apps List page.
   *
   * @returns {Object} Promise
   */
  sortByName: function () {
    return this.table
      .getHeaderEl()
      .click();
  }
};

module.exports = AppsList;
