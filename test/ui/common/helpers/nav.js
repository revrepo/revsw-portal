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

var Constants = require('./../../page_objects/constants');
var SideBar = require('./../../page_objects/common/sidebar/sidebar');
var MenuItems = require('./../../page_objects/common/sidebar/locators/menuItems');
var MenuAreas = require('./../../page_objects/common/sidebar/locators/menuAreas');

// # Navigator Helper
// Abstracts common functionality for the navigation through Portal UI.
var NavHelper = {

  /**
   * Goes to specified menu entry from Sidebar
   * @param menuName
   * @returns {*}
   */
  goTo: function (menuName) {
    return menuName;
  },

  /**
   * Goes to Dashboards Area
   * @returns {*}
   */
  goToDashboards: function () {
    return SideBar.select(MenuAreas.DASHBOARDS);
  },

  getDashboardsItems: function () {
    return element.all(by.css(MenuAreas.DASHBOARDS.css));
  },


  /**
   * Goes to Mobile Apps Area
   * @returns {*}
   */
  goToMobileApps: function () {
    return SideBar.select(MenuAreas.MOBILE_APPS);
  },

  /**
   * Goes to specified menu item from Mobile Apps section.
   * @param menuItem
   * @returns {*}
   */
  goToMobileAppsMenuItem: function (menuItem) {
    switch (menuItem) {
      case Constants.mobileApps.platforms.ios:
        return this.goToIOS();
      case Constants.mobileApps.platforms.android:
        return this.goToAndroid();
      case Constants.mobileApps.platforms.windowsMobile:
        return this.goToWindowsMobile();
      default:
        throw 'API: Menu option does not exist (' + menuItem + ').';
    }
  },

  /**
   * Navigates to Mobile Apps > iOS
   */
  goToIOS: function () {
    return SideBar.select(MenuItems.MOBILE_APPS.IOS);
  },

  /**
   * Navigates to Mobile Apps > Android
   */
  goToAndroid: function () {
    return SideBar.select(MenuItems.MOBILE_APPS.ANDROID);
  },

  /**
   * Navigates to Mobile Apps > Windows Mobile
   */
  goToWindowsMobile: function () {
    return SideBar.select(MenuItems.MOBILE_APPS.WINDOWS_MOBILE);
  },

  /**
   * Navigates to Mobile Analytics > Traffic Levels
   */
  goToMATrafficLevels: function () {
    return SideBar.select(MenuItems.MOBILE_ANALYTICS.TRAFFIC_LEVELS);
  },

  /**
   * Navigates to Mobile Analytics > Top Reports
   */
  goToMATopReports: function () {
    return SideBar.select(MenuItems.MOBILE_ANALYTICS.TOP_REPORTS);
  },

  /**
   * Navigates to Mobile Analytics > Top Objects
   */
  goToMATopObjects: function () {
    return SideBar.select(MenuItems.MOBILE_ANALYTICS.TOP_OBJECTS);
  },

  /**
   * Navigates to Mobile Analytics > Traffic Distributions
   */
  goToMATrafficDistributions: function () {
    return SideBar.select(MenuItems.MOBILE_ANALYTICS.TRAFFIC_DISTRIBUTIONS);
  },

  /**
   * Navigates to Mobile Analytics > A/B Reports
   */
  goToMAABReports: function () {
    return SideBar.select(MenuItems.MOBILE_ANALYTICS.AB_REPORTS);
  },

  /**
   * Navigates to Web > Domains
   */
  goToDomains: function () {
    return SideBar.select(MenuItems.WEB.DOMAINS);
  },

  /**
   * Navigates to Web > SSL Certificates
   */
  goToSSLCertificates: function () {
    return SideBar.select(MenuItems.WEB.SSL_CERTIFICATES);
  },

  /**
   * Navigates to Web > SSL Names
   */
  goToSSLNames: function () {
    return SideBar.select(MenuItems.WEB.SSL_NAMES);
  },
  /**
   * Navigates to Web > WAF Rules
   */
  goToWAFRules: function () {
    return SideBar.select(MenuItems.WEB.WAF_RULES);
  },
  /**
   * Navigates to Security Analytics > WAF Analytics
   */
  goToWAFAnalytics: function () {
    return SideBar.select(MenuItems.SECURITY_ANALYTICS.WAF_ANALYTICS);
  },
  /**
   * Navigates to Security Analytics > WAF Events
   */
  goToWAFEvents: function () {
    return SideBar.select(MenuItems.SECURITY_ANALYTICS.WAF_EVENS);
  },
  /**
   * Navigates to Security Analytics > WAF Heatmaps
   */
  goToWAFHeatmaps: function () {
    return SideBar.select(MenuItems.SECURITY_ANALYTICS.WAF_HEAT_MAPS);
  },
  /**
   * Navigates to Web > Staging Environment
   */
  goToStagingEnvironment: function () {
    return SideBar.select(MenuItems.WEB.STAGING_ENVIRONMENT);
  },

  /**
   * Navigates to Web > Purge Cache
   */
  goToPurgeCache: function () {
    return SideBar.select(MenuItems.WEB.PURGE_CACHE);
  },

  /**
   * Navigates to Web > Upload Config
   */
  goToUploadConfig: function () {
    return SideBar.select(MenuItems.WEB.UPLOAD_CONFIG);
  },

  /**
   * Navigates to Web Analytics > Proxy Traffic
   */
  goToWAProxyTraffic: function () {
    return SideBar.select(MenuItems.WEB_ANALYTICS.PROXY_TRAFFIC);
  },

  /**
   * Navigates to Web Analytics > Top Reports
   */
  goToWATopReports: function () {
    return SideBar.select(MenuItems.WEB_ANALYTICS.TOP_REPORTS);
  },

  /**
   * Navigates to Web Analytics > Top Objects
   */
  goToWATopObjects: function () {
    return SideBar.select(MenuItems.WEB_ANALYTICS.TOP_OBJECTS);
  },

  /**
   * Navigates to Web Analytics > FBT Reports
   */
  goToWAFBTReports: function () {
    return SideBar.select(MenuItems.WEB_ANALYTICS.FBT_REPORTS);
  },

  /**
   * Navigates to Web Analytics > ImageEngine
   */
  goToImageEngine: function () {
    return SideBar.select(MenuItems.WEB_ANALYTICS.IMAGE_ENGINE);
  },


  /**
   * Navigates to Web Analytics > Traffic Heatmaps
   */
  goToWATrafficHeatmaps: function () {
    return SideBar.select(MenuItems.WEB_ANALYTICS.TRAFFIC_HEAT_MAPS);
  },

  /**
   * Navigates to Web Analytics > RTT Heatmaps
   */
  goToWARTTHeatmaps: function () {
    return SideBar.select(MenuItems.WEB_ANALYTICS.RTT_HEAT_MAPS);
  },

  /**
   * Navigates to DNS Service > DNS Analytics
   */
  goToDNSAnalytics: function () {
    return SideBar.select(MenuItems.DNS_SERVICE.DNS_ANALYTICS);
  },

  /**
   * Navigates to DNS Service > DNS Zones
   */
  goToDNSZones: function () {
    return SideBar.select(MenuItems.DNS_SERVICE.DNS_ZONES);
  },

  /**
   * Navigates to DNS Service > Monitors
   */
  goToMonitors: function () {
    return SideBar.select(MenuItems.DNS_SERVICE.MONITORS);
  },

  /**
   * Navigates to DNS Service > Data Sources
   */
  goToDataSources: function () {
    return SideBar.select(MenuItems.DNS_SERVICE.DATA_SOURCES);
  },

  /**
   * Navigates to Admin > Users
   */
  goToUsers: function () {
    return SideBar.select(MenuItems.ADMIN.USERS);
  },

  /**
   * Navigates to Admin > Accounts
   */
  goToAccounts: function () {
    return SideBar.select(MenuItems.ADMIN.ACCOUNTS);
  },

  /**
   * Navigates to Admin > API Keys
   */
  goToAPIKeys: function () {
    return SideBar.select(MenuItems.ADMIN.API_KEYS);
  },

  /**
   * Navigates to Admin > Log Shipping
   */
  goToLogShipping: function () {
    return SideBar.select(MenuItems.ADMIN.LOG_SHIPPING);
  },

  /**
   * Navigates to Admin > Update Password
   */
  goToUpdatePassword: function () {
    return SideBar.select(MenuItems.ADMIN.UPDATE_PASSWORD);
  },

  /**
   * Navigates to Admin > Security Settings
   */
  goToSecuritySettings: function () {
    return SideBar.select(MenuItems.ADMIN.SECURITY_SETTINGS);
  },
  /**
   * Navigates to Admin > CDN IP Blocks
   */
  goToCDNIPBlocks: function() {
    return SideBar.select(MenuItems.ADMIN.CDN_IP_BLOCKS);
  },
  /**
   * Navigates to Admin > Activity Log
   */
  goToActivityLog: function () {
    return SideBar.select(MenuItems.ADMIN.ACTIVITY_LOG);
  },

  /**
   * Navigates to Billing > Usage Report
   */
  goToUsageReport: function () {
    return SideBar.select(MenuItems.BILLING.USAGE_REPORT);
  },

  /**
   * Navigates to Billing > Account Profile
   */
  goToAccountProfile: function () {
    return SideBar.select(MenuItems.BILLING.ACCOUNT_PROFILE);
  },

  /**
   * Navigates to Billing > Change Billing Plan
   */
  goToChangeBillingPlan: function () {
    return SideBar.select(MenuItems.BILLING.CHANGE_BILLING_PLAN);
  },

  /**
   * Navigates to Billing > Billing Statements
   */
  goToBillingStatements: function () {
    return SideBar.select(MenuItems.BILLING.BILLING_STATEMENTS);
  },

  /**
   * Navigates to Support Area
   */
  goToSupport: function () {
    return SideBar.select(MenuAreas.SUPPORT);
  },

  /**
   * Navigates to Support > API Documentation
   */
  goToAPIDocumentation: function () {
    return SideBar.select(MenuItems.SUPPORT.API_DOCUMENTATION);
  },

  /**
   * Navigates to Support > Knowledge Base
   */
  goToKnowledgeBase: function () {
    return SideBar.select(MenuItems.SUPPORT.KNOWLEDGE_BASE);
  },

  /**
   * Navigates to Support > Open Ticket
   */
  goToOpenTicket: function () {
    return SideBar.select(MenuItems.SUPPORT.OPEN_TICKET);
  },

  /**
   * Navigates to Support > Network Status
   */
  goToNetworkStatus: function () {
    return SideBar.select(MenuItems.SUPPORT.NETWORK_STATUS);
  },
};

module.exports = NavHelper;
