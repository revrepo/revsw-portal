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

// # User List Page Object

// Requiring other Page Objects that compound the User List Page one
var GroupTable = require('./table/table');
var Pager = require('./../common/pager');
var Searcher = require('./../common/searcher');
var NavHelper = require('./../../common/helpers/nav');

// This `Group List` Page Object abstracts all operations or actions that a
// common user could do in the Group List page from the Portal app/site.
var GroupList = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      listItems: {
        css: '.Groups-list tbody tr'
      }
    },
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      addNewGroup: {
        linkText: 'Add New Group',
        className: 'btn-success'
      }
    }
  },

  // `Group List` Page is compound mainly by a table, pagination and filter
  // components. Following properties make reference to the Page Objects of
  // those components.
  table: GroupTable,
  pager: Pager,
  searcher: Searcher,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### GroupList.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Group List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### getListItems()
   *
   * Returns all elements on one page (Selenium WebDriver
   * Element) from the Apps List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getListItems: function() {
    return element.all(by.css(this.locators.views.listItems.css));
  },

  getAddNewGroupBtn: function () {
    return element.all(
      by.className(this.locators.buttons.addNewGroup.className));
  },
  
  clickAddNewGroup: function () {
    return this
      .getAddNewGroupBtn()
      .click();
  },

  searchAndGetFirstRow: function (criteria) {
    this.searcher.clearSearchCriteria();
    this.searcher.setSearchCriteria(criteria);
    return this.table
      .getFirstRow();
  },

  /**
   * ### UserList.searchAndClickDelete()
   *
   * Filters the User List table by the given criteria and triggers a click on
   * the `Delete` button of the first result of the table.
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
   * ### UserList.searchAndClickEdit()
   *
   * Filters the User List table by the given criteria and triggers a click on
   * the `Edit` button of the first result of the table.
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

  isDisplayed: function () {
    return this.getTitleLbl().isDisplayed();
  }
};

module.exports = GroupList;
