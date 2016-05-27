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

// # API Keys List Page Object

// Requiring other Page Objects that compound the Keys List Page one
var KeysTable = require('./table/table');
var Pager = require('./../../common/pager');
var Searcher = require('./../../common/searcher');
var AddKey = require('./addKey');

// This `API Keys List` Page Object abstracts all operations or actions that
// a common user could do in the Keys List page from the Portal app/site.
var KeysList = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row'
    },
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      addNewApiKey: {
        linkText: 'Add New API Key'
      }
    }
  },

  // `Keys List` Page is compound mainly by a table, pagination and filter
  // components. Following properties make reference to the Page Objects of
  // those components.
  table: KeysTable,
  pager: Pager,
  searcher: Searcher,
  addKey: AddKey,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### KeysList.getContainerFluidElem()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the Keys List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getContainerFluidElem: function () {
    return element.all(by.css(this.locators.views.container));
  },

  /**
   * ### KeysList.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Keys List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### KeysList.getAddNewApiKeyBtn()
   *
   * Returns the reference to the `Add New API Key` button (Selenium WebDriver
   * Element) from the Keys List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAddNewApiKeyBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.addNewApiKey.linkText));
  },

  // ## Methods to interact with the Keys List Page components.

  /**
   * ### KeysList.clickAddNewApiKey()
   *
   * Triggers a click to the `Add New Keys` button from the Keys List page
   * from the Portal app
   *
   * @returns {Promise}
   */
  clickAddNewApiKey: function () {
    return this
      .getAddNewApiKeyBtn()
      .click();
  },

  /**
   * ### KeysList.getTitle()
   *
   * Gets the `Title` label from the Keys List page.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  // ## Helper Methods

  /**
   * ### KeysList.isDisplayed()
   *
   * Checks whether the Keys List page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .searcher
      .getSearchCriteriaTxtIn()
      .isPresent();
  },

  /**
   * ### KeysList.searchAndGetFirstRow()
   *
   * Filters the Keys List table by the given criteria and returns the first
   * result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {TableRow}
   */
  searchAndGetFirstRow: function (criteria) {
    this.searcher.clearSearchCriteria();
    this.searcher.setSearchCriteria(criteria);
    return this
      .table
      .getFirstRow();
  },

  /**
   * ### KeysList.searchAndClickDelete()
   *
   * Filters the Keys List table by the given criteria and triggers a click
   * on the `Delete` button of the first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Promise}
   */
  searchAndClickDelete: function (criteria) {
    return this
      .searchAndGetFirstRow(criteria)
      .clickDelete();
  },

  /**
   * ### KeysList.searchAndClickEdit()
   *
   * Filters the Keys List table by the given criteria and triggers a click
   * on the `Edit` button of the first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Promise}
   */
  searchAndClickEdit: function (criteria) {
    return this
      .searchAndGetFirstRow(criteria)
      .clickEdit();
  },

  /**
   * ### KeysList.addNewApiKey(apiKey)
   *
   * Fills API Keys form and clicks on Create Keys button.
   *
   * @param {String} apiKey, to add.
   *
   * @returns {Promise}
   */
  addNewApiKey: function (apiKey) {
    this.clickAddNewApiKey();
  }
};

module.exports = KeysList;
