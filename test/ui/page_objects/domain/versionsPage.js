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

// # Domain Versions Page Object

// This `Domain Versions` Page Object abstracts all operations or actions that a
// common user could do in the Domain Historical Versions page from the Portal
// app/site.
var DomainVersions = {

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        css: 'h2'
      },
      domainConfigVersionWarning: {
        className: 'text-info'
      }
    },
    buttons: {
      backToList: {
        linkText: 'Back To List'
      }
    },
    dropDowns: {
      domainConfigVersion: {
        model: 'currentVersion'
      },
      domainCompareVersion: {
        model: 'compareVersion'
      }
    },
    panels: {
      domainComparisonResults: {
        className: 'col-md-12'
      }
    }
    
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### DomainStats.getDomainComparisonResultsPanel()
   *
   * Returns the reference to the `Domain Comparison Results` frame element (Selenium WebDriver
   * Element) from the Domain Versions page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainComparisonResultsPanel: function () {
    return element(by.className(this.locators.panels.domainComparisonResults.className));
  },
  
  /**
   * ### DomainStats.getDomainConfigVersionWarning()
   *
   * Returns the reference to the `Config Version Warning` label element (Selenium WebDriver
   * Element) from the Domain Versions page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainConfigVersionWarning: function () {
    return element(by.className(this.locators.labels.domainConfigVersionWarning.className));
  },  
  
  /**
   * ### DomainStats.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Domain Versions page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.css(this.locators.labels.title.css));
  },

  /**
   * ### DomainVersions.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Domain Versions page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### DomainVersions.getDomainConfigVersionDDown()
   *
   * Returns the reference to the 'Domain Config Version' drop-down
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainConfigVersionDDown: function () {
    return element(by.model(this.locators.dropDowns.domainConfigVersion.model));
  },

  /**
   * ### DomainVersions.getDomainConfigVersionLastAddedItem()
   *
   * Returns the reference to the last added item from 'Domain Config Version' drop-down
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainConfigVersionLastAddedItem: function () {
    return this
        .getDomainConfigVersionDDown()
        .all(by.css('option'))
        .last();
  },

  /**
   * ### DomainVersions.getDomainConfigVersionDDownItems()
   *
   * Returns the reference to the all items from 'Domain Config Version' drop-down
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainConfigVersionDDownItems: function () {
    return this
        .getDomainConfigVersionDDown()
        .all(by.css('option'));
  },
  
  /**
   * ### DomainVersions.getDomainCompareVersionDDown()
   *
   * Returns the reference to the 'Domain Compare Version' drop-down
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainCompareVersionDDown: function () {
    return element(by.model(this.locators.dropDowns.domainCompareVersion.model));
  },

  /**
   * ### DomainVersions.getDomainCompareVersionLastAddedItem()
   *
   * Returns the reference to the last added item from 'Domain Compare Version' drop-down
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainCompareVersionLastAddedItem: function () {
    return this
        .getDomainCompareVersionDDown()
        .all(by.css('option'))
        .last();
  },

  /**
   * ### DomainVersions.getDomainCompareVersionDDownItems()
   *
   * Returns the reference to the all items from 'Domain Compare Version' drop-down
   *
   * @returns {Selenium WebDriver Element}
   */
  getDomainCompareVersionDDownItems: function () {
    return this
        .getDomainCompareVersionDDown()
        .all(by.css('option'));
  },

  // ## Methods to interact with the Edit Domain Page components

  /**
   * ### DomainVersions.setDomainConfigVersion()
   *
   * Sets a new value for 'Domain Config Version' drop-down
   *
   */
  setDomainConfigVersion: function (value) {
    return this.getDomainConfigVersionDDown()
        .click()
        .sendKeys(value)
        .sendKeys(protractor.Key.ENTER);
  },

  /**
   * ### DomainVersions.setDomainCompareVersion()
   *
   * Sets a new value for 'Domain Compare Version' drop-down
   *
   */
  setDomainCompareVersion: function (value) {
    return this.getDomainCompareVersionDDown()
        .click()
        .sendKeys(value)
        .sendKeys(protractor.Key.ENTER);
  },

  /**
   * ### DomainVersions.getResultOriginString()
   *
   * Returns the field's value from the comparison results panel
   * which corresponds to the first drop-down and shows
   * what was the original value
   *
   * @param {String} fieldName
   *
   * @returns {Promise}
   */
  getResultOriginString: function (fieldName) {
    return this.getDomainComparisonResultsPanel()
    .all(by.xpath('.//*[contains(text(),' +
        '"' + fieldName + '")]'))
        .get(1)
        .getText();
  },

  /**
   * ### DomainVersions.getResultComparedString()
   *
   * Returns the field's value from the comparison results panel
   * which corresponds to the second drop-down and shows what was changed
   * in that version of domain
   *
   * @param {String} fieldName
   *
   * @returns {Promise}
   */
  getResultComparedString: function (fieldName){
    return this.getDomainComparisonResultsPanel()
        .all(by.xpath('.//*[contains(text(),' +
            '"' + fieldName + '")]'))
        .get(2)
        .getText();
  },

  /**
   * ### DomainVersions.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Domain Versions page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### DomainVersions.isDisplayed()
   *
   * Checks whether the Versions Domain page is being displayed in the UI or
   * not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getDomainConfigVersionDDown()
      .isPresent();
  },

  /**
   * ### DomainVersions.getTitle()
   *
   * Gets the `Title` label from the Domain Versions page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  }
};

module.exports = DomainVersions;
