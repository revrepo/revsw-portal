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

// # Plans List Page Object

var Plan = require('./plan');

// This `Plans List` Page Object abstracts all operations or actions that a
// common user could do in the Plans List page from the Portal app/site.
var PlansList = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      enterprise: {
        css: 'h2'
      },
      plan: {
        css: 'h2.billing-plan-title'
      },
      footer: {
        css: '.panel-footer > p'
      }
    },
    images: {
      css: {
        logo: '.img-responsive'
      }
    },
    copyright: {
      css: {
        brand: '.footerNoteA',
        secondBrand: 'p.text-center'
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
   * ### PlansList.getSignInLnk()
   *
   * Returns the link Element that returns to the Sign In page.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getSignInLnk: function () {
    return element(by.linkText(this.locators.links.signIn.linkText));
  },

  /**
   * ### PlansList.getContactUsLnk()
   *
   * Returns the Contact Us link element.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getContactUsLnk: function () {
    return element(by.linkText(this.locators.links.contactUs.linkText));
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

  getEnterprisePlanEl: function () {
    var plan;
    plan = element(
      by.cssContainingText(this.locators.labels.enterprise.css, 'Custom Solution'));
    return new Plan(plan);
  },

  /**
    * ### PlanElement.getFooterMessageEl()
    *
    * Returns the Footer Message Element that is inside the Footer container element.
    *
    * @returns {Object} Selenium WebDriver Element
    */
  getFooterMessageEl: function () {
    return element.all(by.css(this.locators.labels.footer.css)).get(0);
  },

  /**
    * ### PlanElement.getFooterMessageText()
    *
    * Returns the Text of the Footer.
    *
    * @returns {Object} Promise
    */
  getFooterMessageText: function () {
    return this
      .getFooterMessageEl()
      .getText();
  },

  // ## Methods to interact with the User List Page components

  /**
   * ### PlansList.clickSignIn()
   *
   * Clicks the link to return to Sign In page.
   *
   * @returns {Object} Promise
   */
  clickSignIn: function () {
    return this
      .getSignInLnk()
      .click();
  },

  /**
    * ### PlansList.clickLogo()
    *
    * Clicks the Logo picture to redirect to nuubit.com
    *
    * @returns {Object} Promise
    */
  clickLogo: function () {
    return this
      .getLogo()
      .click();
  },

  getLogo: function () {
    return element(by.css(this.locators.images.css.logo));
  },

  getBrand: function () {
    return element(by.css(this.locators.copyright.css.brand));
  },

  getSecondBrand: function () {
    return element(by.css(this.locators.copyright.css.secondBrand));
  },

  /**
   * ### PlansList.clickContactUs()
   *
   * Clicks the Contact Us link.
   *
   * @returns {Object} Promise
   */
  clickContactUs: function () {
    return this
      .getContactUsLnk()
      .click();
  }

  // ## Helper Methods

};

module.exports = PlansList;
