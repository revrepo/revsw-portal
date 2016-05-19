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

// # Edit Dashboard Page Object:

// Requiring `domain form` component page object
var DashboardForm = require('./form');

// This `Add Dashboard` Page Object abstracts all operations or actions that a
// common dashboard could do in the Add Dashboard page from the Portal app/site.
var EditDashboard = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
  },

  // `Add Dashboard` Page is compound mainly by a form. This property makes
  // reference to the DashboardForm Page Object to interact with it.
  form: DashboardForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  // ## Methods to interact with the Add Dashboard Page components

  // ## Helper Methods

  /**
   * ### EditDashboard.saveDashboard(dashboard)
   *
   * Helper method that executes all steps required to save the Dashboard
   * from EditDashboard app.
   *
   * @param {Dashboard} dashboard, data applying the schema defined in
   * `DataProvider.generateDashboardData()`
   *
   * @returns {Promise}
   */
  saveDashboard: function(dashboard) {
    this.form.fill(dashboard);
    this.form.clickCreate();
  },

  /**
   * ### EditDashboard.deleteDashboard(dashboard)
   *
   * Helper method that executes all steps required to delete a Dashboard
   * from EditDashboard app.
   *
   * @param {Dashboard} Dashboard, data applying the schema defined in
   * `DataProvider.generateDashboardData()`
   *
   * @returns {Promise}
   */
  deleteDashboard: function(dashboard) {
    this.form.clickDelete();
  }
};

module.exports = EditDashboard;