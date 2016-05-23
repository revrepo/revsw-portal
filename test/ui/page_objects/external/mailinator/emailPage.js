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

// # Login Page Object

// This `Login` Page Object abstracts all operations or actions that a
// common user could do in the User List page from the Portal app/site.
var Mailinator = {

  //baseUrl: 'https://www.mailinator.com/inbox2.jsp',

  waitTimeout: 180000, // 180 seconds | 3 minutes

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    elements: {
      email: {
        body: {
          css: '',
          links: {
            css: 'a'
          }
        }
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### EmailPage.getBodyEl()
   *
   * Returns the email body element
   *
   * @returns {Object} Promise
   */
  getBodyEl: function () {
    return element(by.css(this.locators.elements.email.body.css));
  },

  getAllBodyLinks: function () {
    return this
      .getBodyEl()
      .element
      .all(by.css(this.locators.elements.email.body.links.css));
  },

  // ## Methods to interact with the components from the Page Object

  // ## Helper Methods

  getFirstLink: function () {
    return this
      .getAllBodyLinks()
      .get(0);
  }
};

module.exports = Mailinator;