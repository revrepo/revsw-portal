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

// # Help Page Object

// This `DNSAnalytics` Object abstracts all operations or actions that
// a common DNS Analytics could do in the Portal app/site.
var DNSAnalytics = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: {
      css: 'div .dns_analytics'
    },
    title: {
      id: 'title-page'
    }

  },
  /**
   * ### DNSAnalytics.getContentText()
   *
   * Gets the text  from `DNS Analytics` block view element core/text.
   *
   * @returns {Promise}
   */
  getContentText: function () {
    return element(by.css(this.locators.container.css)).getText();
  },

  /**
   * ### DNSAnalytics.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the DNS Analytics page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */

  getTitleLbl: function () {
    return element(by.id(this.locators.title.id));
  },
 /**
   * ### DNSAnalytics.getTitle()
   *
   * Gets the title from `DNS Analytics` Page.
   *
   * @returns {Promise}
   */
  getTitleText: function () {
    return this.getTitleLbl().getText();
  },

  /**
   * ### DNSAnalytics.isDisplayed()
   *
   * Checks whether the DNS Analytics page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this.getTitleLbl()
      .isPresent();
  },
}

module.exports = DNSAnalytics;
