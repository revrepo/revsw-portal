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

var SubsTableRow = require('./row');
var SubsTableLocators = require('./locators');

var SubsTable = {

    locators: SubsTableLocators.table,

    getHeaderEl: function () {
        return element(by.css(this.locators.header.css));
    },

    getHeader: function () {
        var header = this.getHeaderEl();
        return new SubsTableRow(header, SubsTableLocators.header);
    },

    getRows: function () {
        return element.all(by.repeater(this.locators.rows.repeater));
    },

    getFirstRow: function () {
        return this.getRow(0);
    },

    getRow: function (rowIndex) {
        var elem = this
            .getRows()
            .get(rowIndex);
        return new SubsTableRow(elem, SubsTableLocators.row);
    }
};

module.exports = SubsTable;
