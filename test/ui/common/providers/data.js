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

var faker = require('faker');

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
      company = ['API QA Reseller Company'];
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
   * ### DataProvider.generateUserToSignUp()
   *
   * Generates user data object to sign up.
   *
   * @returns {Object}, generate user data with the following schema:
   *
   *     {
   *         firstName: string,
   *         lastName: string,
   *         email: string,
   *         password: string
   *     }
   */
  generateUserToSignUp: function () {
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    var user = {
      firstName: firstName,
      lastName: lastName,
      email: [firstName, Date.now() + '@mailinator.com']
        .join('-')
        .toLowerCase(),
      password: 'password1'
    };
    return user;

  },

  /**
   * ### DataProvider.generateProfile()
   *
   * Generates user data profile to update in portal app.
   *
   * @returns {Object}, generate user data with the following schema:
   *
   *     {
   *         companyName: string,
   *         firstName: string,
   *         lastName: string,
   *         phoneNumber: string,
   *         contactEmail: string,
   *         firstAddress: string,
   *         secondAddress: string,
   *         country: string,
   *         state: string,
   *         city: string,
   *         zipCode: string,
   *         comment: string
   *     }
   */
  generateProfile: function () {
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    return {
      companyName: firstName + ' ' + lastName,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: faker.phone.phoneNumber(),
      contactEmail: [firstName, Date.now() + '@mailinator.com']
        .join('-')
        .toLowerCase(),
      firstAddress: faker.address.streetAddress(),
      secondAddress: faker.address.secondaryAddress(),
      country: faker.address.country(),
      state: faker.address.state(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      comment: faker.lorem.sentence()
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
      originLocation: 'HQ Test Lab',
      bttKey: '573bf3f5b884a4202599a4cd'
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

  /**
   * ### DataProvider.generateMobileApp()
   *
   * Generates mobile app data object based on the unique para that it requires.
   *
   * @param {String} platform, the prefix value to use in all domain data fields
   * @param {Boolean} skipTimestamp, defaults to FALSE. If timestamp should be
   * used in domain data or not.
   *
   * @returns {Object}, generate mobile apps data with the following schema:
   *
   *     {
   *         name: string,
   *         platform: string,
   *         comment: string,
   *         companyName: string
   *     }
   */
  generateMobileApp: function (platform, skipTimestamp) {
    var timestamp = '';
    if (skipTimestamp === undefined || skipTimestamp !== true) {
      timestamp = '-' + Date.now();
    }
    return {
      name: platform + timestamp,
      platform: platform,
      comment: 'My comment just for testing proposal',
      companyName: 'API QA Reseller Company'
    };
  },

  generateUpdateMobileApp: function (app) {
    return {
      name: 'UPDATED-' + app.name,
      account: 'API_TEST_COMPANY_1461793655217',
      configurationStaleTimeout: '36001',
      sdkOperationMode: 'Report Only',
      configurationRefreshInterval: '36001',
      initialTransportProtocol: 'QUIC',
      domainsWhiteList: 'www.meta.ua',
      comment: 'App was updated',
      domainsBlackList: 'www.meta.ua',
      domainsProvisionedList: 'qa-admin-10-portal-ui-test.com',
      testingOffloadingRatio: '1'
    };
  },

  /**
   * ### DataProvider.generateMobileAppData()
   *
   * Generates mobile app data objects based on the unique para that it requires
   *
   * @param {String} platform, the prefix value to use in all domain data fields
   * @param {Number} numApps, total objects to create.
   *
   * @returns {Object}, generate mobile apps with the following schema:
   *
   *     [{
   *         name: string,
   *         platform: string,
   *         comment: string,
   *         title: string,
   *         companyName: string
   *     }, ...]
   */
  generateMobileAppData: function (platform, numApps) {
    var apps = [];
    var i;
    for (i = 0; i < numApps; i++) {
      var app = {};
      app.name = platform + '-' + Date.now() + '-' + (i + 1);
      app.platform = platform.replace('_', ' ');
      app.title = platform.replace('_', ' ') + ' Apps List';
      app.comment = 'My comment just for testing proposal';
      app.companyName = 'API QA Reseller Company';
      apps.push(app);
    }
    return apps;
  },
  /**
   * ### DataProvider.generateUsageReportData()
   *
   * Generates usage report data object based on the unique para that it
   * requires.
   *
   * @returns {Object}, generate usage report data with the following schema:
   *
   *     {
   *         companyName: string,
   *         monthDD: string
   *     }
   */
  generateUsageReportData: function () {
    return {
      companyName: 'API QA Account',
      monthDD: '2016-01'
    };
  },

  /**
   * ### DataProvider.generateAccountProfileData()
   *
   * Generates usage report data object based on the unique para that it
   * requires.
   *
   * @returns {Object}, generate usage report data with the following schema:
   *
   *     {
   *         companyName: string,
   *         firstName: string,
   *         lastName: string,
   *         phoneNumber: string,
   *         contactEmail: string,
   *         address1: string,
   *         address2: string,
   *         country: string,
   *         state: string,
   *         city: string,
   *         zipcode: string,
   *         comment: string
   *     }
   */
  generateAccountProfileData: function () {
    var timestamp = Date.now();
    return {
      companyName: 'QA-Account-Profile-' + timestamp,
      firstName: 'TestFirstName01',
      lastName: 'TestLastName01',
      phoneNumber: '1111111111',
      contactEmail: 'company01@mail.com',
      address1: 'Street 1',
      address2: 'Street 2',
      country: 'Canada',
      state: 'Toronto',
      city: 'Toronto',
      zipcode: '02',
      comment: 'Comments just for testing proposal for company ' + timestamp
    };
  },

  /**
   * ### DataProvider.generateAccountBillingData()
   *
   * Generates usage report data object based on the unique para that it
   * requires.
   *
   * @returns {Object}, generate usage report data with the following schema:
   *
   *     {
   *         firstName: string,
   *         lastName: string,
   *         contactEmail: string,
   *         phoneNumber: string,
   *         address1: string,
   *         address2: string,
   *         country: string,
   *         state: string,
   *         city: string,
   *         zipcode: string
   *     }
   */
  generateAccountBillingData: function () {
    var timestamp = Date.now();
    return {
      companyName: 'QA-Account-Billing-' + timestamp,
      firstName: 'TestFirstName01',
      lastName: 'TestLastName01',
      phoneNumber: '1111111111',
      contactEmail: 'company01@mail.com',
      address1: 'Street 1',
      address2: 'Street 2',
      country: 'Canada',
      state: 'Toronto',
      city: 'Toronto',
      zipcode: '02',
      comment: 'My comment just for testing proposal'
    };
  },

  /**
   * ### DataProvider.generateDashboardData(dashboardPrefix)
   *
   * Generates dashboard data object based on the unique para that it
   * requires.
   *
   * @returns {Object}, generate dashboard data with the following schema:
   *
   *     {
   *         title: string,
   *         structure: Number,
   *         autoRefresh: string
   *     }
   */
  generateDashboardData: function (dashboardPrefix) {
    var timestamp = Date.now();
    var dashboard = {
      title: 'QA-' + timestamp,
      structure: 2,
      autoRefresh: 'Every 15 Minutes'
    };

    if (dashboardPrefix) {
      dashboard.title = dashboardPrefix + '-' + timestamp;
      return dashboard;
    } else {
      return dashboard;
    }
  },

  /**
   * ### DataProvider.generateApiKeyData(apiKeyPrefix)
   *
   * Generates dashboard data object based on the unique para that it
   * requires.
   *
   * @returns {Object}, generate API Key data with the following schema:
   *
   *     {
   *         name: string,
   *         key: string,
   *         active: string,
   *         readOnly: string,
   *         domain: string,
   *         read: string,
   *         modify: string,
   *         delete: string,
   *         purge: string,
   *         reports: string,
   *         admin: string
   *     }
   */
  generateApiKeyData: function (apiKeyPrefix) {
    var timestamp = Date.now();
    var apiKey = {
      name: 'QA-API-Key-' + timestamp,
      key: '',
      active: true,
      readOnly: false,
      domain: false,
      read: false,
      modify: false,
      delete: false,
      purge: false,
      reports: false,
      admin: false
    };

    if (apiKeyPrefix) {
      apiKey.title = apiKeyPrefix + '-' + timestamp;
      return apiKey;
    } else {
      return apiKey;
    }
  }
};

module.exports = DataProvider;
