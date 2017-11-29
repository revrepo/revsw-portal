
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
    },
    deploymentSuccess: {
      css: 'a',
      text: 'Deployment succeeded'
    },
    goToResource: {
      css: '.fxs-button[title="Go to resource"]'
    },
    subId: 'div.msportalfx-tooltip-overflow',
    manageBtn: {
      css: '.fxs-commandBar-item.fxs-portal-border.fxs-portal-hover',
      text: 'Manage'
    }
  },
  form: {
    locators: {
      resourceName: 'input[placeholder="Enter name"]',
      resourceGroup: 'input[placeholder=""]',
      pricingTier: 'div[aria-label="Pricing Tier"]',
      devTier: {
        css: 'div.msportalfx-text-header-regular',
        text: 'Developer'
      },
      selectTier: '.fxt-button[title="Select"]',
      legals: {
        css: '.fxc-selector-displayText',
        text: 'Review legal terms'
      },
      legalCreateBtn: '.fxt-button[title="Create"]',
    },
    setResourceName: function (value) {
      return element(by.css(this.locators.resourceName)).sendKeys(value);
    },
    setResourceGroup: function (value) {
      return element.all(by.css(this.locators.resourceGroup)).get(1).sendKeys(value);
    },
    setPricingTier: function (value, portal) {
      var me = this;
      return new Promise(function (resolve, reject) {
        if (value === undefined || value === null) {
          value = 'Developer';
        }
        element(by.css(me.locators.pricingTier)).click();

        portal.waitForElementByCSSText(me.locators.devTier.css, value).then(function () {
          element(by.cssContainingText(me.locators.devTier.css, value)).click();
          browser.sleep(5000);
          element.all(by.css(me.locators.selectTier)).last().click();
          resolve(true);
        });
      });
    },
    setLegals: function (portal) {
      var me = this;
      return new Promise(function (resolve, reject) {
        element(by.cssContainingText(me.locators.legals.css, me.locators.legals.text)).click();
        portal.waitForElementByCSSText('div', 'Offer details').then(function () {
          element.all(by.css(me.locators.legalCreateBtn)).last().click();
          resolve(true);
        });
      });
    },
    clickCreate: function () {
      return element.all(by.css(this.locators.legalCreateBtn)).last().click();
    }
  },
  getSubId: function () {
    return element.all(by.css(this.locators.subId)).last().getText();
  },
  clickManage: function () {
    return element(by.cssContainingText(this
      .locators
      .manageBtn
      .css, this.locators.manageBtn.text)).click();
  },
  waitForDeployment: function () {
    var me = this;
    return new Promise(function (resolve, reject) {
      me.waitForElementByCSSText(me
        .locators
        .deploymentSuccess
        .css, me.locators.deploymentSuccess.text).then(function () {
          resolve(true);
        });
    });
  },
  clickGoToResource: function () {
    var me = this;
    return new Promise(function (resolve, reject) {
      element(by.css(me.locators.goToResource.css)).click();
      me.waitForElementByCSSText(me
        .locators
        .manageBtn
        .css, me.locators.manageBtn.text).then(function () {
          browser.sleep(2500);
          resolve(true);
        });
    });

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
  createNuubitCDNResource: function () {
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
      }, 3000);
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
      }, 3000);
    });
  }
};

module.exports = AzurePortal;
