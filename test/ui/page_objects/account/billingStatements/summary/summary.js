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
    container: {
      css: '.subscription-summary'
    },
    elements: {
      currentBillingPlan: {
        css: '.table:nth-of-type(1) tr:nth-of-type(1) td:nth-of-type(2)'
      },
      totalPayments: {
        css: '.table:nth-of-type(1) tr:nth-of-type(2) td:nth-of-type(2)'
      },
      currentBalance: {
        css: '.table:nth-of-type(1) tr:nth-of-type(3) td:nth-of-type(2)'
      },
      subscriberSince: {
        css: '.table:nth-of-type(1) tr:nth-of-type(4) td:nth-of-type(2)'
      },
      nextBilling: {
        css: '.table:nth-of-type(1) tr:nth-of-type(5) td:nth-of-type(2)'
      },
      status: {
        css: '.table:nth-of-type(1) tr:nth-of-type(6) td:nth-of-type(2)'
      },
      activeSince: {
        css: '.table:nth-of-type(1) tr:nth-of-type(7) td:nth-of-type(2)'
      },
      firstName: {
        css: '.table:nth-of-type(2) tr:nth-of-type(1) td:nth-of-type(2)'
      },
      lastName: {
        css: '.table:nth-of-type(2) tr:nth-of-type(2) td:nth-of-type(2)'
      },
      cardNumber: {
        css: '.table:nth-of-type(2) tr:nth-of-type(3) td:nth-of-type(2)'
      },
      cardExpDate: {
        css: '.table:nth-of-type(2) tr:nth-of-type(4) td:nth-of-type(2)'
      }
    },
    buttons: {
      changeBillingPlan: {
        css: '.table:nth-of-type(1) tr:nth-of-type(1) td:nth-of-type(2) a'
      },
      viewDetails: {
        css: '.table:nth-of-type(1) tr:nth-of-type(5) td:nth-of-type(2) a'
      },
      updatePaymentProfile: {
        css: '.table:nth-of-type(2) tr:nth-of-type(3) td:nth-of-type(2) a'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  getContainer: function () {
    return element(by.css(this.locators.container.css));
  },

  getCurrentBillingPlanEl: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.elements.currentBillingPlan.css));
  },
  getTotalPaymentsEl: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.elements.totalPayments.css));
  },
  getCurrentBalanceEl: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.elements.currentBalance.css));
  },
  getSubscriberSinceEl: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.elements.subscriberSince.css));
  },
  getNextBillingEl: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.elements.nextBilling.css));
  },
  getStatusEl: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.elements.status.css));
  },
  getActiveSinceEl: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.elements.activeSince.css));
  },

  getFirstNameEl: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.elements.firstName.css));
  },
  getLastNameEl: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.elements.lastName.css));
  },
  getCardNumberEl: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.elements.cardNumber.css));
  },
  getCardExpDateEl: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.elements.cardExpDate.css));
  },

  getChangeBillingPlanBtn: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.buttons.changeBillingPlan.css));
  },
  getViewDetailsBtn: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.buttons.viewDetails.css));

  },
  getUpdatePaymentProfileBtn: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.buttons.updatePaymentProfile.css));
  },

  // ## Methods to interact with the Summary Page components

  getCurrentBillingPlan: function () {
    return this
      .getCurrentBillingPlanEl()
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
