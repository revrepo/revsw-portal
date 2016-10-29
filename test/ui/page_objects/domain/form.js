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

// # Domain Form Page Object

// Requiring constant values
var Constants = require('./../constants');

var DropDownWidget = require('./../common/dropDownWidget');

// This `Domain Form` Page Object abstracts all operations or actions that a
// common domain could do in the Add Domain and Edit Domain page from the Portal
// app/site.
var DomainForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      domainName: {
        id: 'domain_name'
      },
      originServer: {
        model: 'model.origin_server'
      },
      originHostHeader: {
        model: 'model.origin_host_header'
      }
    },
    dropDowns: {
      companyName: {
        model: 'model.account_id'
      },
      originServerLocation: {
        model: 'model.origin_server_location_id'
      },
      sslCert: {
        model: 'model.ssl_cert_id'
      }
    },
    tabs:{
      generalSettings: {
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(1) a'
      },
      originHealthMonitoring: {
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(2) a'
      },
      edgeCaching: {
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(3) a'
      },
      sslConfiguration: {
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(4) a'
      },
      customVCLRules:{
        css: '.domain-edit-form .nav.nav-tabs>li:nth-child(5) a'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)
  /**
   * ### DomainForm.getGeneralSettingsTab()
   *
   * Returns the reference to the `General Settings` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getGeneralSettingsTab: function () {
    return element(by.css(this.locators.tabs.generalSettings.css));
  },
  /**
   * ### DomainForm.getOriginHealthMonitoringTab()
   *
   * Returns the reference to the `Origin Health Monitoring` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getOriginHealthMonitoringTab: function () {
    return element(by.css(this.locators.tabs.originHealthMonitoring.css));
  },
  /**
   * ### DomainForm.getEdgeCachingTab()
   *
   * Returns the reference to the `Edge Caching` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getEdgeCachingTab: function () {
    return element(by.css(this.locators.tabs.edgeCaching.css));
  },
  /**
   * ### DomainForm.getSSLConfigurationTab()
   *
   * Returns the reference to the `SSL Certificate` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getSSLConfigurationTab: function () {
    return element(by.css(this.locators.tabs.sslConfiguration.css));
  },
  /**
   * ### DomainForm.getCustomVCLRulesTab()
   *
   * Returns the reference to the `Custom VCL Rules` tab (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getCustomVCLRulesTab: function () {
    return element(by.css(this.locators.tabs.customVCLRules.css));
  },
  /**
   * ### DomainForm.getDomainNameTxtIn()
   *
   * Returns the reference to the `Domain Name` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainNameTxtIn: function () {
    return element(by.id(this.locators.textInputs.domainName.id));
  },

  /**
   * ### DomainForm.getCompanyNameDDown()
   *
   * Returns the reference to the `Company Name` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getCompanyNameDDown: function () {
    return new DropDownWidget(
      by.model(this.locators.dropDowns.companyName.model));
  },

  /**
   * ### DomainForm.getSslCertDDown()
   *
   * Returns the reference to the `SSL Certificate` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getSslCertDDown: function () {
    return element(
        by.model(this.locators.dropDowns.sslCert.model));
  },

  /**
   * ### DomainForm.getSslCertDDownItems()
   *
   * Returns the reference to the `SSL Certificate` drop-down items (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getSslCertDDownItems: function() {
    this.getSSLConfigurationTab()
      .click();
    return this
      .getSslCertDDown()
      .all(by.css('option'));
  },

  /**
   * ### DomainForm.getOriginServerTxtIn()
   *
   * Returns the reference to the `Origin Server` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getOriginServerTxtIn: function () {
    return element(by.model(this.locators.textInputs.originServer.model));
  },

  /**
   * ### DomainForm.getLastNameTxtIn()
   *
   * Returns the reference to the `Origin Host Header` text field (Selenium
   * WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getOriginHostHeaderTxtIn: function () {
    return element(by.model(this.locators.textInputs.originHostHeader.model));
  },

  /**
   * ### DomainForm.getDomainOriginLocationDDown()
   *
   * Returns the reference to the `Domain Origin Location` drop-down (Selenium
   * WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainOriginLocationDDown: function () {
    return element(
      by.model(this.locators.dropDowns.originServerLocation.model));
  },

  // ## Methods to interact with the Domain form components

  /**
   * ### DomainForm.getDomainName()
   *
   * Gets the current value set for Domain Name.
   *
   * @returns {Promise}
   */
  getDomainName: function () {
    return this
      .getDomainNameTxtIn()
      .getAttribute('value');
  },

  /**
   * ### DomainForm.getOriginServer()
   *
   * Gets the current value set for Origin Server.
   *
   * @returns {Promise}
   */
  getOriginServer: function () {
    return this
      .getOriginServerTxtIn()
      .getAttribute('value');
  },

  /**
   * ### DomainForm.getOriginHostHeader()
   *
   * Gets the current value set for Origin Host Header.
   *
   * @returns {Promise}
   */
  getOriginHostHeader: function () {
    return this
      .getOriginHostHeaderTxtIn()
      .getAttribute('value');
  },

  /**
   * ### DomainForm.getDomainOriginLocation()
   *
   * Gets the current value set for Domain Origin Location.
   *
   * @returns {Promise}
   */
  getDomainOriginLocation: function () {
    return this
      .getDomainOriginLocationDDown();
  },

  /**
   * ### DomainForm.getSslCert()
   *
   * Gets the current value set for SSL Certificate.
   *
   * @returns {Promise}
   */
  getSslCert: function() {
    this.getSSLConfigurationTab()
      .click();
    return this
      .getSslCertDDown()
      .all(by.css('option[selected="selected"]'))
      .last()
      .getText();
  },


  /**
   * ### DomainForm.setDomainName()
   *
   * Sets a new value for `Domain Name` text field
   *
   * @param {String} domainName
   *
   * @returns {Promise}
   */
  setDomainName: function (domainName) {
    return this
      .getDomainNameTxtIn()
      .clear()
      .sendKeys(domainName);
  },

  /**
   * ### DomainForm.setCompanyName()
   *
   * Sets a new value for `Company Name` drop-down
   *
   * @param {String} companyName
   *
   * @returns {Promise}
   */
  setCompanyName: function (companyName) {
    return this
      .getCompanyNameDDown()
      .clear()
      .setValue(companyName);
  },

  /**
   * ### DomainForm.setSslCert()
   *
   * Sets a new value for `SSL Certificate` drop-down
   *
   * @param {String} companyName
   *
   * @returns {Promise}
   */
  setSslCert: function(sslCert) {
    var me = this;
    return this.getSSLConfigurationTab()
      .click().then(function() {
        return me
          .getSslCertDDown()
          .sendKeys(sslCert);
      });
  },

  /**
   * ### DomainForm.setOriginServer()
   *
   * Sets a new value for `Origin Server` text field
   *
   * @param {String} originServer
   *
   * @returns {Promise}
   */
  setOriginServer: function (originServer) {
    return this
      .getOriginServerTxtIn()
      .clear()
      .sendKeys(originServer);
  },

  /**
   * ### DomainForm.setOriginHostHeader()
   *
   * Sets a new value for `Origin Host Header` text field
   *
   * @param {String} originHostHeader
   *
   * @returns {Promise}
   */
  setOriginHostHeader: function (originHostHeader) {
    return this
      .getOriginHostHeaderTxtIn()
      .clear()
      .sendKeys(originHostHeader);
  },

  /**
   * ### DomainForm.setDomainOriginLocation()
   *
   * Sets a new value for `Domain Origin Location` drop-down
   *
   * @param {String} domainOriginLocation
   *
   * @returns {Promise}
   */
  setDomainOriginLocation: function (domainOriginLocation) {
    return this
      .getDomainOriginLocation()
      .element(by.cssContainingText('option', domainOriginLocation))
      .click();
  },

  /**
   * ### DomainForm.clearDomainName()
   *
   * Clears the current value set in the `Domain Name` text field
   *
   * @returns {Promise}
   */
  clearDomainName: function () {
    var me = this;
    return this
      .getDomainNameTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getDomainNameTxtIn()
          .sendKeys(backspaces);
      });
  },

  /**
   * ### DomainForm.clearOriginServer()
   *
   * Clears the current value set in the `Origin Server` text field
   *
   * @returns {Promise}
   */
  clearOriginServer: function () {
    var me = this;
    return this
      .getOriginServerTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getOriginServerTxtIn()
          .sendKeys(backspaces);
      });
  },

  /**
   * ### DomainForm.clearOriginHostHeader()
   *
   * Clears the current value set in the `Origin Host Header` text field
   *
   * @returns {Promise}
   */
  clearOriginHostHeader: function () {
    var me = this;
    return this
      .getOriginHostHeaderTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getOriginHostHeaderTxtIn()
          .sendKeys(backspaces);
      });
  },

  /**
   * ### DomainForm.clearDomainOriginLocation()
   *
   * Clears the current value set in the `Domain Origin Location` drop down.
   *
   * @returns {Promise}
   */
  clearDomainOriginLocation: function () {
    var me = this;
    return this
      .getDomainOriginLocationDDown()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getDomainOriginLocationDDown()
          .sendKeys(backspaces);
      });
  },

  // ## Helper Methods

  /**
   * ### DomainForm.isDisplayed()
   *
   * Checks whether the Domain Form is displayed or not in the UI
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
        .getDomainNameTxtIn()
        .isPresent() &&
      this
        .getOriginServerTxtIn()
        .isPresent() &&
      this
        .getOriginHostHeaderTxtIn()
        .isPresent();
  },

  /**
   * ### DomainForm.clearForm()
   *
   * Clean the Domain Form in the UI.
   *
   * @returns {Promise}
   */
  clear: function () {
    this
      .getDomainNameTxtIn()
      .clear();
    this
      .getOriginServerTxtIn()
      .clear();
    return this
      .getOriginHostHeaderTxtIn()
      .clear();
  },

  /**
   * ### DomainForm.fill()
   *
   * Helper method that fills the Domain Form given specified Domain data object
   *
   * @param {object} domain, domain data with the following schema.
   *
   *    {
   *        name: String,
   *        originServer, String,
   *        originHostHeader, String,
   *        originLocation, String
   *    }
   */
  fill: function (domain) {
    if (domain.name !== undefined) {
      this.setDomainName(domain.name);
    }
    // Fill Company name if data provided and if element is visible/available
    var me = this;
    element.all(by.model(this.locators.dropDowns.companyName.model))
      .then(function (elements) {
        if (domain.companyName !== undefined && elements.length > 0) {
          me.setCompanyName(domain.companyName);
        }
      });
    if (domain.originServer !== undefined) {
      this.setOriginServer(domain.originServer);
    }
    if (domain.originHostHeader !== undefined) {
      this.setOriginHostHeader(domain.originHostHeader);
    }
    if (domain.originLocation !== undefined) {
      this.setDomainOriginLocation(domain.originLocation);
    }
  }
};

module.exports = DomainForm;
