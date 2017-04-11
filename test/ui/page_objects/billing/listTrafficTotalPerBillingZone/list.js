/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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

// # Trafic Total Per Billing Zone List Page Object

// Requiring other Page Objects that compound the Traffic Total Per Billing Zone List Page one
var Table = require('./table/table');

// This `Trafic Total Per Billing Zone List` Page Object abstracts all operations or actions
// that a common user could do in the Trafic Total Per Billing Zone List from the Portal
// app/site.
var TraficTotalPerBillingZoneList = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: {
      css: '#domains_usage',
      id: 'domains_usage'
    },
    textInputs: {
      searcher: {
        css: 'input[type="search"]'
      }
    },
    label:{
      title: {
        css: 'h4.list-title'
      }
    }
  },

  // `Trafic Total Per Billing Zone List` Page is compound mainly by following components.
  table: Table,
  // pager: Pager,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  getContainer: function () {
    return element(by.css(this.locators.container.css));
  },

  getTitleTxtIn: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.textInputs.searcher.css));
  },

  // ## Methods to interact with the Trafic Total Per Billing Zone List Page components


  // ## Helper Methods

  /**
   * ### TraficTotalPerBillingZoneList.isDisplayed()
   *
   * Checks whether the Trafic Total Per Billing Zone List page is being displayed in the UI
   * or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    this.scrollToElementById(this.locators.container.id)
    return this
      .getTitleTxtIn()
      .isPresent();
  },

   /**
   * ### TrafficLevels.scrollToElementById()
   *
   * @param {Strting} id id name parent element
   * @returns {Object} Selenium WebDriver Element
   */
  scrollToElementById: function(id){
    return  browser.executeScript('arguments[0].scrollIntoView(true);',
     element(by.id(id)).getWebElement());
  }
};

module.exports = TraficTotalPerBillingZoneList;
