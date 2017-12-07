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

// # Utils object

// Requiring config file
var API = require('./../api').API;
var config = require('config');
var request = require('supertest-as-promised');

// `Utils` object that has definitions of methods fo specific operations that
// could be used in different classes and resources.
var Utils = {

  /**
   * ### Utils.getBaseUrl()
   *
   * Generates the base-url of the App under test.
   *
   * @returns {string} The baseUrl
   */
  getBaseUrl: function () {
    var protocol = config.get('portal.host.protocol');
    var hostName = config.get('portal.host.name');
    var hostPort = config.get('portal.host.port');
    var basePath = config.get('portal.host.path');
    var baseUrl = protocol + '://' + hostName;
    if (hostPort) {
      baseUrl += ':' + hostPort;
    }
    if (basePath) {
      baseUrl += basePath;
    }
    return baseUrl + '/';
  },

  /**
   * ### Utils.getAPIUrl()
   *
   * Generates the API url of the App under test.
   *
   * @returns {string} The API url
   */
  getAPIUrl: function () {
    return config.get('api.host.protocol') +
      '://' +
      config.get('api.host.name');
  },

  /**
   * Clones a given JSON object.
   * \
   * @param {Object} obj, object to clone
   */
  clone: function (obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
  * Gets an item from the API by a specific field.
  * 
  * @param {String} value value to get the item by
  * @param {String} field name of the field, name/companyName/email
  * @param {Object} user user
  * @param {String} endpoint API endpoint
  */
  getAPIItemByField: function (value, field, user, endpoint) {
    /* jshint camelcase:false */
    var apiUrl = this.getAPIUrl();
    return API.helpers.authenticateUser(user).then(function () {
      return request(apiUrl)
        .get(endpoint)
        .set('Authorization', 'Bearer ' + user.token)
        .expect(200)
        .then(function (res) {
          var returnItem;
          res.body.forEach(function (item) {
            if (item[field] === value) {
              returnItem = item;
            }
          });
          if (returnItem === undefined) {
            throw new Error('Item not found inside array');
          } else {
            return request(apiUrl)
              .get(endpoint +
              '/' +
              (returnItem.id === undefined ? returnItem.user_id : returnItem.id))
              .set('Authorization', 'Bearer ' + user.token)
              .expect(200)
              .then(function (res) {
                return res.body;
              })
              .catch(function (err) {
                throw new Error(err);
              });
          }
        })
        .catch(function (err) {
          throw new Error(err);
        });
    });
  }
};

module.exports = Utils;