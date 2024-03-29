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

// # TopObjects Page Object

// This `TopObjects` Page Object abstracts all operations or actions
// that a common TopObjects could do in the Portal app/site.

var TopObjects = {

 // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
	  },
    tabs: {
      css: '.nav-tabs > li'
    },
    headers: {
      css: '.nav-tabs > li:last-child'
    },
  },

  /**
     * ### TopObjects.getTopTabs()
     *
     * Returns the reference to the `Tabs Css` label element (Selenium WebDriver
     * Element) from the TopObjects page from the Portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
  getTopTabs: function () {
    return element
	  .all(by.css(this.locators.tabs.css));
  },

   /**
     * ### TopObjects.getTabTopObjectsWith5XXErrorCodes()
     *
     * Returns the reference to the `Headers Binding` label element (Selenium WebDriver
     * Element) from the TopObjects page from the Portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
  getTabTopObjectsWith5XXErrorCodes: function () {
    return this.getTopTabs()
	  .get(6);
  },

   /**
     * ### TopObjects.clickTabTopObjectsWith5XXErrorCodes()
     *
     * Performs click on 'TabTopObjectsWith5XXErrorCodes' tab
     *
     * @returns {Object} Selenium WebDriver Element
     */
  clickTabTopObjectsWith5XXErrorCodes: function () {
	this.getTabTopObjectsWith5XXErrorCodes()
	  .click();
  },

  /**
     * ### TopObjects.getTopTabsHeader()
     *
     * Returns the reference to the `Headers Binding` label element (Selenium WebDriver
     * Element) from the TopObjects page from the Portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
  getTopTabsHeader: function () {
	  return element(by.css(this.locators.headers.css));
  },

   /**
     * ### TopObjects.getTopTabsHeaderText()
     *
     * Gets the header text (title) of selected tab from `TopObjects` Page.
     *
     * @returns {Selenium WebDriver Element}
     */
   getTopTabsHeaderText: function () {
	return this.getTopTabsHeader()
      .getText();
  },

   /**
     * ### TopObjects.getTitleLbl()
     *
     * Returns the reference to the `Title` label element (Selenium WebDriver
     * Element) from the TopObjects page from the Portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
  getTitleLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(0);
  },

   /**
     * ### TopObjects.getTitle()
     *
     * Gets the title from `TopObjects` Page.
     *
     * @returns {Promise}
     */
  getTitle: function () {
    return this.getTitleLbl()
      .getText();
  }
};

module.exports = TopObjects;
