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

// # Edit App Page Object

// Requiring `Edit App` component page object.
var EditAppForm = require('./editAppForm');

// This `Edit App` Page Object abstracts all operations or actions
// that a common Two-Factor Authentication could do in the Portal app/site.
var EditApp = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
      panelHeading: {
        css: '.col-md-12 .panel .panel-heading',
        pullLeft: '.pull-left',
        pullRight: '.pull-right'
      },
      panelBody: {
        css: '.col-md-12 .panel .panel-body'
      }
    },
    buttons: {
      addNewApp:{
        linkText: 'Add New App'
      },
      clearSearch: {
        css: '[ng-click=\"filter.filter = ""\"]'
      }
    },
    inputs: {
      search: {
        id: 'search'
      }
    }
  },

  // `Edit App Form` Page is compound mainly by a form. This property makes
  // reference to the EditAppForm Page Object to interact with it.
  form: EditAppForm,

  /**
   * ### EditApp.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit App from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(0);
  },

  /**
   * ### EditApp.getAppNameLbl()
   *
   * Returns the reference to the `App Name` label element (Selenium WebDriver
   * Element) from the Edit App from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAppNameLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(1);
  },

  // ## Helper Methods

  /**
   * ### AppsList.getTitle()
   *
   * Gets the title from `Title` label element.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### AppsList.getAppName()
   *
   * Gets the title from `App Name` label element.
   *
   * @returns {Promise}
   */
  getAppName: function () {
    return this
      .getAppNameLbl()
      .getText();
  }
};

module.exports = EditApp;
