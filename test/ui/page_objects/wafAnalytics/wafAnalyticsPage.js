/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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

// # WAF Analytics Page Object

// Requiring other Page Objects that compound the WAF Analytics Page one
var DropDownWidget = require('./../common/dropDownWidget');
var ipTable = require('./table/table');
// This `WAF Analytics` Page Object abstracts all operations or actions that a
// common user could do in the WAF Analytics page from the Portal app/site.
var WAFAnalytics = {
  table: ipTable,
  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    pageContainer: {
      css: '.container-fluid.waf-analytics'
    },
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      updateReport: {
        linkText: 'Update Report',
        css: 'i.glyphicon.glyphicon-refresh'
      }
    },
    dropDowns: {
      domain: {
        id: 'domain'
      }
    },
    topIPs: {
      css: 'li[index=topAttackerIPs] a'
    }
  },

  // `WAF Analytics` Page is compound mainly by a table, pagination and filter
  // components. Following properties make reference to the Page Objects of
  // those components.

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### WAFAnalytics.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the WAF Analytics page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },
  /**
   * ### WAFAnalytics.getPageContent()
   *
   * Returns the reference to the `Page content` element (Selenium WebDriver
   * Element) from the WAF Analytics page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPageContent: function () {
    return element(by.css(this.locators.pageContainer.css));
  },
  /**
   * ### WAFAnalytics.getAllUpdateReportBtns()
   *
   * Returns the reference to the all `Update Report` buttons on page (Selenium WebDriver
   * Element) from the WAF Analytics page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getAllUpdateReportBtns: function () {
    return element.all(
      by.css(this.locators.buttons.updateReport.css));
  },
  /**
   * ### WAFAnalytics.getDomainDDown()
   *
   * Returns the reference to the `Domain` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDomainDDown: function () {
    return new DropDownWidget(by.id(this.locators.dropDowns.domain.id));
  },

  // ## Methods to interact with the WAF Analytics page components

  /**
   * ### WAFAnalytics.getTitleText()
   *
   * Gets the `Title` label from the WAF Analytics page
   *
   * @returns {Object} Promise
   */
  getTitleText: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### WAFAnalytics.getPageContentText()
   *
   * Gets the All text from the WAF Analytics page
   *
   * @returns {Object} Promise
   */
  getPageContentText: function () {
    return this
      .getPageContent()
      .getText();
  },

  // ## Helper Methods

  /**
   * ### WAFAnalytics.isDisplayed()
   *
   * Checks whether the WAF Analytics page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this.getTitleLbl()
      .isPresent();
  },
  /**
   * ### WAFAnalytics.isDisplayedDomainDDown()
   *
   * Checks whether the Domain Drop Down is displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayedDomainDDown: function () {
    return this.getDomainDDown().container
      .isPresent();
  },
  /**
   * ### WAFAnalytics.isDisplayedDomainDDown()
   *
   * Checks whether the Delay Drop Down is displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayedDelayDDown: function () {
    return this.getDelayDDown()
      .isPresent();
  },

  getTopIPs: function () {
    return element(by.css(this.locators.topIPs.css));
  },

  clickTopIPs: function () {
    return this.getTopIPs().click();
  }
};

module.exports = WAFAnalytics;
