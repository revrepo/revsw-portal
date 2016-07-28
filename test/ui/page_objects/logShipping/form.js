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

// # Log Shipping Form Page Object

// Requiring constant values
var Constants = require('./../constants');

var DropDownWidget = require('./../common/dropDownWidget');

// This `Log Shipping Form` Page Object abstracts all operations or actions that a
// common user could do in the Add Log Shipping page from the Portal
// app/site.
var LogShippingForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      jobName: {
        model: 'model.job_name'
      },
      host: {
        id: 'Host'
      },
      port: {
        id: 'destination_port'
      },
      secretKey: {
        id: 'destination_key'
      },
      userName: {
        id: 'destination_username'
      },
      password: {
        id: 'destination_password'
      },
      emailForProblemNotification: {
        id: 'notification_email'
      },
      comment: {
        id: 'comment'
      }
    },
    dropDowns: {
      account: {
        id: 'account_id'
      },
      setCurrentMode:{
        id: 'operational_mode'
      },
      sourceType:{
        id: 'source_type'
      },
      sourceDomain: {
        model: 'selectedDomainSourceId',
        css: 'div[name="sourceId"]'
      },
      destination: {
        id: 'destination_type'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### LogShippingForm.getJobNameTxtIn()
   *
   * Returns the reference to the `Domain Name` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getJobNameTxtIn: function () {
    return element(by.model(this.locators.textInputs.jobName.model));
  },

  /**
   * ### LogShippingForm.getHostTxtIn()
   *
   * Returns the reference to the `Host` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getHostTxtIn: function () {
    return element(by.id(this.locators.textInputs.host.id));
  },

  /**
   * ### LogShippingForm.getPortTxtIn()
   *
   * Returns the reference to the `Port` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPortTxtIn: function () {
    return element(by.id(this.locators.textInputs.port.id));
  },

  /**
   * ### LogShippingForm.getSecretKeyTxtIn()
   *
   * Returns the reference to the `Secret Key` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getSecretKeyTxtIn: function () {
    return element(by.id(this.locators.textInputs.secretKey.id));
  },

  /**
   * ### LogShippingForm.getUserNameTxtIn()
   *
   * Returns the reference to the `Username` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getUserNameTxtIn: function () {
    return element(by.id(this.locators.textInputs.userName.id));
  },

  /**
   * ### LogShippingForm.getPasswordTxtIn()
   *
   * Returns the reference to the `Password` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPasswordTxtIn: function () {
    return element(by.id(this.locators.textInputs.password.id));
  },

  /**
   * ### LogShippingForm.getEmailTxtIn()
   *
   * Returns the reference to the `Email For Problem Notifications` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getEmailTxtIn: function () {
    return element(by.id(this.locators.textInputs.emailForProblemNotification.id));
  },

  /**
   * ### LogShippingForm.getCommentTxtIn()
   *
   * Returns the reference to the `Comment` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCommentTxtIn: function () {
    return element(by.id(this.locators.textInputs.comment.id));
  },

  /**
   * ### LogShippingForm.getCompanyDDown()
   *
   * Returns the reference to the `Account` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCompanyDDown: function () {
    return new DropDownWidget(by.id(this.locators.dropDowns.account.id));
  },

  /**
   * ### LogShippingForm.getCurrentModeDDown()
   *
   * Returns the reference to the `Set Current Mode` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCurrentModeDDown: function () {
    return element(by.id(this.locators.dropDowns.setCurrentMode.id));
  },

  /**
   * ### LogShippingForm.getSourceTypeDDown()
   *
   * Returns the reference to the `Source Type` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getSourceTypeDDown: function () {
    return element(by.id(this.locators.dropDowns.sourceType.id));
  },

  /**
   * ### LogShippingForm.getSourceDomainDDown()
   *
   * Returns the reference to the `Source Domain` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getSourceDomainDDown: function () {
    return element(by.css(this.locators.dropDowns.sourceDomain.css));
  },

  /**
   * ### LogShippingForm.getDestinationDDown()
   *
   * Returns the reference to the `Destination` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDestinationDDown: function () {
    return element(by.id(this.locators.dropDowns.destination.id));
  },

  // ## Methods to interact with the Log Shipping Form components

  /**
   * ### LogShippingForm.setJobName()
   *
   * Sets the value for Job Name
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setJobName: function (value) {
    return this
      .getJobNameTxtIn()
      .sendKeys(value);
  },

  clearJobName: function () {
    var me = this;
    return this
        .getJobNameTxtIn()
        .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'))
        .then(function () {
          me.getJobNameTxtIn().sendKeys(protractor.Key.BACK_SPACE);
        });
  },

  getJobName: function () {
    return this
        .getJobNameTxtIn()
        .getText();
  },

  /**
   * ### LogShippingForm.setHost()
   *
   * Sets the value for Host
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setHost: function (value) {
    return this
        .getHostTxtIn()
        .sendKeys(value);
  },

  /**
   * ### LogShippingForm.setPort()
   *
   * Sets the value for Port
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setPort: function (value) {
    return this
        .getPortTxtIn()
        .sendKeys(value);
  },

  /**
   * ### LogShippingForm.setSecretKey()
   *
   * Sets the value for Secret Key
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setSecretKey: function (value) {
    return this
        .getSecretKeyTxtIn()
        .sendKeys(value);
  },

  /**
   * ### LogShippingForm.setUserName()
   *
   * Sets the value for User Name
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setUserName: function (value) {
    return this
        .getUserNameTxtIn()
        .sendKeys(value);
  },

  /**
   * ### LogShippingForm.setPassword()
   *
   * Sets the value for Password
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setPassword: function (value) {
    return this
        .getPasswordTxtIn()
        .sendKeys(value);
  },

  /**
   * ### LogShippingForm.setEmail()
   *
   * Sets the value for Email
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setEmail: function (value) {
    return this
        .getEmailTxtIn()
        .sendKeys(value);
  },

  /**
   * ### LogShippingForm.setComment()
   *
   * Sets the value for Comment
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setComment: function (value) {
    return this
        .getCommentTxtIn()
        .sendKeys(value);
  },

  /**
   * ### LogShippingForm.setAccount()
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

  /**
   * ### LogShippingForm.setCurrentMode()
   *
   * Sets a new value for `Set Current Mode` drop-down
   *
   * @param {String} mode, name of mode
   *
   * @returns {Object} Promise
   */
  setCurrentMode: function (mode) {
    this.getCurrentModeDDown()
        .sendKeys(mode);
  },

  /**
   * ### LogShippingForm.setSourceType()
   *
   * Sets a new value for `Source Type` drop-down
   *
   * @param {String} type, value of source type
   *
   * @returns {Object} Promise
   */
  setSourceType: function (type) {
    this.getSourceTypeDDown()
        .sendKeys(type);
  },

  /**
   * ### LogShippingForm.setSourceDomain()
   *
   * Sets a new value for `Source Domain` drop-down
   *
   * @param {String} value, value of source domain
   *
   * @returns {Object} Promise
   */
  setSourceDomain: function (value) {
    var me = this;
    return this.getSourceDomainDDown()
        .click().then(function () {
        browser.actions().sendKeys(value)
            .perform();
          browser.actions().sendKeys(protractor.Key.ENTER)
              .perform();
      });
  },

  /**
   * ### LogShippingForm.setDestination()
   *
   * Sets a new value for `Destination` drop-down
   *
   * @param {String} value, value of destination
   *
   * @returns {Object} Promise
   */
  setDestination: function (value) {
    this.getDestinationDDown()
        .sendKeys(value);
  },

  // ## Helper Methods

  /**
   * ### LogShippingForm.isDisplayed()
   *
   * Checks whether the Log Shipping Form is displayed or not in the UI
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
        .getJobNameTxtIn()
        .isPresent();
  },

  /**
   * ### LogShippingForm.fill()
   *
   * Helper method that fills the Log Shipping Form given specified Log Shipping
   * data object
   *
   * @param {object} job, user data with the following schema
   *
   *    {
   *      name: String,
   *      account: String,
   *    }
   */
  fill: function (job) {
    if (job.name !== undefined) {
      this.clearJobName();
      this.setJobName(job.name);
    }

    var me = this;

    element.all(by.id(this.locators.dropDowns.account.id))
        .then(function (elements) {
          if (job.account !== undefined && elements.length > 0) {
            me.setAccount(job.account);
          }
        });

    element.all(by.id(this.locators.dropDowns.setCurrentMode.id))
        .then(function (elements) {
          if (job.currentMode !== undefined && elements.length > 0) {
            me.setCurrentMode(job.currentMode);
          }
        });

    element.all(by.id(this.locators.dropDowns.sourceType.id))
        .then(function (elements) {
          if (job.sourceType !== undefined && elements.length > 0) {
            me.setSourceType(job.sourceType);
          }
        });

    element.all(by.id(this.locators.dropDowns.destination.id))
        .then(function (elements) {
          if (job.destination !== undefined && elements.length > 0) {
            me.setDestination(job.destination);
          }
        });

    element.all(by.id(this.locators.textInputs.host.id))
        .then(function (elements) {
          if (job.host !== undefined && elements.length > 0) {
            me.setHost(job.host);
          }
        });

    element.all(by.id(this.locators.textInputs.port.id))
        .then(function (elements) {
          if (job.port !== undefined && elements.length > 0) {
            me.setPort(job.port);
          }
        });

    element.all(by.id(this.locators.textInputs.secretKey.id))
        .then(function (elements) {
          if (job.secretKey !== undefined && elements.length > 0) {
            me.setSecretKey(job.secretKey);
          }
        });

    element.all(by.id(this.locators.textInputs.userName.id))
        .then(function (elements) {
          if (job.userName !== undefined && elements.length > 0) {
            me.setUserName(job.userName);
          }
        });

    element.all(by.id(this.locators.textInputs.password.id))
        .then(function (elements) {
          if (job.password !== undefined && elements.length > 0) {
            me.setPassword(job.password);
          }
        });

    element.all(by.id(this.locators.textInputs.emailForProblemNotification.id))
        .then(function (elements) {
          if (job.email !== undefined && elements.length > 0) {
            me.setEmail(job.email);
          }
        });

    element.all(by.id(this.locators.textInputs.comment.id))
        .then(function (elements) {
          if (job.comment !== undefined && elements.length > 0) {
            me.setComment(job.comment);
          }
        });

    element.all(by.css(this.locators.dropDowns.sourceDomain.css))
        .then(function (elements) {
          if (job.sourceDomain !== undefined && elements.length > 0) {
            me.setSourceDomain(job.sourceDomain);
          }
        });
  }
};

module.exports = LogShippingForm;
