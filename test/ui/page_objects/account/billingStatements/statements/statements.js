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

// # Statements List Page Object

// Requiring other Page Objects that compound the Statements List Page one
var StatementTable = require('./table/table');
var Pager = require('./../../../common/pager');

// This `Statements List` Page Object abstracts all operations or actions
// that a common user could do in the Statements List page from the Portal
// app/site.
var StatementList = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: {
      css: '.panel-body'
    },
    textInputs: {
      searcher: {
        css: 'input[type="search"]'
      }
    }
  },

  // `Statement List` Page is compound mainly by following components.
  table: StatementTable,
  pager: Pager,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  getContainer: function () {
    return element.all(by.css(this.locators.container.css)).get(2);
  },

  getSearchTxtIn: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.textInputs.searcher.css));
  },

  // ## Methods to interact with the Statements List Page components


  // ## Helper Methods

  /**
   * ### StatementList.isDisplayed()
   *
   * Checks whether the Statements List page is being displayed in the UI
   * or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
      .getSearchTxtIn()
      .isDisplayed();
  }
};

module.exports = StatementList;
