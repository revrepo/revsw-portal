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

// # Azure Subscription Register Page Object

// Requiring constant values
var Constants = require('./../constants');

var DropDownWidget = require('./../common/dropDownWidget');

// This `Azure Subscription Register` Page Object abstracts all operations or actions that a
// common user could do in the Add SSL Name page from the Portal
// app/site.
var AzureSubForm = {

    // ## Properties

    // Locators specific to HTML elements from this page object
    locators: {
        textInputs: {
            companyName: {
                model: 'model.companyName'
            },
            firstName: {
                model: 'model.first_name'
            },
            lastName: {
                model: 'model.last_name'
            },
            phoneNumber: {
                model: 'model.phone_number'
            },
            contactEmail: {
                model: 'model.contact_email'
            },
            address1: {
                model: 'model.address1'
            },
            address2: {
                model: 'model.address2'
            },
            country: {
                model: 'model.country'
            },
            state: {
                model: 'model.state'
            },
            city: {
                model: 'model.city'
            },
            zipCode: {
                model: 'model.zipcode'
            },
            comment: {
                model: 'model.comment'
            }
        },
        dropDowns: {
            country: {
                model: 'model.country'
            }
        },
        buttons: {
            useSameBillingInfoSw: {
                model: 'model.use_contact_info_as_billing_info'
            },
            update: {
                css: 'btn.btn-success'
            }
        }
    },

    /* Getters */

    getCompanyNameTxtIn: function () {
        return element(by.model(this.locators.textInputs.companyName.model));
    },

    getFirstNameTxtIn: function () {
        return element(by.model(this.locators.textInputs.firstName.model));
    },

    getLastNameTxtIn: function () {
        return element(by.model(this.locators.textInputs.lastName.model));
    },

    getPhoneNumberTxtIn: function () {
        return element(by.model(this.locators.textInputs.phoneNumber.model));
    },

    getContactEmailTxtIn: function () {
        return element(by.model(this.locators.textInputs.contactEmail.model));
    },

    getAddress1TxtIn: function () {
        return element(by.model(this.locators.textInputs.address1.model));
    },

    getAddress2TxtIn: function () {
        return element(by.model(this.locators.textInputs.address2.model));
    },

    getCountryDropDown: function () {
        return new DropDownWidget(by.model(this.locators.textInputs.country.model));
    },

    getStateTxtIn: function () {
        return element(by.model(this.locators.textInputs.state.model));
    },

    getCityTxtIn: function () {
        return element(by.model(this.locators.textInputs.city.model));
    },

    getZipCodeTxtIn: function () {
        return element(by.model(this.locators.textInputs.zipCode.model));
    },

    getCommentTxtIn: function () {
        return element(by.model(this.locators.textInputs.comment.model));
    },

    getUseSameInfoSw: function () {
        return element(by.model(this.locators.buttons.useSameBillingInfoSw.model));
    },

    getUpdateBtn: function () {
        return element(by.css(this.locators.buttons.update.css));
    },

    /* Setters */

    setCompanyName: function (value) {
        return this.getCommentTxtIn().sendKeys(value);
    },

    setFirstName: function (value) {
        return this.getFirstNameTxtIn().sendKeys(value);
    },

    setLastName: function (value) {
        return this.getLastNameTxtIn().sendKeys(value);
    },

    setPhoneNumber: function (value) {
        return this.getPhoneNumberTxtIn().sendKeys(value);
    },

    setContactEmail: function (value) {
        return this.getContactEmailTxtIn().sendKeys(value);
    },

    setAddress1: function (value) {
        return this.getAddress1TxtIn().sendKeys(value);
    },

    setAddress2: function (value) {
        return this.getAddress2TxtIn().sendKeys(value);
    },

    setCountry: function (value) {
        return this.getCountryDropDown().setValue(value);
    },

    setState: function (value) {
        return this.getStateTxtIn().sendKeys(value);
    },

    setCity: function (value) {
        return this.getCityTxtIn().sendKeys(value);
    },

    setZipCode: function (value) {
        return this.getZipCodeTxtIn().sendKeys(value);
    },

    setComment: function (value) {
        return this.getCommentTxtIn().sendKeys(value);
    },

    clickUserSameInfo: function () {
        return this.getUseSameInfoSw().click();
    },

    clickUpdate: function () {
        return this.getUpdateBtn().click();
    },

    /**
   * ### AzureSubForm.fill()
   *
   * Helper method that fills the account profile form with the given
   * data object
   *
   * @param {object} company
   */
    fill: function (company) {
        this.setFirstName(company.firstName);
        this.setLastName(company.lastName);
        this.setContactEmail(company.contactEmail);
        this.setPhoneNumber(company.phoneNumber);
        this.setAddress1(company.address1);
        this.setAddress2(company.address2);
        this.setCountry(company.country);
        this.setState(company.state);
        this.setCity(company.city);
        this.setZipCode(company.zipcode);
    }
};

module.exports = AzureSubForm;
