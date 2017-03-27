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

// # Edit Domain Page Object

// Requiring `domain form` component page object
var DomainForm = require('./form');
var WebElement = require('./../../common/helpers/webElement');
var BROWSER_WAIT_TIMEOUT = 420000; // 7 mins

// This `Edit Domain` Page Object abstracts all operations or actions that a
// common domain could do in the Edit Domain page from the Portal app/site.
var EditDomain = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        className: 'page-title',
        binding: 'modelInfo.domain_name'
      }
    },
    buttons: {
      backToList: {
        linkText: 'Back To List'
      },
      advancedMode: {
        linkText: 'Advanced Mode'
      },
      basicMode: {
        linkText: 'Basic Mode'
      },
      validateDomain: {
        id: 'verifyDomain'
      },
      updateDomain: {
        id: 'updateDomain'
      },
      publishDomain: {
        id: 'publishDomain'
      },
      cancel: {
        linkText: 'Cancel'
      }
    },
    links: {
      editDomain: {
        css:  '#anchor'
      }
    },
    tabs: {
      cssCount: '.domain-edit-form .nav.nav-tabs>li:last-child',
      attrs: {
        index: 'index'
      }
    },
    icons: {
      published: {
        css: 'i[uib-tooltip="Global Status: Published"]'
      }
    }
  },

  // `Edit Domain` Page is compound mainly by a form. This property makes
  // reference to the DomainForm Page Object to interact with it.
  form: DomainForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### EditDomain.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit Domain page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  getTitleTxtIn: function () {
    return element(by.binding(this.locators.labels.title.binding));
  },

  /**
   * ### EditDomain.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Edit Domain page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### EditDomain.getAdvancedModeBtn()
   *
   * Returns the reference to the `Advanced mode` button (Selenium WebDriver
   * Element) from the Edit Advanced Domain page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getAdvancedModeBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.advancedMode.linkText));
  },

  /**
   * ### EditDomain.getBasicModeBtn()
   *
   * Returns the reference to the `Basic mode` button (Selenium WebDriver
   * Element) from the Edit Basic Domain page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getBasicModeBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.basicMode.linkText));
  },

  /**
   * ### EditDomain.getValidateDomainBtn()
   *
   * Returns the reference to the `Validate Domain` button (Selenium WebDriver
   * Element) from the Edit Domain page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getValidateDomainBtn: function () {
    return element(by.id(this.locators.buttons.validateDomain.id));
  },

  /**
   * ### EditDomain.getUpdateDomainBtn()
   *
   * Returns the reference to the `Update Domain` button (Selenium WebDriver
   * Element) from the Edit Domain page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getUpdateDomainBtn: function () {
    return element(by.id(this.locators.buttons.updateDomain.id));
  },

  getEditDomainLink: function (numberLink) {
    return element(by.css(this.locators.links.editDomain.css +
      (numberLink) + ' td:first-child [uib-tooltip="Edit Domain"]'));
  },


  getAllTabsCountDomain: function () {
    return element(by.css(this.locators.tabs.cssCount))
      .getAttribute(this.locators.tabs.attrs.index);
  },
  /**
   * ### EditDomain.getPublishDomainBtn()
   *
   * Returns the reference to the `Publish Domain` button (Selenium WebDriver
   * Element) from the Edit Domain page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPublishDomainBtn: function () {
    return element(by.id(this.locators.buttons.publishDomain.id));
  },

  /**
   * ### EditDomain.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver Element)
   * from the Edit Domain page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  // ## Methods to interact with the Edit Domain Page components

  /**
   * ### EditDomain.clickAdvancedMode()
   *
   * Triggers a click on the `Advanced mode` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickAdvancedMode: function () {
    return this
      .getAdvancedModeBtn()
      .click();
  },



  /**
   *
   * switchBtns
   * 'ON' or 'off'
   *
   */
  switchBtns: function(getCbElement, onOff) {
    getCbElement
      .getAttribute(this.form.locators.switches.mainAttrs.ariaChecked)
        .then(function(data) {
          if (onOff && data !== 'true') {
            getCbElement.click();
          }

          if (!onOff && data === 'false') {
            getCbElement.click();
          }
    });
  },


  /**
   * ### EditDomain.clickBasicMode()
   *
   * Triggers a click on the `Basic mode` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickBasicMode: function () {
    return this
      .getBasicModeBtn()
      .click();
  },

  /**
   * ### EditDomain.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### EditDomain.clickValidateDomain()
   *
   * Triggers a click on the `Validate Domain` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickValidateDomain: function () {
    return this
      .getValidateDomainBtn()
      .click();
  },

  /**
   * ### EditDomain.clickUpdateDomain()
   *
   * Triggers a click on the `Update Domain` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickUpdateDomain: function () {
    return this
      .getUpdateDomainBtn()
      .click();
  },

  clickEditDomain: function (numberLink) {
    return this
      .getEditDomainLink(numberLink || 0)
      .click();
  },


  /**
   *
   * For Tabs Active
   *
   */

  tabIsActive: function (methodTab) {
    return element(by.css(this.form.locators.tabs[methodTab].li + '.active')).isPresent();
  },



  /**
   *
   * Tab "General Settings"
   *
   */

  // Click to tab "General Settings"
  clickTabGeneralSettings: function () {
    return this.form
      .getGeneralSettingsTab()
      .click();
  },



  /**
   *
   * Tab "Origin Health Monitoring"
   *
   */

  // Click to tab "Origin Health Monitoring"
  clickTabOriginHealthMonitoring: function (numberLink) {
    return this.form
      .getOriginHealthMonitoringTab()
      .click();
  },


  /**
   *
   * Tab "SSL Configuration"
   *
   */

  // Click to tab "SSL Configuration"
  clickTabSSLconfiguration: function (numberLink) {
    return this.form
      .getSSLConfigurationTab()
      .click();
  },


  /**
   *
   * Tab "Custom VCL Rules"
   *
   */

  // Click to tab "Custom VCL Rules"
  clickTabVCL: function () {
    return this.form
      .getCustomVCLRulesTab()
      .click();
  },


  /**
   *
   * Tab "Lua Scripting"
   *
   */

  // Click to tab "Lua Scripting"
  clickTabLuaScripting: function () {
    return this.form
      .getLuaScriptingTab()
      .click();
  },

  /**
   *
   * Tab "Third-Party Links"
   *
   */

  // Click to tab "Third-Party Links"
  clickTabThirdPartyLinks: function () {
    return this.form
      .getThirdPartyLinksTab()
      .click();
  },
  // Click on button
  clickOnAddNewItemBP: function () {
    var el = this.form.getOnAddNewItemBP();
    WebElement.scrollToElement(el);
    return el.click();
  },

  clickOnAddNewItemCO: function () {
    var el = this.form.getOnAddNewItemCO();
    WebElement.scrollToElement(el);
    return this.form
      .getOnAddNewItemCO()
      .click();
  },



  /**
   *
   * Tab "Edge Caching"
   *
   */

  // Click to tab "Edge Caching"
  clickTabEdgeCaching: function () {
    return this.form
      .getEdgeCachingTab()
      .click();
  },

  clickAddNewCachingRule: function() {
    return this.form
      .getOnAddNewCachingRule()
      .click();
  },

  clickAddNewBackendBlock: function() {
    var el = this.form.getOnAddNewBackendBlock();
    WebElement.scrollToElement(el);
    return el.click();
  },

  clickOpenUrlOfCachingRule: function() {
    return this.form
      .getOpenUrlOfCachingRule()
      .click();
  },





  /**
   * ### EditDomain.clickPublishDomain()
   *
   * Triggers a click on the `Publish Domain` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickPublishDomain: function () {
    return this
      .getPublishDomainBtn()
      .click();
  },

  /**
   * ### EditDomain.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Edit Domain page from
   * the Portal app
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### EditDomain.isDisplayed()
   *
   * Checks whether the Edit Domain page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  elementIsDisplayed: function(elem, value) {
    var element = this.form[elem](value);
    return element.isPresent();
  },
  /**
   * ### EditDomain.getTitle()
   *
   * Gets the `Title` label from the Edit Domain page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### EditDomain.updateDomain()
   *
   * Updates the domain using the given data by filling it in the form and
   * clicking on the `Update Domain` button from the Edit Domain page.
   *
   * @param {Object} domain, domain data with the schema specified in
   * DataProvider.generateDomain()
   *
   * @returns {Promise}
   */
  updateDomain: function (domain) {
    this.form.fill(domain);
    return this.clickUpdateDomain();
  },

  /**
   * ### EditDomain.waitForPublish()
   *
   * Waits until domain is not published
   *
   * @returns {Object} Selenium WebDriver Element
   */
  waitForPublish: function () {
    return browser.wait(
      protractor.ExpectedConditions.presenceOf(
        element(by.css(this.locators.icons.published.css))
      ), BROWSER_WAIT_TIMEOUT
    );
  }
};

module.exports = EditDomain;
