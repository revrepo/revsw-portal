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

// # FBT Reports Page Object

// This `FBT Reports` Page Object abstracts all operations or actions that a
// common First Byte Time Reports could do in the Portal app/site.
var FBTReportsForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    reports: {
      container: '.container-fluid .row',
      panelHeading: '.col-md-12 .panel .panel-heading',
      panelBody: '.col-md-12 .panel .panel-body .row'
    },
    dropDown: {
      domain: '[ng-click="$select.toggle($event)"]',
      models: {
        delay: 'delay',
        country: 'country',
        os: 'os',
        device: 'device',
        searchDomain: '$select.search'
      }
    },
    button: {
      reloadTrafficStats: '[ng-click="reloadTrafficStats()"]',
      reloadFBTStats: '[ng-click="reloadFBTStats()"]'
    }
  },

  /**
   * ### FBTReportsForm.getPanelHeadingElem()
   *
   * Returns the reference to the `Panel Heading` element (Selenium
   * WebDriver Element) from the First Byte Time Reports page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelHeadingElem: function () {
    return element
      .all(by.css(this.locators.reports.container))
      .get(1)
      .element(by.css(this.locators.reports.panelHeading));
  },

  /**
   * ### FBTReportsForm.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium
   * WebDriver Element) from the First Byte Time Reports page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function () {
    return element
      .all(by.css(this.locators.reports.container))
      .get(1)
      .all(by.css(this.locators.reports.panelBody));
  },

  /**
   * ### FBTReportsForm.getDomainDDown()
   *
   * Gets the reference from `Domain` drop down element.
   *
   * @returns {Promise}
   */
  getDomainDDown: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.dropDown.domain));
  },

  /**
   * ### FBTReportsForm.getReportFormElem()
   *
   * Gets the value from `Delay` element.
   *
   * @param {String} indexForm to select the report based on index 0 or 1.
   * @Example: Average FBT (0) or FBT values distribution (1).
   *
   * @returns {Promise}
   */
  getDelayDDown: function (indexForm) {
    return this
      .getPanelBodyElem()
      .get(indexForm)
      .element(by.model(this.locators.dropDown.models.delay));
  },

  /**
   * ### FBTReportsForm.getCountryDDown()
   *
   * Gets the reference from `Country` drop down element.
   *
   * @param {String} indexForm to select the report based on index 0 or 1.
   * @Example: Average FBT (0) or FBT values distribution (1).
   *
   * @returns {Promise}
   */
  getCountryDDown: function (indexForm) {
    return this
      .getPanelBodyElem()
      .get(indexForm)
      .element(by.model(this.locators.dropDown.models.country));
  },

  /**
   * ### FBTReportsForm.getOSDDown()
   *
   * Gets the reference from `OS` drop down element.
   *
   * @param {String} indexForm to select the report based on index 0 or 1.
   * @Example: Average FBT (0) or FBT values distribution (1).
   *
   * @returns {Promise}
   */
  getOSDDown: function (indexForm) {
    return this
      .getPanelBodyElem()
      .get(indexForm)
      .element(by.model(this.locators.dropDown.models.os));
  },

  /**
   * ### FBTReportsForm.getDeviceDDown()
   *
   * Gets the reference from `Device` drop down element.
   *
   * @param {String} indexForm to select the report based on index 0 or 1.
   * @Example: Average FBT (0) or FBT values distribution (1).
   *
   * @returns {Promise}
   */
  getDeviceDDown: function (indexForm) {
    return this
      .getPanelBodyElem()
      .get(indexForm)
      .element(by.model(this.locators.dropDown.models.device));
  },

  /**
   * ### FBTReportsForm.getReloadTrafficStatsBtn()
   *
   * Gets the value from `Report Form` element.
   *
   * @param {String} indexForm to select the report based on index 0 or 1.
   * @Example: Average FBT (0) or FBT values distribution (1).
   *
   * @returns {Promise}
   */
  getReloadTrafficStatsBtn: function (indexForm) {
    return this
      .getPanelBodyElem()
      .get(indexForm)
      .element(by.css(this.locators.button.reloadTrafficStats));
  },

  /**
   * ### FBTReportsForm.getReloadFBTStatsBtn()
   *
   * Gets the value from `Report Form` element.
   *
   * @returns {Promise}
   */
  getReloadFBTStatsBtn: function () {
    return this
      .getPanelBodyElem()
      .get(2)
      .element(by.css(this.locators.button.reloadFBTStats));
  },

  /**
   * ### FBTReportsForm.getSearchDomainTxtIn()
   *
   * Gets the reference from `Search Domain` textbox element.
   *
   * @returns {Promise}
   */
  getSearchDomainTxtIn: function () {
    return element(by.model(this.locators.dropDown.models.searchDomain));
  },
  
  /**
   * ### FBTReportsForm.averageFBT.setDelay()
   *
   * Sets the value from `Delay` combo box.
   *
   * @param {String} indexForm to pick a report in First Byte Time Reports page.
   * @param {String} Value of Delay drop down in First Byte Time Reports page.
   *
   * @returns {Promise}
   */
  setDelay: function (indexForm, value) {
    return this
      .getDelayDDown(indexForm)
      .sendKeys(value);
  },

  /**
   * ### FBTReportsForm.averageFBT.setCountry()
   *
   * Sets the value from `Country` combo box.
   *
   * @param {String} indexForm to pick a report in First Byte Time Reports page.
   * @param {String} Value in Country drop down in First Byte Time Reports page.
   *
   * @returns {Promise}
   */
  setCountry: function (indexForm, value) {
    return this
      .getCountryDDown(indexForm)
      .sendKeys(value);
  },

  /**
   * ### FBTReportsForm.averageFBT.setOS()
   *
   * Sets the value from `OS` combo box.
   *
   * @param {String} indexForm to pick a report in First Byte Time Reports page.
   * @param {String} Value to set in OS drop down First Byte Time Reports page.
   *
   * @returns {Promise}
   */
  setOS: function (indexForm, value) {
    return this
      .getOSDDown(indexForm)
      .sendKeys(value);
  },

  /**
   * ### FBTReportsForm.averageFBT.setDevice()
   *
   * Sets the value from `Device` combo box.
   *
   * @param {String} Value to se in Device drop down of First Byte Time Reports.
   *
   * @returns {Promise}
   */
  setDevice: function (indexForm, value) {
    return this
      .getDeviceDDown(indexForm)
      .sendKeys(value);
  },

  /**
   * ### FBTReportsForm.averageFBT.clickUpdateReport()
   *
   * Clicks on the "Update Reports" button.
   *
   * @param {String} indexForm to pick a report in First Byte Time Reports page.
   *
   * @returns {Promise}
   */
  clickUpdateReport: function (indexForm) {
    return this
      .getReloadTrafficStatsBtn(indexForm)
      .click();
  },

  /**
   * ### FBTReportsForm.averageFBT.clickReloadFBTStats()
   *
   * Clicks on the "Update Reports" button for FBT heatmap report.
   *
   * @returns {Promise}
   */
  clickReloadFBTStats: function () {
    return this
      .getReloadFBTStatsBtn()
      .click();
  },

  /**
   * ### FBTReportsForm.averageFBT.getDelay()
   *
   * Gets the value from `Delay` drop down.
   *
   * @param {String} indexForm to pick a report in First Byte Time Reports page.
   *
   * @returns {Promise}
   */
  getDelay: function (indexForm) {
    return this
      .getDelayDDown(indexForm)
      .getText();
  },

  /**
   * ### FBTReportsForm.averageFBT.getCountry()
   *
   * Gets the value from `Country` drop down.
   *
   * @param {String} indexForm to pick a report in First Byte Time Reports page.
   *
   * @returns {Promise}
   */
  getCountry: function (indexForm) {
    return this
      .getCountryDDown(indexForm)
      .getText();
  },

  /**
   * ### FBTReportsForm.averageFBT.getOS()
   *
   * Gets the value from `OS` drop down.
   *
   * @param {String} indexForm to pick a report in First Byte Time Reports page.
   *
   * @returns {Promise}
   */
  getOS: function (indexForm) {
    return this
      .getOSDDown(indexForm)
      .getText();
  },

  /**
   * ### FBTReportsForm.averageFBT.getDevice()
   *
   * Gets the value from `Device` drop down.
   *
   * @param {String} indexForm to pick a report in First Byte Time Reports page.
   *
   * @returns {Promise}
   */
  getDevice: function (indexForm) {
    return this
      .getDeviceDDown(indexForm)
      .getText();
  },

  /**
   * ### FBTReportsForm.setSearchDomain()
   *
   * Sets the value from `Search Domain` combo box.
   *
   * @param {String} Value to Search Domain in First Byte Time Reports page.
   *
   * @returns {Promise}
   */
  setSearchDomain: function (value) {
    return this
      .getSearchDomainTxtIn()
      .sendKeys(value);
  },

  /**
   * ### FBTReportsForm.getDomain()
   *
   * Gets the value from `Domain` drop down.
   *
   * @returns {Promise}
   */
  getDomain: function () {
    return this
      .getDomainDDown()
      .getText();
  },

  /**
   * ### FBTReportsForm.clickDomain()
   *
   * Clicks the `Domain` drop down element.
   *
   * @returns {Promise}
   */
  clickDomain: function () {
    return this
      .getDomainDDown()
      .click();
  }
};

module.exports = FBTReportsForm;