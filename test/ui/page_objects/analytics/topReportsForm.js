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

// This `Top Reports` Page Object abstracts all operations or actions that a
// common top reports could do in the Portal app/site.
var TopReportsForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    reports: {
      css: '.container-fluid .row'
    },
    chartsTable: {
      css: '.panel-body'
    },
    models: {
      delay: 'delay',
      country: 'ngFilters.country',
      os: 'ngFilters.os',
      device: 'ngFilters.device'
    }
  },

  /**
   * ### TopReportsForm.getChartsTableObj()
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
  * ### TopReportsForm.getTopReports()
  *
  * Selects a `Report` in the Top Reports page.
  *
  * @param {String} indexChart of Top Reports report panel.
  * @param {String} indexForm of Top Reports report panel.
  *
  * @returns {Promise}
  */
  getTopReports: function (indexChart, indexForm) {
    return this
      .getChartsTableObj()
      .all(by.css('.row .col-lg-6'))
      .get(indexChart)
      .all(by.css('.form-group'))
      .get(indexForm);
  },

  /**
   * ### TopReportsForm.setDelay()
   *
   * Sets value for `Delay` text field
   *
   * @param {String} indexChart of Top Reports report panel.
   * @param {String} indexForm of Top Reports report panel.
   * @param {String} value of Top Reports report panel.
   *
   * @returns {Promise}
   */
  setDelay: function (indexChart, indexForm, value) {
    return this
      .getTopReports(indexChart, indexForm) // (0, 0)
      .element(by.model(this.locators.models.delay))
      .sendKeys(value); // 'Last 1 day'
  },

  /**
   * ### TopReportsForm.setCountry()
   *
   * Sets value for `Country` text field
   *
   * @param {String} indexChart of Top Reports report panel.
   * @param {String} indexForm of Top Reports report panel.
   * @param {String} value of Top Reports report panel.
   *
   * @returns {Promise}
   */
  setCountry: function (indexChart, indexForm, value) {
    return this
      .getTopReports(indexChart, indexForm) // (0, 1)
      .element(by.model(this.locators.models.country))
      .sendKeys(value);
  },

  /**
   * ### TopReportsForm.setOS()
   *
   * Sets value for `OS` text field
   *
   * @param {String} indexChart of Top Reports report panel.
   * @param {String} indexForm of Top Reports report panel.
   * @param {String} value of Top Reports report panel.
   *
   * @returns {Promise}
   */
  setOS: function (indexChart, indexForm, value) {
    return this
      .getTopReports(indexChart, indexForm) // (0, 2)
      .element(by.model(this.locators.models.os))
      .sendKeys(value);
  },

  /**
   * ### TopReportsForm.setDevice()
   *
   * Sets value for `Device` text field
   *
   * @param {String} indexChart of Top Reports report panel.
   * @param {String} indexForm of Top Reports report panel.
   * @param {String} value of Top Reports report panel.
   *
   * @returns {Promise}
   */
  setDevice: function (indexChart, indexForm, value) {
    return this
      .getTopReports(indexChart, indexForm) // (0, 3)
      .element(by.model(this.locators.models.device))
      .sendKeys(value);
  },

  /**
   * ### TopReportsForm.clickCreateReport()
   *
   * Clicks on `Create Report` button in report forms.
   *
   * @param {String} indexChart of Top Reports report panel.
   * @param {String} indexForm of Top Reports report panel.
   *
   * @returns {Promise}
   */
  clickCreateReport: function (indexChart, indexForm) {
    return this
      .getTopReports(indexChart, indexForm) // (0, 4)
      .click();
  },

  /**
   * ### TopReportsForm.getDelay()
   *
   * Gets the value from `Delay` combo box.
   *
   * @returns {Promise}
   */
  getDelay: function (indexChart, indexForm) {
    return this
      .getTopReports(indexChart, indexForm)
      .element(by.model(this.locators.models.delay))
      .getText();
  },

  /**
   * ### TopReportsForm.getCountry()
   *
   * Gets the value from `Country` combo box.
   *
   * @returns {Promise}
   */
  getCountry: function (indexChart, indexForm) {
    return this
      .getTopReports(indexChart, indexForm)
      .element(by.model(this.locators.models.country))
      .getText();
  },

  /**
   * ### TopReportsForm.getOS()
   *
   * Gets the value from `OS` combo box.
   *
   * @returns {Promise}
   */
  getOS: function (indexChart, indexForm) {
    return this
      .getTopReports(indexChart, indexForm)
      .element(by.model(this.locators.models.os))
      .getText();
  },

  /**
   * ### TopReportsForm.getDevice()
   *
   * Gets the value from `Device` combo box.
   *
   * @returns {Promise}
   */
  getDevice: function (indexChart, indexForm) {
    return this
      .getTopReports(indexChart, indexForm)
      .element(by.model(this.locators.models.device))
      .getText();
  }
};

module.exports = TopReportsForm;
