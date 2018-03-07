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
var UsageReportPage = require('./../../page_objects/billing/usageReportPage');
var Constants = require('./../../page_objects/constants');
var Promise = require('bluebird');
var admin = config.get('portal.users.admin');
var moment = require('moment');
var usageReport = {

    /**
       * ### usageReport.generateReport()
       *
       * Generate a user report, using the API's utils/usage_report.js script
       * @param {Object} options {account_id:String}
       *
       * @returns {Promise}
       */
    generateReport: function (options) {
        var query = '';
        if (!options) {
          options = {};
        }
        if(options.accountId){
          query = '?account_id='+options.accountId;
        }
        /*
        *   TODO: error handling
        */
        /*jshint camelcase: false */
        var apiUrl = config.get('api.host.protocol') +
            '://' +
            config.get('api.host.name') + ':' +
            config.get('api.host.port');
        return API.helpers.authenticateUser(admin).then(function () {
            return request(apiUrl)
                .get('/v1/usage_reports/web/generate'+query)
                .set('Authorization', 'Bearer ' + admin.token)
                .then(function (res, err) {
                    if (err !== undefined) {
                        throw new Error(err);
                    }
                    if (res !== undefined && res.status === 200) {

                        return res.text.message;
                    }
                });
        });
    },

    expectValue: function (value, fieldId, accountId) {
        var me = this;
        return new Promise(function (resolve, reject) {
            var times = Constants.USAGE_REPORT_POLLING_TIMEOUT;
            var interval = Constants.USAGE_REPORT_POLLING_INTERVAL;
            var polling = function () {
                if (times < 0) {
                    reject('Value polling timed out');
                } else {
                    element(by.id(fieldId)).getText().then(function (text) {
                        // debuging
                        console.log('       > Number in report: ' + text);
                        console.log('       > Number we are waiting for: ' + value);
                        // get text inside `fieldId` div, and compare it to supplied value
                        if (text === value.toString()) {
                            resolve();
                        } else {
                            times -= interval;
                            var options = {};
                            if (accountId) {
                              options.accountId = accountId;
                            }
                            me.generateReport(options).then(function () {
                                UsageReportPage.clickUpdateReport().then(function () {
                                    setTimeout(polling, interval);
                                });
                            });
                        }
                    });
                }
            };
            polling();
        });
    },

    /**
       * ### usageReport.getTrafficAvgPerDay()
       *
       * Call the /usage_report/web/stats API endpoint
       *
       * @returns {Promise}
       */
    getTrafficAvgPerDay: function (accId, from, to, user) {
        /*jshint camelcase: false */
        var apiUrl = config.get('api.host.protocol') +
            '://' +
            config.get('api.host.name') + ':' +
            config.get('api.host.port');
        var from_date = moment(from).format('YYYY-MM-DD');
        var to_date = moment(to).format('YYYY-MM-DD');
        var traffic = '';
        var cache_hits = '';
        var port_hits = '';
        return API.helpers.authenticateUser(user).then(function () {
            return request(apiUrl)
                .get('/v1/usage_reports/web?account_id=' +
                accId +
                '&from=' +
                from_date +
                '&to=' +
                to_date)
                .set('Authorization', 'Bearer ' + user.token)
                .then(function (res, err) {

                    if (err !== undefined) {
                        new Error(err);
                    }
                    if (res !== undefined && res.status === 200) {
                        traffic = res.body.data[0].traffic;
                        cache_hits = res.body.data[0].cache_hits;
                        port_hits = res.body.data[0].port_hits;
                        return request(apiUrl)
                            .get('/v1/usage_reports/web/stats?account_id=' +
                            accId +
                            '&from_timestamp=' +
                            from + '&to_timestamp=' +
                            to)
                            .set('Authorization', 'Bearer ' + user.token)
                            .expect(200);
                    }
                })
                .then(function (res, err) {
                    if (err !== undefined) {
                        new Error(err);
                    }
                    if (res !== undefined && res.status === 200) {
                        res.body.dataTraffic = traffic;
                        res.body.cacheHits = cache_hits;
                        res.body.portHits = port_hits;
                        return res.body;
                    }

                });

        });
    },
};

module.exports = usageReport;
