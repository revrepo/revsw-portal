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

// This `SideBar` Page Object abstracts all operations or actions that a common
// user could do with the SideBar menu component from Portal app/site.
var SideBar = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    arrows: {
      down: {
        css: '.fa-caret-down'
      },
      up: {
        css: '.fa-caret-up'
      }
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
   * @param locator
   * @returns {*}
   */
  getMenuItem: function (locator) {
    /*if (option.ROOT) {
      option = option.ROOT;
    }*/
    //var locator = option;
    if (locator.area) {
      var areaLocator = locator.area;
      return this
        .getContainerEl()
        .element(by.id(areaLocator.id))
        .element(by.xpath('..')) // Get parent
        .element(by.id(locator.id));
    }
    return this
      .getContainerEl()
      .element(by.id(locator.id));
  },

  /**
   * Returns the `up-arrow` element
   * @param locator
   * @returns {*}
   */
  getUpArrow: function (locator) {
    if (!this.isMenu(locator)) {
      throw 'API ERROR!';
    }
    // First check arrow exists
    return this
      .getMenuItem(locator)
      .element(by.css(this.locators.arrows.up.css));
  },

  /**
   * Returns the `down-arrow` element
   * @param locator
   * @returns {*}
   */
  getDownArrow: function (locator) {
    if (!this.isMenu(locator)) {
      throw 'API ERROR!';
    }
    // First check arrow exists
    return this
      .getMenuItem(locator)
      .element(by.css(this.locators.arrows.down.css));
  },

  // ## Methods to interact with the Searcher/Filter component

  /**
   * Checks whether specified Menu Item is a `menu` or not.
   * @param locator
   * @returns {*}
   */
  isMenu: function (locator) {
    var me = this;
    return this
      .getMenuItem(locator)
      .getAttribute('className')
      .then(function (className) {
        return className
            .indexOf(me.locators.menu.items.collapsible.className) >= 0;
      });
  },

  /**
   * Expands a `menu-item`
   * @param locator
   * @returns {*}
   */
  expand: function (locator) {
    if (!this.isMenu(locator)) {
      throw 'API ERROR!';
    }
    return this
      .getUpArrow(locator)
      .click();
  },

  /**
   * Collapses a `menu-item`
   * @param locator
   * @returns {*}
   */
  collapse: function (locator) {
    if (!this.isMenu(locator)) {
      throw 'API ERROR!';
    }
    return this
      .getDownArrow(locator)
      .click();
  },

  /**
   * Collapses all opened `menu-item`
   */
  collapseAll: function () {
    var downArrows = element.all(by.css(this.locators.arrows.down.css));
    downArrows
      .then(function () {
        return Promise.each(downArrows, function (arrow) {
          return arrow.click();
        });
      });
  },

  /**
   * Selects a specified menu-item by collapsing all opened menu-items and
   * expanding the parent menu-item.
   * @param locator
   * @returns {*}
   */
  select: function (locator) {
    this.collapseAll();
    this.expand(locator.area);
    return this
      .getMenuItem(locator)
      .click();
  }
};

module.exports = SideBar;
