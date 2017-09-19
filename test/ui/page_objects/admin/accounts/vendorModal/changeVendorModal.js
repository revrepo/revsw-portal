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
   * ### ChangeVendorModal.getVendorDropdown()
   *
   * Returns the reference to the `Vendor Dropdown` element (Selenium WebDriver
   * Element) from the vendor change modal.
   *
   * @returns {Selenium WebDriver Element}
   */
    getVendorDropdown: function () {
        return element(by.css(this.locators.vendorDropdown.css));
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
    * Clicks on the change buton
    *
    */
    clickChange: function () {
        return this
            .getChangeButton()
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
            .getVendorDropdown()
            .isPresent();
    },

    /**
    * ### ChangeVendorModal.picknewVendor()
    *
    * Picks a different vendor than the one thats specified
    *
    */
    pickNewVendor: function (currVendor) {
        var me = this;

        var currVendorText;
        currVendor.getText().then(function (text) {
            currVendorText = text;
        });
        var dropdown = me.getVendorDropdown();
        dropdown.click();
        var picks = me.getVendorOptions();
        picks.getText().then(function (text) {
            if (text.indexOf(currVendorText) !== -1 && text.length > 2) {
                var i = text.indexOf(currVendorText);
                //pick different vendor
                picks.get(i === 0 ? 1 : 0).click();
                me.clickChange();
            }
        });
    },

    /**
    * ### ChangeVendorModal.pickOldVendor()
    *
    * Reverts to original vendor
    *
    */
    pickOldVendor: function (oldVendor) {
        var me = this;
        var dropdown = me.getVendorDropdown();
        dropdown.click();
        var picks = me.getVendorOptions();
        picks.getText().then(function (text) {
            if (text.indexOf(oldVendor) !== -1 && text.length > 2) {
                var i = text.indexOf(oldVendor);
                //pick different vendor
                picks.get(i).click();
                me.clickChange();
            }
        });
    }
};

module.exports = ChangeVendorModal;
