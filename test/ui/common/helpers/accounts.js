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
var user = config.get('portal.users.revAdmin');
var Utils = require('./utils');
var AccountsHelper = {
  
  /**
   * ### accounts.getAccount()
   *
   * Returns an Account JSON object
   *
   */
  getAccount: function (name) {
    return Utils.getAPIItemByField(name, 'companyName', user, '/v1/accounts');
  }
};

module.exports = AccountsHelper;
