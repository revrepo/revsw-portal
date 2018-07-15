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

var Invitation = {
  locators: {
    inputs: {
      password: {
        model: 'pass'
      },
      passwordRepeat: {
        model: 'passAgain'
      }
    },
    buttons: {
      send: {
        css: 'button[type="submit"]'
      }
    }
  },

  getPassTxtIn: function () {
    return element(by.model(this.locators.inputs.password.model));
  },

  getPassAgainTxtIn: function () {
    return element(by.model(this.locators.inputs.passwordRepeat.model));
  },

  setPass: function (value) {
    return this
      .getPassTxtIn()
      .sendKeys(value);
  },

  setPassAgain: function (value) {
    return this
      .getPassAgainTxtIn()
      .sendKeys(value);
  },

  getSetPassBtn: function () {
    return element(by
      .css(this.locators.buttons.send.css));
  },

  clickSetPassword: function () {
    return this
      .getSetPassBtn()
      .click();
  },

  setNewPassword: function (pass) {
    this.setPass(pass);
    this.setPassAgain(pass);
    return this.clickSetPassword();
  }
};

module.exports = Invitation;
