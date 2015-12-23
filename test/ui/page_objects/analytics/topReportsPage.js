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

// # Top Reports Page Object

// Requiring `Top Reports Form` component page object.
var TopReportsForm = require('./topReportsForm');

// This `Top Reports` Page Object abstracts all operations or actions that a
// common top reports could do in the Portal app/site.
var TopReports = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    reports: {
      css: '.container-fluid .row'
    },
    dropDown: {
      css: '[ng-click="$select.toggle($event)"]'
    },
    selectSearch: {
      textBox: '$select.search'
    },
    buttons: {
      createReport: {
        css: '[ng-click="updateFilters()"]'
      }
    }
  },

  form: TopReportsForm,

 /**
  * ### TopReports.getReportsObj()
  *
  * Returns the reference to the `Reports` label element (Selenium WebDriver
  * Element) from the Top Reports page from the Portal app.
  *
  * @returns {Selenium WebDriver Element}
  */
  getReportsObj: function () {
    return element.all(by.css(this.locators.reports.css));
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### TopReports.getChartsTableObj()
   *
   * Returns the reference to the `Reports` charts table object (Selenium
   * WebDriver Element) from the Top Reports page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getChartsTableObj: function () {
    return element.all(by.css(this.locators.chartsTable.css));
  },

  /**
   * ### TopReports.getSelectDomainDDown()
   *
   * Returns the reference to the `Select domain` button (Selenium WebDriver
   * Element) from the Top Reports page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getSelectDomainDDown: function () {
    return element(
      by.css(this.locators.dropDown.css));
  },

  /**
   * ### TopReports.getSelectSearchInput()
   *
   * Returns the reference to the `Select Search` Input (Selenium WebDriver
   * Element) from the Top Reports page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getSelectSearchInput: function () {
    return element(
      by.model(this.locators.selectSearch.textBox));
  },

  // ## Methods to interact with the Top Reports Page components

  /**
   * ### TopReports.clickSelectDomain()
   *
   * Triggers a click on the `Select domain` drop down from the Portal app.
   *
   * @returns {Promise}
   */
  clickSelectDomain: function () {
    return this
      .getSelectDomainDDown()
      .click();
  },

  /**
   * ### TopReports.clickSelectSearchDomain()
   *
   * Triggers a click on the `Select Search Domain` from the Portal app.
   *
   * @returns {Promise}
   */
  clickSelectSearchDomain: function () {
    return this
      .getSelectSearchInput()
      .click();
  },

  /**
   * ### TopReports.setSelectSearchDomain()
   *
   * Triggers a set on the `Select Search Domain` from the Portal app.
   *
   * @returns {Promise}
   */
  setSelectSearchDomain: function (domainName) {
    return this
      .getSelectSearchInput()
      .sendKeys(domainName)
      .sendKeys(protractor.Key.ENTER);
  },

  // ## Helper Methods

  /**
   * ### TopReports.isDisplayed()
   *
   * Checks whether the Top Reports page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### TopReports.getTitle()
   *
   * Gets the `Title` label from the Top Reports page.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getReportsObj()
      .get(0)
      .getText();
  },

 /**
  * ### TopReports.getChartTitle()
  *
  * Gets the `Title` label from the Chart report from Top Reports page.
  *
  * @returns {Promise}
  */
  getChartTitle: function () {
    return this
      .getReportsObj()
      .get(1)
      .getText();
  },

 /**
  * ### TopReports.getSelectedDomain()
  *
  * Gets the current `Selected Domain` text from the Select Domain Drop Down
  * element in the Top Reports page.
  *
  * @returns {Promise}
  */
  getSelectedDomain: function () {
    return this
      .getSelectDomainDDown()
      .getText();
  },

 /**
  * ### TopReports.selectDomain()
  *
  * Selects an existing `Domain` in the Top Reports page.
  *
  * @param {Object} domain
  *
  * @returns {Promise}
  */
  selectDomain: function (domain) {
    var me = this;
    me.clickSelectDomain();
    me.clickSelectSearchDomain();
    me.setSelectSearchDomain(domain.name);
  },

 /**
  * ### TopReports.createBandwidthUsageReport()
  *
  * Selects the report `Bandwidth Usage` in the Top Reports page.
  *
  * @param {String} dataReport of values to fill report.
  *
  * @returns {Promise}
  */
  createBandwidthUsageReport: function (dataReport) {
    this.form.setDelay(0, 0, dataReport.delay);
    this.form.setCountry(0, 1, dataReport.country);
    this.form.setOS(0, 2, dataReport.os);
    this.form.setDevice(0, 3, dataReport.device);
    this.form.clickCreateReport(0, 4);
  },

 /**
  * ### TopReports.createTotalRequestsReport()
  *
  * Selects the report `Total Requests` in the Top Reports page.
  *
  * @param {String} dataReport of values to fill report.
  *
  * @returns {Promise}
  */
  createTotalRequestsReport: function (dataReport) {
    this.form.setDelay(1, 0, dataReport.delay);
    this.form.setCountry(1, 1, dataReport.country);
    this.form.setOS(1, 2, dataReport.os);
    this.form.setDevice(1, 3, dataReport.device);
    this.form.clickCreateReport(1, 4);
  },

  /**
   * ### TopReports.createHttpHttpsHitsReport()
   *
   * Selects the report `HTTP and HTTPS Hits` in the Top Reports page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createHttpHttpsHitsReport: function (dataReport) {
    this.form.setDelay(2, 0, dataReport.delay);
    this.form.setCountry(2, 1, dataReport.country);
    this.form.setOS(2, 2, dataReport.os);
    this.form.setDevice(2, 3, dataReport.device);
    this.form.clickCreateReport(2, 4);
  },

  /**
   * ### TopReports.createHttpStatusCodeHitsReport()
   *
   * Selects the report `HTTP Status Code Hits` in the Top Reports page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createHttpStatusCodeHitsReport: function (dataReport) {
    this.form.setDelay(3, 0, dataReport.delay);
    this.form.setCountry(3, 1, dataReport.country);
    this.form.setOS(3, 2, dataReport.os);
    this.form.setDevice(3, 3, dataReport.device);
    this.form.clickCreateReport(3, 4);
  },

  /**
   * ### TopReports.createRequestStatusReport()
   *
   * Selects the report `Success/Failure Status Hits` in the Top Reports page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createRequestStatusReport: function (dataReport) {
    this.form.setDelay(4, 0, dataReport.delay);
    this.form.setCountry(4, 1, dataReport.country);
    this.form.setOS(4, 2, dataReport.os);
    this.form.setDevice(4, 3, dataReport.device);
    this.form.clickCreateReport(4, 4);
  },

  /**
   * ### TopReports.createEdgeCacheEfficiencyHitsReport()
   *
   * Selects the report `Edge Cache Efficiency Hits` in the Top Reports page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createEdgeCacheEfficiencyHitsReport: function (dataReport) {
    this.form.setDelay(5, 0, dataReport.delay);
    this.form.setCountry(5, 1, dataReport.country);
    this.form.setOS(5, 2, dataReport.os);
    this.form.setDevice(5, 3, dataReport.device);
    this.form.clickCreateReport(5, 4);
  },

  /**
   * ### TopReports.getBandwidthUsageValues()
   *
   * Gets the report `Bandwidth Usage` in the Top Reports page.
   *
   * @returns {Promise}
   */
  getBandwidthUsageValues: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(0, 0);
    dataReport.country = this.form.getCountry(0, 1);
    dataReport.os = this.form.getOS(0, 2);
    dataReport.device = this.form.getDevice(0, 3);
    return dataReport;
  },

  /**
   * ### TopReports.getTotalRequestsValues()
   *
   * Gets the report `Total Requests` in the Top Reports page.
   *
   * @returns {Promise}
   */
  getTotalRequestsValues: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(1, 0);
    dataReport.country = this.form.getCountry(1, 1);
    dataReport.os = this.form.getOS(1, 2);
    dataReport.device = this.form.getDevice(1, 3);
    return dataReport;
  },

  /**
   * ### TopReports.getHttpHttpsHitsValues()
   *
   * Gets the report `HTTP HTTPS Hits` in the Top Reports page.
   *
   * @returns {Promise}
   */
  getHttpHttpsHitsValues: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(2, 0);
    dataReport.country = this.form.getCountry(2, 1);
    dataReport.os = this.form.getOS(2, 2);
    dataReport.device = this.form.getDevice(2, 3);
    return dataReport;
  },

  /**
   * ### TopReports.getHttpStatusCodeHitsValues()
   *
   * Gets the report `HTTP Status Code Hits` in the Top Reports page.
   *
   * @returns {Promise}
   */
  getHttpStatusCodeHitsValues: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(3, 0);
    dataReport.country = this.form.getCountry(3, 1);
    dataReport.os = this.form.getOS(3, 2);
    dataReport.device = this.form.getDevice(3, 3);
    return dataReport;
  },

  /**
   * ### TopReports.getRequestStatusValues()
   *
   * Gets the report `Success/Failure Request Status` in the Top Reports page.
   *
   * @returns {Promise}
   */
  getRequestStatusValues: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(4, 0);
    dataReport.country = this.form.getCountry(4, 1);
    dataReport.os = this.form.getOS(4, 2);
    dataReport.device = this.form.getDevice(4, 3);
    return dataReport;
  },

  /**
   * ### TopReports.getEdgeCacheEfficiencyHitsValues()
   *
   * Gets the report `Edge Cache Efficiency Hits` in the Top Reports page.
   *
   * @returns {Promise}
   */
  getEdgeCacheEfficiencyHitsValues: function () {
    var dataReport = {};
    dataReport.delay = this.form.getDelay(5, 0);
    dataReport.country = this.form.getCountry(5, 1);
    dataReport.os = this.form.getOS(5, 2);
    dataReport.device = this.form.getDevice(5, 3);
    return dataReport;
  }
};

module.exports = TopReports;
