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
var ProxyTraffic = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    reports: {
      class: '.panel-body .row'
    },
    labels: {
      title: {
        linkText: 'Proxy Traffic Reports'
      },
      bandwidthUsage: {
        linkText: 'Bandwidth Usage'
      },
      totalRequests: {
        linkText: 'Total Requests'
      },
      httpHits: {
        linkText: 'HTTP/HTTPS Hits'
      },
      httpStatusCode: {
        linkText: 'HTTP Status Code Hits'
      },
      successFailure: {
        linkText: 'Success/Failure Request Status'
      },
      edgeCache: {
        linkText: 'Edge Cache Efficiency Hits'
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

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### ProxyTraffic.getReportsPanel()
   *
   * Returns the reference to the `Reports` panel element (Selenium WebDriver
   * Element) from the Proxy Traffic page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getReportsPanel: function () {
    return element.all(by.css(this.locators.reports.class));
  },

  /**
   * ### ProxyTraffic.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Proxy Traffic page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels));
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
      .getTitleLbl()
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
  * @param {String} row of report panel
  * @param {String} column of report panel
  *
  * @returns {Promise}
  */
  getProxyTrafficReport: function (row, col) {
    return this
      .getReportsPanel()
      .get(row)
      .all(by.css('.col-lg-6'))
      .get(col)
      .element(by.css('[ng-click="updateFilters()"]'))
      .click();
  },

 /**
  * ### ProxyTraffic.createReportBandwidthUsage()
  *
  * Selects the report `Bandwidth Usage` in the Proxy Traffic page.
  *
  * @returns {Promise}
  */
  createReportBandwidthUsage: function () {
    this.getProxyTrafficReport(0, 0);
  },

 /**
  * ### ProxyTraffic.createReportTotalRequests()
  *
  * Selects the report `Total Requests` in the Proxy Traffic page.
  *
  * @returns {Promise}
  */
  createReportTotalRequests: function () {
    this.getProxyTrafficReport(0, 1);
  }
};

module.exports = ProxyTraffic;
