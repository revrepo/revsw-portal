/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
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

// # DNS Zone Form Page Object

// Requiring constant values
var Constants = require('./../constants');

var DropDownWidget = require('./../common/dropDownWidget');

// This `DNS Zone Form` Page Object abstracts all operations or actions that a
// common user could do in the Add DNS Zone page from the Portal
// app/site.
var DNSZoneForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      domain: {
        model: 'model.zone'
      },
      soaTTL: {
        model: 'model.ttl'
      },
      refresh: {
        model: 'model.refresh'
      },
      retry: {
        model: 'model.retry'
      },
      expire: {
        model: 'model.expiry'
      },
      nxTTL: {
        model: 'model.nx_ttl'
      }
    },
    dropDowns: {
      account: {
        id: 'account_id'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### DNSZoneForm.getDomainTxtIn()
   *
   * Returns the reference to the `Domain` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDomainTxtIn: function () {
    return element(by.model(this.locators.textInputs.domain.model));
  },

  /**
   * ### DNSZoneForm.getSOAttlTxtIn()
   *
   * Returns the reference to the `SOA TTL` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getSOAttlTxtIn: function () {
    return element(by.model(this.locators.textInputs.soaTTL.model));
  },

  /**
   * ### DNSZoneForm.getRefreshTxtIn()
   *
   * Returns the reference to the `Refresh` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getRefreshTxtIn: function () {
    return element(by.model(this.locators.textInputs.refresh.model));
  },

  /**
   * ### DNSZoneForm.getRetryTxtIn()
   *
   * Returns the reference to the `Retry` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getRetryTxtIn: function () {
    return element(by.model(this.locators.textInputs.retry.model));
  },

  /**
   * ### DNSZoneForm.getExpireTxtIn()
   *
   * Returns the reference to the `Expire` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getExpireTxtIn: function () {
    return element(by.model(this.locators.textInputs.expire.model));
  },

  /**
   * ### DNSZoneForm.getNXttlTxtIn()
   *
   * Returns the reference to the `NX TTL` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getNXttlTxtIn: function () {
    return element(by.model(this.locators.textInputs.nxTTL.model));
  },

  /**
   * ### DNSZoneForm.getCompanyDDown()
   *
   * Returns the reference to the `Account` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCompanyDDown: function () {
    return new DropDownWidget(by.id(this.locators.dropDowns.account.id));
  },

  // ## Methods to interact with the DNS Zone Form components

  /**
   * ### DNSZoneForm.setDomain()
   *
   * Sets the value for Domain
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setDomain: function (value) {
    var me = this;
    return this
      .getDomainTxtIn().clear().then(function () {
        me.getDomainTxtIn()
          .sendKeys(value);
      });
  },

  /**
   * ### DNSZoneForm.getDomain()
   *
   * Gets the value from the Domain Txt In
   *
   * @returns {Object} Promise
   */
  getDomain: function () {
    return this
      .getDomainTxtIn()
      .getAttribute('value');
  },

  /**
   * ### DNSZoneForm.getDomain()
   *
   * Gets the value from the SOA TTL Txt In
   *
   * @returns {Object} Promise
   */
  getSOAttl: function () {
    return this
      .getSOAttlTxtIn()
      .getAttribute('value');
  },

  /**
   * ### DNSZoneForm.getRefresh()
   *
   * Gets the value from the Refresh Txt In
   *
   * @returns {Object} Promise
   */
  getRefresh: function () {
    return this
      .getRefreshTxtIn()
      .getAttribute('value');
  },

  /**
   * ### DNSZoneForm.getRetry()
   *
   * Gets the value from the Retry Txt In
   *
   * @returns {Object} Promise
   */
  getRetry: function () {
    return this
      .getRetryTxtIn()
      .getAttribute('value');
  },

  /**
   * ### DNSZoneForm.getExpire()
   *
   * Gets the value from the Expire Txt In
   *
   * @returns {Object} Promise
   */
  getExpire: function () {
    return this
      .getExpireTxtIn()
      .getAttribute('value');
  },

  /**
   * ### DNSZoneForm.getNXttl()
   *
   * Gets the value from the NX TTL Txt In
   *
   * @returns {Object} Promise
   */
  getNXttl: function () {
    return this
      .getNXttlTxtIn()
      .getAttribute('value');
  },

  /**
   * ### DNSZoneForm.setSOAttl()
   *
   * Sets the value for SOA TTL Txt In
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setSOAttl: function (value) {
    var me = this;
    return this
      .getSOAttlTxtIn().clear().then(function () {
        me.getSOAttlTxtIn()
          .sendKeys(value);
      });
  },

  /**
   * ### DNSZoneForm.setRefresh()
   *
   * Sets the value for Refresh Txt In
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setRefresh: function (value) {
    var me = this;
    return this
      .getRefreshTxtIn().clear().then(function () {
        me.getRefreshTxtIn()
          .sendKeys(value);
      });
  },

  /**
   * ### DNSZoneForm.setRetry()
   *
   * Sets the value for Retry Txt In
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setRetry: function (value) {
    var me = this;
    return this
      .getRetryTxtIn().clear().then(function () {
        me.getRetryTxtIn()
          .sendKeys(value);
      });
  },

  /**
   * ### DNSZoneForm.setExpire()
   *
   * Sets the value for Expire Txt In
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setExpire: function (value) {
    var me = this;
    return this
      .getExpireTxtIn().clear().then(function () {
        me.getExpireTxtIn()
          .sendKeys(value);
      });
  },

  /**
   * ### DNSZoneForm.setNXttl()
   *
   * Sets the value for NX TTL Txt In
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setNXttl: function (value) {
    var me = this;
    return this
      .getNXttlTxtIn().clear().then(function () {
        me.getNXttlTxtIn()
          .sendKeys(value);
      });
  },

  /**
   * ### DNSZoneForm.setAccount()
   *
   * Sets a new value for `Account` drop-down
   *
   * @param {String} accounts, array of companies
   *
   * @returns {Object} Promise
   */
  setAccount: function (accounts) {
    for (var i = 0, len = accounts.length; i < len; i++) {
      var account = accounts[i];
      var option = this
        .getCompanyDDown()
        .setValue(account);
      if (i === len - 1) {
        return option;
      }
    }
  },

  // ## Helper Methods

  /**
   * ### DNSZoneForm.isDisplayed()
   *
   * Checks whether the DNS Zone Form is displayed or not in the UI
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
      .getDomainTxtIn()
      .isPresent();
  },

  /**
   * ### DNSZoneForm.fill()
   *
   * Helper method that fills the DNS Zone Form given specified DNS Zone
   * data object
   *
   * @param {object} zone, user data with the following schema
   *
   *    {
   *      domain: String,
   *      account: String,
   *    }
   */
  fill: function (zone) {
    var me = this;

    element.all(by.model(this.locators.textInputs.domain.model))
      .then(function (elements) {
        if (zone.domain !== undefined && elements.length > 0) {
          me.setDomain(zone.domain);
        }
      });

    element.all(by.model(this.locators.textInputs.soaTTL.model))
      .then(function (elements) {
        if (zone.soaTTL !== undefined && elements.length > 0) {
          me.setSOAttl(zone.soaTTL);
        }
      });

    element.all(by.model(this.locators.textInputs.refresh.model))
      .then(function (elements) {
        if (zone.refresh !== undefined && elements.length > 0) {
          me.setRefresh(zone.refresh);
        }
      });

    element.all(by.model(this.locators.textInputs.retry.model))
      .then(function (elements) {
        if (zone.retry !== undefined && elements.length > 0) {
          me.setRetry(zone.retry);
        }
      });

    element.all(by.model(this.locators.textInputs.expire.model))
      .then(function (elements) {
        if (zone.expire !== undefined && elements.length > 0) {
          me.setExpire(zone.expire);
        }
      });

    element.all(by.model(this.locators.textInputs.nxTTL.model))
      .then(function (elements) {
        if (zone.nxTTL !== undefined && elements.length > 0) {
          me.setNXttl(zone.nxTTL);
        }
      });

    element.all(by.id(this.locators.dropDowns.account.id))
      .then(function (elements) {
        if (zone.account !== undefined && elements.length > 0) {
          me.setAccount(zone.account);
        }
      });

  }
};

module.exports = DNSZoneForm;
