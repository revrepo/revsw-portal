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
var API = require('./../api').API;
var config = require('config');
var request = require('supertest');
var requestPromise = require('supertest-as-promised');
var user = config.get('portal.users.admin');
var apiUrl = config.get('api.host.protocol') +
    '://' +
    config.get('api.host.name');
var Utils = require('./utils');
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
        request(apiUrl)
            .get('/v1/accounts')
            .set('Authorization', 'X-API-KEY ' + key)
            .end(function (err, res) {
                callback(res.status);
            });
    },

    /**
     * ### apiKeys.getAPIKey()
     *
     * Returns an API Key JSON object
     *
     */
    getAPIKey: function (name) {
        return Utils.getAPIItemByField(name, 'key_name', user, '/v1/api_keys');
    }
};

module.exports = apiKeys;