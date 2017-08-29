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

// # CDN IP Blocks Page Object

// This `CDN IP Blocks` Page Object abstracts all operations or actions that
// a common CDN IP Blocks could do in the Portal app/site.
var CDNIPBlocks = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: '.container-fluid .row',
    panelBody: '.col-md-12 .panel .panel-body',
    listItemsLogShippingBlocksList: {
      css: '#logShippingBlocksList .cdn-ip-blocks-item'
    },
    listItemsEdgeBlocksList:{
      css: '#edgeBlocksList .cdn-ip-blocks-item'
    }
  },

  /**
   * ### CDNIPBlocks.getTitleLbl()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the CDN IP Blocks page the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function() {
    return element
      .all(by.css(this.locators.container))
      .get(0);
  },

  /**
   * ### CDNIPBlocks.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the CDN IP Blocks page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function() {
    return element
      .all(by.css(this.locators.container))
      .get(1)
      .element(by.css(this.locators.panelBody));
  },

  /**
   * ### CDNIPBlocks.getTitle()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the CDN IP Blocks page the portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitle: function() {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### CDNIPBlocks.getListItemsLogShippingBlocksList()
   *
   * Returns the reference to the `List IP subnets which may ship logs` element (Selenium WebDriver
   * Element) from the CDN IP Blocks page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getListItemsLogShippingBlocksList: function() {
    return element
      .all(by.css(this.locators.listItemsLogShippingBlocksList.css));
  },

  /**
   * ### CDNIPBlocks.getListItemsEdgeBlocksList()
   *
   * Returns the reference to the `List IP subnets which may send origin requests` element
   * (Selenium WebDriver Element) from the CDN IP Blocks page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getListItemsEdgeBlocksList: function() {
    return element
      .all(by.css(this.locators.listItemsEdgeBlocksList.css));
  },

  // ## Helper Methods

  /**
   * ### CDNIPBlocks.isDisplayed()
   *
   * Checks whether the CDN IP Blocks page is displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function() {
    return this
      .getTitle()
      .isPresent();
  }
};

module.exports = CDNIPBlocks;
