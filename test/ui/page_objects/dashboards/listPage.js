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
        tagName: 'h2'
      }
    },
    buttons: {
      addDashboard: {
        css: '[ng-click=\"vm.onCreateDashboard($event)\"]'
      },
      refreshNow: {
        css: '[ng-click=\"model.refreshNow= true\"]'
      },
      modifyDashboard: {
        css: '.glyphicon.glyphicon-edit'
      },
      addNewWidget: {
        css: '.glyphicon.glyphicon-plus-sign'
      },
      editDashboard: {
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
      refreshFrequency: {
        model: 'model.options.autorefresh'
      }
    },
    dashboards: {
      css: '.dashboard-preview-background',
      leftMenu: {
        id: 'left-menu-dashboard-section'
      }
    }
  },

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
    return element(by.tagName(this.locators.labels.title.tagName));
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
    return element(by.css(this.locators.buttons.addDashboard.css));
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
    return element(by.css(this.locators.buttons.modifyDashboard.css));
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
   * ### DashboardList.getEditDashboardBtn()
   *
   * Returns the reference to the `Edit Dashboard` button (Selenium WebDriver
   * Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getEditDashboardBtn: function () {
    return element(by.css(this.locators.buttons.editDashboard.css));
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
   * ### DashboardList.getRefreshFrequencyDDown()
   *
   * Returns the reference to the `Refresh Frequency` drop down (Selenium
   * WebDriver Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getRefreshFrequencyDDown: function () {
    return element(by.model(this.locators.dropDowns.refreshFrequency.model));
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
   * ### DashboardList.getLeftMenuDashboards()
   *
   * Returns the reference to the `Dashboards Left Menu` dashboards (Selenium
   * WebDriver Element) from the Dashboard List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getLeftMenuDashboards: function () {
    return element(by.id(this.locators.dashboards.leftMenu.id));
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
   * ### DashboardList.clickEditDashboard()
   *
   * Triggers a click to the `Edit Dashboard` button from the Dashboard List
   * page from the Portal app.
   *
   * @returns {Promise}
   */
  clickEditDashboard: function () {
    return this
      .getEditDashboardBtn()
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
   * ### DashboardList.setRefreshFrequency()
   *
   * Sets the `Refresh Frequency` drop down from the Dashboard List
   * page from the Portal app.
   *
   * @returns {Promise}
   */
  setRefreshFrequency: function () {
    return this
      .getRefreshFrequencyDDown()
      .click();
  },

  // ## Helper Methods

  /**
   * ### DashboardList.isDashboardsDisplayed()
   *
   * Checks whether the Dashboard List page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  existDashboard: function () {
    return this
      .getDashboardsElem()
      .isPresent();
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
    this.clickAddNewDashboard();
    this.addDashboard.createDashboard(dashboard);
    // this.form.fill(dashboard);
    // this.form.clickCreate(dashboard);
  }
};

module.exports = DashboardList;
