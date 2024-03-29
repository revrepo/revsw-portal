/* jshint ignore:start */


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

// # Edit App Page Object

// This `Edit App` Page Object abstracts all operations or actions
// that a common Two-Factor Authentication could do in the Portal app/site.
var EditAppForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
      panelHeading: '.col-md-12 .panel .panel-heading',
      panelBody: '.col-md-12 .panel .panel-body',
    },
    buttons: {
      backToList: {
        linkText: 'Back To List'
      },
      advancedMode: {
        linkText: 'Advanced Mode'
      },
      addNewVersion: {
        linkText: 'Add New Version'
      },
      cancel: {
        linkText: 'Cancel'
      },
      verify: {
        css: '[ng-click=\"verify(model, configuration)\"]'
      },
      update: {
        css: '[ng-click=\"updateApp(model, configuration)\"]'
      },
      publish: {
        css: '[ng-click=\"publish(model, configuration)\"]'
      },
      SDKKey: {
        css: '.btn.btn-primary.ng-isolate-scope'
      },
      showSDKKey: {
        buttonText: 'Show SDK Key'
      }
    },
    inputs: {
      appName: {
        id: 'app_name'
      },
      comment: {
        id: 'comment'
      },
      SDKKey: {
        id: 'key'
      }
    },
    radios: {
      debug: {
        css: '[ng-model="configuration.logging_level"][value="debug"]'
      },
      info: {
        css: '[ng-model="configuration.logging_level"][value="info"]'
      },
      warning: {
        css: '[ng-model="configuration.logging_level"][value="warning"]'
      },
      error: {
        css: '[ng-model="configuration.logging_level"][value="error"]'
      },
      critical: {
        css: '[ng-model="configuration.logging_level"][value="critical"]'
      },
      selected: {
        xpath: './/*[@class="ng-valid ng-dirty ng-valid-parse ng-touched"]/..'
      }
    },
    checkboxes: {
      standard: {
        css: 'input[value="standard"]'
      },
      quic: {
        css: 'input[value="quic"]'
      },
      rpm: {
        css: 'input[value="rmp"]'
      }
    },
    dropDowns: {
      sdkReleaseVersion: {
        id: 'sdk_release_version'
      },
      account: {
        xpath: './/*[@class="select2-chosen ng-binding ng-hide"]'
      },
      sdkOperationMode: {
        id: 'operation_mode'
      },
      configurationRefreshInterval: {
        id: 'configuration_refresh_interval_sec'
      },
      configurationStaleTimeout: {
        id: 'configuration_stale_timeout_sec'
      },
      initialTransportProtocol: {
        id: 'initial_transport_protocol'
      },
      analyticsReportingLevel: {
        id: 'stats_reporting_level'
      },
      analyticsReportingInterval: {
        id: 'stats_reporting_interval_sec'
      },
      domainsWhiteList: {
        css: '[id="domains_white_list"] >div > span + input'
      },
      domainsWhiteListValue: {
        css: '[id="domains_white_list"] >div'
      },
      domainsBlackList: {
        css: '[id="domains_black_list"] >div > span + input'
      },
      domainsBlackListValue: {
        css: '[id="domains_black_list"] >div'
      },
      domainsProvisionedList: {
        css: '[id="domains_provisioned_list"] >div > span + input'
      },
      domainsProvisionedListValues: {
        css: '[id="domains_provisioned_list"] >div > span'
      },
      selectChoicesRow: {
        css: '.ui-select-choices-row-inner'
      },
      testingOffloadingRatio: {
        id: 'a_b_testing_origin_offload_ratio'
      }
    }
  },

  /**
   * ### EditAppForm.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Edit App page in the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPanelBodyElem: function () {
    return element
      .all(by.css(this.locators.views.container))
      .get(2)
      .element(by.css(this.locators.views.panelBody));
  },

  /**
   * ### EditAppForm.getAppNameTxt()
   *
   * Gets the reference to `App Name` text field element.
   *
   * @returns {Promise}
   */
  getAppNameTxt: function () {
    return element(by.id(this.locators.inputs.appName.id));
  },

  /**
   * ### EditAppForm.getSDKReleaseVersionDDown()
   *
   * Gets the reference to `Platform` Drop Down element.
   *
   * @returns {Promise}
   */
  getSDKReleaseVersionDDown: function () {
    return element(by.id(this.locators.dropDowns.sdkReleaseVersion.id));
  },

  clickSDKKeyClipboardButton: function () {
    element(by.css(this.locators.buttons.SDKKey.css)).click();
  },

  getShowSDKKeyButton: function () {
    return element(by.buttonText(this.locators.buttons.showSDKKey.buttonText));
  },

  getSDKKeyInput: function () {
    return element(by.id(this.locators.inputs.SDKKey.id));
  },

  /**
   * ### EditAppForm.getSDKOperationModeDDown()
   *
   * Gets the reference to `Platform` Drop Down element.
   *
   * @returns {Promise}
   */
  getSDKOperationModeDDown: function () {
    return element(by.id(this.locators.dropDowns.sdkOperationMode.id));
  },

  getDebugSDKeventsLoggingLevel: function () {
    return element(by.css(this.locators.radios.debug.css));
  },

  getInfoSDKeventsLoggingLevel: function () {
    return element(by.css(this.locators.radios.info.css));
  },

  getWarningSDKeventsLoggingLevel: function () {
    return element(by.css(this.locators.radios.warning.css));
  },

  getErrorSDKeventsLoggingLevel: function () {
    return element(by.css(this.locators.radios.error.css));
  },

  getCriticalSDKeventsLoggingLevel: function () {
    return element(by.css(this.locators.radios.critical.css));
  },

  getSelectedSDKEventsLoggingLevel: function () {
    return element(by.xpath(this.locators.radios.selected.xpath));
  },

  getAccountDown: function () {
    return element(by.xpath(this.locators.dropDowns.account.xpath));
  },

  /**
   * ### EditAppForm.getConfigurationRefreshIntervalDDown()
   *
   * Gets the reference to `Configuration Refresh Interval` Drop Down element.
   *
   * @returns {Promise}
   */
  getConfigurationRefreshIntervalDDown: function () {
    return element(
      by.id(this.locators.dropDowns.configurationRefreshInterval.id));
  },

  /**
   * ### EditAppForm.getConfigurationStaleTimeoutDDown()
   *
   * Gets the reference to `Configuration Stale Timeout` Drop Down element.
   *
   * @returns {Promise}
   */
  getConfigurationStaleTimeoutDDown: function () {
    return element(by.id(this.locators.dropDowns.configurationStaleTimeout.id));
  },

  getAllowedTransportProtocolsAndSelectionPriorityRPM: function () {
    return element(by.css(this.locators.checkboxes.rpm.css));
  },

  isAllowedTransportProtocolsAndSelectionPriorityRPMchecked: function () {
    return this.getAllowedTransportProtocolsAndSelectionPriorityRPM().getAttribute('checked');
  },

  getAllowedTransportProtocolsAndSelectionPriorityQUIC: function () {
    return element(by.css(this.locators.checkboxes.quic.css));
  },

  isAllowedTransportProtocolsAndSelectionPriorityQUICchecked: function () {
    return this.getAllowedTransportProtocolsAndSelectionPriorityQUIC().getAttribute('checked');
  },

  getAllowedTransportProtocolsAndSelectionPrioritySTANDARD: function () {
    return element(by.css(this.locators.checkboxes.standard.css));
  },

  isAllowedTransportProtocolsAndSelectionPrioritySTANDARDchecked: function () {
    return this.getAllowedTransportProtocolsAndSelectionPrioritySTANDARD().getAttribute('checked');
  },

  uncheckAllAllowedTransportProtocolsAndSelectionPriority: function () {
    if (this.isAllowedTransportProtocolsAndSelectionPriorityRPMchecked())
      this.getAllowedTransportProtocolsAndSelectionPriorityRPM().click();

    if (this.isAllowedTransportProtocolsAndSelectionPriorityQUICchecked())
      this.getAllowedTransportProtocolsAndSelectionPriorityQUIC().click();

    if (this.isAllowedTransportProtocolsAndSelectionPrioritySTANDARDchecked())
      this.getAllowedTransportProtocolsAndSelectionPrioritySTANDARD().click();
  },

  /**
   * ### EditAppForm.getInitialTransportProtocol()
   *
   * Gets the reference to `Initial Transport Protocol` Drop Down element.
   *
   * @returns {Promise}
   */
  getInitialTransportProtocol: function () {
    return element(by.id(this.locators.dropDowns.initialTransportProtocol.id));
  },

  /**
   * ### EditAppForm.getAnalyticsReportingLevel()
   *
   * Gets the reference to `Analytics Reporting Level` Drop Down element.
   *
   * @returns {Promise}
   */
  getAnalyticsReportingLevel: function () {
    return element(by.id(this.locators.dropDowns.analyticsReportingLevel.id));
  },

  /**
   * ### EditAppForm.getAnalyticsReportingInterval()
   *
   * Gets the reference to `Analytics Reporting Interval` Drop Down element.
   *
   * @returns {Promise}
   */
  getAnalyticsReportingInterval: function () {
    return element(
      by.id(this.locators.dropDowns.analyticsReportingInterval.id));
  },

  /**
   * ### EditAppForm.getDomainsWhiteList()
   *
   * Gets the reference to `Domains White List` Drop Down element.
   *
   * @returns {Promise}
   */
  getDomainsWhiteList: function () {
    return element(by.css(this.locators.dropDowns.domainsWhiteList.css));
  },

  getDomainsWhiteListValues: function () {
    return element(by.css(this.locators.dropDowns.domainsWhiteListValue.css)).getText();
  },

  /**
   * ### EditAppForm.getDomainsBlackList()
   *
   * Gets the reference to `Domains Black List` Drop Down element.
   *
   * @returns {Promise}
   */
  getDomainsBlackList: function () {
    return element(by.css(this.locators.dropDowns.domainsBlackList.css));
  },

  getDomainsBlackListValues: function () {
    return element(by.css(this.locators.dropDowns.domainsBlackListValue.css)).getText();
  },

  /**
   * ### EditAppForm.getDomainsProvisionedList()
   *
   * Gets the reference to `Domains Provisioned List` Drop Down element.
   *
   * @returns {Promise}
   */
  getDomainsProvisionedList: function () {
    return element(by.css(this.locators.dropDowns.domainsProvisionedList.css));
  },

  getDomainsProvisionedListValues: function () {
    return element(by.css(this.locators.dropDowns.domainsProvisionedListValues.css)).getText();
  },

  getSelectChoicesRowDown: function () {
    return element(by.css(this.locators.dropDowns.selectChoicesRow.css));
  },

  /**
   * ### EditAppForm.getTestingOffloadingRatio()
   *
   * Gets the reference to `Testing Offloading Ratio` Drop Down element.
   *
   * @returns {Promise}
   */
  getTestingOffloadingRatio: function () {
    return element(by.id(this.locators.dropDowns.testingOffloadingRatio.id));
  },

  getComment: function () {
    return element(by.id(this.locators.inputs.comment.id));
  },

  /**
   * ### EditAppForm.getBackToListBtn()
   *
   * Gets the reference to `Back To List` button element.
   *
   * @returns {Promise}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### EditAppForm.getBackToListBtn()
   *
   * Gets the reference to `Back To List` button element.
   *
   * @returns {Promise}
   */
  getAdvancedModeBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.advancedMode.linkText));
  },

  /**
   * ### EditAppForm.getAddNewVersionBtn()
   *
   * Gets the reference to `Add New Version` button element.
   *
   * @returns {Promise}
   */
  getAddNewVersionBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.addNewVersion.linkText));
  },

  /**
   * ### EditAppForm.getCancelBtn()
   *
   * Gets the reference to `Cancel` button element.
   *
   * @returns {Promise}
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### EditAppForm.getVerifyBtn()
   *
   * Gets the reference to `Verify` button element.
   *
   * @returns {Promise}
   */
  getVerifyBtn: function () {
    return element(by.css(this.locators.buttons.verify.css));
  },

  /**
   * ### EditAppForm.getUpdateBtn()
   *
   * Gets the reference to `Update` button element.
   *
   * @returns {Promise}
   */
  getUpdateBtn: function () {
    return element(by.css(this.locators.buttons.update.css));
  },

  /**
   * ### EditAppForm.getPublishBtn()
   *
   * Gets the reference to `Publish` button element.
   *
   * @returns {Promise}
   */
  getPublishBtn: function () {
    return element(by.css(this.locators.buttons.publish.css));
  },

  // ## Helper Methods

  /**
   * ### EditAppForm.setAppName(value)
   *
   * Sets a value into App Name field in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setAppName: function (value) {
    this.getAppNameTxt().clear();
    return this
      .getAppNameTxt()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setSDKReleaseVersion(value)
   *
   * Sets a value into SDK Release Version drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setSDKReleaseVersion: function (value) {
    return this
      .getSDKOperationModeDDown()
      .sendKeys(value);
  },

  setSDKKey: function (value) {
    var me = this;
    return me
      .getSDKKeyInput()
      .clear()
      .then(function () {
        return me
          .getSDKKeyInput()
          .sendKeys(value);
      });
  },

  clickShowSDKKeyButton: function () {
    this.getShowSDKKeyButton().click();
  },

  /**
   * ### EditAppForm.setSDKOperationMode(value)
   *
   * Sets a value into SDK Operation Mode drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setSDKOperationMode: function (value) {
    return this
      .getSDKOperationModeDDown()
      .sendKeys(value);
  },

  setSDKeventsLoggingLevel: function (value) {
    switch (value) {
      case 'Info':
        this.getInfoSDKeventsLoggingLevel().click();
        break;
      case 'Warning':
        this.getWarningSDKeventsLoggingLevel().click();
        break;
      case 'Error':
        this.getErrorSDKeventsLoggingLevel().click();
        break;
      case 'Critical':
        this.getCriticalSDKeventsLoggingLevel().click();
        break;
    }
  },

  /**
   * ### EditAppForm.setConfigurationRefreshInterval(value)
   *
   * Sets into Configuration Refresh Interval drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setConfigurationRefreshInterval: function (value) {
    this
      .getConfigurationRefreshIntervalDDown()
      .clear();

    this
      .getConfigurationRefreshIntervalDDown()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setConfigurationStaleTimeout(value)
   *
   * Sets value into Configuration Stale Timeout drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setConfigurationStaleTimeout: function (value) {
    this
      .getConfigurationStaleTimeoutDDown()
      .clear();

    this
      .getConfigurationStaleTimeoutDDown()
      .sendKeys(value);
  },

  setAllowedTransportProtocolsAndSelectionPriority: function (value) {
    this.uncheckAllAllowedTransportProtocolsAndSelectionPriority();
    switch (value) {
      case 'STANDARD':
        this.getAllowedTransportProtocolsAndSelectionPrioritySTANDARD().click();
        break;
      case 'QUIC':
        this.getAllowedTransportProtocolsAndSelectionPriorityQUIC().click();
        break;
      case 'RMP':
        this.getAllowedTransportProtocolsAndSelectionPriorityRPM().click();
        break;
    }
  },

  /**
   * ### EditAppForm.setInitialTransportProtocol(value)
   *
   * Sets value into Initial Transport Protocol drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setInitialTransportProtocol: function (value) {
    return this
      .getInitialTransportProtocol()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setAnalyticsReportingLevel(value)
   *
   * Sets value into Analytics Reporting Level drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setAnalyticsReportingLevel: function (value) {
    return this
      .getAnalyticsReportingLevel()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setAnalyticsReportingInterval(value)
   *
   * Sets value into Analytics Reporting Interval drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setAnalyticsReportingInterval: function (value) {
    this
      .getAnalyticsReportingInterval()
      .clear();

    this
      .getAnalyticsReportingInterval()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.setDomainsWhiteList(value)
   *
   * Sets value into Domains White List drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setDomainsWhiteList: function (value) {
    this
      .getDomainsWhiteList()
      .sendKeys(value);

    browser.actions().sendKeys(protractor.Key.ENTER).perform();
  },


  /**
   * ### EditAppForm.setDomainsBlackList(value)
   *
   * Sets value into Domains Black List drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setDomainsBlackList: function (value) {
    this
      .getDomainsBlackList()
      .sendKeys(value);

    browser.actions().sendKeys(protractor.Key.ENTER).perform();
  },

  /**
   * ### EditAppForm.setDomainsProvisionedList(value)
   *
   * Sets value into Domains Provisioned List drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setDomainsProvisionedList: function (value) {
    this
      .getDomainsProvisionedList()
      .sendKeys(value);

    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    /*      this
     .getSelectChoicesRowDown()
     .click();*/
  },

  /**
   * ### EditAppForm.setTestingOffloadingRatio(value)
   *
   * Sets value into Testing Offloading Ratio drop down in `Edit App` Page.
   *
   * @param {String} value.
   *
   * @returns {Promise}
   */
  setTestingOffloadingRatio: function (value) {
    this
      .getTestingOffloadingRatio()
      .clear();
    this
      .getTestingOffloadingRatio()
      .sendKeys(value);
  },

  setComment: function (value) {
    this
      .getComment()
      .clear();

    this
      .getComment()
      .sendKeys(value);
  },

  /**
   * ### EditAppForm.clickBackToList()
   *
   * Clicks on Back To List button of `Add New App` Page.
   *
   * @returns {Promise}
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### EditAppForm.clickAdvancedMode()
   *
   * Clicks on Advanced Mode button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickAdvancedMode: function () {
    return this
      .getAdvancedModeBtn()
      .click();
  },

  /**
   * ### EditAppForm.clickAddNewVersion()
   *
   * Clicks on Add New Version button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickAddNewVersion: function () {
    return this
      .getAddNewVersionBtn()
      .click();
  },

  /**
   * ### EditAppForm.clickCancel()
   *
   * Clicks on Cancel button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  /**
   * ### EditAppForm.clickVerify()
   *
   * Clicks on Verify button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickVerify: function () {
    return this
      .getVerifyBtn()
      .click();
  },

  /**
   * ### EditAppForm.clickUpdate()
   *
   * Clicks on Update button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickUpdate: function () {
    return this
      .getUpdateBtn()
      .click();
  },

  /**
   * ### EditAppForm.clickPublish()
   *
   * Clicks on Publish button of `Edit App` Page.
   *
   * @returns {Promise}
   */
  clickPublish: function () {
    return this
      .getPublishBtn()
      .click();
  },

  /**
   * ### EditAppForm.isVerifyBtnEnabled()
   *
   * Checks if Verify button is enabled in `Edit App` Page.
   *
   * @returns {Promise}
   */
  isVerifyBtnEnabled: function () {
    return this
      .getVerifyBtn()
      .isEnabled();
  },

  /**
   * ### EditAppForm.isUpdateBtnEnabled()
   *
   * Checks if Update button is enabled in `Edit App` Page.
   *
   * @returns {Promise}
   */
  isUpdateBtnEnabled: function () {
    return this
      .getUpdateBtn()
      .isEnabled();
  },

  /**
   * ### EditAppForm.isPublishBtnEnabled()
   *
   * Checks if Publish button is enabled in `Edit App` Page.
   *
   * @returns {Promise}
   */
  isPublishBtnEnabled: function () {
    return this
      .getPublishBtn()
      .isEnabled();
  },

  /**
   * ### EditAppForm.fill(app)
   *
   * Fills on Edit App from of `Edit App` Page.
   *
   * @param {object} app, app data with following schema.
   *
   *    {
   *        name: String,
   *        sdkOperationMode: String
   *    }
   *
   * @returns {Promise}
   */
  fill: function (app) {
    this.setAppName(app.name);
    //this.setAccount(app.account);
    this.setSDKOperationMode(app.sdkOperationMode);
    this.setSDKeventsLoggingLevel(app.SDKeventsLoggingLevel);
    this.setConfigurationRefreshInterval(app.configurationRefreshInterval);
    this.setConfigurationStaleTimeout(app.configurationStaleTimeout);
    this.setAllowedTransportProtocolsAndSelectionPriority(app.allowedTransportProtocolsAndSelectionPriority);
    this.setInitialTransportProtocol(app.initialTransportProtocol);
    this.setAnalyticsReportingLevel(app.analyticsReportingLevel);
    this.setAnalyticsReportingInterval(app.analyticsReportingInterval);
    this.setDomainsWhiteList(app.domainsWhiteList);
    this.setDomainsBlackList(app.domainsBlackList);
    //this.setDomainsProvisionedList(app.domainsProvisionedList);
    this.setTestingOffloadingRatio(app.testingOffloadingRatio);
    this.setComment(app.comment);
  }
};

module.exports = EditAppForm;
