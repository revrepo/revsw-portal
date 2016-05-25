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

// # Dialog Dashboard Page Object.

// Portal app has the ability to display confirm dialogs while doing several
// operations in the whole app. This Dialog PAge Objects abstracts those
// operations or actions that an common user could do in this kind of object.

var DialogDashboard = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    modal: {
      className: 'modal-dialog',
      buttons: {
        close: {
          css: '[ng-click=\"closeDialog()\"]'
        },
        delete: {
          css: '[ng-click=\"deleteDialog(model)\"]'
        }
      }
    }
  },

  // ## Methods

  /**
   * ### Dialog.isDisplayed()
   *
   * Checks whether the Dialog is displayed in the UI or not
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
        .getModalEl()
        .isPresent() &&
      this
        .getDeleteBtn()
        .isPresent();
  },

  /**
   * ### Dialog.getModalEl()
   *
   * Return the reference to the Modal Dialog (Selenium WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getModalEl: function () {
    return element
      .all(by.className(this.locators.modal.className))
      .get(1);
  },

  /**
   * ### Dialog.getCloseBtn()
   *
   * Return the reference to the `Close` button (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCloseBtn: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.buttons.close.css));
  },

  /**
   * ### Dialog.getDeleteBtn()
   *
   * Return the reference to the `Delete` button (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getDeleteBtn: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.buttons.delete.css));
  },

  // ## Methods to interact with the Dashboard List Page components.

  /**
   * ### Dialog.clickClose()
   *
   * Triggers a click action on the `Close` button from the Modal Dialog.
   * component
   *
   * @returns {Promise}
   */
  clickClose: function () {
    return this
      .clickCloseBtn()
      .click();
  },

  /**
   * ### Dialog.clickDelete()
   *
   * Triggers a click action on the `Delete` button from the Modal Dialog.
   *
   * @returns {Promise}
   */
  clickDelete: function () {
    return this
      .getDeleteBtn()
      .click();
  }
};

module.exports = DialogDashboard;