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

// # WAF Heatmaps Page Object

// Requiring other Page Objects that compound the WAF Heatmaps Page one
var DropDownWidget = require('./../common/dropDownWidget');

// This `WAF Heatmaps` Page Object abstracts all operations or actions that a
// common user could do in the WAF Heatmaps page from the Portal app/site.
var WAFHeatmaps = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
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
      },
      delay: {
        id: 'delay'
      }
    }
  },

  // `WAF Heatmaps` Page is compound mainly by a table, pagination and filter
  // components. Following properties make reference to the Page Objects of
  // those components.

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### WAFHeatmaps.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the WAF Heatmaps page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### WAFHeatmaps.getUpdateReportsBtn()
   *
   * Returns the reference to the `Update Report` button (Selenium WebDriver
   * Element) from the WAF Heatmaps page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getUpdateReportBtn: function () {
    return element(
      by.css(this.locators.buttons.updateReport.css));
  },
  /**
   * ### WAFHeatmaps.getDomainDDown()
   *
   * Returns the reference to the `Domain` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDomainDDown: function () {
    return new DropDownWidget(by.id(this.locators.dropDowns.domain.id));
  },
  /**
   * ### WAFHeatmaps.getDelayDDown()
   *
   * Returns the reference to the `Delay` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDelayDDown: function () {
    return element(by.id(this.locators.dropDowns.delay.id));
  },

  // ## Methods to interact with the WAF Heatmaps page components

  /**
   * ### WAFHeatmaps.clickUpdateReport()
   *
   * Triggers a click to the `Update Report` button from the WAF Heatmaps
   * page from the Portal app
   *
   * @returns {Object} Promise
   */
  clickUpdateReport: function () {
    return this
      .getUpdateReportBtn()
      .click();
  },

  /**
   * ### WAFHeatmaps.getTitleText()
   *
   * Gets the `Title` label from the WAF Heatmaps page
   *
   * @returns {Object} Promise
   */
  getTitleText: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  // ## Helper Methods

  /**
   * ### WAFHeatmaps.isDisplayed()
   *
   * Checks whether the WAF Heatmaps page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this.getTitleLbl()
      .isPresent();
  },
  /**
   * ### WAFHeatmaps.isDisplayedDomainDDown()
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
   * ### WAFHeatmaps.isDisplayedDomainDDown()
   *
   * Checks whether the Delay Drop Down is displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayedDelayDDown: function () {
    return this.getDelayDDown()
      .isPresent();
  },

  /**
   * ### WAFHeatmaps.getFirstRow()
   *
   * Filters the WAF Heatmaps table by the given criteria and returns the
   * first result of the table.
   *
   * @param {String} criteria, to filter
   *
   * @returns {Object} TableRow
   */
  getFirstRow: function (criteria) {
    return this.table
      .getFirstRow();
  },

  /**
   * ### WAFHeatmaps.clickDeleteFirstRow()
   *
   * Filters the WAF Heatmaps table by the given criteria and triggers a click
   * on the `Delete` button of the first result of the table.
   *
   *
   * @returns {Object} Promise
   */
  clickDeleteFirstRow: function (crieria) {
    return this
      .getFirstRow()
      .clickDelete();
  }
};

module.exports = WAFHeatmaps;
