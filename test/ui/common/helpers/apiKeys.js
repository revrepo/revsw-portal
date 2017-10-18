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
var request = require('supertest');
var apiKeys = {

    /**
       * ### apiKeys.validateAPIKey()
       *
       * This function uses the API key provided and makes a GET 
       * request to the API to validate if it works
       *
       * @returns {Promise}
       */
    validateAPIKey: function (key, callback) {
        var apiUrl = config.get('api.host.protocol') +
            '://' +
            config.get('api.host.name');
        request(apiUrl)
            .get('/v1/accounts')
            .set('Authorization', 'X-API-KEY ' + key)
            .end(function (err, res) {
                callback(res.status);
            });
    }
};

module.exports = apiKeys;