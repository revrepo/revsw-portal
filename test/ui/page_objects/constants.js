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

// # Constants

// This object stores constant values that are used widely in the application.
//
// These values could be:
//  * Labels
//  * URL Hash fragment
//  * Others
var Constants = {
  hashFragments: {
    users: '#/users',
    domains: {
      list: '#/domains',
      new: '#/domains/new'
    },
    profile: '#/profile'
  },
  header: {
    appMenu: {
      ACCOUNT_SETTINGS: 'Account Settings',
      ANALYTICS: 'Analytics',
      HELP_SUPPORT: 'Help/Support',
      WEB: 'Web'
    },
    userMenu: {
      UPDATE_PASSWORD: 'Update password',
      SECURITY_SETTINGS: 'Security settings',
      LOGOUT: 'Logout'
    }
  },
  sideBar: {
    menu: {
      USERS: 'Users',
      UPDATE_PASSWORD: 'Update Password',
      SECURITY_SETTINGS: 'Security Settings',
      ACTIVITY_LOG: 'Activity Log'
    },
    analytics: {
      PROXY_TRAFFIC: 'Proxy Traffic',
      TOP_REPORTS: 'Top Reports',
      TOP_OBJECTS: 'Top Objects',
      FBT_REPORTS: 'FBT Reports',
      TRAFFIC_HEATMAPS: 'Traffic Heatmaps',
      RTT_HEATMAPS: 'RTT Heatmaps'
    }
  },
  user: {
    roles: {
      ADMIN: 'admin',
      USER: 'user'
    },
    accessControls: {
      DASHBOARD: 'Dashboard',
      REPORTS: 'Reports',
      CONFIGURE: 'Configure',
      TEST: 'Test',
      READ_ONLY: 'Read only'
    }
  },
  domain: {
    qa: {
      NAME: 'qa-api-test-domain.revsw.net'
    },
    roles: {
      ADMIN: 'admin',
      USER: 'user'
    },
    accessControls: {
      DASHBOARD: 'Dashboard',
      REPORTS: 'Reports',
      CONFIGURE: 'Configure',
      TEST: 'Test',
      READ_ONLY: 'Read only'
    }
  },
  proxyTraffic: {
    TITLE: 'Proxy Traffic Reports',
    BANDWIDTH_USAGE: 'Bandwidth Usage',
    TOTAL_REQUESTS: 'Total Requests',
    HTTP_HTTPS_HITS: 'HTTP/HTTPS Hits',
    HTTP_STATUS_CODE_HITS: 'HTTP Status Code Hits',
    REQUEST_STATUS: 'Success/Failure Request Status',
    EDGE_CACHE_EFFICIENCY_HITS: 'Edge Cache Efficiency Hits'
  },
  topReports: {
    TITLE: 'Top Proxy Traffic Reports',
    EDGE_CACHE_RATIO: 'Edge Cache Hit/Miss Ratio',
    HTTP_STATUS_CODES_RATIO: 'HTTP Status Codes Ratio',
    HTTP_REQUESTS_RATIO: 'HTTP/HTTPS Requests Ratio',
    TOP_10_COUNTRIES: 'Top 10 Countries',
    HTTP_METHODS: 'HTTP Methods',
    TOP_10_CONTENT_TYPES: 'Top 10 HTTP Content Types',
    TOP_10_OS: 'Top 10 OS',
    TOP_10_DEVICES: 'Top 10 Devices',
    QUIC_RATIO: 'QUIC/Non-QUIC Ratio',
    HTTP2_RATIO: 'H2/H2C/Non-HTTP2 Ratio'
  },
  topObjects: {
    TITLE: 'Top Objects Reports',
    TOP_MOST_REQUESTED_OBJECTS: 'Top Most Requested Objects',
    TOP_REFERERS: 'Top Referers',
    TOP_EDGE_CACHE_MISSES: 'Top Edge Cache Misses',
    TOP_404_NOT_FOUND_OBJECTS: 'Top \'404 Not Found\' Objects',
    TOP_OBJECTS_WITH_5XX_ERROR_CODES: 'Top Objects with 5XX Error Codes'
  },
  fbtReports: {
    TITLE: 'First Byte Time Reports',
    AVERAGE_FBT: 'Average FBT',
    FBT_VALUES_DISTRIBUTION: 'FBT values distribution',
    FBT_HEATMAP: 'FBT heatmap'
  },
  trafficHeatmaps: {
    TITLE: 'Global Traffic Heatmaps',
    HITS_HEATMAP: 'Hits Heatmap',
    GBT_HEATMAP: 'GBT Heatmap'
  },
  rttHeatmaps: {
    TITLE: 'Global Last Mile RTT Heatmap'
  }
};

module.exports = Constants;
