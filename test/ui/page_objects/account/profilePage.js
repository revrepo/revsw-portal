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

// # Account Profile Page Object

var AccountProfileForm = require('./profileForm');

// This `Account Profile` Page Object abstracts all operations or actions that a
// common user could do in the Account Profile page from the Portal app/site.
var AccountProfilePage = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    buttons: {
      updatePaymentProfile: {
        linkText: 'Update Payment Profile'
      },
      deleteCompanyProfile: {
        buttonText: 'Delete Company Profile'
      }
    },
    labels: {
      title: {
        css: '.page-title'
      }
    }
  },

  form: AccountProfileForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### AccountProfilePage.getTitleLbl()
   *
   * Returns the Title element from the page.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.css(this.locators.labels.title.css));
  },

  /**
   * ### AccountProfilePage.getUpdatePaymentProfileBtn()
   *
   * Returns the Update Company Profile button from the page.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getUpdatePaymentProfileBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.updatePaymentProfile.linkText));
  },

  /**
   * ### AccountProfilePage.getDeleteCompanyProfileBtn()
   *
   * Returns the Delete Company Profile button from the page.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDeleteCompanyProfileBtn: function () {
    return element(
      by.partialButtonText(
        this.locators.buttons.deleteCompanyProfile.buttonText));
  },

  // ## Methods to interact with the User List Page components

  /**
   * ### AccountProfilePage.getTitle()
   *
   * Return the title
   *
   * @returns {Object} Promise
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .click();
  },

  /**
   * ### AccountProfilePage.clickUpdatePaymentProfile()
   *
   * Clicks `Update Payment Profile` button
   *
   * @returns {Object} Promise
   */
  clickUpdatePaymentProfile: function () {
    return this
      .getUpdatePaymentProfileBtn()
      .click();
  },

  /**
   * ### AccountProfilePage.clickDeleteCompanyProfile()
   *
   * Clicks `Delete Company Profile` link
   *
   * @returns {Object} Promise
   */
  clickDeleteCompanyProfile: function () {
    return this
      .getDeleteCompanyProfileBtn()
      .click();
  }

  // ## Helper Methods

};

module.exports = AccountProfilePage;
