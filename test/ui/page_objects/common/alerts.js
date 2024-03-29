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

// # Alerts Page Object

var BROWSER_WAIT_TIMEOUT = 10000;

// This `Alerts` Page Object abstracts all actions and operations that we
// could do with an Portal Alert notification element.
//
// It is important to highlight that this Alert notifications are displayed
// in different pages from the Portal app. Meaning this that this Page Object
// could be use to handle those alerts from any page from the Portal
var Alerts = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    alert: {
      css: '.toast'
    },
    alertGroup: {
      repeater: 'toaster in toasters'
    }
  },

  // ## Methods

  /**
   * ### Alerts.waitToDisplay()
   *
   * Waits/Delays the execution until Alert element is displayed in the UI.
   * If it is not displayed until the given timeout, it throws an error which
   * makes the spec/test to fail.
   *
   * @param milliseconds, to wait
   * @returns {Object} Promise
   */
  waitToDisplay: function (milliseconds) {
    var timeout = milliseconds || BROWSER_WAIT_TIMEOUT;
    var me = this;
    return browser.wait(function () {
      // console.log('Waiting for alert ...');
      return browser.isElementPresent(by.css(me.locators.alert.css));
    }, timeout);
  },

  /**
   * ### Alerts.getAll()
   *
   * Returns all Alerts (Selenium WebDriver Elements) that are displayed in the
   * notifications area from the Portal app.
   *
   * @returns {Object} Array of Selenium WebDriver Element
   */
  getAll: function () {
    return element.all(by.repeater(this.locators.alertGroup.repeater));
  },

  /**
   * ### Alerts.getFirst()
   *
   * Returns the first Alert (Selenium WebDriver Element) that is displayed in
   * the notifications area from the Portal app.
   *
   * @returns {Object} Array of Selenium WebDriver Element
   */
  getFirst: function () {
    return this
      .getAll()
      .get(0);
  }
};

module.exports = Alerts;