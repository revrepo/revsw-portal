/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
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

// # Edit Log Shipping Job Page Object

// Requiring `log-shipping form` component page object
var LogShippingForm = require('./form');

// This `Edit Log Shipping` Page Object abstracts all operations or actions that a
// common user could do in the Edit Log Shipping Page from the Portal app/site.
var EditLogShipping = {

    // ## Properties

    // Locators specific to HTML elements from this page object
    locators: {
        labels: {
            title: {
                className: 'page-title'
            }
        },
        buttons: {
            backToList: {
                linkText: 'Back To List'
            },
            cancel: {
                linkText: 'Cancel'
            },
            update: {
                css: 'i.glyphicon-ok'
            },
            confirmUpdate: {
                css: '.btn.btn-success'
            },
            updateJob: {
                css: '.btn.btn-success'
            }
        }
    },

    // `Edit Log Shipping` Page is compound mainly by a form. This property makes
    // reference to the LogShippingForm Page Object to interact with it.
    form: LogShippingForm,

    // ## Methods to retrieve references to UI elements (Selenium WebDriver
    // Element)

    /**
     * ### EditLogShipping.getTitleLbl()
     *
     * Returns the reference to the `Title` label element (Selenium WebDriver
     * Element) from the Edit Log Shipping Page from the Portal app.
     *
     * @returns {Object} Selenium WebDriver Element
     */
    getTitleLbl: function () {
        return element(by.className(this.locators.labels.title.className));
    },

    /**
     * ### EditLogShipping.getBackToListBtn()
     *
     * Returns the reference to the `Back To List` button (Selenium WebDriver
     * Element) from the Edit Log Shipping Page from the Portal app.
     *
     * @returns {Object} Selenium WebDriver Element
     */
    getBackToListBtn: function () {
        return element(
            by.partialLinkText(this.locators.buttons.backToList.linkText));
    },

    /**
     * ### EditLogShipping.getCancelBtn()
     *
     * Returns the reference to the `Cancel` button (Selenium WebDriver Element)
     * from the Edit Log Shipping Page from the Portal app.
     *
     * @returns {Object} Selenium WebDriver Element
     */
    getCancelBtn: function () {
        return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
    },

    /**
     * ### EditLogShipping.getCancelBtn()
     *
     * Returns the reference to the `Update` button (Selenium WebDriver Element)
     * from the Edit Log Shipping Page from the Portal app.
     *
     * @returns {Object} Selenium WebDriver Element
     */
    getUpdateBtn: function () {
        return element(by.css(this.locators.buttons.update.css));
    },

    getConfirmUpdateBtn: function () {
        return element(by.cssContainingText(this.locators.buttons.confirmUpdate.css, 'OK'));
    },

    clickConfirmUpdateBtn: function () {
        return this.getConfirmUpdateBtn().click();
    },

    // ## Methods to interact with the Edit Log Shipping Page components

    /**
     * ### EditLogShipping.clickBackToList()
     *
     * Triggers a click on the `Back To List` button from the Edit Log Shipping Page
     * from the Portal app
     *
     * @returns {Object} Promise
     */
    clickBackToList: function () {
        return this
            .getBackToListBtn()
            .click();
    },

    /**
     * ### EditLogShipping.clickCancel()
     *
     * Triggers a click on the `Cancel` button from the Edit Log Shipping Page from
     * the Portal app
     *
     * @returns {Object} Promise
     */
    clickCancel: function () {
        return this
            .getCancelBtn()
            .click();
    },

    /**
     * ### EditLogShipping.clickUpdate()
     *
     * Triggers a click on the `Update` button from the Edit Log Shipping
     * Page from the Portal app
     *
     * @returns {Object} Promise
     */
    clickUpdate: function () {
        return this
            .getUpdateBtn()
            .click();
    },

    isUpdateBtnEnabled: function () {
        return element(by.cssContainingText(this.locators.buttons.updateJob.css, 'Update'))
            .isEnabled();
    },

    // ## Helper Methods

    /**
     * ### EditLogShipping.isDisplayed()
     *
     * Checks whether the Edit Log Shipping Page is being displayed in the UI or not.
     *
     * @returns {Object} Promise
     */
    isDisplayed: function () {
        return this
            .getTitleLbl()
            .isPresent();
    },

    /**
     * ### EditLogShipping.getTitle()
     *
     * Gets the `Title` label from the Edit Log Shipping Page
     *
     * @returns {Object} Promise
     */
    getTitle: function () {
        return this
            .getTitleLbl()
            .getText();
    },

    /**
     * ### EditLogShipping.updateLogShippingJob()
     *
     * Updates the Log Shipping using the given data by filling it in the form and
     * clicking on the `Update` button from the Edit Log Shipping Page
     *
     * @param {Object} logShippingJob, log shipping job cert data with the schema specified in
     * DataProvider.generateLogShippingJobData()
     *
     * @returns {Object} Promise
     */
    updateLogShippingJob: function (logShippingJob) {
        this.form.fill(logShippingJob);
        this.clickUpdate();
        return this.clickConfirmUpdateBtn();
    }
};

module.exports = EditLogShipping;
