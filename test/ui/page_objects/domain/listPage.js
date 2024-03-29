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

// # Domain List Page Object

// Requiring other Page Objects that compound the Domain List Page one
var DomainTable = require('./table/table');
var Pager = require('./../common/pager');
var Searcher = require('./../common/searcher');

// This `Domain List` Page Object abstracts all operations or actions that a
// common user could do in the Domain List page from the Portal app/site.
var DomainList = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      listItems: {
        css: '.table tbody tr'
      }
    },
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      addNewDomain: {
        linkText: 'Add New Domain'
      },
      quickStartGuide: {
        linkText: 'Quick Start Guide'
      }
    }
  },

  // `Domain List` Page is compound mainly by a table, pagination and filter
  // components. Following properties make reference to the Page Objects of
  // those components.
  table: DomainTable,
  pager: Pager,
  searcher: Searcher,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### DomainList.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Domain List page from the Portal app.
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
  getListItems: function () {
    return element.all(by.css(this.locators.views.listItems.css));
  },

  /**
   * ### DomainList.getAddNewDomainBtn()
   *
   * Returns the reference to the `Add New Domain` button (Selenium WebDriver
   * Element) from the Domain List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAddNewDomainBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.addNewDomain.linkText));
  },

  // ## Methods to interact with the Domain List Page components

  /**
   * ### DomainList.clickAddNewDomain()
   *
   * Triggers a click to the `Add New Domain` button from the Domain List page
   * from the Portal app
   *
   * @returns {Promise}
   */
  clickAddNewDomain: function () {
    return this
      .getAddNewDomainBtn()
      .click();
  },
  /**
  * ### DomainList.getQuickStartGuideBtn()
  *
  * Returns the reference to the `Quick Start Guide` button (Selenium WebDriver
  * Element) from the Domain List page from the Portal app.
  *
  * @returns {Selenium WebDriver Element}
  */
  getQuickStartGuideBtn: function() {
    return element(
      by.partialLinkText(this.locators.buttons.quickStartGuide.linkText));
  },

  // ## Methods to interact with the Domain List Page components

  /**
   * ### DomainList.clickQuickStartGuide()
   *
   * Triggers a click to the `Quick Start Guide` button from the Domain List page
   * from the Portal app
   *
   * @returns {Promise}
   */
  clickQuickStartGuide: function() {
    return this
      .getQuickStartGuideBtn()
      .click();
  },

  /**
   * ### DomainList.getTitle()
   *
   * Gets the `Title` label from the Domain List page
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
   * ### DomainList.isDisplayed()
   *
   * Checks whether the Domain List page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this.searcher
      .getSearchCriteriaTxtIn()
      .isPresent();
  },

  /**
   * ### DomainList.searchAndGetFirstRow()
   *
   * Filters the Domain List table by the given criteria and returns the first
   * result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {TableRow}
   */
  searchAndGetFirstRow: function (criteria) {
    this.searcher.setSearchCriteria(criteria);
    return this.table
      .getFirstRow();
  },

  /**
   * ### DomainList.searchAndWaitForTooltipToChange()
   *
   * Searches a given domain and waits for its staging status to change
   * @param domain, which will be observed
   * @returns {Object} Promise
   */
  waitForStagingStatusToChange: function (domain) {
    var me = this;
    var previousTooltip;
    return browser.wait(function () {
      // Check domain is in list
      return me
        .searchAndGetFirstRow(domain.name)
        .getStagingStatusIcon()
        .getAttribute('uib-tooltip')
        .then(function (tooltip) {
          if(tooltip === 'Staging Status: Published') {
            return true;
          } else {
            browser.sleep(3000); // 3 seconds
            return false;
          }
        });
    }, 600000); // Wait 10 minutes to change tooltip
  },

  /**
   * ### DomainList.waitForGlobalStatusToChange()
   *
   * Searches a given domain and waits for its global status to change
   * @param domain, which will be observed
   * @returns {Object} Promise
   */
  waitForGlobalStatusToChange: function (domain) {
    var me = this;
    var previousTooltip;
    return browser.wait(function () {
      // Check domain is in list
      return me
        .searchAndGetFirstRow(domain.name)
        .getGlobalStatusIcon()
        .getAttribute('uib-tooltip')
        .then(function (newTooltip) {
          if (previousTooltip === undefined) {
            previousTooltip = newTooltip;
          }
          browser.sleep(3000); // 3 seconds
          return previousTooltip !== newTooltip;
        });
    }, 600000); // Wait 10 minutes to change tooltip
  },

  /**
   * ### DomainList.searchAndClickDelete()
   *
   * Filters the Domain List table by the given criteria and triggers a click on
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
   * ### DomainList.searchAndClickEdit()
   *
   * Filters the Domain List table by the given criteria and triggers a click on
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
  }
};

module.exports = DomainList;
