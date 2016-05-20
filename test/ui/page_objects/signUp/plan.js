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

  var containerEl = titleEl.getDriver().getDriver();

  return {

    // ## Properties

    // Locators specific to HTML elements from this page object
    locators: {
      buttons: {
        subscribe: {
          linkText: 'Subscribe'
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
     * Returns the Header Element that containss the title.
     *
     * @returns {Object} Selenium WebDriver Element
     */
    getHeaderEl: function () {
      return containerEl
        .element(by.css(this.locators.elements.header.css));
    },

    getActionEl: function () {
      return containerEl
        .element(by.css(this.locators.elements.action.css));
    },

    getTitleEl: function () {
      return containerEl
        .getHeaderEl()
        .element(by.css(this.locators.labels.title.css));
    },

    getSubscribeBtn: function () {
      return containerEl
        .getActionEl()
        .element(by.partialLinkText(this.locators.buttons.subscribe));
    },

    getContactUsBtn: function () {
      return containerEl
        .getActionEl()
        .element(by.partialLinkText(this.locators.buttons.contactUs));
    },

    // ## Methods to interact with the User List Page components

    getTitle: function () {
      return this
        .getTitleEl()
        .getText();
    },

    clickSubscribe: function () {
      return this
        .getSubscribeBtn()
        .click();
    },

    clickContactUs: function () {
      return this
        .getContactUsBtn()
        .click();
    }

    // ## Helper Methods

  };
};

module.exports = PlanElement;
