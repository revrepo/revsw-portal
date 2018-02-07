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

var MenuAreas = require('./menuAreas');

var MenuItems = {
  MOBILE_APPS: {
    IOS: {
      id: 'side-menu-sub-item__apps-ios',
      area: MenuAreas.MOBILE_APPS
    },
    ANDROID: {
      id: 'side-menu-sub-item__apps-android',
      area: MenuAreas.MOBILE_APPS
    },
    WINDOWS_MOBILE: {
      id: 'side-menu-sub-item__apps-windows',
      area: MenuAreas.MOBILE_APPS
    }
  },
  MOBILE_ANALYTICS: {
    TRAFFIC_LEVELS: {
      linkText: 'Traffic Levels',
      area: MenuAreas.MOBILE_ANALYTICS
    },
    TOP_REPORTS: {
      linkText: 'Top Reports',
      area: MenuAreas.MOBILE_ANALYTICS
    },
    TOP_OBJECTS: {
      linkText: 'Top Objects',
      area: MenuAreas.MOBILE_ANALYTICS
    },
    TRAFFIC_DISTRIBUTIONS: {
      linkText: 'Traffic Distributions',
      area: MenuAreas.MOBILE_ANALYTICS
    },
    AB_REPORTS: {
      linkText: 'A/B Reports',
      area: MenuAreas.MOBILE_ANALYTICS
    }
  },
  WEB: {
    DOMAINS: {
      id: 'side-menu-sub-item__webApp-domains',
      area: MenuAreas.WEB
    },
    SSL_CERTIFICATES: {
      id: 'side-menu-sub-item__webApp-ssl_certs',
      area: MenuAreas.WEB
    },
    SSL_NAMES: {
      id: 'side-menu-sub-item__webApp-ssl_names',
      area: MenuAreas.WEB
    },
    WAF_RULES: {
      id: 'side-menu-sub-item__webApp-waf_rules',
      area: MenuAreas.WEB
    },
    STAGING_ENVIRONMENT: {
      id: 'side-menu-sub-item__webApp-staging-environment',
      area: MenuAreas.WEB
    },
    PURGE_CACHE: {
      id: 'side-menu-sub-item__webApp-cache',
      area: MenuAreas.WEB
    },
    UPLOAD_CONFIG: {
      linkText: 'Upload Config',
      area: MenuAreas.WEB
    }
  },
  WEB_ANALYTICS: {
    PROXY_TRAFFIC: {
      id: 'side-menu-sub-item__reports-proxy',
      area: MenuAreas.WEB_ANALYTICS
    },
    TOP_REPORTS: {
      linkText: 'Top Reports',
      area: MenuAreas.WEB_ANALYTICS
    },
    TOP_OBJECTS: {
      linkText: 'Top Objects',
      area: MenuAreas.WEB_ANALYTICS
    },
    FBT_REPORTS: {
      linkText: 'FBT Reports',
      area: MenuAreas.WEB_ANALYTICS
    },
    TRAFFIC_HEAT_MAPS: {
      linkText: 'Traffic Heatmaps',
      area: MenuAreas.WEB_ANALYTICS
    },
    RTT_HEAT_MAPS: {
      linkText: 'RTT Heatmaps',
      area: MenuAreas.WEB_ANALYTICS
    },
    IMAGE_OPTIMIZATION: {
      linkText: 'ImageEngine',
      area: MenuAreas.WEB_ANALYTICS
    }
  },
  SECURITY_ANALYTICS:{
    WAF_ANALYTICS:{
      linkText: 'WAF Analytics',
      area: MenuAreas.SECURITY_ANALYTICS
    },
    WAF_EVENS:{
      linkText: 'WAF Events',
      area: MenuAreas.SECURITY_ANALYTICS
    },
    WAF_HEAT_MAPS: {
      linkText: 'WAF Heatmaps',
      area: MenuAreas.SECURITY_ANALYTICS
    }
  },
  DNS_SERVICE: {
    DNS_ZONES: {
      linkText: 'DNS Zones',
      area: MenuAreas.DNS_SERVICE
    },
    MONITORS: {
      linkText: 'Monitors',
      area: MenuAreas.DNS_SERVICE
    },
    DATA_SOURCES: {
      linkText: 'Data Sources',
      area: MenuAreas.DNS_SERVICE
    },
    DNS_ANALYTICS:{
      linkText: 'DNS Analytics',
      area: MenuAreas.DNS_SERVICE
    }
  },
  ADMIN: {
    USERS: {
      linkText: 'Users',
      area: MenuAreas.ADMIN
    },
    ACCOUNTS: {
      linkText: 'Accounts',
      area: MenuAreas.ADMIN
    },
    API_KEYS: {
      linkText: 'API Keys',
      area: MenuAreas.ADMIN
    },
    LOG_SHIPPING: {
      linkText: 'Log Shipping',
      area: MenuAreas.ADMIN
    },
    UPDATE_PASSWORD: {
      linkText: 'Update Password',
      area: MenuAreas.ADMIN
    },
    SECURITY_SETTINGS: {
      linkText: 'Security Settings',
      area: MenuAreas.ADMIN
    },
    CDN_IP_BLOCKS: {
      id: 'side-menu-sub-item__cdn-ip-bloks',
      area: MenuAreas.ADMIN
    },
    ACTIVITY_LOG: {
      linkText: 'Activity Log',
      area: MenuAreas.ADMIN
    }
  },
  BILLING: {
    USAGE_REPORT: {
      linkText: 'Usage Report',
      area: MenuAreas.BILLING
    },
    ACCOUNT_PROFILE: {
      linkText: 'Account Profile',
      area: MenuAreas.BILLING
    },
    CHANGE_BILLING_PLAN: {
      linkText: 'Change Billing Plan',
      area: MenuAreas.BILLING
    },
    BILLING_STATEMENTS: {
      linkText: 'Billing Statements',
      area: MenuAreas.BILLING
    }
  },
  AZURE_MARKETPLACE: {
    SUBSCRIPTIONS: {
      linkText: 'Subscriptions',
      area: MenuAreas.AZURE_MARKETPLACE
    },
    RESOURCES_PER_SUBSCRIPTION: {
      linkText: 'Resources Per Subscription',
      area: MenuAreas.AZURE_MARKETPLACE
    },
    RESOURCES: {
      linkText: 'Resources',
      css: 'a[ui-sref="index.azureMarketplace.resources"]',
      area: MenuAreas.AZURE_MARKETPLACE
    }
  },
  SUPPORT: {
    API_DOCUMENTATION: {
      linkText: 'API Documentation',
      area: MenuAreas.SUPPORT
    },
    KNOWLEDGE_BASE: {
      linkText: 'Knowledge Base',
      area: MenuAreas.SUPPORT
    },
    OPEN_TICKET: {
      linkText: 'Open Ticket',
      area: MenuAreas.SUPPORT
    },
    NETWORK_STATUS: {
      linkText: 'Network Status',
      area: MenuAreas.SUPPORT
    }
  }
};

module.exports = MenuItems;
