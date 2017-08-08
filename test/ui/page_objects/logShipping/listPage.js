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

// # Log Shipping List Page Object

// Requiring other Page Objects that compound the Log Shipping List Page one
var LogShippingTable = require('./table/table');
var Pager = require('./../common/pager');
var Searcher = require('./../common/searcher');

// This `Log Shipping List` Page Object abstracts all operations or actions that a
// common user could do in the Log Shipping List page from the Portal app/site.
var LogShippingList = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      addNewLogShippingJob: {
        linkText: 'Add New Log Shipping Job',
        css: 'i.glyphicon.glyphicon-plus'
      }
    }
  },

  // `Log Shipping List` Page is compound mainly by a table, pagination and filter
  // components. Following properties make reference to the Page Objects of
  // those components.
  table: LogShippingTable,
  pager: Pager,
  searcher: Searcher,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### LogShippingList.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Log Shipping List page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### LogShippingList.getAddNewLogShippingJobBtn()
   *
   * Returns the reference to the `Add New Log Shipping Job` button (Selenium WebDriver
   * Element) from the Log Shipping List page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getAddNewLogShippingJobBtn: function () {
    return element.all(
      by.css(this.locators.buttons.addNewLogShippingJob.css));
  },

  // ## Methods to interact with the Log Shipping List page components

  /**
   * ### LogShippingList.clickAddNewLogShippingJob()
   *
   * Triggers a click to the `Add New Log Shipping` button from the Log Shipping List
   * page from the Portal app
   *
   * @returns {Object} Promise
   */
  clickAddNewLogShippingJob: function () {
    return this
      .getAddNewLogShippingJobBtn()
      .click();
  },

  /**
   * ### LogShippingList.getTitle()
   *
   * Gets the `Title` label from the Log Shipping List page
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
   * ### LogShippingList.isDisplayed()
   *
   * Checks whether the Log Shipping List page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this.searcher
      .getSearchCriteriaTxtIn()
      .isPresent();
  },

  /**
   * ### LogShippingList.searchAndGetFirstRow()
   *
   * Filters the Log Shipping List table by the given criteria and returns the
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
   * ### LogShippingList.searchAndClickDelete()
   *
   * Filters the Log Shipping List table by the given criteria and triggers a click
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
   * ### LogShippingList.searchAndClickEdit()
   *
   * Filters the Log Shipping List table by the given criteria and triggers a click
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
  },

  /**
   * ### LogShippingList.searchAndClickPause()
   *
   * Filters the Log Shipping List table by the given criteria and triggers a click
   * on the `Pause` button of the first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Object} Promise
   */
  searchAndClickPause: function (criteria) {
    return this
        .searchAndGetFirstRow(criteria)
        .clickPause();
  },

  /**
   * ### LogShippingList.searchAndClickPlay()
   *
   * Filters the Log Shipping List table by the given criteria and triggers a click
   * on the `Play` button of the first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Object} Promise
   */
  searchAndClickPlay: function (criteria) {
    return this
        .searchAndGetFirstRow(criteria)
        .clickPlay();
  },

  /**
   * ### LogShippingList.searchAndClickStop()
   *
   * Filters the Log Shipping List table by the given criteria and triggers a click
   * on the `Stop` button of the first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Object} Promise
   */
  searchAndClickStop: function (criteria) {
    return this
        .searchAndGetFirstRow(criteria)
        .clickStop();
  }
};

module.exports = LogShippingList;
