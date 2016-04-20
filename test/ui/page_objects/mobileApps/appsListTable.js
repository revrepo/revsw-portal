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

// # Apps List Table Page Object

// This `Apps List` Page Object abstracts all operations or actions that a
// common user could do in the Apps List page the Portal app/site.
var AppsListTable = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: '.container-fluid .row',
    panelHeading: {
      css: '.col-md-12 .panel .panel-heading',
      pullLeft: '.pull-left',
      pullRight: '.pull-right'
    },
    panelBody: '.col-md-12 .panel .panel-body',
    tables: {
      appsList: {
        repeater: 'item in filteredRecords'
      }
    },
    buttons: {
      stagingStatus: {
        css: '.glyphicon.glyphicon-ok-sign'
      },
      globalStatus: {
        css: '.glyphicon.glyphicon-ok-circle'
      },
      editApp: {
        css: '.glyphicon.glyphicon-pencil'
      },
      advancedEdit: {
        css: '.glyphicon.glyphicon-cog'
      },
      deleteApp: {
        css: '.glyphicon.glyphicon-trash'
      },
      stats: {
        css: '.glyphicon.glyphicon-stats'
      },
      previousVersions: {
        css: '.glyphicon.glyphicon-book'
      }
    }
  },

  /**
   * ### AppsListTable.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Apps List page in the Portal app.
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
   * ### AppsListTable.getAppsListTbl()
   *
   * Gets the reference to `Table` Apps List table elements.
   *
   * @returns {Promise}
   */
  getAppsListTbl: function () {
    return this
      .getPanelBodyElem()
      .all(by.repeater(this.locators.tables.appsList.repeater));
  },

  /**
   * ### AppsListTable.getRowElem()
   *
   * Gets the row element by row index from the Apps List table.
   *
   * @param {String} rowIndex of row in Apps List table.
   *
   * @returns {Promise}
   */
  getRowElem: function (rowIndex) {
    return this
      .getAppsListTbl()
      .get(rowIndex);
  },

  /**
   * ### AppsListTable.getValueByColumnIndex()
   *
   * Gets value from `Row` element from Apps List row element.
   *
   * @param {String} rowIndex to get value from row element.
   * @param {String} columnIndex to get value from row element.
   *
   * @returns {Promise}
   */
  getValueByColumnIndex: function (rowIndex, columnIndex) {
    return this
      .getRowElem(rowIndex)
      .all(by.tagName('td'))
      .get(columnIndex);
  },

  /**
   * ### AppsListTable.getName()
   *
   * Gets the Name element of `Apps List` table element.
   *
   * @returns {Promise}
   */
  getName: function () {
    return this.getValueByColumnIndex(0, 0);
  },

  /**
   * ### AppsListTable.getPlatform()
   *
   * Gets the Platform element of `Apps List` table element.
   *
   * @returns {Promise}
   */
  getPlatform: function () {
    return this.getValueByColumnIndex(0, 1);
  },

  /**
   * ### AppsListTable.getVersion()
   *
   * Gets the Version element of `Apps List` table element.
   *
   * @returns {Promise}
   */
  getVersion: function () {
    return this.getValueByColumnIndex(0, 2);
  },

  /**
   * ### AppsListTable.getLastUpdate()
   *
   * Gets the Last Update element of `Apps List` table element.
   *
   * @returns {Promise}
   */
  getLastUpdate: function () {
    return this.getValueByColumnIndex(0, 3);
  },

  /**
   * ### AppsListTable.getSDKKey()
   *
   * Gets the SDK Key element of `Apps List` table element.
   *
   * @returns {Promise}
   */
  getSDKKey: function (callback) {
    return this.getValueByColumnIndex(0, 4);
  },

  /**
   * ### AppsListTable.getStagingStatus()
   *
   * Gets the Staging Status element of `Apps List` table element.
   *
   * @returns {Promise}
   */
  getStagingStatus: function () {
    return this
      .getValueByColumnIndex(0, 5)
      .element(by.css(this.locators.buttons.stagingStatus.css));
  },

  /**
   * ### AppsListTable.getGlobalStatus()
   *
   * Gets the Global Status element of `Apps List` table element.
   *
   * @returns {Promise}
   */
  getGlobalStatus: function () {
    return this
      .getValueByColumnIndex(0, 5)
      .element(by.css(this.locators.buttons.globalStatus.css));
  },

  /**
   * ### AppsListTable.getEditApp()
   *
   * Clicks on Edit button of `Apps List` table element.
   *
   * @returns {Promise}
   */
  getEditApp: function () {
    return this
      .getValueByColumnIndex(0, 6)
      .element(by.css(this.locators.buttons.editApp.css));
  },

  /**
   * ### AppsListTable.getAdvancedEditApp()
   *
   * Clicks on Advanced Edit button of `Apps List` table element.
   *
   * @returns {Promise}
   */
  getAdvancedEditApp: function () {
    return this
      .getValueByColumnIndex(0, 6)
      .element(by.css(this.locators.buttons.advancedEdit.css));
  },

  /**
   * ### AppsListTable.getDeleteApp()
   *
   * Clicks on Delete Edit button of `Apps List` table element.
   *
   * @returns {Promise}
   */
  getDeleteApp: function () {
    return this
      .getValueByColumnIndex(0, 6)
      .element(by.css(this.locators.buttons.deleteApp.css));
  },

  /**
   * ### AppsListTable.getStats()
   *
   * Clicks on Stats button of `Apps List` table element.
   *
   * @returns {Promise}
   */
  getStatsApp: function () {
    return this
      .getValueByColumnIndex(0, 6)
      .element(by.css(this.locators.buttons.stats.css));
  },

  /**
   * ### AppsListTable.getPreviousVersion()
   *
   * Clicks on Stats button of `Apps List` table element.
   *
   * @returns {Promise}
   */
  getPreviousVersion: function () {
    return this
      .getValueByColumnIndex(0, 6)
      .element(by.css(this.locators.buttons.previousVersions.css));
  },

  // ## Helper Methods

  /**
   * ### AppsListTable.countTotalRows()
   *
   * Gets the total of `Apps List` in the table element per page.
   *
   * @returns {Promise}
   */
  countTotalRows: function() {
    return this
      .getAppsListTbl()
      .count();
  },

  /**
   * ### AppsListTable.isStagingStatusChecked()
   *
   * Checks whether Staging Status has published status or not.
   *
   * @returns {Promise}
   */
  isStagingStatusPublished: function(callback) {
    this.getStagingStatus().then(function(text) {
      if (text.indexOf('Staging Status: Published') > -1) {
        callback(false);
      } else {
        callback(true);
      }
    });
  },

  /**
   * ### AppsListTable.isGlobalStatusChecked()
   *
   * Checks whether Global Status has published status or not.
   *
   * @returns {Promise}
   */
  isGlobalStatusPublished: function(callback) {
    this.getGlobalStatus().then(function(text) {
      if (text.indexOf('Staging Status: Published') > -1) {
        callback(false);
      } else {
        callback(true);
      }
    });
  },

  /**
   * ### AppsListTable.clickNameApp()
   *
   * Clicks on Name of application link of `Apps List` table element.
   *
   * @returns {Promise}
   */
  clickNameApp: function () {
    return this
      .getName()
      .click();
  },

  /**
   * ### AppsListTable.clickEditApp()
   *
   * Clicks on Edit App link of `Apps List` table element.
   *
   * @returns {Promise}
   */
  clickEditApp: function () {
    return this
      .getEditApp()
      .click();
  },

  /**
   * ### AppsListTable.clickAdvancedEditApp()
   *
   * Clicks on Advanced Edit App link of `Apps List` table element.
   *
   * @returns {Promise}
   */
  clickAdvancedEditApp: function () {
    return this
      .getAdvancedEditApp()
      .click();
  },

  /**
   * ### AppsListTable.clickDeleteApp()
   *
   * Clicks on Delete App link of `Apps List` table element.
   *
   * @returns {Promise}
   */
  clickDeleteApp: function () {
    return this
      .getDeleteApp()
      .click();
  },

  /**
   * ### AppsListTable.clickStatsApp()
   *
   * Clicks on Stats App link of `Apps List` table element.
   *
   * @returns {Promise}
   */
  clickStatsApp: function () {
    return this
      .getStatsApp()
      .click();
  },

  /**
   * ### AppsListTable.clickPreviousVersionApp()
   *
   * Clicks on Previous Version App link of `Apps List` table element.
   *
   * @returns {Promise}
   */
  clickPreviousVersionApp: function () {
    return this
      .getPreviousVersion()
      .click();
  },

  /**
   * ### AppsListTable.getRow()
   *
   * Gets the first row of `Apps List` from the table element per page.
   *
   * @returns {Promise}
   */
  getRow: function() {
    return {
      name: this.getName(),
      platform: this.getPlatform(),
      version: this.getVersion(),
      lastUpdate: this.getLastUpdate(),
      sdkKey: this.getSDKKey(),
      stagingStatus: this.getStagingStatus(),
      globalStatus: this.getGlobalStatus()
    };
  }
};

module.exports = AppsListTable;
