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

// # Billing Statements and Transactions Page Object

var Summary = require('./summary');
var Transactions = require('./transactions');
var Statements = require('./statements');

// This `Billing Statements and Transactions` Page Object abstracts all
// operations or actions that a common user could do in the Billing Statements
// and Transactions page from the Portal app/site.
var BSTPage = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        css: '.page-title'
      }
    }
  },

  summary: Summary,
  transactions: Transactions,
  statements: Statements,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### BSTPage.getTitleLbl()
   *
   * Returns the Title element from the page.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.css(this.locators.labels.title.css));
  },

  // ## Methods to interact with the User List Page components

  /**
   * ### BSTPage.getTitle()
   *
   * Return the title
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

module.exports = BSTPage;
