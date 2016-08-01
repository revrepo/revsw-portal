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

// # Activity Log List Page Object

// Requiring other Page Objects that compound the Activity Log List Page one
var ActivityLogTable = require('./table/table');
var Pager = require('./../../common/pager');
var Searcher = require('./../../common/searcher');

// This `Activity Log List` Page Object abstracts all operations or actions that
// a common user could do in the Activity Log List page from the Portal app/site.
var ActivityLogList = {

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
      showDetails: {
        css: '.log-details'
      }
    }
  },

  // `Activity Log List` Page is compound mainly by a table, pagination and filter
  // components. Following properties make reference to the Page Objects of
  // those components.
  table: ActivityLogTable,
  pager: Pager,
  searcher: Searcher,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### Activity LogList.getContainerFluidElem()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the Activity Log List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getContainerFluidElem: function () {
    return element.all(by.css(this.locators.views.container));
  },

  /**
   * ### Activity LogList.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Activity Log List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### Activity LogList.getShowDetailsBtn()
   *
   * Returns the reference to the `Add New Key` button (Selenium WebDriver
   * Element) from the Activity Log List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getShowDetailsBtn: function () {
    return element(by.css(this.locators.buttons.showDetails.css));
  },

  // ## Methods to interact with the Activity Log List Page components.

  /**
   * ### ActivityLogList.clickShowDetails()
   *
   * Triggers a click to the `Show Details Activity Log` button from the Activity Log List page
   * from the Portal app
   *
   * @returns {Promise}
   */
  clickShowDetails: function () {
    return this
      .getShowDetailsBtn()
      .click();
  },

  /**
   * ### Activity LogList.getTitle()
   *
   * Gets the `Title` label from the Activity Log List page.
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
   * ### Activity LogList.isDisplayed()
   *
   * Checks whether the Activity Log List page is being displayed in the UI or not.
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
   * ### Activity LogList.searchAndGetFirstRow()
   *
   * Filters the Activity Log List table by the given criteria and returns the first
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
   * ### Activity LogList.searchAndClickShowDetails()
   *
   * Filters the Activity Log List table by the given criteria and triggers a click
   * on the `Edit` button of the first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Promise}
   */
  searchAndClickShowDetails: function (criteria) {
    return this
      .searchAndGetFirstRow(criteria)
      .clickShowDetails();
  },


};

module.exports = ActivityLogList;
