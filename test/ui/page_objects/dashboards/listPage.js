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

// # Dashboard List Page Object

// Requiring other Page Objects that compound the Dashboards List Page:
var DashboardForm = require('./form');

// This `Dashboard List` Page Object abstracts all operations or actions that a
// common user could do in the Dashboard List page from the Portal app/site.
var DashboardList = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.dashboard-container'
    },
    labels: {
      title: {
        // css: 'page-title'
        css: '.h2.ng-binding'
      }
    },
    buttons: {
      addDashboard: {
        css: '.glyphicon.glyphicon-plus'
      },
      refreshNow: {
        css: '.btn.btn-info'
      },
      modifyDashboard: {
        css: '.glyphicon.glyphicon-edit'
      },
      addNewWidget: {
        css: '.glyphicon.glyphicon-plus-sign'
      },
      editDashboardProperties: {
        css: '.glyphicon.glyphicon-cog'
      },
      saveChanges: {
        css: '.glyphicon.glyphicon-save'
      },
      undoChanges: {
        css: '.glyphicon.glyphicon-repeat.adf-flip'
      }
    },
    dropDowns: {
      autoRefresh: {
        model: 'model.options.autorefresh'
      }
    },
    dashboards: {
      css: '.dashboard-preview-background',
      leftMenu: {
        id: 'left-menu-dashboard-section'
        // repeater: 'dash in vm.dashboardsList'
      }
    }
  },

  // `Dashboards List` Page is compound mainly by the form. Following
  // properties make reference to the Page Objects of those components.
  form: DashboardForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### DashboardList.getDashboardContainerElem()
   *
   * Returns the reference to the `Dashboard Container` element (Selenium
   * WebDriver Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getDashboardContainerElem: function () {
    return element(by.css(this.locators.views.container));
  },

  /**
   * ### DashboardList.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.css(this.locators.labels.title.css));
  },

  /**
   * ### DashboardList.getAddNewDashboardBtn()
   *
   * Returns the reference to the `Add New Dashboard` button (Selenium WebDriver
   * Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAddNewDashboardBtn: function () {
    return element
      .all(by.css(this.locators.buttons.addDashboard.css))
      .get(0);
  },

  /**
   * ### DashboardList.getRefreshNowBtn()
   *
   * Returns the reference to the `Refresh Now` button (Selenium WebDriver
   * Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getRefreshNowBtn: function () {
    return element(by.css(this.locators.buttons.refreshNow.css));
  },

  /**
   * ### DashboardList.getModifyDashboardBtn()
   *
   * Returns the reference to the `Modify Dashboard` button (Selenium WebDriver
   * Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getModifyDashboardBtn: function () {
    return element
      .all(by.css(this.locators.buttons.modifyDashboard.css))
      .get(0);
  },

  /**
   * ### DashboardList.getAddNewWidgetBtn()
   *
   * Returns the reference to the `Add New Widget` button (Selenium WebDriver
   * Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAddNewWidgetBtn: function () {
    return element(by.css(this.locators.buttons.addNewWidget.css));
  },

  /**
   * ### DashboardList.getEditDashboardPropertiesBtn()
   *
   * Returns the reference to the `Edit Dashboard` button (Selenium WebDriver
   * Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getEditDashboardPropertiesBtn: function () {
    return element(by.css(this.locators.buttons.editDashboardProperties.css));
  },

  /**
   * ### DashboardList.getSaveChangesBtn()
   *
   * Returns the reference to the `Save Changes` button (Selenium WebDriver
   * Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getSaveChangesBtn: function () {
    return element(by.css(this.locators.buttons.saveChanges.css));
  },

  /**
   * ### DashboardList.getUndoChangesBtn()
   *
   * Returns the reference to the `Undo Changes` button (Selenium WebDriver
   * Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getUndoChangesBtn: function () {
    return element(by.css(this.locators.buttons.undoChanges.css));
  },

  /**
   * ### DashboardList.getAutoRefreshDDown()
   *
   * Returns the reference to the `Refresh Frequency` drop down (Selenium
   * WebDriver Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAutoRefreshDDown: function () {
    return element(by.model(this.locators.dropDowns.autoRefresh.model));
  },

  /**
   * ### DashboardList.getDashboardsElem()
   *
   * Returns the reference to the `Dashboards` dashboards (Selenium WebDriver
   * Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getDashboardsElem: function () {
    return element(by.css(this.locators.dashboards.css));
  },

  /**
   * ### DashboardList.getLeftMenuDashboardsElem()
   *
   * Returns the reference to the `Dashboards Left Menu` dashboards (Selenium
   * WebDriver Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getLeftMenuDashboardsElem: function () {
    return element(by.id(this.locators.dashboards.leftMenu.id));
    // return element.all(by.repeater(this.locators.dashboards.leftMenu.repeater));
  },

  // ## Methods to interact with the Dashboard List Page components.

  /**
   * ### DashboardList.getTitle()
   *
   * Gets the `Title` label from the Dashboard List page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### DashboardList.getLeftMenuDashboards()
   *
   * Gets the `Dashboard Name` label from the Left Menu of Dashboard List page.
   *
   * @returns {Promise}
   */
  getLeftMenuDashboards: function () {
    return this
      .getLeftMenuDashboardsElem()
      .getText();
  },

  /**
   * ### DashboardList.clickAddNewDashboard()
   *
   * Triggers a click to the `Add New Dashboard` button from the Dashboard List
   * page from the Portal app.
   *
   * @returns {Promise}
   */
  clickAddNewDashboard: function () {
    return this
      .getAddNewDashboardBtn()
      .click();
  },

  /**
   * ### DashboardList.clickRefreshNow()
   *
   * Triggers a click to the `Refresh Now` button from the Dashboard List
   * page from the Portal app.
   *
   * @returns {Promise}
   */
  clickRefreshNow: function () {
    return this
      .getRefreshNowBtn()
      .click();
  },

  /**
   * ### DashboardList.clickModifyDashboard()
   *
   * Triggers a click to the `Modify Dashboard` button from the Dashboard List
   * page from the Portal app.
   *
   * @returns {Promise}
   */
  clickModifyDashboard: function () {
    return this
      .getModifyDashboardBtn()
      .click();
  },

  /**
   * ### DashboardList.clickAddNewWidget()
   *
   * Triggers a click to the `Add New Widget` button from the Dashboard List
   * page from the Portal app.
   *
   * @returns {Promise}
   */
  clickAddNewWidget: function () {
    return this
      .getAddNewWidgetBtn()
      .click();
  },

  /**
   * ### DashboardList.clickEditDashboardProperties()
   *
   * Triggers a click to the `Edit Dashboard` button from the Dashboard List
   * page from the Portal app.
   *
   * @returns {Promise}
   */
  clickEditDashboardProperties: function () {
    return this
      .getEditDashboardPropertiesBtn()
      .click();
  },

  /**
   * ### DashboardList.clickSaveChanges()
   *
   * Triggers a click to the `Save Changes` button from the Dashboard List
   * page from the Portal app.
   *
   * @returns {Promise}
   */
  clickSaveChanges: function () {
    return this
      .getSaveChangesBtn()
      .click();
  },

  /**
   * ### DashboardList.clickUndoChanges()
   *
   * Triggers a click to the `Undo Changes` button from the Dashboard List
   * page from the Portal app.
   *
   * @returns {Promise}
   */
  clickUndoChanges: function () {
    return this
      .getUndoChangesBtn()
      .click();
  },

  /**
   * ### DashboardList.setAutoRefresh(frequency)
   *
   * Sets the `Refresh Frequency` drop down from the Dashboard List
   * page from the Portal app.
   *
   * @returns {Promise}
   */
  setAutoRefresh: function (frequency) {
    return this
      .getAutoRefreshDDown()
      .sendKeys(frequency);
  },

  // ## Helper Methods

  /**
   * ### DashboardList.selectDashboard(dashboardName)
   *
   * Selects the dashboard listed in left side in the Portal page.
   *
   * @param {String} dashboardName, the option to click.
   *
   * @returns {Promise}
   */
  selectDashboard: function (dashboardName) {
    return element(by.linkText(dashboardName)).click();
  },

  /**
   * ### DashboardList.isDisplayed()
   *
   * Checks whether the Dashboards page is displayed or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    var btn1 = this.getAddNewDashboardBtn().isPresent();
    var btn2 = this.getModifyDashboardBtn().isPresent();
    var btn3 = this.getRefreshNowBtn().isPresent();
    var btn4 = this.getDashboardsElem().isPresent();
    return (btn1 && btn2 && btn3 && btn4);
  },

  /**
   * ### DashboardList.isListedInLeftSide(dashboardName)
   *
   * Checks if dashboard name is listed in left side in the Portal page.
   *
   * @param {String} dashboardName, the option to check.
   *
   * @returns {Promise}
   */
  isListedInLeftSide: function (dashboardName) {
    return element(by.linkText(dashboardName)).isPresent();
  },

  /**
   * ### DashboardList.existDashboardChart()
   *
   * Checks whether the Dashboard List page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  existDashboardChart: function () {
    return this
      .getDashboardsElem()
      .isPresent();
  },

  /**
   * ### DashboardList.existControlButtons()
   *
   * Checks whether exists the control buttons in the Dashboard page or not,
   *
   * @returns {Promise}
   */
  existControlButtons: function () {
    var btn1 = this.getAddNewWidgetBtn().isPresent();
    var btn2 = this.getEditDashboardPropertiesBtn().isPresent();
    var btn3 = this.getSaveChangesBtn().isPresent();
    var btn4 = this.getUndoChangesBtn().isPresent();
    return (btn1 && btn2 && btn3 && btn4);
  },

  /**
   * ### DashboardList.addNewDashboard(dashboard)
   *
   * Fills Dashboard form and clicks on Create Dashboard button.
   *
   * @param {String} dashboard, to add dashboard.
   *
   * @returns {Promise}
   */
  addNewDashboard: function (dashboard) {
    var me = this;
    me.clickAddNewDashboard();
    me.form.fill(dashboard);
    me.form.clickCreate();
  },

  /**
   * ### DashboardList.deleteDashboard(dashboard)
   *
   * Deletes a dashboard from Dashboard form.
   *
   * @param {String} dashboard, to delete dashboard.
   *
   * @returns {Promise}
   */
  deleteDashboard: function (dashboard) {
    var me = this;
    me.selectDashboard(dashboard.title);
    me.clickModifyDashboard();
    me.clickEditDashboardProperties();
    me.form.clickDelete();
  }
};

module.exports = DashboardList;
