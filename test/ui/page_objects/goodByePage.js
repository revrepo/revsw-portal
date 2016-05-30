/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2015] Rev Software, Inc.
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

// # Good Bye Page Object

// This `Good Bye` Page Object abstracts all operations or actions that a
// common user could do in the User List page from the Portal app/site.
var GoodBye = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        css: '.goodbye-wrapper h5'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### GoodBye.getTitleLbl()
   *
   * Returns the reference to the `Title` element (Selenium WebDriver
   * Element) from the Good Bye page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.css(this.locators.labels.title.css));
  },

  // ## Methods to interact with the components from the Page Object

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

module.exports = GoodBye;