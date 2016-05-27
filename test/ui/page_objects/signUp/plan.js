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

// # Plan Element Page Object

// This `Plans List` Page Object abstracts all operations or actions that a
// common user could do in the Plans List page from the Portal app/site.
var PlanElement = function (titleEl) {

  var containerEl = titleEl
    .element(by.xpath('..'))
    .element(by.xpath('..'));

  return {

    // ## Properties

    // Locators specific to HTML elements from this page object
    locators: {
      buttons: {
        subscribe: {
          buttonText: 'Subscribe'
        },
        contactUs: {
          linkText: 'Contact Us'
        }
      },
      elements: {
        header: {
          css: '.billing-plan-header'
        },
        price: {
          css: '.billing-plan-price'
        },
        details: {
          css: '.billing-plan-details'
        },
        action: {
          css: '.billing-plan-action'
        }
      },
      labels: {
        title: {
          css: 'h2'
        }
      }
    },

    // ## Methods to retrieve references to UI elements (Selenium WebDriver
    // Element)

    /**
     * ### PlanElement.getHeaderEl()
     *
     * Returns the Header Element that contains the title.
     *
     * @returns {Object} Selenium WebDriver Element
     */
    getHeaderEl: function () {
      return containerEl
        .element(by.css(this.locators.elements.header.css));
    },

    /**
     * ### PlanElement.getActionEl()
     *
     * Returns the Action Element that contains the buttons.
     *
     * @returns {Object} Selenium WebDriver Element
     */
    getActionEl: function () {
      return containerEl
        .element(by.css(this.locators.elements.action.css));
    },

    /**
     * ### PlanElement.getTitleEl()
     *
     * Returns the Title Element that is inside the plan container element.
     *
     * @returns {Object} Selenium WebDriver Element
     */
    getTitleEl: function () {
      return this
        .getHeaderEl()
        .element(by.css(this.locators.labels.title.css));
    },

    /**
     * ### PlanElement.getSubscribeBtn()
     *
     * Returns Subscribe button from plan container.
     *
     * @returns {Object} Selenium WebDriver Element
     */
    getSubscribeBtn: function () {
      return this
        .getActionEl()
        .element(by.partialButtonText(
          this.locators.buttons.subscribe.buttonText));
    },

    /**
     * ### PlanElement.getContactUsBtn()
     *
     * Returns Contact Us button from plan container.
     *
     * @returns {Object} Selenium WebDriver Element
     */
    getContactUsBtn: function () {
      return this
        .getActionEl()
        .element(by.partialLinkText(this.locators.buttons.contactUs.linkText));
    },

    // ## Methods to interact with the User List Page components

    /**
     * ### PlanElement.getTitle()
     *
     * Returns the Title of the plan container.
     *
     * @returns {Object} Promise
     */
    getTitle: function () {
      return this
        .getTitleEl()
        .getText();
    },

    /**
     * ### PlanElement.clickSubscribe()
     *
     * Clicks on Subscribe link from page.
     *
     * @returns {Object} Promise
     */
    clickSubscribe: function () {
      return this
        .getSubscribeBtn()
        .click();
    },

    /**
     * ### PlanElement.clickContactUs()
     *
     * Clicks on Contact Us link from page.
     *
     * @returns {Object} Promise
     */
    clickContactUs: function () {
      return this
        .getContactUsBtn()
        .click();
    }

    // ## Helper Methods

  };
};

module.exports = PlanElement;
