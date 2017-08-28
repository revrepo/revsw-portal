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

// # Sign Up Page Object

var BROWSER_WAIT_TIMEOUT = 16000;

var SignUpForm = require('./signUpForm');

// This `Sign Up` Page Object abstracts all operations or actions that a
// common user could do in the Sign Up page from the Portal app/site.
var SignUp = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    links: {
      termsOfService: {
        linkText: 'Terms Of Service'
      },
      usePolicy: {
        linkText: 'Acceptable Use Policy'
      },
      privacyPolicy: {
        linkText: 'Privacy Policy'
      }
    }
  },

  form: SignUpForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### SignUpPage.getTermsOfServiceLnk()
   *
   * Returns the Terms of Service from the page.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTermsOfServiceLnk: function () {
    return element(
      by.partialLinkText(this.locators.links.termsOfService.linkText));
  },

  /**
   * ### SignUpPage.getUsePolicyLnk()
   *
   * Returns the Use Policy from the page.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getUsePolicyLnk: function () {
    return element(by.partialLinkText(this.locators.links.usePolicy.linkText));
  },

  /**
   * ### SignUpPage.getPrivacyLnk()
   *
   * Returns the Privacy Policy from the page.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPrivacyLnk: function () {
    return element(
      by.partialLinkText(this.locators.links.privacyPolicy.linkText));
  },

  // ## Methods to interact with the User List Page components

  /**
   * ### SignUpPage.clickTermsOfService()
   *
   * Clicks `Terms of Service` link
   *
   * @returns {Object} Promise
   */
  clickTermsOfService: function () {
    return this
      .getTermsOfServiceLnk()
      .click();
  },

  /**
   * ### SignUpPage.clickUsePolicy()
   *
   * Clicks `Use Policy` link
   *
   * @returns {Object} Promise
   */
  clickUsePolicy: function () {
    return this
      .getUsePolicyLnk()
      .click();
  },

  /**
   * ### SignUpPage.clickPrivacyPolicy()
   *
   * Clicks `Private Policy` link
   *
   * @returns {Object} Promise
   */
  clickPrivacyPolicy: function () {
    return this
      .getPrivacyLnk()
      .click();
  },

  // Represents the verification message container that is displayed after
  // submitting the `sign up` form successfully.
  verificationMessage: {

    locators: {
      container: {
        css: '.verification-msg'
      },
      labels: {
        email: {
          css: 'p.lead b'
        }
      }
    },

    /**
     * ### SignUpPage.verificationMessage.getContainerEl()
     *
     * Gets the container element for verification message area.
     *
     * @returns {Object} Promise
     */
    getContainerEl: function () {
      return element(by.css(this.locators.container.css));
    },

    /**
     * ### SignUpPage.verificationMessage.getEmailAddressEl()
     *
     * Returns the email address element displayed in the verification message
     *
     * @returns {Object} Promise
     */
    getEmailAddressEl: function () {
      return this
        .getContainerEl()
        .element(by.css(this.locators.labels.email.css));
    },

    /**
     * ### SignUpPage.verificationMessage.getEmailAddress()
     *
     * Returns the email address value displayed in the verification message
     *
     * @returns {Object} Promise
     */
    getEmailAddress: function () {
      return this
        .getEmailAddressEl()
        .getText();
    },
    
    waitToDisplay: function () {
      var me = this;
      return browser.wait(function () {
        return browser.isElementPresent(by.css(me.locators.labels.email.css));
      }, BROWSER_WAIT_TIMEOUT);
    }
  }

  // ## Helper Methods

};

module.exports = SignUp;
