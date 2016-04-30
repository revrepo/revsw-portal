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

var tableHeaderLocators = {
  name: {
    css: 'th:nth-of-type(1) a'
  },
  cName: {
    css: 'th:nth-of-type(2) a'
  },
  lastUpdated: {
    css: 'th:nth-of-type(3) a'
  },
  status: {
    css: 'th:nth-of-type(4)'
  }
};

var tableRowLocators = {
  name: {
    css: 'td:nth-of-type(1)',
    links: {
      css: 'a'
    }
  },
  cName: {
    css: 'td:nth-of-type(2)'
  },
  lastUpdated: {
    css: 'td:nth-of-type(3)'
  },
  status: {
    css: 'td:nth-of-type(4)',
    icons: {
      staging: {
        css: 'i:nth-of-type(1)',
        type: {
          published: {
            css: 'i:nth-of-type(1).glyphicon-ok-sign'
          },
          error: {
            css: 'i:nth-of-type(1).glyphicon-remove'
          },
          inProgress: {
            css: 'i:nth-of-type(1).glyphicon-refresh'
          }
        }
      },
      global: {
        css: 'i:nth-of-type(2)',
        type: {
          published: {
            css: 'i:nth-of-type(2).glyphicon-ok-circle'
          },
          error: {
            css: 'i:nth-of-type(2).glyphicon-remove'
          },
          inProgress: {
            css: 'i:nth-of-type(2).glyphicon-refresh'
          }
        }
      }

    }
  },
  actions: {
    css: 'td:nth-of-type(5)',
    buttons: {
      pencil: {
        className: 'glyphicon-pencil'
      },
      cog: {
        className: 'glyphicon-cog'
      },
      trash: {
        className: 'glyphicon-trash'
      },
      stats: {
        className: 'glyphicon-stats'
      },
      book: {
        className: 'glyphicon-book'
      }
    }
  }
};

var TableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods
  this.getNameCell = function () {
    return this.rowEl.element(by.css(this.locators.name.css));
  };

  this.getNameLink = function () {
    return this.getNameCell().element(by.css(this.locators.name.links.css));
  };

  this.getCNameCell = function () {
    return this.rowEl.element(by.css(this.locators.cName.css));
  };

  this.getLastUpdatedCell = function () {
    return this.rowEl.element(by.css(this.locators.lastUpdated.css));
  };

  this.getStatusCell = function () {
    return this.rowEl.element(by.css(this.locators.status.css));
  };

  this.getStagingStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.staging.css));
  };

  this.getGlobalStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.global.css));
  };

  this.getName = function () {
    return this
      .getNameCell()
      .getText();
  };

  this.getCName = function () {
    return this
      .getCNameCell()
      .getText();
  };

  this.getLastUpdated = function () {
    return this
      .getLastUpdatedCell()
      .getText();
  };


  if (this.locators.actions && this.locators.actions.buttons.pencil) {

    this.getEditBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.pencil.className));
    };

    this.clickEdit = function () {
      return this
        .getEditBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.cog) {

    this.getConfigureBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.cog.className));
    };

    this.clickConfigure = function () {
      return this
        .getConfigureBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.trash) {

    this.getDeleteBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.trash.className));
    };

    this.clickDelete = function () {
      return this
        .getDeleteBtn()
        .click();
    };
  }


  if (this.locators.actions && this.locators.actions.buttons.stats) {

    this.getStatsBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.stats.className));
    };

    this.clickStats = function () {
      return this
        .getStatsBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.book) {

    this.getVersionsBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.book.className));
    };

    this.clickVersions = function () {
      return this
        .getVersionsBtn()
        .click();
    };
  }

};

var DomainTable = {

  locators: {
    header: {
      css: 'table thead tr'
    },
    rows: {
      repeater: 'item in filteredRecords'
    }
  },

  getHeaderEl: function () {
    return element(by.css(this.locators.header.css));
  },

  getHeader: function () {
    var header = this.getHeaderEl();
    return new TableRow(header, tableHeaderLocators);
  },

  getRows: function () {
    return element.all(by.repeater(this.locators.rows.repeater));
  },

  getFirstRow: function () {
    return this.getRow(0);
  },

  getRow: function (rowIndex) {
    var el = this
      .getRows()
      .get(rowIndex);
    return new TableRow(el, tableRowLocators);
  }
};

module.exports = DomainTable;
