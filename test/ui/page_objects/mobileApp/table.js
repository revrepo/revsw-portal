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

// # Apps List Table Page Object

// This `Apps List` Page Object abstracts all operations or actions that a
// common user could do in the Apps List page the Portal app/site.
var AppsListTable = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: '.container-fluid .row',
    panelHeading: {
      css: '.col-md-12 .panel .panel-heading',
      pullLeft: '.pull-left',
      pullRight: '.pull-right'
    },
    panelBody: '.col-md-12 .panel .panel-body',
    tables: {
      appsList: {
        repeater: 'item in filteredRecords'
      }
    },
    buttons: {
      stagingStatus: {
        css: '.glyphicon.glyphicon-ok-sign'
      },
      globalStatus: {
        css: '.glyphicon.glyphicon-ok-circle'
      },
      editApp: {
        css: '.glyphicon.glyphicon-pencil'
      },
      advancedEdit: {
        css: '.glyphicon.glyphicon-cog'
      },
      deleteApp: {
        css: '.glyphicon.glyphicon-trash'
      },
      stats: {
        css: '.glyphicon.glyphicon-stats'
      },
      previousVersions: {
        css: '.glyphicon.glyphicon-book'
      }
    },
    links: {
      name: {
        css: '[ng-click=\"order(\'app_name\')\"]'
      },
      platform: {
        css: '[ng-click=\"order(\'app_platform\')\"]'
      },
      version: {
        css: '[ng-click=\"order(\'last_app_published_version\')\"]'
      },
      lastUpdate: {
        css: '[ng-click=\"order(\'updated_at\')\"]'
      }
    },
    pagination: {
      first: {
        css: '[ng-click=\"goToPage(1)\"]'
      },
      last: {
        css: '[ng-click=\"goToPage(page.pages.length)\"]'
      },
      next: {
        css: '[ng-click=\"nextPage()\"]'
      },
      previous: {
        css: '[ng-click=\"prevPage()\"]'
      }
    }
  },

  // ## Helper Methods

  /**
   * ### AppsListTable.getFirstRow()
   *
   * Gets the first row of `Apps List` from the table element per page.
   *
   * @returns {Promise}
   */
  getFirstRow: function() {
    return {
      name: this.getName().getText(),
      platform: this.getPlatform().getText(),
      version: this.getVersion().getText(),
      lastUpdate: this.getLastUpdate().getText(),
      sdkKey: this.getSDKKey().getText(),
      stagingStatus: this.getStagingStatus().getAttribute('uib-tooltip'),
      globalStatus: this.getGlobalStatus().getAttribute('uib-tooltip')
    };
  }
};

module.exports = AppsListTable;
