/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
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

// # SSL Names List Page Object

// Requiring other Page Objects that compound the SSL Names List Page one
var SSLNamesTable = require('./table/table');
var Pager = require('./../common/pager');
var Searcher = require('./../common/searcher');

// This `SSL Names List` Page Object abstracts all operations or actions that a
// common user could do in the SSL Names List page from the Portal app/site.
var SSLNamesList = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      addNewSSLName: {
        linkText: 'Add New SSL Name',
        css: 'i.glyphicon.glyphicon-plus'
      }
    }
  },

  // `SSL Names List` Page is compound mainly by a table, pagination and filter
  // components. Following properties make reference to the Page Objects of
  // those components.
  table: SSLNamesTable,
  pager: Pager,
  searcher: Searcher,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### SSLNamesList.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the SSL Names List page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### SSLNamesList.getAddNewSSLNamesBtn()
   *
   * Returns the reference to the `Add New SSL Names` button (Selenium WebDriver
   * Element) from the SSL Names List page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getAddNewSSLNameBtn: function () {
    return element(
      by.css(this.locators.buttons.addNewSSLName.css));
  },

  // ## Methods to interact with the SSL Cert List page components

  /**
   * ### SSLNamesList.clickAddNewSSLName()
   *
   * Triggers a click to the `Add New SSL Name` button from the SSL Names List
   * page from the Portal app
   *
   * @returns {Object} Promise
   */
  clickAddNewSSLName: function () {
    return this
      .getAddNewSSLNameBtn()
      .click();
  },

  /**
   * ### SSLNamesList.getTitle()
   *
   * Gets the `Title` label from the SSL Names List page
   *
   * @returns {Object} Promise
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  // ## Helper Methods

  /**
   * ### SSLNamesList.isDisplayed()
   *
   * Checks whether the SSL Names List page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this.searcher
      .getSearchCriteriaTxtIn()
      .isPresent();
  },

  /**
   * ### SSLNamesList.searchAndGetFirstRow()
   *
   * Filters the SSL Names List table by the given criteria and returns the
   * first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Object} TableRow
   */
  searchAndGetFirstRow: function (criteria) {
    this.searcher.clearSearchCriteria();
    this.searcher.setSearchCriteria(criteria);
    return this.table
      .getFirstRow();
  },

  /**
   * ### SSLNamesList.searchAndClickDelete()
   *
   * Filters the SSL Names List table by the given criteria and triggers a click
   * on the `Delete` button of the first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Object} Promise
   */
  searchAndClickDelete: function (criteria) {
    return this
      .searchAndGetFirstRow(criteria)
      .clickDelete();
  },

  /**
   * ### SSLNamesList.searchAndClickEdit()
   *
   * Filters the SSL Names List table by the given criteria and triggers a click
   * on the `Edit` button of the first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Object} Promise
   */
  searchAndClickVerify: function (criteria) {
    return this
      .searchAndGetFirstRow(criteria)
      .clickVerify();
  }
};

module.exports = SSLNamesList;
