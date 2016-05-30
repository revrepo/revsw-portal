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

// # Billing Plan Page Object

var Plan = require('./../signUp/plan');

// This `Billing Plan ` Page Object abstracts all operations or actions that a
// common user could do in the Plans List page from the Portal app/site.
var BillingPlan = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        css: '.page-title'
      },
      enterprise: {
        css: 'h2'
      },
      plan: {
        css: 'h2.billing-plan-title'
      }
    },
    links: {
      signIn: {
        linkText: 'sign in if you already have an account'
      },
      contactUs: {
        linkText: 'Talk to an expert'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### PlansList.getTitleLbl()
   *
   * Returns the reference to the `Title` element (Selenium WebDriver
   * Element) from the Billing Plan page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.css(this.locators.labels.title.css));
  },

  /**
   * ### PlansList.getPlanEl()
   *
   * Returns a Plan element rom the list.
   *
   * @param {String} title, of the Plan element that is going to be returned.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPlanEl: function (title) {
    var plan;
    plan = element(by.cssContainingText(this.locators.labels.plan.css, title));
    return new Plan(plan);
  },

  // ## Methods to interact with the User List Page components

  /**
   * ### GoodBye.getTitle()
   *
   * Returns the `Title` element from the Good Bye page from the Portal app.
   *
   * @returns {Object} Promise
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  }
  // ## Helper Methods

};

module.exports = BillingPlan;
