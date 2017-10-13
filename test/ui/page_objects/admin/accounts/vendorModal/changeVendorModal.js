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
            css: '[ng-click="$select.toggle($event)"]',
            options: {
                css: '.ui-select-choices-row'
            }
        },
        buttons: {
            change: {
                css: '[ng-click="change()"]'
            },
            cancel: {
                css: '[ng-click="cancel()"]'
            }
        },
        options: {
            nuubit: {
                css: '.ui-select-choices-group ul li:nth-child(2)'
            },
            revapm: {
                css: '.ui-select-choices-group ul li:nth-child(1)'
            }
        }
    },

    // ## Methods to retrieve references to UI elements (Selenium WebDriver
    // Element)

    /**
     * ### ChangeVendorModal.getCancelBtn()
     *
     * Returns the reference to the `Cancel` button (Selenium WebDriver
     * Element)from the Change Vendor page from the
     * Accounts
     *
     * @returns {Selenium WebDriver Element}
     */
    getCancelBtn: function () {
        return element(by.css(this.locators.buttons.cancel.css));
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
   * ### ChangeVendorModal.getVendorOptionNuubit()
   *
   * Returns the reference to the `Vendor` drop down option Nuubit (Selenium WebDriver
   * Element) from the Change Vendor page from the
   * Accounts
   *
   * @returns {Selenium WebDriver Element}
   */
    getVendorOptionNuubit: function () {
        return element.all(by.css(this.locators.options.nuubit.css));
    },

    /**
     * ### ChangeVendorModal.getVendorOptionRevapm()
     *
     * Returns the reference to the `Vendor` drop down option Revapm(Selenium WebDriver
     * Element) from the Change Vendor page from the
     * Accounts
     *
     * @returns {Selenium WebDriver Element}
     */
    getVendorOptionRevapm: function () {
        return element.all(by.css(this.locators.options.revapm.css));
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
     * ### ChangeVendor.selectVendorDdown()
     *
     * Triggers a click on the `Vendor` drop down from the Change Vendor page from the
     * Portal app
     *
     * @returns {Promise}
     */
    selectVendorDdown: function () {
        return this
            .getVendorDropdown()
            .click();
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
     * ### ChangeVendorModal.clickCancelBtn()
     *
     * Triggers a click on the `Cancel` button from the Change Vendor page from the
     * Accounts
     *
     * @returns {Promise}
     */
    clickCancelBtn: function () {
        return this
            .getCancelBtn()
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
            .getCancelBtn()
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
    },

    /**
     * ### ChangeVendor.setVendorNuubit()
     *
     * Sets value 'nuubit' to `Vendor` drop down element.
     *
     * @param {String} Value to set in Vendor drop down on Accounts Change Vendor page.
     *
     * @returns {Promise}
     */
    setVendorNuubit: function () {
        return this
            .getVendorOptionNuubit()
            .click();
    },

    /**
     * ### ChangeVendor.setVendorRevapm()
     *
     * Sets value 'revapm' to `Vendor` drop down element.
     *
     * @param {String} Value to set in Vendor drop down on Accounts Change Vendor page.
     *
     * @returns {Promise}
     */
    setVendorRevapm: function () {
        return this
            .getVendorOptionRevapm()
            .click();
    },
};

module.exports = ChangeVendorModal;
