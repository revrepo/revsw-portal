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

  baseUrl: 'https://www.mailinator.com/inbox2.jsp',

  waitTimeout: 180000, // 180 seconds | 3 minutes

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    links: {
      email: {
        repeater: 'email in emails'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### Portal.loadInboxFor()
   *
   * Loads the Mailinator URL pointing to the inbox for the given email ID.
   *
   * @param {String} emailId
   * @returns {Object} Promise
   */
  loadFor: function (emailId) {
    var url = this.baseUrl + '?public_to=' + emailId + '#/#public_maildirdiv';
    return browser.get(url);
  },

  getAllEmailEls: function () {
    return element.all(by.repeater(this.locators.links.email.repeater));
  },

  getLastEmailEl: function () {
    return this
      .getAllEmailEls()
      .get(0);
  },

  // ## Methods to interact with the components from the Page Object

  // ## Helper Methods

  waitForInbox: function () {
    var me = this;
    browser.wait(function () {
      browser.refresh();
      return me.getAllEmailEls().length > 0;
    }, this.waitTimeout);
  },

  openLastEmail: function () {
    return this
      .getLastEmailEl()
      .click();
  }

};

module.exports = Mailinator;