/* jshint ignore:start */


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
var moment = require('moment');

// # Data Provider object

// Requiring constants object
var Constants = require('./../../page_objects/constants');
var Session = require('./../session');

// This `DataProvider` object abstracts all data generation process for all
// object-data used in the application. In this way, we facilitate the test
// data generation.
var DataProvider = {

  /**
   * ### DataProvider.generateUser()
   *
   * Generates user data object based on the unique para that it requires.
   *
   * @param {Object} prefix, the prefix value to use in all user data fields
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
  generateUser: function (data) {
    if (data === undefined) {
      data = {};
    }
    var firstName = data.firstName || faker.name.firstName();
    var lastName = data.lastName || faker.name.lastName();
    var currentUser = Session.getCurrentUser();

    // Special case when the portal user is creating a new user
    // is a reseller or rev-admin which require the specify the
    // company the new user should be associated with
    if (currentUser.role !== 'Admin') {
      data.company = ['API QA Reseller Company'];
    }

    return {
      email: [firstName, Date.now() + '@mailinator.com']
        .join('-')
        .toLowerCase(),
      firstName: firstName,
      lastName: lastName,
      role: Constants.user.roles.USER,
      password: 'password1',
      passwordConfirm: 'password1',
      company: data.company
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
      name: (prefix + timestamp + '-portal-ui-test.com').toLowerCase(),
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

    var now = moment();
    var today = now.format('YYYY-MM-DD');
    var yesterday = now.subtract(1, 'days').format('YYYY-MM-DD');

    return {
      delay: {
        start: yesterday,
        end: today
      },
      country: 'All Countries',
      os: 'All OS',
      device: 'All Devices',
      count: 'Top 20 Records'
    };
  },

  /**
   * ### DataProvider.generateFBTAnalyticsInfo()
   *
   * Generates data for to fill FTB reports.
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
  generateFBTAnalyticsInfo: function (dataReport) {

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
    var underscore = require('underscore');
    var SDKEventsLoggingLevel_arr = ['Info', 'Warning', 'Error', 'Critical'];
    var SDKEventsLoggingLevel_shuffleArr = underscore.shuffle(SDKEventsLoggingLevel_arr);
    var SDKEventsLoggingLevel = SDKEventsLoggingLevel_shuffleArr[0];

    var SDKOperationMode_arr = ['Transfer And Report', 'Transfer Only', 'Report Only', 'Off'];
    var SDKOperationMode_shuffleArr = underscore.shuffle(SDKOperationMode_arr);
    var SDKOperationMode = SDKOperationMode_shuffleArr[0];

    var allowedTransportProtocolsAndSelectionPriority_arr = ['STANDARD', 'QUIC', 'RMP'];
    var allowedTransportProtocolsAndSelectionPriority_shuffleArr = underscore.shuffle(allowedTransportProtocolsAndSelectionPriority_arr);
    var allowedTransportProtocolsAndSelectionPriority = allowedTransportProtocolsAndSelectionPriority_shuffleArr[0];

    var initialTransportProtocol_arr = ['STANDARD', 'QUIC', 'RMP'];
    var initialTransportProtocol_shuffleArr = underscore.shuffle(initialTransportProtocol_arr);
    var initialTransportProtocol = initialTransportProtocol_shuffleArr[0];

    var analyticsReportingLevel_arr = ['Info', 'Debug', 'Error'];
    var analyticsReportingLevel_shuffleArr = underscore.shuffle(analyticsReportingLevel_arr);
    var analyticsReportingLevel = analyticsReportingLevel_shuffleArr[0];
    return {
      name: 'UPDATED-' + app.name,
      //account: 'API_TEST_COMPANY_1461793655217',
      companyName: 'Vadym_test',
      sdkOperationMode: SDKOperationMode,
      SDKeventsLoggingLevel: SDKEventsLoggingLevel,
      configurationRefreshInterval: '36001',
      configurationStaleTimeout: '36001',
      allowedTransportProtocolsAndSelectionPriority: allowedTransportProtocolsAndSelectionPriority,
      analyticsReportingLevel: analyticsReportingLevel,
      initialTransportProtocol: initialTransportProtocol,
      analyticsReportingInterval: '21',
      domainsWhiteList: 'www.meta.ua',
      comment: 'App was updated',
      domainsBlackList: 'www.meta.ua',
      domainsProvisionedList: 'qa-admin-10-portal-ui-test.com',
      testingOffloadingRatio: '1'
    };
  },

  /**
   * ### DataProvider.generateUsageReportData()
   *
   * Generates usage report data object based on the unique para that it
   * requires.
   *
   * @param {Object} user for whom usage report is generated
   *
   * @returns {Object}, generate usage report data with the following schema:
   *
   *     {
   *         companyName: string,
   *         monthDD: string
   *     }
   */
  generateUsageReportData: function (user) {
    return {
      companyName: (user.role === 'Reseller') ? 'API QA Reseller Company' : 'API QA Account',
      monthDD: '2017-01'
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
      domain: 'DummyDomain',
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
  },

  /**
   * ### DataProvider.generateSSLCertData()
   *
   * Generates SSL Cert data object
   *
   * @returns {Object}, generate SSL Cert data with the following schema:
   *
   *     {
   *       name: string,
   *       account: string,
   *       type: string,
   *       publicSSLCert: string,
   *       privateSSLKey: string,
   *       comment: string
   *     }
   */
  generateSSLCertData: function (data) {
    var timestamp = Date.now();
    var name = 'QA ' + timestamp;
    var publicSSLCert = [
          '-----BEGIN CERTIFICATE-----',
          'MIIC9zCCAd+gAwIBAgIJALjDeIy6xsYNMA0GCSqGSIb3DQEBBQUAMBIxEDAOBgNV',
          'BAMMB2FzZC5jb20wHhcNMTYwNTE5MTcxOTE2WhcNMjYwNTE3MTcxOTE2WjASMRAw',
          'DgYDVQQDDAdhc2QuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA',
          'rrWqpABvagJZvHk+YDWycv0rwbbl/UbK/osBcV2bfjYB2A7dFCGvGg2sZ6rGeI5S',
          'PWBVdu1I7sNalZGjk8R8tAfoRLLoR99teOlkSQUNP9nTEfX9cTSeHhLAK3ZSnJHE',
          'hB3jFyMBAeVEXf5CiNWyyVNVMkVIyFnDDDP0ag4kTvSEHeGlsXZDC1rKE/7mY07K',
          'uPGs4E99HkDq+Zgf6BpPEvdYiterI3SptEMYxdpRjwMqvUQb1KLn2yL/FLgeM10F',
          'wDQhlEUqna54+bQoP2h1pWafz8zHem6AeaIrz6dIETy4eDmyoaU/DrJOARw+yAS+',
          'U1BlW59kHxrDlxK9KfPVFwIDAQABo1AwTjAdBgNVHQ4EFgQU7P7jJfmbqUTV7bTb',
          'a0KwhxP6Q+owHwYDVR0jBBgwFoAU7P7jJfmbqUTV7bTba0KwhxP6Q+owDAYDVR0T',
          'BAUwAwEB/zANBgkqhkiG9w0BAQUFAAOCAQEAUJMVngyc9xxOitqqvi9+jSGqXdBr',
          'dAMaWna0xhySoNenmguJVnRa3EYai1J/nk5qJgJq9DyPxXArDn2N4UGVK/u97ozT',
          '4HIbCQxrrFJxAL3JhYo5q1Mdo1LvJFOypRwKS1QP+VcgUt+DW8MNdgnWihxbDnCX',
          '0zgutoPorMtD8rMCtSjhxHpvkBdgOsGYCMeYBUOXgrhHEWfHX/v6Yt/jFw5zWL0I',
          '11syc2MjJ+c3bN2/yMTIK+Nu+j9+Tu/kNchfe4v7jK2NQozCcCSsSNae92nUjaux',
          'FhIcSq0V6/My737H12LJLDDFGOcKaoOYNVYXMEl9Z2GVPmmQVGzqVbUXAA==',
          '-----END CERTIFICATE-----'
        ]; // Public SSL certificate in PEM format,

    var privateSSLKey = [
      '-----BEGIN RSA PRIVATE KEY-----',
      'MIIEpAIBAAKCAQEArrWqpABvagJZvHk+YDWycv0rwbbl/UbK/osBcV2bfjYB2A7d',
      'FCGvGg2sZ6rGeI5SPWBVdu1I7sNalZGjk8R8tAfoRLLoR99teOlkSQUNP9nTEfX9',
      'cTSeHhLAK3ZSnJHEhB3jFyMBAeVEXf5CiNWyyVNVMkVIyFnDDDP0ag4kTvSEHeGl',
      'sXZDC1rKE/7mY07KuPGs4E99HkDq+Zgf6BpPEvdYiterI3SptEMYxdpRjwMqvUQb',
      '1KLn2yL/FLgeM10FwDQhlEUqna54+bQoP2h1pWafz8zHem6AeaIrz6dIETy4eDmy',
      'oaU/DrJOARw+yAS+U1BlW59kHxrDlxK9KfPVFwIDAQABAoIBAHAzmaBz6xmw4sKp',
      'NwcA1VcGAtkIxlHP6kRpL4cH7/mxY6PHf/IS4+qeh2+YfJgmBukF+j1DjMhSS9Ws',
      'z9nxoYjZXzDnmUe3VQ4HDfHbPbQZB3YMfjT67uUvc502Az4sW4Hh09sjDt2RyUN4',
      'LHDGlWi4jQmY93I8O4iVwU1vQaA2Vv9EyWcRsdjkCwYCK7EvPIOmZrZtBj6JNGPW',
      'nYMuwDMiV6oY0ic70AMqB7vPX53IEnxVepeFea7hVkXapNZ+j8f8M97ERdfzFoAg',
      'PgbuE3hcmHGf7EUWMULJKSWJrQN1m8TV/F34cWm6jQSRuAtEQdEOQ07cKMPw+MXn',
      'M3Mz6JECgYEA2IgsVJ1sTlMWR1Uw3bOVLl7Udb7dWAZdU6MISEoXIYZOnibADHWI',
      'wN7+UpXPtBtq95J8rMCY90WR39Wj93OnFvC40c8oEOleDrKaXgJJx/Z1gCOv5xwl',
      '6s+N2lEYNT8M1/Q/1JyE3ZJOifM/AG+gxT8vkGYSj9x176UH3DqpX7kCgYEAzo36',
      'mk33cqa6DwjOvcYoPQSYyDtzE9ciNAyyoyJFgO1PdvpGUY+Z6W90uNHTQcoi1t1v',
      'pEfUYinzpiuEtQUv2hQYxbgVm/ym5CkfVg8KEasfLKN3sVCvya5GDEwc6qiRW4EH',
      'EJIZJxN4KuZd93YvpWCkytTRckd2chZasfbhI08CgYBSKOFBPfZRhd9HM8D17mUl',
      'kh/liYVtGAUjbhH/c/Vw6Ag+pA9s6s/39uTjKysDeP/ObovV9MJV2NTv7J1pkD2P',
      'S8mk+oiGWjYxN32xPAcI07Bj7aaZ96k/fn+hnfGkiobyDiCGKNmVRSV93IlEPhbv',
      'oPkIPmK+qXUqeCESZEPOKQKBgQCHHUzO3y18rB+Nch96+EKeF4GxiWHvmozfK2c3',
      'W1XHznRqybBx7dOqZaQeufLNWGKN1vAOsIX3aKXfDxySJUB2EStbOt232f95xISh',
      'ENlvUVblJlFHhhZXgU6FAMzxmy7qgm6Sol8dtpimx2a0V3U3Yw6pN6mCbcjHPGQ7',
      'gdkn9QKBgQDX35FhVfyHGCQyOv5Me+2Ycfc5iFKmXie6IJB/El7xt0lTPdccl7c/',
      'sA8KhjneeQs8qMNzxEtppNM9A86IP7OAnO8ydS/IyQBvAtoqwSNE1ydVcjg8Rjik',
      'pVLyiPsKT20w/q3x4P36coz+VCcCM7kKuZxfNoXHceX1jsau/ZXJXw==',
      '-----END RSA PRIVATE KEY-----'
    ]; // Private SSL key in PEM format,

    if (data){
      return {
        name: (data.name === undefined) ? name : data.name,
        account: (data.account === undefined) ? ['Portal UI QA Company'] : data.account,
        type: (data.type === undefined) ? 'Private With Customer-Provided Key' : data.type,
        publicSSLCert: (data.publicSSLCert === undefined) ? publicSSLCert : data.publicSSLCert,
        privateSSLKey: (data.privateSSLKey === undefined) ? privateSSLKey : data.privateSSLKey,
        comment: (data.comment === undefined) ? 'Comment ' + name : data.comment
      }
    } else {
      return {
        name: name,
        account: ['Portal UI QA Company'],
        type: 'Private With Customer-Provided Key',
        publicSSLCert: publicSSLCert,
        privateSSLKey: privateSSLKey,
        comment: 'Comment ' + name
      }
    }
  },

  /**
   * ### DataProvider.generateSSLNameData()
   *
   * Generates SSL Name data object
   *
   * @returns {Object}, generate SSL Name data with the following schema:
   *
   *    {
   *      domainName: String,
   *      account: String,
   *      verificationMethod: String
   *    }
   */
  generateSSLNameData: function (data) {
    var timestamp = Date.now();
    var postfix = '.revsw.com';
    if (data !== undefined && data.postfix !== undefined){
      postfix = data.postfix;
    }
    var name = 'ssltest-' + timestamp + postfix;

    if (data){
      return {
        domainName: (data.domainName === undefined) ? name : data.domainName,
        account: (data.account === undefined) ? ['API QA Reseller Company'] : data.account,
        verificationMethod: (data.verificationMethod === undefined) ? 'DNS' : data.verificationMethod,
        verificationString: (data.verificationString === undefined) ? 'revsw.com' : data.verificationString
      }
    } else {
      return {
        domainName: name,
        account: ['API QA Reseller Company'],
        verificationMethod: 'DNS',
        verificationString: 'revsw.com'
      }
    }
  },

  /**
   * ### DataProvider.generateDNSZoneData()
   *
   * Generates DNS Zone data object
   *
   * @returns {Object}, generate DNS Zone Data with the following schema:
   *
   *    {
   *      domain: String,
   *      account: String,
   *    }
   */
  generateDNSZoneData: function (data) {
    var timestamp = Date.now();
    var name = 'dnszonetest-' + timestamp + '.zonetest.com';
    if (data) {
      return {
        domain: (data.domain === undefined) ? name : data.domain,
        account: (data.account === undefined) ? ['API QA Reseller Company'] : data.account,
        soaTTL: (data.soaTTL === undefined) ? '3599' : data.soaTTL,
        refresh: (data.refresh === undefined) ? '43199' : data.refresh,
        retry: (data.retry === undefined) ? '7199' : data.retry,
        expire: (data.expire === undefined) ? '1209599' : data.expire,
        nxTTL: (data.nxTTL === undefined) ? '3599' : data.nxTTL
      }
    } else {
      return {
        domain: name,
        account: ['API QA Reseller Company'],
        soaTTL: '3599',
        refresh: '43199',
        retry: '7199',
        expire: '1209599',
        nxTTL: '3599'
      }
    }
  },

  /**
   * ### DataProvider.generateDNSZoneRecordData()
   *
   * Generates DNS Zone Recorddata object
   *
   * @returns {Object}, generate DNS Zone Record Data with the following schema:
   *
   *    {
   *      name: String,
   *      answer: String,
   *    }
   */
  generateDNSZoneRecordData: function (data) {
    var timestamp = Date.now();
    var name = 'dnszonerecordtest-' + timestamp;
    if (data) {
      return {
        name: (data.name === undefined) ? name : data.name,
        answer: (data.answer === undefined) ? '12.34.56.78' : data.answer
      }
    } else {
      return {
        name: name,
        answer: '12.34.56.78'
      }
    }
  },

  /**
   * ### DataProvider.generateLogShippingJobData()
   *
   * Generates Log Shipping Job data object
   *
   * @returns {Object}, generate Log Shipping Job Data with the following schema:
   *
   *    {
   *      name: String,
   *      account: String,
   *    }
   */
  generateLogShippingJobData: function (data) {
    var timestamp = Date.now();
    var name = 'logshippingtest-' + timestamp;
    if (data) {
      return {
        name: (data.name === undefined) ? name : data.name,
        account: (data.account === undefined) ? ['Rev Test'] : data.account,
        currentMode: (data.currentMode === undefined) ?  'Pause Log Shipping And Hold Log Files' : data.currentMode,
        sourceType: (data.sourceType === undefined) ?  'Domain' : data.sourceType,
        sourceDomain: (data.sourceDomain === undefined) ?  'test-proxy-cache-config.revsw.net' : data.sourceDomain,
        destination: (data.destination === undefined) ?  'FTP' : data.destination,
        host: (data.host === undefined) ?  'testsjc20-ls01.revsw.net' : data.host,
        port: (data.port === undefined) ?  '21' : data.port,
        secretKey: (data.secretKey === undefined) ?  '' : data.secretKey,
        userName: (data.userName === undefined) ?  'ftptest' : data.userName,
        password: (data.password === undefined) ?  'disaster-257' : data.password,
        email: (data.email === undefined) ?  name + '@revsw.com' : data.email,
        comment: (data.comment === undefined) ?  'test comment ' + timestamp : data.comment
      }
    }else {
      return {
        name: name,
        account: ['Rev Test'],
        currentMode: 'Pause Log Shipping And Hold Log Files',
        sourceType: 'Domain',
        sourceDomain: 'test-proxy-cache-config.revsw.net',
        destination: 'FTP',
        host: 'testsjc20-ls01.revsw.net',
        port: '21',
        secretKey: '',
        userName: 'ftptest',
        password: 'disaster-257',
        email: name + '@revsw.com',
        comment: 'test comment ' + timestamp
      }
    }
  },
  generateCustomWAFRule: function(data){
    var prefix = 'qa-test-wafrule-';
    var timestamp = Date.now();
    var wafRuleDescription = [
      'Description'
    ];
    if(!data){
      data = {};
    }
    var wafRuleStatements = [
        '# Just a comment for QA tests',
        '',
        '"rx:select|union|update|delete|insert|table|from|ascii|hex|unhex|drop" "msg:sql keywords" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$SQL:4" id:1000;',
        '"str:\"" "msg:double quote" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$SQL:8,$XSS:8" id:1001;',
        '"str:0x" "msg:0x, possible hex encoding" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$SQL:2" id:1002;',
        '"str:/*" "msg:mysql comment (/*)" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$SQL:8" id:1003;',
        '"str:*/" "msg:mysql comment (*/)" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$SQL:8" id:1004;',
        '"str:|" "msg:mysql keyword (|)"  "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$SQL:8" id:1005;',
        '"str:&&" "msg:mysql keyword (&&)" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$SQL:8" id:1006;',
        '"str:--" "msg:mysql comment (--)" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$SQL:4" id:1007;',
        '"str:;" "msg:semicolon" "mz:BODY|URL|ARGS" "s:$SQL:4,$XSS:8" id:1008;',
        // TODO: check fixed bug "A script on this page may be busy, or it may have stopped responding..." if write text is minimal
        // '"str:=" "msg:equal sign in var, probable sql/xss" "mz:ARGS|BODY" "s:$SQL:2" id:1009;',
        // '"str:(" "msg:open parenthesis, probable sql/xss" "mz:ARGS|URL|BODY|$HEADERS_VAR:Cookie" "s:$SQL:4,$XSS:8" id:1010;',
        // '"str:)" "msg:close parenthesis, probable sql/xss" "mz:ARGS|URL|BODY|$HEADERS_VAR:Cookie" "s:$SQL:4,$XSS:8" id:1011;',
        // '"str:\'" "msg:simple quote" "mz:ARGS|BODY|URL|$HEADERS_VAR:Cookie" "s:$SQL:4,$XSS:8" id:1013;',
        // '"str:," "msg:comma" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$SQL:4" id:1015;',
        // '"str:#" "msg:mysql comment (#)" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$SQL:4" id:1016;',
        // '"str:@@" "msg:double arobase (@@)" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$SQL:4" id:1017;',
        // '"str:http://" "msg:http:// scheme" "mz:ARGS|BODY|$HEADERS_VAR:Cookie" "s:$RFI:8" id:1100;',
        // '"str:https://" "msg:https:// scheme" "mz:ARGS|BODY|$HEADERS_VAR:Cookie" "s:$RFI:8" id:1101;',
        // '"str:ftp://" "msg:ftp:// scheme" "mz:ARGS|BODY|$HEADERS_VAR:Cookie" "s:$RFI:8" id:1102;',
        // '"str:php://" "msg:php:// scheme" "mz:ARGS|BODY|$HEADERS_VAR:Cookie" "s:$RFI:8" id:1103;',
        // '"str:sftp://" "msg:sftp:// scheme" "mz:ARGS|BODY|$HEADERS_VAR:Cookie" "s:$RFI:8" id:1104;',
        // '"str:zlib://" "msg:zlib:// scheme" "mz:ARGS|BODY|$HEADERS_VAR:Cookie" "s:$RFI:8" id:1105;',
        // '"str:data://" "msg:data:// scheme" "mz:ARGS|BODY|$HEADERS_VAR:Cookie" "s:$RFI:8" id:1106;',
        // '"str:glob://" "msg:glob:// scheme" "mz:ARGS|BODY|$HEADERS_VAR:Cookie" "s:$RFI:8" id:1107;',
        // '"str:phar://" "msg:phar:// scheme" "mz:ARGS|BODY|$HEADERS_VAR:Cookie" "s:$RFI:8" id:1108;',
        // '"str:file://" "msg:file:// scheme" "mz:ARGS|BODY|$HEADERS_VAR:Cookie" "s:$RFI:8" id:1109;',
        // '"str:gopher://" "msg:gopher:// scheme" "mz:ARGS|BODY|$HEADERS_VAR:Cookie" "s:$RFI:8" id:1110;',
        // '"str:.." "msg:double dot" "mz:ARGS|URL|BODY|$HEADERS_VAR:Cookie" "s:$TRAVERSAL:4" id:1200;',
        // '"str:/etc/passwd" "msg:obvious probe" "mz:ARGS|URL|BODY|$HEADERS_VAR:Cookie" "s:$TRAVERSAL:4" id:1202;',
        // '"str:c:\\" "msg:obvious windows path" "mz:ARGS|URL|BODY|$HEADERS_VAR:Cookie" "s:$TRAVERSAL:4" id:1203;',
        // '"str:cmd.exe" "msg:obvious probe" "mz:ARGS|URL|BODY|$HEADERS_VAR:Cookie" "s:$TRAVERSAL:4" id:1204;',
        // '"str:\\" "msg:backslash" "mz:ARGS|URL|BODY|$HEADERS_VAR:Cookie" "s:$TRAVERSAL:4" id:1205;',
        // '"str:<" "msg:html open tag" "mz:ARGS|URL|BODY|$HEADERS_VAR:Cookie" "s:$XSS:8" id:1302;',
        // '"str:>" "msg:html close tag" "mz:ARGS|URL|BODY|$HEADERS_VAR:Cookie" "s:$XSS:8" id:1303;',
        // '"str:[" "msg:open square backet ([), possible js" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$XSS:4" id:1310;',
        // '"str:]" "msg:close square bracket (]), possible js" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$XSS:4" id:1311;',
        // '"str:~" "msg:tilde (~) character" "mz:BODY|URL|ARGS|$HEADERS_VAR:Cookie" "s:$XSS:4" id:1312;',
        // '"str:`"  "msg:grave accent (`)" "mz:ARGS|URL|BODY|$HEADERS_VAR:Cookie" "s:$XSS:8" id:1314;',
        // '"rx:%[2|3]."  "msg:double encoding" "mz:ARGS|URL|BODY|$HEADERS_VAR:Cookie" "s:$XSS:8" id:1315;',
        // '"str:&#" "msg:utf7/8 encoding" "mz:ARGS|BODY|URL|$HEADERS_VAR:Cookie" "s:$EVADE:4" id:1400;',
        // '"str:%U" "msg:M$ encoding" "mz:ARGS|BODY|URL|$HEADERS_VAR:Cookie" "s:$EVADE:4" id:1401;',
        // '',
        // '"rx:\.ph|\.asp|\.ht" "msg:asp/php file upload" "mz:FILE_EXT" "s:$UPLOAD:8" id:1500;'
    ];
    var wafRule = {
      ruleName: prefix+timestamp,
      accountName: (data.account === undefined) ? ['Rev Test'] : data.account.companyName,
      comment: data.comment || wafRuleDescription,
      ruleType: data.rule_type || 'Customer',
      visibility: data.visibility || 'Public',
      ruleBody: data.rule_body || wafRuleStatements
    }
    return wafRule;
  }
};

module.exports = DataProvider;
