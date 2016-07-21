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

// Requiring constant values
//var Constants = require('./../constants');

// This `Searcher` Page Object abstracts all operations or actions that a common
// user could do with the SideBar menu component from Portal app/site.
var SideBar = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  //locators: {
  //  headers: {
  //    className: 'side-menu-item'
  //  },
  //  items: {
  //    className: 'side-menu-sub-item'
  //  },
  //  activeContainer: {
  //    className: 'active-side-menu-item'
  //  },
  //  arrow: {
  //    className: 'fa-caret-up'
  //  },
  //  menu: {
  //    className: 'side-menu',
  //    options: {
  //      users: {
  //        linkText: Constants.sideBar.menu.USERS
  //      },
  //      updatePassword: {
  //        linkText: Constants.sideBar.menu.UPDATE_PASSWORD
  //      },
  //      securitySettings: {
  //        linkText: Constants.sideBar.menu.SECURITY_SETTINGS
  //      },
  //      activityLog: {
  //        linkText: Constants.sideBar.menu.ACTIVITY_LOG
  //      }
  //    }
  //  }
  //},
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

  getContainerEl: function () {
    return element(by.css(this.locators.container.css));
  },

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

  getUpArrow: function (option) {
    if (!this.isMenu(option)) {
      throw 'API ERROR!';
    }
    // First check arrow exists
    return this
      .getMenuItem(option)
      .element(by.css(this.locators.arrows.up.css));
  },

  getDownArrow: function (option) {
    if (!this.isMenu(option)) {
      throw 'API ERROR!';
    }
    // First check arrow exists
    return this
      .getMenuItem(option)
      .element(by.css(this.locators.arrows.down.css));
  },

  expand: function (option) {
    if (!this.isMenu(option)) {
      throw 'API ERROR!';
    }
    return this
      .getUpArrow(option)
      .click();
  },

  collapse: function (option) {
    if (!this.isMenu(option)) {
      throw 'API ERROR!';
    }
    return this
      .getDownArrow(option)
      .click();
  },

  collapseAll: function () {
    var downArrows = element.all(by.css(this.locators.arrows.down));
    for (var i = 0; i < downArrows.length; i++) {
      var arrow = downArrows[i];
      arrow.click();
      console.log('ARROW collapsed:', i);
    }
    //return Promise.all(downArrows).then(function (arrow) {
    //  arrow.click();
    //});
  },

  select: function (option) {
    this.collapseAll();
    this.expand(this.locators.menu.options[option].area);
    return this
      .getMenuItem(option)
      .click();
  }
};

module.exports = SideBar;
