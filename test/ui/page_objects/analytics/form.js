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

// # Proxy Traffic Page Object

// This `Proxy Traffic` Page Object abstracts all operations or actions that a
// common proxy traffic could do in the Portal app/site.
var Report = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    reports: {
      css: '.container-fluid .row'
    },
    chartsTable: {
      css: '.panel-body'
    },
    labels: {
      title: {
        linkText: 'Proxy Traffic Reports'
      }
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

 /**
  * ### ProxyTraffic.reports()
  *
  * Returns the reference to the `Title` label element (Selenium WebDriver
  * Element) from the Proxy Traffic page from the Portal app.
  *
  * @returns {Selenium WebDriver Element}
  */
  getReportsObj: function () {
    return element.all(by.css(this.locators.reports.css));
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### ProxyTraffic.getChartsTableObj()
   *
   * Returns the reference to the `Reports` charts table object (Selenium
   * WebDriver Element) from the Proxy Traffic page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getChartsTableObj: function () {
    return element.all(by.css(this.locators.chartsTable.css));
  },

  /**
   * ### ProxyTraffic.getCreateReportBtn()
   *
   * Returns the reference to the `Create report` button (Selenium WebDriver
   * Element) from the Proxy Traffic page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCreateReportBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons));
  },

  /**
   * ### ProxyTraffic.getSelectDomainDDown()
   *
   * Returns the reference to the `Select domain` button (Selenium WebDriver
   * Element) from the Proxy Traffic page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getSelectDomainDDown: function () {
    return element(
      by.css(this.locators.dropDown.css));
  },

  /**
   * ### ProxyTraffic.getSelectSearchInput()
   *
   * Returns the reference to the `Select Search` Input (Selenium WebDriver
   * Element) from the Proxy Traffic page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getSelectSearchInput: function () {
    return element(
      by.model(this.locators.selectSearch.textBox));
  },

  // ## Methods to interact with the Proxy Traffic Page components

  /**
   * ### ProxyTraffic.clickSelectDomain()
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
   * ### ProxyTraffic.clickSelectSearchDomain()
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
   * ### ProxyTraffic.setSelectSearchDomain()
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
   * ### ProxyTraffic.isDisplayed()
   *
   * Checks whether the Proxy Traffic page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### ProxyTraffic.getTitle()
   *
   * Gets the `Title` label from the Proxy Traffic page.
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
  * ### ProxyTraffic.getChartTitle()
  *
  * Gets the `Title` label from the Chart report from Proxy Traffic page.
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
  * ### ProxyTraffic.getSelectedDomain()
  *
  * Gets the current `Selected Domain` text from the Select Domain Drop Down
  * element in the Proxy Traffic page.
  *
  * @returns {Promise}
  */
  getSelectedDomain: function () {
    return this
      .getSelectDomainDDown()
      .getText();
  },

 /**
  * ### ProxyTraffic.selectDomain()
  *
  * Selects an existing `Domain` in the Proxy Traffic page.
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
  * ### ProxyTraffic.getProxyTrafficReport()
  *
  * Selects a `Report` in the Proxy Traffic page.
  *
  * @param {String} indexChart of proxy Traffic report panel.
  * @param {String} indexForm of Proxy Traffic report panel.
  *
  * @returns {Promise}
  */
  getProxyTrafficReport: function (indexChart, indexForm) {
    return this
      .getChartsTableObj()
      .all(by.css('.row .col-lg-6'))
      .get(indexChart)
      .all(by.css('.form-group'))
      .get(indexForm);
  },

  setDelay: function (indexChart, indexForm, value) {
    return this
      .getProxyTrafficReport(indexChart, indexForm) // (0, 0)
      .element(by.model('delay'))
      .sendKeys(value); // 'Last 1 day'
  },

  setCountry: function (indexChart, indexForm, value) {
    return this
      .getProxyTrafficReport(indexChart, indexForm) // (0, 1)
      .element(by.model('ngFilters.country'))
      .sendKeys(value);
  },

  setOS: function (indexChart, indexForm, value) {
    return this
      .getProxyTrafficReport(indexChart, indexForm) // (0, 2)
      .element(by.model('ngFilters.os'))
      .sendKeys(value);
  },

  setDevice: function (indexChart, indexForm, value) {
    return this
      .getProxyTrafficReport(indexChart, indexForm) // (0, 3)
      .element(by.model('ngFilters.device'))
      .sendKeys(value);
  },

  clickCreateReport: function (indexChart, indexForm) {
    return this
      .getProxyTrafficReport(indexChart, indexForm) // (0, 4)
      .click();
  },

  getDelay: function (indexChart, indexForm) {
    return this
      .getProxyTrafficReport(indexChart, indexForm)
      .element(by.model('delay'))
      .getText();
  },

  getCountry: function (indexChart, indexForm) {
    return this
      .getProxyTrafficReport(indexChart, indexForm)
      .element(by.model('ngFilters.country'))
      .getText();
  },

  getOS: function (indexChart, indexForm) {
    return this
      .getProxyTrafficReport(indexChart, indexForm)
      .element(by.model('ngFilters.os'))
      .getText();
  },

  getDevice: function (indexChart, indexForm) {
    return this
      .getProxyTrafficReport(indexChart, indexForm)
      .element(by.model('ngFilters.device'))
      .getText();
  }
};

module.exports = Report;
