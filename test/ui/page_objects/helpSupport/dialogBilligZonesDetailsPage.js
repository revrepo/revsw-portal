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

// # Dialog Billig Zones Details Page Object.

// Portal app has the ability to display confirm dialogs while doing several
// operations in the whole app. This Dialog Page Objects abstracts those
// operations or actions that an common user could do in this kind of object.

var DialogBilligZonesDetails = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    modal: {
      className: 'modal-dialog',
      body: {
        css: '.modal-body'
      },
      buttons: {
        close: {
          css: '[ng-click=\"cancel()\"]'
        }
      }
    }
  },

  // ## Methods

  /**
   * ### DialogBilligZonesDetails.isDisplayed()
   *
   * Checks whether the Dialog is displayed in the UI or not
   *
   * @returns {Promise}
   */
  isDisplayed: function() {
    return this
      .getModalEl()
      .isPresent() &&
      this
      .getCloseBtn()
      .isPresent();
  },

  /**
   * ### DialogBilligZonesDetails.isDisplayedTextInBoby()
   *
   * Checks whether the Dialog is displayed in the UI text or not
   *
   * @returns {Promise}
   */
  isDisplayedTextInBoby: function(text) {
    return this
      .getModalEl()
      .isPresent() &&
      this
      .getCloseBtn()
      .isPresent();
  },
  /**
   * ### DialogBilligZonesDetails.getModalEl()
   *
   * Return the reference to the Modal Dialog (Selenium WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getModalEl: function() {
    return element
      .all(by.className(this.locators.modal.className))
      .get(0);
  },

  /**
   * ### DialogBilligZonesDetails.getCloseBtn()
   *
   * Return the reference to the `Close` button (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCloseBtn: function() {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.buttons.close.css));
  },

  /**
   * ### DialogBilligZonesDetails.getBodyText()
   *
   * Return the A promise that will be resolved with the element's visible text
   * (Selenium WebDriver Element) from the Modal Dialog component from Portal app.
   *
   * @returns {Promise}
   */
  getBodyText: function() {
    var text = element(by.css(this.locators.modal.body.css)).getText();
    return text;
  },

  // ## Methods to interact with the Dashboard List Page components.

  /**
   * ### DialogBilligZonesDetails.clickClose()
   *
   * Triggers a click action on the `Close` button from the Modal DialogBilligZonesDetails.
   * component
   *
   * @returns {Promise}
   */
  clickClose: function() {
    return this
      .clickCloseBtn()
      .click();
  }

};

module.exports = DialogBilligZonesDetails;
