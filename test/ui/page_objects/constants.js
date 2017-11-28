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
    profile: '#/profile',
    dashboard: '#/dashboard',
    admin: {
      users: '#/users',
      companies: '#/companies',
      apiKeys: '#/keys',
      activityLog: '#/activitylog'
    },
    mobileApps: '#/apps/',
    sslCerts: '#/ssl_certs',
    accountResources: '#/accountresources'
  },
  header: {
    appMenu: {
      ACCOUNT_SETTINGS: 'Admin',
      WEB_ANALYTICS: 'Web Analytics',
      HELP_SUPPORT: 'Support',
      WEB: 'Web'
    },
    userMenu: {
      UPDATE_PASSWORD: 'Update Password',
      SECURITY_SETTINGS: 'Security Settings',
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
    mobileApps: {
      MOBILE_APPS: 'Mobile Apps',
      IOS: 'iOS',
      ANDROID: 'Android',
      WINDOWS_MOBILE: 'Windows Mobile'
    },
    web: {
      DOMAINS: 'Domains',
      PURGE_CACHE: 'Purge Cache',
      SSL_CERTIFICATES: 'SSL Certificates',
      SSL_NAMES: 'SSL Names',
      STAGING_ENV: 'Staging Env.'
    },
    analytics: {
      PROXY_TRAFFIC: 'Proxy Traffic',
      TOP_REPORTS: 'Top Reports',
      TOP_OBJECTS: 'Top Objects',
      FBT_REPORTS: 'FBT Reports',
      TRAFFIC_HEATMAPS: 'Traffic Heatmaps',
      RTT_HEATMAPS: 'RTT Heatmaps'
    },
    admin: {
      ADMIN: 'Admin',
      USERS: 'Users',
      ACCOUNTS: 'Accounts',
      API_KEYS: 'API Keys',
      UPDATE_PASSWORD: 'Update Password',
      SECURITY_SETTINGS: 'Security Settings',
      ACTIVITY_LOG: 'Activity Log',
      LOG_SHIPPING: 'Log Shipping'
    },
    billing: {
      BILLING: 'Billing',
      ACCOUNT_PROFILE: 'Account Profile',
      CHANGE_BILLING_PLAN: 'Change Billing Plan',
      BILLING_STATEMENTS: 'Billing Statements',
      USAGE_REPORT: 'Usage Report'
    },
    helpSupport: {
      CUSTOMER_SUPPORT: 'Open Ticket',
      API_DOCUMENTATION: 'API Documentation',
      KNOWLEDGE_BASE: 'Knowledge Base',
      NETWORK_STATUS: 'Network Status'
    },
    dnsService: {
      DNS_SERVICE: 'DNS Service',
      DNS_ZONES: 'DNS Zones',
      DNS_ANALYTICS: 'DNS Analytics'
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
    name: 'qa-admin-10-portal-ui-test.com',
    roles: {
      ADMIN: 'admin',
      USER: 'user'
    },
    accessControls: {
      DASHBOARD: 'Dashboard',
      REPORTS: 'Reports',
      CONFIGURE: 'Configure',
      TEST: 'Test',
      READ_ONLY: 'Read Only'
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
  imageOptimization: {
    TITLE: 'Image Optimization Analytics',
    PERFORMANCE_IMPROVEMENT: 'Performance Improvement By Image Optimization',
    BANDWIDTH_SAVED: 'Bandwidth Saved By Image Optimization',
    FORMAT_CHANGES: 'Image Format Changes',
    RESOLUTION_CHANGES: 'Image Resolution Changes'
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
    TOP_EDGE_CACHE_HITS: 'Top Edge Cache Hits',
    TOP_EDGE_CACHE_MISSES: 'Top Edge Cache Misses',
    TOP_404_NOT_FOUND_OBJECTS: 'Top \'404 Not Found\' Objects',
    TOP_OBJECTS_WITH_5XX_ERROR_CODES: 'Top Objects With 5XX Error Codes',
    TOP_FAILED: 'Top Objects With Unsuccessful Completion Status',
    TOP_SLOWEST_FBT: 'Objects With Slowest FBT',
    TOP_SLOWEST_DOWNLOAD_TIME: 'Objects With Slowest Download Time'
  },
  fbtReports: {
    TITLE: 'First Byte Time Reports',
    AVERAGE_FBT: 'Average FBT',
    FBT_VALUES_DISTRIBUTION: 'FBT Values Distribution Histogram',
    FBT_HEATMAP: 'FBT Heatmap'
  },
  trafficHeatmaps: {
    TITLE: 'Global Traffic Heatmaps',
    HITS_HEATMAP: 'Hits Heatmap',
    GBT_HEATMAP: 'GBT Heatmap'
  },
  rttHeatmaps: {
    TITLE: 'Global Last Mile RTT Heatmap'
  },
  selectedItems: {
    billing: {
      SELECTED_API_QA_ACCOUNT: 'API QA Account'
    }
  },
  alertMessages: {
    // @see revsw-cds/lib/handlers/appHandlers.js
    app: {
      MSG_FAIL_LIST: 'Failed to retrieve a list of mobile applications',
      MSG_FAIL_ITEM: 'Failed to retrieve application details',
      MSG_FAIL_SDK_ITEM: 'Failed to retrieve SDK configuration API service details',
      MSG_FAIL_STATS_ITEM: 'Failed to retrieve SDK stats reporting API service details',
      MSG_FAIL_SERVER_ITEM: 'Failed to retrieve server group details',
      MSG_FAIL_UPDATE: 'Failed to update application details',
      MSG_FAIL_ADD: 'Failed to add new application record',
      MSG_FAIL_DELETE: 'Failed to delete application record',
      MSG_SUCCESS_ADD: 'The application record has been successfully created',
      MSG_SUCCESS_VERIFY: 'The configuration has been successfully verified',
      MSG_SUCCESS_UPDATE: 'The application record has been successfully updated',
      MSG_SUCCESS_DELETE: 'The application has been successfully deleted',
      MSG_NOT_FOUND: 'Application not found',
      MSG_SDK_NOT_FOUND: 'SDK configuration API service not found',
      NSG_STATS_NOT_FOUND: 'SDK stats reporting API service not found',
      MSG_SERVER_NOT_FOUND: 'Server group not found',
      MSG_ALREADY_EXISTS: 'The application name and platform is' +
        ' already registered in the system',
    },
    apiKeys: {
      MSG_SUCCESS_UPDATE: 'Successfully updated the API key'
    },
    users: {
      MSG_SUCCESS_ADD: 'Successfully created new user',
      MSG_SUCCESS_UPDATE: 'Successfully updated the user',
      MSG_SUCCESS_DELETE: 'Successfully deleted the user',
      MSG_SUCCESS_UPDATE_PASSWORD: 'Successfully updated the password',
      MSG_FAIL_ADD_EMAIL_EXISTS: 'The email address is already used by another user',
      MSG_SUCCESS_ENABLE_2FA: 'Successfully enabled two factor authentication',
      MSG_INCORRECT_OTP_2FA: 'The supplied one time password is incorrect',
      MSG_INVALID_OTP_2FA: 'child "oneTimePassword" fails because',
      MSG_SUCCESS_DISABLE_2FA: 'Successfully disabled two factor authentication',
      MSG_WRONG_USERNAME_PASSWORD: 'Wrong username or password'
    },
    accounts: {
      MSG_SUCCESS_ADD: 'Successfully created new account',
      MSG_SUCCESS_UPDATE: 'Successfully updated the account',
      MSG_SUCCESS_DELETE: 'Successfully deleted the account',
    },
    domains: {
      MSG_SUCCESS_ADD: 'Successfully created new domain configuration',
      MSG_SUCCESS_VERIFY: 'The configuration has been successfully verified',
      MSG_SUCCESS_UPDATE: 'Successfully saved the domain configuration',
      MSG_SUCCESS_DELETE: 'The domain has been scheduled for removal',
      MSG_FAIL_VERIFY: 'Failed to verify domain configuration',
      MSG_FAIL_ADD_DUPLICATE_NAME: 'The domain name is already registered in the system',
      MSG_FAIL_RO_USER_CANNOT_ADD: 'Access denied. Do you have a read-only user account?'
    },
    sslCerts: {
      MSG_FAIL_DELETE: 'The SSL certificate is in use by active domain(s) ' +
        '- please update the domain(s) before removing the SSL certificate'
    },
    wafRules: {
      MSG_SUCCESS_ADD: 'The WAF rule has been successfully created'
    },
    logShipping: {
      MSG_SUCCESS_ADD: 'Successfully created a new log shipping job',
      MSG_SUCCESS_UPDATE: 'Successfully updated the log shipping job',
      MSG_SUCCESS_DELETE: 'Successfully deleted the log shipping job',
      MSG_SUCCESS_PLAY: 'Successfully updated the log shipping job',
      MSG_SUCCESS_PAUSE: 'Successfully updated the log shipping job',
      MSG_SUCCESS_STOP: 'Successfully updated the log shipping job'
    }
  },

  backgroundColor: {
    revapm: 'rgba(255, 140, 0, 0.7)',
    nuubit: 'rgba(0, 48, 86, 1)'
  },

  footerMessage: 'Not sure which plan to choose? Talk to an expert',

  baseUrlNuubit: 'https://testsjc20-portal-nuubit.revsw.net/#/login',
  nuubitHomePage: 'https://www.nuubit.com/',

  // TODO: Everything above this line needs revision/clean up

  mobileApps: {
    platforms: {
      ios: 'iOS',
      android: 'Android',
      windowsMobile: 'Windows_Mobile'
    }
  },

  mobileAnalytics: {
    imageOptimizationPage: {
      filterResults: {
        attrDelay: 'ngFilters.delay',
        attrCountry: 'ngFilters.country ',
        attrOS: 'ngFilters.os ',
        attrDevice: 'ngFilters.device ',
        attrBrowser: 'ngFilters.browser '
      }
    }
  },

  azureMarketplace: {
    subscriptionsPage: {
      filterResults: {
        attrSubsID: 'filter.predicate === \'subscription_id\'',
        attrCreated: 'filter.predicate === \'created_at\'',
        attrUpdated: 'filter.predicate === \'updated_at\'',
        attrSubState: 'filter.predicate === \'subscription_state\''
      }
    }
  },

  localStorageToClear: [
    'ngStorage-activityFilterState',
    'ngStorage-user',
    'ngStorage-selectedUser',
    'ngStorage-selectedCompany',
    'ngStorage-selectedDomain'
  ],

  VENDORS: [
    {
      NAME: 'revapm',
      LOGIN_URL: 'testsjc20-portal01.revsw.net',
      ACCOUNT: ['QA-TEST-COMPANY-REVAPM']
    },
    {
      NAME: 'nuubit',
      LOGIN_URL: 'testsjc20-portal-nuubit.revsw.net',
      ACCOUNT: ['QA-TEST-COMPANY-NUUBIT']
    },
    {
      NAME: 'hooli',
      LOGIN_URL: 'testsjc20-portal-hooli.revsw.net',
      ACCOUNT: ['QA-TEST-COMPANY-HOOLI']
    }
  ],
  DOMAIN_ENABLE_JSON_ATTRIBUTES: [
    ['bp_lua_enable_all'],
    ['co_lua_enable_all'],
    ['enable_ssl'],
    ['enable_origin_health_probe'],
    ['image_engine', 'enable_image_engine'],
    ['rev_component_bp', 'acl', 'enabled'],
    ['rev_component_bp', 'enable_waf'],
    ['rev_component_bp', 'enable_bot_protection'],
    ['rev_component_bp', 'custom_vcl', 'enabled']
  ],
  DOMAIN_DEFAULT_JSON: {
    /* jshint camelcase:false */
    '3rd_party_rewrite':
      {
        '3rd_party_root_rewrite_domains': '',
        '3rd_party_runtime_domains': '',
        '3rd_party_urls': '',
        enable_3rd_party_rewrite: false,
        enable_3rd_party_root_rewrite: false,
        enable_3rd_party_runtime_rewrite: false
      },
    domain_name: 'test-domain-1511077019750-portal-ui-test.com',
    proxy_timeout: 20,
    rev_component_bp:
      {
        enable_quic: false,
        acl: {
          acl_rules: [{
            country_code: '',
            header_name: '',
            header_value: '',
            host_name: '',
            subnet_mask: ''
          }], action: 'deny_except', enabled: false
        },
        block_crawlers: false,
        cache_bypass_locations: [],
        caching_rules: [{
          browser_caching:
            {
              force_revalidate: false,
              new_ttl: 0,
              override_edge: false
            },
          cookies:
            {
              ignore_all: false,
              keep_or_ignore_list: [],
              list_is_keep: false,
              override: false,
              remove_ignored_from_request: false,
              remove_ignored_from_response: false
            },
          edge_caching:
            {
              new_ttl: 0,
              override_no_cc: false,
              override_origin: false
            },
          url:
            {
              is_wildcard: true,
              value: '**'
            },
          version: 1,
          enable_esi: false
        }],
        cdn_overlay_urls: [],
        enable_cache: true,
        enable_security: true,
        web_app_firewall: 'off'
      },
    rev_component_co:
      {
        css_choice: 'medium',
        enable_optimization: false,
        enable_rum: false,
        img_choice: 'medium',
        js_choice: 'medium',
        mode: 'moderate'
      },
    origin_secure_protocol: 'use_end_user_protocol',
    image_engine:
      {
        enable_image_engine: false,
        image_engine_token: '',
        image_engine_api_key: '',
        image_engine_origin_server: '',
        refresh_image_engine_configuration: false,
        custom_configuration_present: true
      },
    origin_server: 'test-domain-portal-ui-test.origin-server.com',
    origin_host_header: 'test-domain-portal-ui-test.origin-host-header.com',
    account_id: '55b6ff6a7957012304a49d04',
    tolerance: '3000',
    origin_server_location_id: '55a56fa6476c10c329a90741',
    cname: 'test-domain-1511077019750-portal-ui-test.com.revqa.net',
    published_domain_version: 1,
    last_published_domain_version: 1,
    enable_ssl: true,
    ssl_conf_profile: '571e9f7591dcb9f97a0c4841',
    ssl_cert_id: '',
    ssl_protocols: '',
    ssl_ciphers: '',
    ssl_prefer_server_ciphers: true,
    btt_key: '',
    bp_lua_enable_all: false,
    bp_lua: [],
    co_lua_enable_all: false,
    co_lua: [],
    id: ''
  },
  DOMAIN_UPDATED_JSON: {
    /* ignore hint because json objects are funky */
    /* jshint ignore:start */
    '3rd_party_rewrite': {
      '3rd_party_root_rewrite_domains': '',
      '3rd_party_runtime_domains': '',
      '3rd_party_urls': '',
      enable_3rd_party_rewrite: false,
      enable_3rd_party_root_rewrite: false,
      enable_3rd_party_runtime_rewrite: false
    }, proxy_timeout: 22,
    rev_component_bp: {
      enable_quic: true,
      acl: {
        acl_rules:
          [{
            country_code: '',
            header_name: '',
            header_value: '',
            host_name: '',
            subnet_mask: ''
          }],
        action: 'deny_except',
        enabled: true
      },
      block_crawlers: true,
      cache_bypass_locations: [],
      caching_rules:
        [{
          browser_caching:
            {
              force_revalidate: false,
              new_ttl: 0,
              override_edge: false
            },
          cookies:
            {
              ignore_all: false,
              keep_or_ignore_list: [],
              list_is_keep: false,
              override: false,
              remove_ignored_from_request: false,
              remove_ignored_from_response: false
            },
          edge_caching:
            {
              new_ttl: 0,
              override_no_cc: false,
              override_origin: false,
              query_string_keep_or_remove_list: []
            },
          url:
            {
              is_wildcard: true,
              value: '**'
            },
          version: 1,
          enable_esi: false,
          serve_stale: {
            enable: false,
            while_fetching_ttl: 8,
            origin_sick_ttl: 15
          }
        }],
      cdn_overlay_urls: [],
      enable_cache: true,
      enable_security: true,
      web_app_firewall: 'off',
      co_bypass_locations: ['TEST', 'TEST2'],
      enable_waf: true,
      waf: 'waf_actions',
      enable_bot_protection: true,
      bot_protection:
        [{
          location: '/botLocation',
          mode: 'monitor',
          call_type: 1,
          username_cookie_name: '',
          sessionid_cookie_name: '',
          bot_protection_id: '123'
        }],
      custom_vcl: {
        enabled: true,
        backends: [],
        recv: 'custom_vcl_recv',
        hit: '#',
        miss: 'custom_vcl_hit',
        deliver: 'custom_vcl_deliver',
        pass: '#',
        pipe: '#',
        hash: 'custom_vcl_hash',
        synth: '#',
        backend_response: 'custom_vcl_backend_response',
        backend_error: '#',
        backend_fetch: '#'
      }
    }, rev_component_co: {
      css_choice: 'medium',
      enable_optimization: false,
      enable_rum: true,
      img_choice: 'medium',
      js_choice: 'medium',
      mode: 'moderate',
      enable_decompression: true
    },
    origin_secure_protocol: "use_end_user_protocol",
    image_engine: {
      enable_image_engine: true,
      image_engine_token: "",
      image_engine_api_key: "",
      image_engine_origin_server: "",
      refresh_image_engine_configuration: false,
      custom_configuration_present: false
    },
    origin_server: "test-domain-portal-ui-test.origin-server.com",
    origin_host_header: "test-domain-portal-ui-test.origin-host-header.com",
    account_id: "55b6ff6a7957012304a49d04",
    tolerance: "3000",
    origin_server_location_id: "55a56fa6476c10c329a90741",
    domain_aliases: [],
    domain_wildcard_alias: "*.test-domain-1511082866342-portal-ui-test.com",
    enable_origin_health_probe: true,
    origin_health_probe: {
      HTTP_REQUEST: "GET / HTTP/1.1GET / HTTP/2",
      PROBE_TIMEOUT: 2,
      PROBE_INTERVAL: 3,
      HTTP_STATUS: 404
    },
    cname: "test-domain-1511082866342-portal-ui-test.com.revqa.net",
    domain_name: "test-domain-1511082866342-portal-ui-test.com",
    comment: "TEST",
    published_domain_version: 0,
    last_published_domain_version: 1,
    enable_ssl: true,
    ssl_conf_profile: '',
    ssl_cert_id: '',
    ssl_protocols: "TLSv1",
    ssl_ciphers: "ECDH",
    ssl_prefer_server_ciphers: true,
    btt_key: "",
    bp_lua_enable_all: true,
    bp_lua: [],
    co_lua_enable_all: true,
    co_lua: [],
    github_integration: {
      enable: false,
      github_url: "",
      github_personal_api_key: ""
    },
    id: ""
  },
  DOMAIN_UPDATED_DISABLED_JSON: {
    "3rd_party_rewrite":
      {
        "3rd_party_root_rewrite_domains": "",
        "3rd_party_runtime_domains": "",
        "3rd_party_urls": "",
        "enable_3rd_party_rewrite": false,
        "enable_3rd_party_root_rewrite": false,
        "enable_3rd_party_runtime_rewrite": false
      },
    "proxy_timeout": 20,
    "rev_component_bp": {
      "enable_quic": false,
      "acl": {
        "acl_rules":
          [{
            "country_code": "",
            "header_name": "",
            "header_value": "",
            "host_name": "",
            "subnet_mask": ""
          }],
        "action": "deny_except",
        "enabled": false
      },
      "block_crawlers": false,
      "cache_bypass_locations": [],
      "caching_rules":
        [{
          "browser_caching": {
            "force_revalidate": false,
            "new_ttl": 0,
            "override_edge": false
          },
          "cookies": {
            "ignore_all": false,
            "keep_or_ignore_list": [],
            "list_is_keep": false,
            "override": false,
            "remove_ignored_from_request": false,
            "remove_ignored_from_response": false
          },
          "edge_caching": {
            "new_ttl": 0,
            "override_no_cc": false,
            "override_origin": false,
            "query_string_keep_or_remove_list": []
          },
          "url": { "is_wildcard": true, "value": "**" },
          "version": 1,
          "enable_esi": false,
          "serve_stale": {
            "enable": false,
            "while_fetching_ttl": 8,
            "origin_sick_ttl": 15
          }
        }],
      "cdn_overlay_urls": [],
      "enable_cache": true,
      "enable_security": true,
      "web_app_firewall": "off",
      "co_bypass_locations": ["TEST", "TEST2"],
      "enable_waf": false,
      "waf": "waf_actions",
      "enable_bot_protection": false,
      "bot_protection":
        [{
          "location": "/botLocation",
          "mode": "monitor",
          "call_type": 1,
          "username_cookie_name": "",
          "sessionid_cookie_name": "",
          "bot_protection_id": "123"
        }],
      "custom_vcl": {
        "enabled": false,
        "backends": [],
        "recv": "custom_vcl_recv",
        "hit": "#",
        "miss": "custom_vcl_hit",
        "deliver": "custom_vcl_deliver",
        "pass": "#",
        "pipe": "#",
        "hash": "custom_vcl_hash",
        "synth": "#",
        "backend_response": "custom_vcl_backend_response",
        "backend_error": "#",
        "backend_fetch": "#"
      }
    },
    "rev_component_co": {
      "css_choice": "medium",
      "enable_optimization": false,
      "enable_rum": false,
      "img_choice": "medium",
      "js_choice": "medium",
      "mode": "moderate",
      "enable_decompression": true
    },
    "origin_secure_protocol": "use_end_user_protocol",
    "image_engine": {
      "enable_image_engine": false,
      "image_engine_token": "",
      "image_engine_api_key": "",
      "image_engine_origin_server": "",
      "refresh_image_engine_configuration": false,
      "custom_configuration_present": true
    },
    "origin_server": "test-domain-portal-ui-test.origin-server.com",
    "origin_host_header": "test-domain-portal-ui-test.origin-host-header.com",
    "account_id": "55b6ff6a7957012304a49d04",
    "tolerance": "3000",
    "origin_server_location_id": "55a56fa6476c10c329a90741",
    "domain_aliases": [],
    "enable_origin_health_probe": false,
    "origin_health_probe": {
      "HTTP_REQUEST": "GET / HTTP/1.1GET / HTTP/2",
      "PROBE_TIMEOUT": 2,
      "PROBE_INTERVAL": 3,
      "HTTP_STATUS": 404
    },
    "cname": "test-domain-1511089400304-portal-ui-test.com.revqa.net",
    "domain_name": "test-domain-1511089400304-portal-ui-test.com",
    "comment": "TEST",
    "published_domain_version": 0,
    "last_published_domain_version": 1,
    "enable_ssl": false,
    "ssl_conf_profile": "571e9f7591dcb9f97a0c4841",
    "ssl_cert_id": "5a10ac5fe4a8ad9a45efc966",
    "ssl_protocols": "TLSv1",
    "ssl_ciphers": "ECDH",
    "ssl_prefer_server_ciphers": true,
    "btt_key": "",
    "bp_lua_enable_all": false,
    "bp_lua": [],
    "co_lua_enable_all": false,
    "co_lua": [],
    "github_integration": {
      "enable": false,
      "github_url": "",
      "github_personal_api_key": ""
    },
    "id": ""
    /* jshint ignore:end */
  },
  DOMAIN_POLLING_INTERVAL: 3000,
  DOMAIN_POLLING_TIMEOUT: 180000,
  USAGE_REPORT_POLLING_INTERVAL: 10000,
  USAGE_REPORT_POLLING_TIMEOUT: 60000,
  AZURE_PORTAL_URL: 'https://portal.azure.com',
  PRODUCTION_PORTAL_URL: 'https://portal.nuubit.net'

};
module.exports = Constants;
