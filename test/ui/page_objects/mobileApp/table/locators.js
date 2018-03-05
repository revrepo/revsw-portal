/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2018] Rev Software, Inc.
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

var tableLocators = {
  header: {
    css: 'table thead tr'
  },
  rows: {
    repeater: 'item in filteredRecords'
  }
};

var headerLocators = {
  name: {
    css: 'th:nth-of-type(1) a'
  },
  platform: {
    css: 'th:nth-of-type(2) a'
  },
  version: {
    css: 'th:nth-of-type(3) a'
  },
  lastUpdate: {
    css: 'th:nth-of-type(4) a'
  },
  sdkKey: {
    css: 'th:nth-of-type(5)'
  },
  status: {
    css: 'th:nth-of-type(6)'
  },
  actions: {
    css: 'th:nth-of-type(7)'
  },
  account: {
    css: 'th:nth-of-type(8) a'
  },
  sortorder: {
    name: {
      css: 'th:nth-of-type(1) .sortorder'
    },
    platform: {
      css: 'th:nth-of-type(2) .sortorder'
    },
    version: {
      css: 'th:nth-of-type(3) .sortorder'
    },
    lastUpdate: {
      css: 'th:nth-of-type(4) .sortorder'
    },
    account: {
      css: 'th:nth-of-type(8) .sortorder'
    }
  }
};

var rowLocators = {
  name: {
    css: 'td:nth-of-type(1)',
    links: {
      css: 'a'
    }
  },
  platform: {
    css: 'td:nth-of-type(2)'
  },
  version: {
    css: 'td:nth-of-type(3)'
  },
  lastUpdate: {
    css: 'td:nth-of-type(4)'
  },
  sdkKey: {
    css: 'td:nth-of-type(5)'
  },
  status: {
    css: 'td:nth-of-type(6)',
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
            css: 'i:nth-of-type(2).glyphicon-ok-circle.text-success'
          },
          modified: {
            css: 'i:nth-of-type(2).glyphicon-ok-circle.text-primary'
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
    css: 'td:nth-of-type(7)',
    buttons: {
      pencil: {
        css: '.glyphicon.glyphicon-pencil'
      },
      cog: {
        css: '.glyphicon.glyphicon-cog'
      },
      trash: {
        css: '.glyphicon.glyphicon-trash'
      },
      stats: {
        css: '.glyphicon.glyphicon-stats'
      },
      book: {
        css: '.glyphicon.glyphicon-book'
      }
    }
  },
  account: {
    css: 'td:nth-of-type(8) a'
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};
