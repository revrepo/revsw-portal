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

// # SideBar Page Object

// Requiring constant values
var Constants = require('./../constants');

// This `Searcher` Page Object abstracts all operations or actions that a common
// user could do with the SideBar menu component from Portal app/site.
var SideBar = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    headers: {
      className: 'side-menu-item'
    },
    items: {
      className: 'side-menu-sub-item'
    },
    activecontainer: {
      className: 'active-side-menu-item'
    },
    arrow: {
      className: 'fa-caret-up'
    },
    menu: {
      className: 'side-menu',
      options: {
        users: {
          linkText: Constants.sideBar.menu.USERS
        },
        updatePassword: {
          linkText: Constants.sideBar.menu.UPDATE_PASSWORD
        },
        securitySettings: {
          linkText: Constants.sideBar.menu.SECURITY_SETTINGS
        },
        activityLog: {
          linkText: Constants.sideBar.menu.ACTIVITY_LOG
        }
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### SideBar.getMenu()
   *
   * Return the reference to the `Sidebar Menu` container (Selenium WebDriver
   * Element) from the Portal app
   *
   * @returns {Selenium WebDriver Element}
   */
  getMenu: function () {
    return element(by.className(this.locators.menu.className));
  },

  // ## Methods to interact with the Sidebar component

  /**
   * ### SideBar.goTo()
   *
   * Triggers a click on the specified sidebar `menu option`
   *
   * @param {String} menuOption, the label from the menu option to click
   *
   * @returns {Promise}
   */
  goTo: function (menuOption) {
    return this
      .getMenu()
      .element(by.linkText(menuOption))
      .click();
  },

  /**
   * ### SideBar.gotoThroughClassNameLocator()
   *
   * Triggers a click on the specified sidebar `menu option` avoiding using by.linkText
   *
   * @param {String} headerName, the header's label from the menu option to click
   * @param {String} itemName, the item's label from the menu option to click
   *
   * @returns {Promise}
   */
  gotoThroughClassNameLocator: function(headerName, itemName) {
    this.expandBlockIfNotExpanded(headerName);
    return this.getItemWithinActiveContainer(itemName)
      .click();
  },

  /**
   * ### SideBar.getActiveContainer()
   *
   * Return the reference to the current active container (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getActiveContainer: function() {
    return element
      .all(by.className(this.locators.activecontainer.className))
      //first active container is always Dashboards
      .get(1);
  },

  /**
   * ### SideBar.getActiveContainersCount()
   *
   * Return a count of an expanded blocks (Selenium WebDriver
   * Element)
   *
   * @returns {Promise}
   */
  getActiveContainersCount: function() {
    return element
      .all(by.className(this.locators.activecontainer.className))
      .count();
  },
  
  /**
   * ### SideBar.getHeaderElem()
   *
   * Return the reference to the menu header (Selenium WebDriver
   * Element)
   *
   * @param {String} menuHeader, the label of header from the menu option
   *
   * @returns {Selenium WebDriver Element}
   */
  getHeaderElem: function (menuHeader) {
    var els = this.getMenu().all(by.className(this.locators.headers.className));
    return els.filter(function (elem) {
      return elem.getText().then(function (text) {
        return text === menuHeader;
      });
    });
  },

  /**
   * ### SideBar.getArrowElement()
   *
   * Returns the reference to the expand arrow (Selenium WebDriver
   * Element)
   *
   * @param {String} menuHeader, the label of header from the menu option
   *
   * @returns {Selenium WebDriver Element}
   */
  getArrowElement: function (menuHeaderName) {
    return this.getHeaderElem(menuHeaderName)
      .all(by.className(this.locators.arrow.className))
      .get(0);
  },

  /**
   * ### SideBar.expandBlockIfNotExpanded()
   *
   * Clicks on expand arrow if block is not expanded
   *
   * @param {String} menuHeaderName, the label of header from the menu option
   *
   * @returns {Promise}
   */
  expandBlockIfNotExpanded: function (menuHeaderName) {
    var me = this;
    return this.getActiveContainersCount().then(function(result) {
      if (result == 1) {
        me.getArrowElement(menuHeaderName)
          .click();
      }
    });
  },
  
  /**
   * ### SideBar.getItemWithinActiveContainer()
   *
   * Return the reference to the item within active container (Selenium WebDriver
   * Element)
   *
   * @param {String} menuOption, the label of item within active container
   *
   * @returns {Selenium WebDriver Element}
   */
  getItemWithinActiveContainer: function (menuOption) {
    var els = this.getActiveContainer().all(by.className(this.locators.items.className));
    return els.filter(function (elem) {
      return elem.getText().then(function (text) {
        return text === menuOption;
      });
    });
  }
};

module.exports = SideBar;
