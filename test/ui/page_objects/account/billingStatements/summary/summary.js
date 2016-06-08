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

// # Summary Page Object

// Requiring other Page Objects that compound the Sumamry Page one
//var StatementTable = require('./table/table');
//var Pager = require('./../../../common/pager');
//var Searcher = require('./../../../common/searcher');

// This `Summary` Page Object abstracts all operations or actions
// that a common user could do in the Summary page from the Portal app/site.
var Summary = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    elements: {
      currentBillingPlan: {
        css: '.subscription-summary td.ng-binding:nth-of-type(1)'
      },
      totalPayments: {
        css: '.subscription-summary td.ng-binding:nth-of-type(2)'
      },
      currentBalance: {
        css: '.subscription-summary td.ng-binding:nth-of-type(3)'
      },
      subscriberSince: {
        css: '.subscription-summary td.ng-binding:nth-of-type(4)'
      },
      nextBilling: {
        css: '.subscription-summary td.ng-binding:nth-of-type(5)'
      },
      status: {
        css: '.subscription-summary td.ng-binding:nth-of-type(6)'
      },
      activeSince: {
        css: '.subscription-summary td.ng-binding:nth-of-type(7)'
      },
      firstName: {
        css: '.subscription-summary td.ng-binding:nth-of-type(8)'
      },
      lastName: {
        css: '.subscription-summary td.ng-binding:nth-of-type(9)'
      },
      cardNumber: {
        css: '.subscription-summary td strong'
      },
      cardExpDate: {
        css: '.subscription-summary td:last'
      }
    },
    buttons: {
      changeBillingPlan: {
        css: '.subscription-summary td.ng-binding:nth-of-type(1) a'
      },
      viewDetails: {
        css: '.subscription-summary td.ng-binding:nth-of-type(5) a'
      },
      updatePaymentProfile: {
        partialLinkText: 'Update Payment Profile'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  getCurrentBillingPlanEl: function () {
    return element(by.css(this.locators.elements.currentBillingPlan.css));
  },
  getTotalPaymentsEl: function () {
    return element(by.css(this.locators.elements.totalPayments.css));
  },
  getCurrentBalanceEl: function () {
    return element(by.css(this.locators.elements.currentBalance.css));
  },
  getSubscriberSinceEl: function () {
    return element(by.css(this.locators.elements.subscriberSince.css));
  },
  getNextBillingEl: function () {
    return element(by.css(this.locators.elements.nextBilling.css));
  },
  getStatusEl: function () {
    return element(by.css(this.locators.elements.status.css));
  },
  getActiveSinceEl: function () {
    return element(by.css(this.locators.elements.activeSince.css));
  },

  getFirstNameEl: function () {
    return element(by.css(this.locators.elements.firstName.css));
  },
  getLastNameEl: function () {
    return element(by.css(this.locators.elements.lastName.css));
  },
  getCardNumberEl: function () {
    return element(by.css(this.locators.elements.cardNumber.css));
  },
  getCardExpDateEl: function () {
    return element(by.css(this.locators.elements.cardExpDate.css));
  },

  getChangeBillingPlanBtn: function () {
    return element(by.css(this.locators.buttons.changeBillingPlan.css));
  },
  getViewDetailsBtn: function () {
    return element(by.css(this.locators.buttons.viewDetails.css));

  },
  getUpdatePaymentProfileBtn: function () {
    return element(by.partialLinkText(
      this.locators.buttons.updatePaymentProfile.partialLinkText));
  },

  // ## Methods to interact with the Summary Page components

  getCurrentBillingPlan: function () {
    return this
      .getCurrentBalanceEl()
      .getText();
  },
  getTotalPayments: function () {
    return this
      .getTotalPaymentsEl()
      .getText();
  },
  getCurrentBalance: function () {
    return this
      .getCurrentBalanceEl()
      .getText();
  },
  getSubscriberSince: function () {
    return this
      .getSubscriberSinceEl()
      .getText();
  },
  getNextBilling: function () {
    return this
      .getNextBillingEl()
      .getText();
  },
  getStatus: function () {
    return this
      .getStatusEl()
      .getText();
  },
  getActiveSince: function () {
    return this
      .getActiveSinceEl()
      .getText();
  },

  getFirstName: function () {
    return this
      .getFirstNameEl()
      .getText();
  },
  getLastName: function () {
    return this
      .getLastNameEl()
      .getText();
  },
  getCardNumber: function () {
    return this
      .getCardNumberEl()
      .getText();
  },
  getCardExpDate: function () {
    return this
      .getCardExpDateEl()
      .getText();
  },

  clickChangeBillingPlan: function () {
    return this
      .getChangeBillingPlanBtn()
      .click();
  },
  clickViewDetails: function () {
    return this
      .getViewDetailsBtn()
      .click();
  },
  clickUpdatePaymentProfile: function () {
    return this
      .getUpdatePaymentProfileBtn()
      .click();
  },

  // ## Helper Methods

};

module.exports = Summary;
