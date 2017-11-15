/*************************************************************************
*
* REV SOFTWARE CONFIDENTIAL
*
* [2013] - [2017] Rev Software, Inc.
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
var config = require('config');
var API = require('./../api').API;
var Session = require('./../session');
var request = require('supertest-as-promised');
var Portal = require('./../../page_objects/portal');
var Constants = require('./../../page_objects/constants');
var usageReport = {

    /**
       * ### usageReport.generateReport()
       *
       * Generate a user report, using the API's utils/usage_report.js script
       *
       * @returns {Promise}
       */
    generateReport: function (user) {
        /*
        *   TODO: error handling
        */
        /*jshint camelcase: false */
        var apiUrl = config.get('api.host.protocol') +
            '://' +
            config.get('api.host.name') + ':' +
            config.get('api.host.port');
        return API.helpers.authenticateUser(user).then(function () {
            return request(apiUrl)
                .get('/v1/usage_reports/web/generate')
                .set('Authorization', 'Bearer ' + user.token)
                .then(function (res, err) {
                    if (err !== undefined) {
                        new Error(err);
                    }
                    if (res !== undefined && res.status === 200) {
                        return res.text.message;
                    }
                });
        });
    },

    expectValue: function (page, value, done, form) {     
        var times = Constants.USAGE_REPORT_POLLING_TIMEOUT;
        var interval = Constants.USAGE_REPORT_POLLING_INTERVAL;
        var polling = function () {
            if (times < 0) {
                expect(false).toBeTruthy();
                done();
                return;
            } else {
                page.getFormTextByFormName(form).then(function (text) {
                    if (text.includes(value)) {
                        expect(true).toBeTruthy();
                        done();
                        return;
                    } else {
                        times -= interval;
                        page.clickUpdateReport();
                        setTimeout(polling, interval);
                    }
                });
            }
        };
        polling();
    }
};

module.exports = usageReport;