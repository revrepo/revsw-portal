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

  baseUrl: 'https://www.mailinator.com',///inbox2.jsp',

  waitTimeout: 180000, // 180 seconds | 3 minutes

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    buttons: {
      go: {
        //css: '.btn.btn-sm.btn-dark'
        css: 'button[onclick*=changeInbox]'
      }
    },
    links: {
      email: {
        repeater: 'email in emails'
      }
    },
    textFields: {
      inbox: {
        //id: 'publicinboxfield'
        id: 'inboxfield'
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
   * @returns {Object} Promise
   */
  load: function () {
    return browser.get(this.baseUrl);
  },

  getInboxTxtIn: function () {
    return element(by.id(this.locators.textFields.inbox.id));
  },

  getGoBtn: function () {
    return element(by.css(this.locators.buttons.go.css));
  },

  getAllEmailEls: function () {
    //return element.all(by.repeater(this.locators.links.email.repeater));
    return element.all(by.css('div[onclick*=showTheMessage]'));
  },

  getLastEmailEl: function () {
    return this
      .getAllEmailEls()
      .get(0);
  },

  // ## Methods to interact with the components from the Page Object

  setInbox: function (value) {
    return this
      .getInboxTxtIn()
      .sendKeys(value);
  },

  clickGo: function () {
    return this
      .getGoBtn()
      .click();
  },

  // ## Helper Methodsemail

  waitForInbox: function (email) {

    console.log('browser.ignoreSynchronization', browser.ignoreSynchronization);
    var localName = email.split('@')[0];
    var me = this;
    me.setInbox(localName);
    me.clickGo();
    browser.sleep(3000);
    browser.wait(function () {
      me.clickGo();
      browser.sleep(1000); // every one sec
      return me
        .getAllEmailEls()
        .then(function (elements) {
          return elements.length > 0;
        });
    }, this.waitTimeout);
  },

  openLastEmail: function () {
    return this
      .getLastEmailEl()
      //.element(by.css('div[onclick*=showTheMessage]'))
      .click();
  }

};

module.exports = Mailinator;