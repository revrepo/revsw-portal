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

var Constants = require('./../constants');


var Permissions = {
  locators: {
    container: {
      css: 'div.permissions'
    },
    permissions: {
      readOnly: {
        model: 'model.permissions.read_only'
      },
      enforce2FA: {
        model: 'model.permissions.enforce_2fa'
      },
      portalLogin: {
        model: 'model.permissions.portal_login'
      },
      apiAccess: {
        model: 'model.permissions.API_access'
      },
      dashboards: {
        model: 'model.permissions.dashboards'
      },
      mobileApps: {
        model: 'model.permissions.mobile_apps.access',
        allowList: {
          model: 'model.permissions.mobile_apps.allow_list'
        },
        list: {
          model: 'model.permissions.mobile_apps.list'
        }
      },
      mobileAnalytics: {
        model: 'model.permissions.mobile_analytics.access',
        allowList: {
          model: 'model.permissions.mobile_analytics.allow_list'
        },
        list: {
          model: 'model.permissions.mobile_analytics.list'
        }
      },
      domains: {
        model: 'model.permissions.domains.access',
        allowList: {
          model: 'model.permissions.domains.allow_list'
        },
        list: {
          model: 'model.permissions.domains.list'
        }
      },
      cachePurge: {
        model: 'model.permissions.cache_purge.access',
        allowList: {
          model: 'model.permissions.cache_purge.allow_list'
        },
        list: {
          model: 'model.permissions.cache_purge.list'
        }
      },
      webAnalytics: {
        model: 'model.permissions.web_analytics.access',
        allowList: {
          model: 'model.permissions.web_analytics.allow_list'
        },
        list: {
          model: 'model.permissions.web_analytics.list'
        }
      },
      securityAnalytics: {
        model: 'model.permissions.security_analytics.access',
        allowList: {
          model: 'model.permissions.security_analytics.allow_list'
        },
        list: {
          model: 'model.permissions.security_analytics.list'
        }
      },
      dnsZones: {
        model: 'model.permissions.dns_zones.access',
        allowList: {
          model: 'model.permissions.dns_zones.allow_list'
        },
        list: {
          model: 'model.permissions.dns_zones.list'
        }
      },
      dnsAnalytics: {
        model: 'model.permissions.dns_analytics.access',
        allowList: {
          model: 'model.permissions.dns_analytics.allow_list'
        },
        list: {
          model: 'model.permissions.dns_analytics.list'
        }
      },
      accounts: {
        model: 'model.permissions.accounts.access',
        allowList: {
          model: 'model.permissions.accounts.allow_list'
        },
        list: {
          model: 'model.permissions.accounts.list'
        }
      },
      sslNames: {
        model: 'model.permissions.ssl_names'
      },
      wafRules: {
        model: 'model.permissions.waf_rules'
      },
      users: {
        model: 'model.permissions.users'
      },
      logshippingJobs: {
        model: 'model.permissions.logshipping_jobs'
      },
      usageReports: {
        model: 'model.permissions.usage_reports'
      },  
      billingStatements: {
        model: 'model.permissions.billing_statements'
      },
      sslCerts: {
        model: 'model.permissions.ssl_certs'
      },
      groups: {
        model: 'model.permissions.groups'
      },
      apiKeys: {
        model: 'model.permissions.API_keys'
      },
      activityLog: {
        model: 'model.permissions.activity_log'
      },
      accountProfile: {
        model: 'model.permissions.account_profile'
      },
      billingPlan: {
        model: 'model.permissions.billing_plan'
      },
    }
  },

  /**
   * Get the permission value of a certain type (dashboards, portal login, mobile apps etc..)
   * 
   * @param {String} type the type of permission
   * @returns {Boolean} true/false
   */
  getPermission: function (type) {
    var el = element(by.model(this.locators.permissions[type].model));
    if (!el) {
      throw new Error('Cant find permission');
    } else {
      return el.isSelected().then(function (val) {
        return val;
      });
    }
  },

  /**
   * Set a permission
   * 
   * @param {String} type the type of permission
   * @param {Boolean} value the value to set the permission
   * 
   */
  setPermission: function (type, value) {
    var el = element(by.model(this.locators.permissions[type].model));

    if (!el) {
      throw new Error('Cant find permission');
    } else {
      this.getPermission(type).then(function (val) {
        if (val !== value) {
          el.click();
        }
      });
    }
  }
};

module.exports = Permissions;
