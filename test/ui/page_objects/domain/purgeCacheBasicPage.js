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

// # Purge Cache Form Page Object
var WebElement = require('./../../common/helpers/webElement');

// This `Purge Cache` Page Object abstracts all operations or actions that
// a common Purge Cached Objects could do in the Portal app/site.
var PurgeCacheBasic = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: '.container-fluid .row',
    panelHeading: '.col-md-12 .panel .panel-heading',
    panelBody: '.col-md-12 .panel .panel-body',
    pullLeft: '.pull-left',
    pullRight: '.pull-right',
    dropDown: {
      domain: '#domain [ng-click="$select.toggle($event)"]',
      searchDomain: '#domain input.ui-select-search',
    },
    textArea: {
      models: {
        text: 'text'
      }
    },
    checkBoxes: {
      purgeImageEngineSecondaryCache: {
        css: 'input[name="enablePurgeImageEngineSecondaryCache"]'
      },
    },
    buttons: {
      advancedMode: {
        linkText: 'Advanced Mode'
      },
      basicMode: {
        linkText: 'Basic Mode',
        id: 'btn-basic-mode'
      },
      purge: {
        css: '[ng-click="purgeText()"]'
      },
      purgeAllObjects: {
        css: '[ng-click="purgeDefaultText()"]'
      },
      cancel: {
        linkText: 'Cancel'
      }
    }
  },

  /**
   * ### PurgeCacheBasic.getTitleLbl()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the Purge Cached Objects page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element
      .all(by.css(this.locators.container))
      .get(0);
  },

  /**
   * ### PurgeCacheBasic.getPanelHeadingElem()
   *
   * Returns the reference to the `Panel Heading` element (Selenium WebDriver
   * Element) from the Purge Cached Objects page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelHeadingElem: function () {
    return element
      .all(by.css(this.locators.container))
      .get(1)
      .element(by.css(this.locators.panelHeading));
  },

  /**
   * ### PurgeCacheBasic.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Purge Cached Objects page in the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function () {
    return element
      .all(by.css(this.locators.container))
      .get(1)
      .element(by.css(this.locators.panelBody));
  },

  /**
   * ### PurgeCacheBasic.getAdvancedModeBtn()
   *
   * Gets the reference to `Advanced Mode` button element.
   *
   * @returns {Promise}
   */
  getAdvancedModeBtn: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.pullRight))
      .element(by.partialLinkText(this.locators.buttons.advancedMode.linkText));
  },

  /**
   * ### PurgeCacheBasic.getBasicModeBtn()
   *
   * Gets the reference to `Basic Mode` button element.
   *
   * @returns {Promise}
   */
  getBasicModeBtn: function () {
    return this
      .getPanelHeadingElem()
      .element(by.id(this.locators.buttons.basicMode.id));
  },

  /**
   * ### PurgeCacheBasic.getDomainDDown()
   *
   * Gets the reference to `Domain` drop down element.
   *
   * @returns {Promise}
   */
  getDomainDDown: function () {
    return this
      .getPanelHeadingElem()
      .element(by.css(this.locators.dropDown.domain));
  },

  /**
   * ### PurgeCacheBasic.getTextAreaTxt()
   *
   * Gets the reference to `Text` text area element.
   *
   * @returns {Promise}
   */
  getTextAreaTxt: function () {
    return this
      .getPanelBodyElem()
      .element(by.tagName('textarea'));
  },

  /**
   * ### PurgeCacheBasic.getPurgeBtn()
   *
   * Gets the reference to `Purge` button element.
   *
   * @returns {Promise}
   */
  getPurgeBtn: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.buttons.purge.css));
  },
  /**
   * ### PurgeCacheBasic.getPurgeAllObjectsBtn()
   *
   * Gets the reference to `Purge All Objects` button element.
   *
   * @returns {Promise}
   */
  getPurgeAllObjectsBtn: function () {
    return this
      .getPanelBodyElem()
      .element(by.css(this.locators.buttons.purgeAllObjects.css));
  },

  /**
   * ### PurgeCacheBasic.getCancelBtn()
   *
   * Gets the reference to `Cancel` button element.
   *
   * @returns {Promise}
   */
  getCancelBtn: function () {
    return this
      .getPanelBodyElem()
      .element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### PurgeCacheBasic.getSearchDomainTxtIn()
   *
   * Gets the reference to `Search Domain` textbox element.
   *
   * @returns {Promise}
   */
  getSearchDomainTxtIn: function () {
    return element(by.css(this.locators.dropDown.searchDomain));
  },

  /**
   * ### PurgeCacheBasic.setSearchDomain()
   *
   * Sets value from `Search Domain` textbox element.
   *
   * @param {String} Value to Search Domain in Purge Cached Objects page.
   *
   * @returns {Promise}
   */
  setSearchDomain: function (value) {
    this.getSearchDomainTxtIn().sendKeys(value);
    this.getSearchDomainTxtIn().sendKeys(protractor.Key.ENTER);
  },

  /**
   * ### PurgeCacheBasic.setTextArea()
   *
   * Sets value in `Text Area` text area element.
   *
   * @param {String} Value to Text Area in Purge Cached Objects page.
   *
   * @returns {Promise}
   */
  setTextArea: function (value) {
    return this
      .getTextAreaTxt()
      .sendKeys(value);
  },

  /**
   * ### PurgeCacheBasic.getTitle()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Purge Cached Objects page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### PurgeCacheBasic.getDomain()
   *
   * Gets the value from `Domain` drop down.
   *
   * @returns {Promise}
   */
  getDomain: function () {
    return this
      .getDomainDDown()
      .getText();
  },

  /**
   * ### PurgeCacheBasic.getTextArea()
   *
   * Gets the value from `Text Area` text area element.
   *
   * @returns {Promise}
   */
  getTextArea: function () {
    return this
      .getTextAreaTxt()
      .getText();
  },

  /**
   * ### PurgeCacheBasic.getExampleText()
   *
   * Gets the value from `Panel Body` area page.
   *
   * @returns {Promise}
   */
  getExampleText: function () {
    return this
      .getPanelBodyElem()
      .getText();
  },

  /**
   * ### PurgeCacheBasic.getPurgeImageEngineSecondaryCacheChBox()
   *
   * Returns the reference to the `Purge Image Engine Secondary Cache` checkbox (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPurgeImageEngineSecondaryCacheChBox: function () {
    return element(by.css(this.locators.checkBoxes.purgeImageEngineSecondaryCache.css));
  },

  // ## Helper Methods

  /**
   * ### PurgeCacheBasic.clickAdvancedMode()
   *
   * Clicks on the "Advanced Mode" button element.
   *
   * @returns {Promise}
   */
  clickAdvancedMode: function () {
    return this
      .getAdvancedModeBtn()
      .click();
  },

  /**
   * ### PurgeCacheBasic.clickBasicMode()
   *
   * Clicks on the "Basic Mode" button element.
   *
   * @returns {Promise}
   */
  clickBasicMode: function () {
    return this
      .getBasicModeBtn()
      .click();
  },

  /**
   * ### PurgeCacheBasic.clickDomain()
   *
   * Clicks on the `Domain` drop down element.
   *
   * @returns {Promise}
   */
  clickDomain: function () {
    return this
      .getDomainDDown()
      .click();
  },

  /**
   * ### PurgeCacheBasic.clickPurge()
   *
   * Clicks on the `Purge` button element.
   *
   * @returns {Promise}
   */
  clickPurge: function () {
    return this
      .getPurgeBtn()
      .click();
  },
  /**
   * ### PurgeCacheBasic.clickPurgeAllObjects()
   *
   * Clicks on the `Purge All Objects` button element.
   *
   * @returns {Promise}
   */
  clickPurgeAllObjects: function () {
    return this
      .getPurgeAllObjectsBtn()
      .click();
  },
  /**
   * ### PurgeCacheBasic.clickPurgeImageEngineSecondaryCache()
   *
   * Clicks on the `PurgeImageEngineSecondaryCache` checkbox element.
   *
   * @returns {Promise}
   */
  clickPurgeImageEngineSecondaryCache: function () {
    return this
      .getPurgeImageEngineSecondaryCacheChBox()
      .click();
  },

  /**
   * ### PurgeCacheBasic.clickCancel()
   *
   * Clicks on the `Cancel` button element.
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  /**
   * ### PurgeCacheBasic.isDisplayed()
   *
   * Checks whether the Purge Cached Objects page is displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitle()
      .isPresent();
  },

  /**
   * ### PurgeCacheBasic.selectDomain()
   *
   * Selects `Domain` name in Drop Down element in Purge Cached Objects page.
   *
   * @param {String} domain object to select in Purge Cached Objects page.
   *
   * @returns {Promise}
   */
  selectDomain: function (domain) {
    this.clickDomain();
    return this.setSearchDomain(domain.name);
  },

  /**
   * ### PurgeCacheBasic.setPurgeImageEngineSecondaryCache()
   *
   * Checks/un-checks the `Purge Image Engine Secondary Cache` checkbox element
   *
   * @param {Boolean} checked, whether check or not the element
   * @returns {Object} Promise
   */
  setPurgeImageEngineSecondaryCache: function (checked) {
    return WebElement.changeCheckBox(this.getPurgeImageEngineSecondaryCacheChBox(), checked);
  }
};

module.exports = PurgeCacheBasic;
