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

// # SideBar Page Object

// Requiring third party libraries
var Promise = require('bluebird');
var MenuItems = require('./locators/menuItems.js');
var MenuAreas = require('./locators/menuAreas.js');
// This `SideBar` Page Object abstracts all operations or actions that a common
// user could do with the SideBar menu component from Portal app/site.
var SideBar = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    arrowUp: {
      css: '.fa-caret-up'
    },
    arrowDown: {
      css: '.fa-caret-down'
    },
    container: {
      css: 'ul.side-menu'
    },
    menu: {
      items: {
        collapsible: {
          className: 'side-menu-item'
        },
        final: {
          className: 'side-menu-sub-item'
        }
      }
    }
  },
  menuItems: MenuItems,
  menuAreas: MenuAreas,
  // ## Methods

  /**
   * Returns SideBar container
   * @returns {*}
   */
  getContainerEl: function () {
    return element(by.css(this.locators.container.css));
  },

  /**
   * Returns specified Menu Item
   * @param locatorData
   * @returns {*}
   */
  getMenuItem: function (locatorData) {
    var locator;
    if (locatorData.id) {
      locator = by.id(locatorData.id);
    }
    else if (locatorData.css) {
      locator = by.css(locatorData.css);
    }
    else if (locatorData.linkText) {
      locator = by.partialLinkText(locatorData.linkText);
    } else {
      locator = by.partialLinkText(locatorData);
    }

    if (locatorData.area) {
      var areaLocator;
      var areaLocatorData = locatorData.area;
      if (areaLocatorData.id) {
        areaLocator = by.id(areaLocatorData.id);
      }
      else {
        areaLocator = by.partialLinkText(areaLocatorData.linkText);
      }
      return this
        .getContainerEl()
        .element(areaLocator)
        .element(by.xpath('..')) // Get parent
        .element(locator);
    }
    return this
      .getContainerEl()
      .element(locator);
  },

  /**
   * Returns the `up-arrow` element
   * @param locatorData
   * @returns {*}
   */
  getUpArrow: function (locatorData) {
    if (!this.isMenu(locatorData)) {
      throw 'API ERROR!';
    }
    // First check arrow exists
    return this
      .getMenuItem(locatorData)
      .element(by.css(this.locators.arrowUp.css));
  },

  /**
   * Returns the `down-arrow` element
   * @param locatorData
   * @returns {*}
   */
  getDownArrow: function (locatorData) {
    if (!this.isMenu(locatorData)) {
      throw 'API ERROR!';
    }
    // First check arrow exists
    return this
      .getMenuItem(locatorData)
      .element(by.css(this.locators.arrowDown.css));
  },

  // ## Methods to interact with the Searcher/Filter component

  /**
   * Checks whether specified Menu Item is a `menu` or not.
   * @param locatorData
   * @returns {*}
   */
  isMenu: function (locatorData) {
    var me = this;
    return this
      .getMenuItem(locatorData)
      .getAttribute('className')
      .then(function (className) {
        return className
          .indexOf(me.locators.menu.items.collapsible.className) >= 0;
      });
  },

  /**
   * Expands a `menu-item`
   * @param locatorData
   * @returns {*}
   */
  expand: function (locatorData) {
    if (!this.isMenu(locatorData)) {
      throw 'API ERROR!';
    }
    return this
      .getDownArrow(locatorData)
      .click();
  },

  /**
   * Collapses a `menu-item`
   * @param locatorData
   * @returns {*}
   */
  collapse: function (locatorData) {
    if (!this.isMenu(locatorData)) {
      throw 'API ERROR!';
    }
    return this
      .getUpArrow(locatorData)
      .click();
  },

  /**
   * Collapses all opened `menu-item`
   */
  collapseAll: function () {
    var upArrows = element.all(by.css(this.locators.arrowUp.css));
    upArrows
      .then(function () {
        return Promise.each(upArrows, function (arrow) {
          return arrow.click();
        });
      });
  },

  expandAll: function () {
    var downArrows = element.all(by.css(this.locators.arrowDown.css));
    return downArrows
      .then(function () {
        return Promise.each(downArrows, function (arrow) {
          return arrow.click();
        });
      });
  },

  /**
   * Selects a specified menu-item by collapsing all opened menu-items and
   * expanding the parent menu-item.
   * @param locatorData
   * @returns {*}
   */
  select: function (locatorData) {
    this.collapseAll();
    if (locatorData.area) {
      this.expand(locatorData.area);

    }
    else {
      this.expand(locatorData);
    }
    return this
      .getMenuItem(locatorData)
      .click();
  },

  getBillingOption: function () {
    return MenuAreas.BILLING;
  },
  getChangeBillingPlanOption: function () {
    return MenuItems.BILLING.CHANGE_BILLING_PLAN;
  },
  getBillingStatementsOption: function () {
    return MenuItems.BILLING.BILLING_STATEMENTS;
  }
};

module.exports = SideBar;
