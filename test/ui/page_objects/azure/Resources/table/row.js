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

var ResourcesTableRow = function (rowElem, locators) {

    // Properties
    this.rowElem = rowElem;
    this.locators = locators;

    // Methods

    this.getNameCell = function () {
        return this.rowElem.element(by.css(this.locators.name.css));
    };

    this.getTypeCell = function () {
        return this.rowElem.element(by.css(this.locators.type.css));
    };

    this.getLocationCell = function () {
        return this.rowElem.element(by.css(this.locators.location.css));
    };

    this.getPlanCell = function () {
        return this.rowElem.element(by.css(this.locators.plan.css));
    };

    this.getResourceGroupCell = function () {
        return this.rowElem.element(by.css(this.locators.resourceGroup.css));
    };

    this.getSubIdCell = function () {
        return this.rowElem.element(by.css(this.locators.subId.css));
    };

    this.getLastUpdateCell = function () {
        return this.rowElem.element(by.css(this.locators.lastUpdate.css));
    };

    this.getName = function () {
        return this.getNameCell().getText();
    };

    this.getType = function () {
        return this.getTypeCell().getText();
    };

    this.getLocation = function () {
        return this.getLocationCell().getText();
    };

    this.getPlan = function () {
        return this.getPlanCell().getText();
    };

    this.getResourceGroup = function () {
        return this.getResourceGroupCell().getText();
    };

    this.getSubId = function () {
        return this.getSubIdCell().getText();
    };

    this.getLastUpdate = function () {
        return this.getLastUpdateCell().getText();
    };

    this.clickSubId = function () {
        return this.getSubId().click();
    };

    this.clickLastUpdate = function () {
        return this.getLastUpdate().click();
    };

    this.clickName = function () {
        return this.getName().click();
    };

    this.clickType = function () {
        return this.getType().click();
    };

    this.clickLocation = function () {
        return this.getLocation().click();
    };

    this.clickPlan = function () {
        return this.getPlan().click();
    };

    this.clickResourceGroup = function () {
        return this.getResourceGroup().click();
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
};

module.exports = ResourcesTableRow;
