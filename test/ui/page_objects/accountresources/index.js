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

// # All Account Resources Page Object

var AllAccountResourcesPage = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    buttons: {
      back: {
        linkText: 'Back'
      },
      refresh: {
        css: '#btn-refresh-page-data',
        id: 'btn-refresh-page-data'
      }
    },
    labels: {
      title: {
        css: '.page-title'
      }
    }

  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### AllAccountResourcesPage.getTitleLbl()
   *
   * Returns the Title element from the page.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.css(this.locators.labels.title.css));
  },
  /**
   * ### AllAccountResourcesPage.getBackBtn()
   *
   * Returns the reference to the `Back` button (Selenium WebDriver
   * Element) from the All Account Resources page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.back.linkText));
  },
  /**
   * ### AllAccountResourcesPage.getRefreshBtn()
   *
   * Returns the reference to the `Refresh` button (Selenium WebDriver
   * Element) from the All Account Resources page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getRefreshBtn: function () {
    return element(by.css(this.locators.buttons.refresh.css));
  },

  // ## Helper Methods

  /**
   * ### AllAccountResourcesPage.clickRefreshButton()
   *
   * Triggers a click to the `Back` button from the All Account Resources
   * page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  clickBackButton: function (callback) {
    return this
      .getBackBtn()
      .click();
  },
  /**
   * ### AllAccountResourcesPage.clickRefreshButton()
   *
   * Triggers a click to the `Refresh` button from the All Account Resources
   * page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  clickRefreshButton: function (callback) {
    return this
      .getRefreshBtn()
      .click();
  },
  /**
   * ### AllAccountResourcesPage.getTitle()
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
};

module.exports = AllAccountResourcesPage;
