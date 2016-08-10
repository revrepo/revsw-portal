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

// # Top Objects Page Object

// This `Top Objects` Page Object abstracts all operations or actions that a
// common top objects could do in the Portal app/site.
var TopObjectsForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    tabs:{
      id: 'topObjectsReportsTabs',
      topMostRequested: {
        css: 'li:nth-of-type(1) a'
      },
      topRefers: {
        css: 'li:nth-of-type(2) a'
      },
      topEdgeCacheHits: {
        css: 'li:nth-of-type(3) a'
      },
      topEdgeCacheMisses: {
        css: 'li:nth-of-type(4) a'
      },
      top404NotFound: {
        css: 'li:nth-of-type(5) a'
      },
      top5XX: {
        css: 'li:nth-of-type(6) a'
      },
      topFailed: {
        css: 'li:nth-of-type(7) a'
      },
      topSlowestFBT: {
        css: 'li:nth-of-type(8) a'
      },
      topSlowestDownload: {
        css: 'li:nth-of-type(9) a'
      }
    },
    panels: {
      activePanel: {
        css: 'div.tab-pane.ng-scope.active',
        labels: {
          reportTitle: {
            css: 'h3'
          }
        },
        dropdowns: {
          delay:{
            model: 'delay'
          },
          country:{
            model: 'ngFilters.country'
          },
          os:{
            model: 'ngFilters.os'
          },
          device:{
            model: 'ngFilters.device'
          },
          browser:{
            model: 'ngFilters.browser'
          },
          count:{
            model: 'ngFilters.count'
          }
        },
        buttons: {
          updateReport: {
            css: '[ng-click="updateFilters()"]'
          }
        }
      }
    }
  },

  getActivePanel: function () {
    return element(by.css(this.locators.panels.activePanel.css));
  },

  getReportTitleLabel: function () {
    return this.getActivePanel()
      .element(by.css(this.locators.panels.activePanel.labels.reportTitle.css));
  },

  getReportTitle: function() {
    return this.getReportTitleLabel()
      .getText();
  },

  /**
   * ### TopObjectsForm.getTabs().
   *
   * Returns the reference to the `Tabs Panel` (Selenium
   * WebDriver Element) from the Top Reports page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTabs: function () {
    return element(by.id(this.locators.tabs.id));
  },

  getTopMostRequestedTab: function () {
    return this
      .getTabs()
      .element(by.css(this.locators.tabs.topMostRequested.css));
  },

  getTopRefersTab: function () {
    return this
      .getTabs()
      .element(by.css(this.locators.tabs.topRefers.css));
  },

  getTopEdgeCacheHitsTab: function () {
    return this
      .getTabs()
      .element(by.css(this.locators.tabs.topEdgeCacheHits.css));
  },

  getTopEdgeCacheMissesTab: function () {
    return this
      .getTabs()
      .element(by.css(this.locators.tabs.topEdgeCacheMisses.css));
  },

  getTop404Tab: function () {
    return this
      .getTabs()
      .element(by.css(this.locators.tabs.top404NotFound.css));
  },

  getTop5XXTab: function () {
    return this
      .getTabs()
      .element(by.css(this.locators.tabs.top5XX.css));
  },

  getTopObjetcsWithUnsuccessfulStatusTab: function () {
    return this
      .getTabs()
      .element(by.css(this.locators.tabs.topFailed.css));
  },

  getObjectsWithSlowestFBTtab: function (){
    return this
      .getTabs()
      .element(by.css(this.locators.tabs.topSlowestFBT.css));
  },

  getObjectsWithSlowestDownTimeTab: function (){
    return this
      .getTabs()
      .element(by.css(this.locators.tabs.topSlowestDownload.css));
  },

  clickTopMostRequestedTab: function () {
    return this.getTopMostRequestedTab()
      .click();
  },

  clickTopRefersTab: function () {
    return this.getTopRefersTab()
      .click();
  },

  clickTopEdgeCacheHitsTab: function () {
    return this.getTopEdgeCacheHitsTab()
      .click();
  },

  clickTopEdgeCacheMissesTab: function () {
    return this.getTopEdgeCacheMissesTab()
      .click();
  },

  clickTop404Tab: function () {
    return this.getTop404Tab()
      .click();
  },

  clickTop5XXTab: function () {
    return this.getTop5XXTab()
      .click();
  },

  clickTopObjetcsWithUnsuccessfulStatusTab: function () {
    return this.getTopObjetcsWithUnsuccessfulStatusTab()
      .click();
  },

  clickObjectsWithSlowestFBTtab: function () {
    return this.getObjectsWithSlowestFBTtab()
      .click();
  },

  clickObjectsWithSlowestDownTimeTab: function () {
    return this.getObjectsWithSlowestDownTimeTab()
      .click();
  },

  /**
   * ### TopObjectsForm.getDelayDropDown().
   *
   * Gets the link to the `Delay` drop-down element.
   *
   * @returns {Web Element}
   */
  getDelayDropDown: function () {
    return this
      .getActivePanel()
      .element(by.model(this.locators.panels.activePanel.dropdowns.delay.model));
  },

  /**
   * ### TopObjectsForm.getCountryDropDown().
   *
   * Gets the link to the `Country` drop-down element.
   *
   * @returns {Web Element}
   */
  getCountryDropDown: function () {
    return this
      .getActivePanel()
      .element(by.model(this.locators.panels.activePanel.dropdowns.country.model));
  },

  /**
   * ### TopObjectsForm.getOSDropDown().
   *
   * Gets the link to the `OS` drop-down element.
   *
   * @returns {Web Element}
   */
  getOSDropDown: function () {
    return this
      .getActivePanel()
      .element(by.model(this.locators.panels.activePanel.dropdowns.os.model));
  },

  /**
   * ### TopObjectsForm.getDeviceDropDown().
   *
   * Gets the link to the `Device` drop-down element.
   *
   * @returns {Web Element}
   */
  getDeviceDropDown: function () {
    return this
      .getActivePanel()
      .element(by.model(this.locators.panels.activePanel.dropdowns.device.model));
  },

  /**
   * ### TopObjectsForm.getCountDropDown().
   *
   * Gets the link to the `Count` drop-down element.
   *
   * @returns {Web Element}
   */
  getCountDropDown: function () {
    return this
      .getActivePanel()
      .element(by.model(this.locators.panels.activePanel.dropdowns.count.model));
  },


  /**
   * ### TopObjectsForm.getUpdateReportBtn().
   *
   * Gets the link to the `Update` btn element.
   *
   * @returns {Web Element}
   */
  getUpdateReportBtn: function () {
    return this
      .getActivePanel()
      .element(by.css(this.locators.panels.activePanel.buttons.updateReport.css));
  },

  /**
   * ### TopObjectsForm.clickUpdateReport().
   *
   * Performs click on the `Update` btn element.
   *
   * @returns {Web Element}
   */
  clickUpdateReport: function () {
    return this
      .getUpdateReportBtn()
      .click();
  },

  getDelay: function () {
    return this.getDelayDropDown()
      .$('option:checked')
      .getText();
  },

  getCountry: function () {
    return this.getCountryDropDown()
      .$('option:checked')
      .getText();
  },

  getOS: function () {
    return this.getOSDropDown()
      .$('option:checked')
      .getText();
  },

  getDevice: function () {
    return this.getDeviceDropDown()
      .$('option:checked')
      .getText();
  },

  getCount: function () {
    return this.getCountDropDown()
      .$('option:checked')
      .getText();
  },

  setDelay: function (value) {
    return this.getDelayDropDown()
      .sendKeys(value);
  },

  setCountry: function (value) {
    return this.getCountryDropDown()
      .sendKeys(value);
  },

  setOS: function (value) {
    return this.getOSDropDown()
      .sendKeys(value);
  },

  setDevice: function (value) {
    return this.getDeviceDropDown()
      .sendKeys(value);
  },

  setCount: function (value) {
    return this.getCountDropDown()
      .sendKeys(value);
  }
};

module.exports = TopObjectsForm;
