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
var WebElement = require('./../../../common/helpers/webElement');

// # Edit Company Form Page Object

// This `Company Form` Page Object abstracts all operations or actions that a
// common company could do in the Edit Company page from the Portal app/site.
var CompanyBillingForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
      panelHeading: '.col-md-12 .panel .panel-heading',
      panelBody: '.col-md-12 .panel .panel-body'
    },
    textInputs: {
      firstName:
        {
          id: 'first_name'
        },
      lastName: {
        id: 'last_name'
      },
      billingContactEmail: {
        id: 'billingContactEmail'
      },
      billingPhoneNumber: {
        id: 'billingPhoneNumber'
      },
      billingAddress1: {
        id: 'billingAddress1'
      },
      billingAddress2: {
        id: 'billingAddress2'
      },
      billingCountry: {
        id: 'billingCountry',
        inputField: {
          css: '#billingCountry .ui-select-search'
        }
      },
      billingState: {
        id: 'billingState'
      },
      billingCity: {
        id: 'billingCity'
      },
      billingZipcode: {
        id: 'billingZipcode'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### CompanyBillingForm.getContainerFluidElem()
   *
   * Returns the reference to the `Container Fluid` element (Selenium WebDriver
   * Element) from the Company List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getContainerFluidElem: function () {
    return element.all(by.css(this.locators.views.container));
  },

  /**
   * ### CompanyBillingForm.getPanelBodyElem()
   *
   * Returns the reference to the `Panel Body` element (Selenium WebDriver
   * Element) from the Company List page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPanelBodyElem: function () {
    return this
      .getContainerFluidElem()
      .get(1)
      .element(by.css(this.locators.views.panelBody));
  },

  /**
   * ### CompanyBillingForm.getFirstNameTxt()
   *
   * Returns the reference to the `First Name` input text (Selenium WebDriver
   * Element) from the Edit Form Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getFirstNameTxt: function () {
    return element(by.id(this.locators.textInputs.firstName.id));
  },

  /**
   * ### CompanyBillingForm.getLastNameTxt()
   *
   * Returns the reference to the `Last Name` input text (Selenium WebDriver
   * Element) from the Edit Form Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getLastNameTxt: function () {
    return element(by.id(this.locators.textInputs.lastName.id));
  },

  /**
   * ### CompanyBillingForm.getContactEmailTxt()
   *
   * Returns the reference to the `Contact Email` input text (Selenium WebDriver
   * Element) from the Edit Form Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getContactEmailTxt: function () {
    return element(by.id(this.locators.textInputs.billingContactEmail.id));
  },

  /**
   * ### CompanyBillingForm.getPhoneNumberTxt()
   *
   * Returns the reference to the `Phone Number` input text (Selenium WebDriver
   * Element) from the Edit Form Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPhoneNumberTxt: function () {
    return element(by.id(this.locators.textInputs.billingPhoneNumber.id));
  },

  /**
   * ### CompanyBillingForm.getAddress1Txt()
   *
   * Returns the reference to the `Address1` input text (Selenium WebDriver
   * Element) from the Edit Form Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAddress1Txt: function () {
    return element(by.id(this.locators.textInputs.billingAddress1.id));
  },

  /**
   * ### CompanyBillingForm.getAddress2Txt()
   *
   * Returns the reference to the `Address2` input text (Selenium WebDriver
   * Element) from the Edit Form Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAddress2Txt: function () {
    return element(by.id(this.locators.textInputs.billingAddress2.id));
  },

  /**
   * ### CompanyBillingForm.getCountryDDown()
   *
   * Returns the reference to the `Country` input text (Selenium WebDriver
   * Element) from the Edit Form Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCountryDDown: function () {
    return element(by.id(this.locators.textInputs.billingCountry.id));
  },

  /**
   * ### CompanyBillingForm.getCountryInput()
   *
   * Returns the reference to the `Country` input text field (Selenium WebDriver
   * Element) from the Edit Form Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCountryInput: function () {
    return element(by.css(this.locators.textInputs.billingCountry.inputField.css));
  },

  /**
   * ### CompanyBillingForm.getStateTxt()
   *
   * Returns the reference to the `State` input text (Selenium WebDriver
   * Element) from the Edit Form Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getStateTxt: function () {
    return element(by.id(this.locators.textInputs.billingState.id));
  },

  /**
   * ### CompanyBillingForm.getCityTxt()
   *
   * Returns the reference to the `City` input text (Selenium WebDriver
   * Element) from the Edit Form Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCityTxt: function () {
    return element(by.id(this.locators.textInputs.billingCity.id));
  },

  /**
   * ### CompanyBillingForm.getZipCodeTxt()
   *
   * Returns the reference to the `Zip Code` input text (Selenium WebDriver
   * Element) from the Edit Form Company page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getZipCodeTxt: function () {
    return element(by.id(this.locators.textInputs.billingZipcode.id));
  },

  // ## Methods to interact with the Edit Company Page components

  /**
   * ### CompanyBillingForm.setFirstName(firstName)
   *
   * Sets a new value to `First Name` input text field.
   *
   * @param {String} firstName.
   *
   * @returns {Promise}
   */
  setFirstName: function (firstName) {
    this.getFirstNameTxt().clear();
    return this
      .getFirstNameTxt()
      .sendKeys(firstName);
  },

  /**
   * ### CompanyBillingForm.setLastName(lastName)
   *
   * Sets a new value to `Last Name` input text field.
   *
   * @param {String} lastName.
   *
   * @returns {Promise}
   */
  setLastName: function (lastName) {
    this.getLastNameTxt().clear();
    return this
      .getLastNameTxt()
      .sendKeys(lastName);
  },

  /**
   * ### CompanyBillingForm.setContactEmail(contactEmail)
   *
   * Sets a new value to `Contact Email` input text field.
   *
   * @param {String} contactEmail.
   *
   * @returns {Promise}
   */
  setContactEmail: function (contactEmail) {
    this.getContactEmailTxt().clear();
    return this
      .getContactEmailTxt()
      .sendKeys(contactEmail);
  },

  /**
   * ### CompanyBillingForm.setPhoneNumber(phoneNumber)
   *
   * Sets a new value to `Phone Number` input text field.
   *
   * @param {String} phoneNumber.
   *
   * @returns {Promise}
   */
  setPhoneNumber: function (phoneNumber) {
    this.getPhoneNumberTxt().clear();
    return this
      .getPhoneNumberTxt()
      .sendKeys(phoneNumber);
  },

  /**
   * ### CompanyBillingForm.setAddress1(address1)
   *
   * Sets a new value to `Address1` input text field.
   *
   * @param {String} address1.
   *
   * @returns {Promise}
   */
  setAddress1: function (address1) {
    this.getAddress1Txt().clear();
    return this
      .getAddress1Txt()
      .sendKeys(address1);
  },

  /**
   * ### CompanyBillingForm.setAddress2(address2)
   *
   * Sets a new value to `Address2` input text field.
   *
   * @param {String} address2.
   *
   * @returns {Promise}
   */
  setAddress2: function (address2) {
    this.getAddress2Txt().clear();
    return this
      .getAddress2Txt()
      .sendKeys(address2);
  },

  /**
   * ### CompanyBillingForm.setCountry(country)
   *
   * Sets a new value to `Country` input text field.
   *
   * @param {String} country.
   *
   * @returns {Promise}
   */
  setCountry: function (country) {
    this
      .getCountryDDown()
      .click();
    return this
      .getCountryInput()
      .sendKeys(country + protractor.Key.ENTER);
  },

  /**
   * ### CompanyBillingForm.setState(state)
   *
   * Sets a new value to `State` input text field.
   *
   * @param {String} state.
   *
   * @returns {Promise}
   */
  setState: function (state) {
    var el = this.getStateTxt();
    WebElement.scrollToElement(el);
    el.clear();
    return el.sendKeys(state);
  },

  /**
   * ### CompanyBillingForm.setCity(city)
   *
   * Sets a new value to `City` input text field.
   *
   * @param {String} city.
   *
   * @returns {Promise}
   */
  setCity: function (city) {
    this.getCityTxt().clear();
    return this
      .getCityTxt()
      .sendKeys(city);
  },

  /**
   * ### CompanyBillingForm.setZipCode(zipcode)
   *
   * Sets a new value to `Zip Code` input text field.
   *
   * @param {String} zipcode.
   *
   * @returns {Promise}
   */
  setZipCode: function (zipcode) {
    var el = this.getZipCodeTxt();
    WebElement.scrollToElement(el);
    el.clear();
    return el.sendKeys(zipcode);
  },

  // ## Helper Methods

  /**
   * Updates the company using the given data by filling it in the form and
   * clicking on the `Update Company Billing` button from the Edit Company page.
   *
   * @param {Object} company, company data with the schema specified in
   * DataProvider.generateAccountBillingData()
   *
   * @returns {Promise}
   */
  fill: function (company) {
    this.setFirstName(company.firstName);
    this.setLastName(company.lastName);
    this.setContactEmail(company.contactEmail);
    this.setPhoneNumber(company.phoneNumber);
    this.setAddress1(company.address1);
    this.setAddress2(company.address2);
    if (company.country !== null) {
      this.setCountry(company.country);
    }
    this.setState(company.state);
    this.setCity(company.city);
    this.setZipCode(company.zipcode);
  }
};

module.exports = CompanyBillingForm;
