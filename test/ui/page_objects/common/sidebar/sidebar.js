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
      },
      options: {
        MOBILEAPPS: {
          id: 'side-menu-apps-item'
        },
        MOBILEAPPS_IOS: {
          id: 'side-menu-sub-item__apps-ios',
          area: 'MOBILEAPPS'
        },
        MOBILEAPPS_ANDROID: {
          id: 'side-menu-sub-item__apps-android',
          area: 'MOBILEAPPS'
        },
        MOBILEAPPS_WINDOWSMOBILE: {
          id: 'side-menu-sub-item__apps-windows',
          area: 'MOBILEAPPS'
        },
        WEB: {
          id: 'side-menu-web-item'
        },
        WEB_DOMAINS: {
          id: 'side-menu-sub-item__webApp-domains',
          area: 'WEB'
        },
        WEB_SSLCERTIFICATES: {
          id: 'side-menu-sub-item__webApp-ssl_certs',
          area: 'WEB'
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
   * @param option
   * @returns {*}
   */
  getMenuItem: function (option) {
    if (option.ROOT) {
      option = option.ROOT;
    }
    var locator = this.locators.menu.options[option];
    if (locator.area) {
      var areaLocator = this.locators.menu.options[locator.area];
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
   * @param option
   * @returns {*}
   */
  getUpArrow: function (option) {
    if (!this.isMenu(option)) {
      throw 'API ERROR!';
    }
    // First check arrow exists
    return this
      .getMenuItem(option)
      .element(by.css(this.locators.arrows.up.css));
  },

  /**
   * Returns the `down-arrow` element
   * @param option
   * @returns {*}
   */
  getDownArrow: function (option) {
    if (!this.isMenu(option)) {
      throw 'API ERROR!';
    }
    // First check arrow exists
    return this
      .getMenuItem(option)
      .element(by.css(this.locators.arrows.down.css));
  },

  // ## Methods to interact with the Searcher/Filter component

  /**
   * Checks whether specified Menu Item is a `menu` or not.
   * @param option
   * @returns {*}
   */
  isMenu: function (option) {
    var me = this;
    return this
      .getMenuItem(option)
      .getAttribute('className')
      .then(function (className) {
        return className
            .indexOf(me.locators.menu.items.collapsible.className) >= 0;
      });
  },

  /**
   * Expands a `menu-item`
   * @param option
   * @returns {*}
   */
  expand: function (option) {
    if (!this.isMenu(option)) {
      throw 'API ERROR!';
    }
    return this
      .getUpArrow(option)
      .click();
  },

  /**
   * Collapses a `menu-item`
   * @param option
   * @returns {*}
   */
  collapse: function (option) {
    if (!this.isMenu(option)) {
      throw 'API ERROR!';
    }
    return this
      .getDownArrow(option)
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
   * @param option
   * @returns {*}
   */
  select: function (option) {
    this.collapseAll();
    this.expand(this.locators.menu.options[option].area);
    return this
      .getMenuItem(option)
      .click();
  }
};

module.exports = SideBar;
