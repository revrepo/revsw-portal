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

// # Change Vendor Modal Object

// This `Change Vendor Modal` Object abstracts all operations or actions that a
// common user could do in the change vendor modal from the Portal app/site.

var DropDownWidget = require('./../../../common/dropDownWidget');

var ChangeVendorModal = {

    // ## Properties

    // Locators specific to HTML elements from this page object
    locators: {
        container: {
            css: '.modal-dialog'
        },
        vendorDropdown: {
            css: '.ui-select-container',
            options: {
                css: '.ui-select-choices-row'
            }
        },
        buttons: {
            change: {
                css: '.btn-change'
            },
            cancel: {
                css: '.btn-cancel'
            }
        }
    },

    /**
    * ### ChangeVendorModal.getModalContainer()
    *
    * Returns the reference to the `Vendor Dropdown` element (Selenium WebDriver
    * Element) from the vendor change modal.
    *
    * @returns {Selenium WebDriver Element}
    */
    getModalContainer: function () {
        return element(by.css(this.locators.container.css));
    },


    /**
   * ### ChangeVendorModal.getVendorDropdown()
   *
   * Returns the reference to the `Vendor Dropdown` element (Selenium WebDriver
   * Element) from the vendor change modal.
   *
   * @returns {Selenium WebDriver Element}
   */
    getVendorDropdown: function () {
        return new DropDownWidget(by.css(this.locators.vendorDropdown.css));
    },

    /**
   * ### ChangeVendorModal.getChangeButton()
   *
   * Returns the reference to the `Change Button` element (Selenium WebDriver
   * Element) from the vendor change modal.
   *
   * @returns {Selenium WebDriver Element}
   */
    getChangeButton: function () {
        return element(by.css(this.locators.buttons.change.css));
    },

    /**
    * ### ChangeVendorModal.getCancelButton()
    *
    * Returns the reference to the `Cancel Button` element (Selenium WebDriver
    * Element) from the vendor change modal.
    *
    * @returns {Selenium WebDriver Element}
    */
    getCancelButton: function () {
        return element(by.css(this.locators.buttons.cancel.css));
    },

    /**
    * ### ChangeVendorModal.getVendorOptions()
    *
    * Returns the reference to the `Vendor Dropdown` options elements (Selenium WebDriver
    * Element) from the vendor change modal.
    *
    * @returns {Selenium WebDriver Element}
    */
    getVendorOptions: function () {
        return element.all(by.css(this.locators.vendorDropdown.options.css));
    },

    /**
    * ### ChangeVendorModal.clickVendor()
    *
    * Clicks on the vendor dropdown to reveal the options
    *
    */
    clickVendor: function () {
        return this
            .getVendorDropdown()
            .click();

    },

    /**
    * ### ChangeVendorModal.clickChange()
    *
    * Clicks on the change button
    *
    */
    clickChange: function () {
        return this
            .getChangeButton()
            .click();
    },

    /**
    * ### ChangeVendorModal.clickCancel()
    *
    * Clicks on the cancel button
    *
    */
    clickCancel: function () {
        return this
            .getCancelButton()
            .click();
    },

    /**
    * ### ChangeVendorModal.isDisplayed()
    *
    * Checks if the modal is visible
    *
    */
    isDisplayed: function () {
        return this
            .getModalContainer()
            .isPresent();
    },

    /**
    * ### ChangeVendorModal.picknewVendor()
    *
    * Selects a new vendor
    *
    */
    pickNewVendor: function (vendor) {
        this.getVendorDropdown().setValue(vendor);
        this.clickChange();
    }
};

module.exports = ChangeVendorModal;
