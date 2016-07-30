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

// # Zone Records List Page Object

// Requiring other Page Objects that compound the Zone Records List Page one
var ZoneRecordsTable = require('./table/table');
var Pager = require('./../../common/pager');
var Searcher = require('./../../common/searcher');

// This `Zone Records List` Page Object abstracts all operations or actions that a
// common user could do in the Zone Records List page from the Portal app/site.
var ZoneRecordsList = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      addNewRecord: {
        linkText: 'Add New Zone Record',
        css: 'i.glyphicon.glyphicon-plus'
      }
    }
  },

  // `Zone Records List` Page is compound mainly by a table, pagination and filter
  // components. Following properties make reference to the Page Objects of
  // those components.
  table: ZoneRecordsTable,
  pager: Pager,
  searcher: Searcher,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### ZoneRecordsList.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Zone Records List page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### ZoneRecordsList.getAddNewRecordBtn()
   *
   * Returns the reference to the `Add New Record` button (Selenium WebDriver
   * Element) from the Zone Records List page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getAddNewRecordBtn: function () {
    return element(
      by.css(this.locators.buttons.addNewRecord.css));
  },

  // ## Methods to interact with the Zone Records List page components

  /**
   * ### ZoneRecordsList.clickAddNewRecordBtn()
   *
   * Triggers a click to the `Add New Record` button from the Zone Records List
   * page from the Portal app
   *
   * @returns {Object} Promise
   */
  clickAddNewRecord: function () {
    return this
      .getAddNewRecordBtn()
      .click();
  },

  /**
   * ### ZoneRecordsList.getTitle()
   *
   * Gets the `Title` label from the Zone Records List page
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
   * ### ZoneRecordsList.isDisplayed()
   *
   * Checks whether the Zone Records List page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this.searcher
      .getSearchCriteriaTxtIn()
      .isPresent();
  },

  /**
   * ### ZoneRecordsList.searchAndGetFirstRow()
   *
   * Filters the Zone Records List table by the given criteria and returns the
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
   * ### ZoneRecordsList.searchAndClickDelete()
   *
   * Filters the Zone Records List table by the given criteria and triggers a click
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
   * ### ZoneRecordsList.searchAndClickEdit()
   *
   * Filters the Zone Records List table by the given criteria and triggers a click
   * on the `Edit` button of the first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Object} Promise
   */
  searchAndClickEdit: function (criteria) {
    return this
      .searchAndGetFirstRow(criteria)
      .clickEdit();
  }
};

module.exports = ZoneRecordsList;
