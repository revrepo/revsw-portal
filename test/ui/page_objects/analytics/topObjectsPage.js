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

// # Top Objects Page Object

// Requiring `Top Objects Form` component page object.
var TopObjectsForm = require('./topObjectsForm');

// This `Top Objects` Page Object abstracts all operations or actions that a
// common top reports could do in the Portal app/site.
var TopObjects = {

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

  form: TopObjectsForm,

 /**
  * ### TopObjects.getReportsObj()
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
   * ### TopObjects.getChartsTableObj()
   *
   * Returns the reference to the `Objects` charts table object (Selenium
   * WebDriver Element) from the Top Objects page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getChartsTableObj: function () {
    return element.all(by.css(this.locators.chartsTable.css));
  },

  /**
   * ### TopObjects.getSelectDomainDDown()
   *
   * Returns the reference to the `Select domain` button (Selenium WebDriver
   * Element) from the Top Objects page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getSelectDomainDDown: function () {
    return element(
      by.css(this.locators.dropDown.css));
  },

  /**
   * ### TopObjects.getSelectSearchInput()
   *
   * Returns the reference to the `Select Search` Input (Selenium WebDriver
   * Element) from the Top Objects page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getSelectSearchInput: function () {
    return element(
      by.model(this.locators.selectSearch.textBox));
  },

  // ## Methods to interact with the Top Objects Page components

  /**
   * ### TopObjects.clickSelectDomain()
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
   * ### TopObjects.clickSelectSearchDomain()
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
   * ### TopObjects.setSelectSearchDomain()
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
   * ### TopObjects.isDisplayed()
   *
   * Checks whether the Top Objects page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### TopObjects.getTitle()
   *
   * Gets the `Title` label from the Top Objects page.
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
  * ### TopObjects.getChartTitle()
  *
  * Gets the `Title` label from the Chart report from Top Objects page.
  *
  * @returns {Promise}
  */
  getChartTitle: function () {
    return this
      .form.getReportTitle();
  },

 /**
  * ### TopObjects.getSelectedDomain()
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
  * ### TopObjects.selectDomain()
  *
  * Selects an existing `Domain` in the Top Objects page.
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

  createReport: function (dataReport) {
    this.form.setDelay(dataReport.delay);
    this.form.setCountry(dataReport.country);
    this.form.setOS(dataReport.os);
    this.form.setDevice(dataReport.device);
    this.form.setCount(dataReport.count);
    this.form.clickUpdateReport();
  },

  getReport: function () {
    return {
      delay: this.form.getDelay(),
      country: this.form.getCountry(),
      os: this.form.getOS(),
      device: this.form.getDevice(),
      count: this.form.getCount()
    };
  },

 /**
  * ### TopObjects.createTopMostRequestedObjects()
  *
  * Selects the report `Top Most Requested Objects` in the Top Objects page.
  *
  * @param {String} dataReport of values to fill report.
  *
  * @returns {Promise}
  */
  createTopMostRequestedObjectsReport: function (dataReport) {
    var me = this;
    return this.form.clickTopMostRequestedTab()
      .then(function () {
        me.createReport(dataReport);
      });
  },

 /**
  * ### TopObjects.createTopReferers()
  *
  * Selects the report `Top Referers` in the Top Objects page.
  *
  * @param {String} dataReport of values to fill report.
  *
  * @returns {Promise}
  */
  createTopReferersReport: function (dataReport) {
   var me = this;
   return this.form.clickTopRefersTab()
     .then(function () {
       me.createReport(dataReport);
     });
  },

  /**
   * ### TopObjects.createTopEdgeCacheHits()
   *
   * Selects the report `Top Edge Cache Misses` in the Top Objects page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createTopEdgeCacheHitsReport: function (dataReport) {
    var me = this;
    return this.form.clickTopEdgeCacheHitsTab()
      .then(function () {
        me.createReport(dataReport);
      });
  },

  /**
   * ### TopObjects.createTopEdgeCacheMisses()
   *
   * Selects the report `Top Edge Cache Misses` in the Top Objects page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createTopEdgeCacheMissesReport: function (dataReport) {
    var me = this;
    return this.form.clickTopEdgeCacheMissesTab()
      .then(function () {
        me.createReport(dataReport);
      });
  },

  /**
   * ### TopObjects.createTop404NotFoundObjects()
   *
   * Selects the report `Top "404 Not Found: Objects` in the Top Objects page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createTop404NotFoundObjectsReport: function (dataReport) {
    var me = this;
    return this.form.clickTop404Tab()
      .then(function () {
        me.createReport(dataReport);
      });
  },

  /**
   * ### TopObjects.createTopObjects5XXErrorCodes()
   *
   * Selects report `Top Objects with 5XX Error Codes` in the Top Objects page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createTopObjects5XXErrorCodesReport: function (dataReport) {
    var me = this;
    return this.form.clickTop5XXTab()
      .then(function () {
        me.createReport(dataReport);
      });
  },

  /**
   * ### TopObjects.createTopFailedObjectsReport()
   *
   * Selects report `Top Objects With Unsuccessful Completion Status` in the Top Objects page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createTopFailedObjectsReport: function (dataReport) {
    var me = this;
    return this.form.clickTopObjetcsWithUnsuccessfulStatusTab()
      .then(function () {
        me.createReport(dataReport);
      });
  },

  /**
   * ### TopObjects.createObjectsWithSlowestFBTReport()
   *
   * Selects report `Objects With Slowest FBT` in the Top Objects page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createObjectsWithSlowestFBTReport: function (dataReport) {
    var me = this;
    return this.form.clickObjectsWithSlowestFBTtab()
      .then(function () {
        me.createReport(dataReport);
      });
  },

  /**
   * ### TopObjects.createObjectsWithSlowestDownTimeReport()
   *
   * Selects report `Objects With Slowest Download Time` in the Top Objects page.
   *
   * @param {String} dataReport of values to fill report.
   *
   * @returns {Promise}
   */
  createObjectsWithSlowestDownTimeReport: function (dataReport) {
    var me = this;
    return this.form.clickObjectsWithSlowestDownTimeTab()
      .then(function () {
        me.createReport(dataReport);
      });
  }
};

module.exports = TopObjects;
