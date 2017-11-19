
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

// # Azure Portal App object
var Promise = require('bluebird');

var BROWSER_WAIT_TIMEOUT = 30000; // 30 secs

// Requiring config and constants
var Constants = require('./constants');
var Session = require('./../common/session');
var Utils = require('./../common/helpers/utils');
var AzurePortal = {
  constants: Constants,
  utils: Utils,
  session: Session,
  locators: {
    newButton: {
      css: '.fxs-sidebar-create',
      text: 'New'
    },
    marketplaceSearch: {
      css: '.azc-input[placeholder="Search the Marketplace"]',
      option: {
        css: 'li[role="option"]'
      }
    },
    resourcesTable: {
      css: '.azc-grid-groupdata'
    },
    nuubitRow: {
      css: '.ext-gallery-search-result-displayname',
      text: 'nuu:bit CDN'
    },
    createResourceBtn: {
      css: '.fxc-actionbar-buttonwrapper',
      text: ''
    },
    loginEmailInTxt: {
      css: 'input[type="email"]'
    },
    loginPasswordInTxt: {
      css: 'input[type="password"]'
    },
    loginNextBtn: {
      css: '.btn[type="submit"]'
    },
    newResourceForm: {
      name: 'input[placeholder="Enter name"]',
      resourceGroup: 'input[name="__azc-textBox25"]',
      selectPricingTier: {
        css: 'span',
        text: 'Select pricing tier'
      }
    }
  },
  load: function () {
    browser.get(Constants.AZURE_PORTAL_URL);
  },
  getLoginEmailInTxt: function () {
    return browser.driver.findElement(by.css(this.locators.loginEmailInTxt.css));
  },
  setLoginEmailInTxt: function (value) {
    return this.getLoginEmailInTxt().sendKeys(value);
  },
  getLoginNextBtn: function () {
    return element(by.css(this.locators.loginNextBtn.css));
  },
  clickLoginNextBtn: function () {
    return this.getLoginNextBtn().click();
  },
  getLoginPasswordInTxt: function () {
    return browser.driver.findElement(by.css(this.locators.loginPasswordInTxt.css));
  },
  setLoginPasswordInTxt: function (value) {
    return this.getLoginPasswordInTxt().sendKeys(value);
  },
  getNewBtn: function () {
    return element(by.cssContainingText(this
      .locators
      .newButton
      .css, this.locators.newButton.text));
  },
  getCreateResourceBtn: function () {
    return element(by.cssContainingText(this
      .locators
      .createResourceBtn
      .css, this.locators.createResourceBtn.text));
  },
  getResourceNameTxtIn: function () {
    return element(by.css(this.locators.newResourceForm.name));
  },
  clickNewBtn: function () {
    var me = this;
    return new Promise(function (resolve, reject) {
      me.waitForElement(me.locators.newButton.css).then(function () {
        me.getNewBtn().click();
        me.waitForElement(me.locators.marketplaceSearch.css).then(function () {
          resolve(true);
        });
      });
    });
  },
  getSearchMarketplaceTxtIn: function () {
    return element(by.css(this.locators.marketplaceSearch.css));
  },
  setSearchMarketplace: function (value) {
    var me = this;
    return new Promise(function (resolve, reject) {
      me.getSearchMarketplaceTxtIn().sendKeys(value);
      me.waitForElement(me.locators.marketplaceSearch.option.css).then(function () {
        element(by.css(me.locators.marketplaceSearch.option.css)).click();
        me.waitForElementByCSSText(me
          .locators
          .nuubitRow
          .css, me.locators.nuubitRow.text).then(function () {
            resolve(true);
          });
      });
    });

  },
  getNuubitRow: function () {
    var me = this;
    return new Promise(function (resolve, reject) {
      me.waitForElementByCSSText(me
        .locators
        .nuubitRow
        .css, me.locators.nuubitRow.text).then(function () {
          resolve(element(by.cssContainingText(me
            .locators
            .nuubitRow
            .css, me.locators.nuubitRow.text)));
        });
    });
  },
  clickNuubitRow: function () {
    var me = this;
    return new Promise(function (resolve, reject) {
      me.getNuubitRow().then(function (el) {
        el.click();
        me.waitForElementByCSSText(me
          .locators
          .createResourceBtn
          .css, me.locators.createResourceBtn.text).then(function () {
            me.getCreateResourceBtn().click();
            me.waitForElement(me.locators.newResourceForm.name).then(function () {
              resolve(me.getResourceNameTxtIn());
            });
          });
      });
    });
  },
  signIn: function (user) {
    var me = this;
    this.load();
    return new Promise(function (resolve, reject) {
      me.waitForElement(me.locators.loginEmailInTxt.css).then(function () {
        me.setLoginEmailInTxt(user.email);
        me.clickLoginNextBtn();
        me.waitForElement(me.locators.loginPasswordInTxt.css).then(function () {
          me.setLoginPasswordInTxt(user.password);
          me.clickLoginNextBtn();
          me.waitForElement(me.locators.newButton.css).then(function () {
            resolve(true);
          });
        });
      });
    });
  },
  waitForElement: function (cssLocator) {
    var me = this;
    return new Promise(function (resolve, reject) {
      var handler = setInterval(function () {
        browser.isElementPresent(by.css(cssLocator)).then(function (vis) {
          if (vis) {
            resolve(true);
            clearInterval(handler);
          }
        });
      }, 5000);
    });
  },
  waitForElementByCSSText: function (cssLocator, text) {
    var me = this;
    return new Promise(function (resolve, reject) {
      var handler = setInterval(function () {
        browser.isElementPresent(by.cssContainingText(cssLocator, text)).then(function (vis) {
          if (vis) {
            resolve(true);
            clearInterval(handler);
          }
        });
      }, 5000);
    });
  }
};

module.exports = AzurePortal;
