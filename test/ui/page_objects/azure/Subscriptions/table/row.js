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

var SubsTableRow = function (rowElem, locators) {

    // Properties
    this.rowElem = rowElem;
    this.locators = locators;

    // Methods

    this.getSubIdCell = function () {
        return this.rowElem.element(by.css(this.locators.subId.css));
    };

    this.getRegisterDateCell = function () {
        return this.rowElem.element(by.css(this.locators.registerDate.css));
    };

    this.getLastUpdateCell = function () {
        return this.rowElem.element(by.css(this.locators.lastUpdate.css));
    };

    this.getStateCell = function () {
        return this.rowElem.element(by.css(this.locators.state.css));
    };

    this.getSubId = function () {
        return this.getSubIdCell().getText();
    };

    this.getRegisterDate = function () {
        return this.getRegisterDateCell().getText();
    };

    this.getLastUpdate = function () {
        return this.getLastUpdateCell().getText();
    };

    this.getState = function () {
        return this.getStateCell().getText();
    };

    this.clickSubId = function () {
        return this.getSubIdCell().click();
    };

    this.clickRegisterDate = function () {
        return this.getRegisterDate().click();
    };

    this.clickLastUpdate = function () {
        return this.getLastUpdate().click();
    };

    this.clickState = function () {
        return this.getState().click();
    };

    // Get & Click action buttons if present
    if (this.locators.actions && this.locators.actions.buttons.view) {
        this.getViewBtn = function () {
            return this.rowElem
                .element(by.css(this.locators.actions.css))
                .element(by.css(this.locators.actions.buttons.view.css));
        };
        this.clickViewBtn = function () {
            return this
                .getViewBtn()
                .click();
        };
    }

    if (this.locators.actions && this.locators.actions.buttons.changeStatus) {
        this.getChangeStatusBtn = function () {
            return this.rowElem
                .element(by.css(this.locators.actions.css))
                .element(by.css(this.locators.actions.buttons.changeStatus.css));
        };
        this.clickChangeStatusBtn = function () {
            return this
                .getChangeStatusBtn()
                .click();
        };
    }
};

module.exports = SubsTableRow;
