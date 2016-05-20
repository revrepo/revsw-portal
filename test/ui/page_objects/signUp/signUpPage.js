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
   * ### PlansList.getSignInLnk()
   *
   * Returns the link Element that returns to the Sign In page.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTermsOfServiceLnk: function () {
    return element(
      by.partialLinkText(this.locators.links.termsOfService.linkText));
  },

  getUsePolicyLnk: function () {
    return element(by.partialLinkText(this.locators.links.usePolicy.linkText));
  },

  getPrivacyLnk: function () {
    return e  lement(
      by.partialLinkText(this.locators.links.privacyPolicy.linkText));
  },

  // ## Methods to interact with the User List Page components

  clickTermsOfService: function () {
    return this
      .getTermsOfServiceLnk()
      .click();
  },

  clickUsePolicy: function () {
    return this
      .getUsePolicyLnk()
      .click();
  },

  clickPrivacyPolicy: function () {
    return this
      .getPrivacyLnk()
      .click();
  }

  // ## Helper Methods

};

module.exports = SignUp;
