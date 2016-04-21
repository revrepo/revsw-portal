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

// # Data Provider object

// Requiring constants object
var Constants = require('./../../page_objects/constants');

// This `DataProvider` object abstracts all data generation process for all
// object-data used in the application. In this way, we facilitate the test
// data generation.
var DataProvider = {

  /**
   * ### DataProvider.generateUser()
   *
   * Generates user data object based on the unique para that it requires.
   *
   * @param {string} prefix, the prefix value to use in all user data fields
   *
   * @returns {Object}, generate user data with the following schema:
   *
   *     {
   *         email: string,
   *         firstName: string,
   *         lastName: string,
   *         role: string,
   *         password: string,
   *         passwordConfirm: string
   *     }
   */
  generateUser: function (prefix, skipTimestamp, portalUser) {
    var prefixEmail = prefix.toLowerCase().replace(' ', '_');
    var names = prefix.split(' ');
    var prefixFirstName = names[0];
    var prefixLastName = names[1] || names[0];
    var timestamp = '';
    if (skipTimestamp === undefined || skipTimestamp === false) {
      prefixFirstName = 'FName' + prefix;
      prefixLastName = 'LName' + prefix;
      timestamp = '-' + Date.now();
    }

    // Special case when the portal user is creating a new user
    // is a resller or revadmin which require the specify the 
    // company the new user should be associated with
    var company;
    if (portalUser && portalUser.role && portalUser.role !== 'Admin') {
       company = 'API QA Reseller Company';
    } 

    return {
      email: prefixEmail + timestamp + '@portal-ui-test-email.com',
      firstName: prefixFirstName + ' FName',
      lastName: prefixLastName + ' LName',
      role: Constants.user.roles.USER,
      password: 'password1',
      passwordConfirm: 'password1',
      company: company
    };
  },

  /**
   * ### DataProvider.generateDomain()
   *
   * Generates domain data object based on the unique para that it requires.
   *
   * @param {string} prefix, the prefix value to use in all domain data fields
   * @param {Boolean} skipTimestamp, defaults to FALSE. If timestamp should be
   * used in domain data or not.
   *
   * @returns {Object}, generate domain data with the following schema:
   *
   *     {
   *         name: string,
   *         originServer: string,
   *         originHostHeader: string,
   *         originLocation: string
   *     }
   */
  generateDomain: function (prefix, skipTimestamp) {
    var timestamp = '';
    if (skipTimestamp === undefined || skipTimestamp === false) {
      timestamp = '-' + Date.now();
    }
    if (prefix === undefined) {
      return {
        name: '',
        companyName: '--- Select Company ---',
        originServer: '',
        originHostHeader: '',
        originLocation: '--- Select Location ---'
      };
    }
    prefix = prefix.toLowerCase().replace(/\W+/g, '-');
    return {
      name: prefix + timestamp + '-portal-ui-test.com',
      companyName: 'API QA Reseller Company',
      originServer: prefix + '-portal-ui-test.origin-server.com',
      originHostHeader: prefix + '-portal-ui-test.origin-host-header.com',
      originLocation: 'HQ Test Lab'
    };
  },

  /**
   * ### DataProvider.generateProxyTrafficReport()
   *
   * Generates data for to fill Proxy Traffic reports.
   *
   * @param {string} dataReport, this value is use in all reports.
   *
   * @returns {Object}, generate data with the following schema:
   *
   *     {
   *         delay: string,
   *         country: string,
   *         os: string,
   *         device: string
   *         count: string
   *     }
   */
  generateAnalyticsInfo: function (dataReport) {
    if (dataReport) {
      return {
        delay: dataReport.day,
        country: dataReport.country,
        os: dataReport.os,
        device: dataReport.device,
        count: dataReport.count
      };
    }
    return {
      delay: 'Last 1 Day',
      country: 'All Countries',
      os: 'All OS',
      device: 'All Devices',
      count: 'Top 20 Records'
    };
  },

  /**
   * ### DataProvider.generatePurgeCachedInfo()
   *
   * Generates data to fill Purge Cached Objects.
   *
   * @param {string} purgeUrl, this value is use in Purge Cached Objects page.
   *
   * @returns {Object}, generate data with the following schema:
   *
   *     {
   *         textArea: string
   *     }
   */
  generatePurgeCachedInfo: function (purgeUrl) {
    if (purgeUrl) {
      return {
        textArea: purgeUrl.textArea
      };
    }
    return {
      textArea: '\/images1\/*.png\\n\/images2\/*.png\\n\/images3\/*.png\\n' +
                '\/images4\/*.png\\n\/images5\/*.png\\n\/images6\/*.png\\n' +
                '\/images7\/*.png\\n\/images8\/*.png\\n\/images9\/*.png\\n'
    };
  },
  generateMobileApps: function () {
    return [
      {
        name: 'MyAppIOS',
        platform: 'iOS',
        title: 'iOS Apps List'
      },
      {
        name: 'MyAppAndroid',
        platform: 'Android',
        title: 'Android Apps List'
      }
      // {
      //   name: 'MyAppWindowsMobile',
      //   platform: 'Windows Mobile',
      //   title: 'Windows Mobile Apps List'
      // }
    ];
  },
  generateUsageReportData: function () {
    return {
      companyName: 'QA API Company',
      monthDD: '2016-01'
    };
  }
};

module.exports = DataProvider;
