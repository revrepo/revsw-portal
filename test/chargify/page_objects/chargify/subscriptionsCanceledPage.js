var config = require('config');
var _url = config.get('url_site_revapm');

var subscriptionCommands = {
  getFirstListRow: function(cb) {
    this.api.pause(1000);
    return this.api.element('tr:first-child td.subscriber a').click();
  },
  clickFirstCustomer: function() {
    this.api.pause(1000);
    return this.click('@firstRow');
  }
};

module.exports = {
  // NOTE: open page with filter parameters
  url: function() {
    return _url + '/subscriptions?utf8=✓&start_date=&end_date=&date_field=current_period_ends_at&product=&state=canceled&q=&commit=Filter';
  },
  commands: [subscriptionCommands],
  elements: {
    subscriptionsList: {
      selector: '#subscriptions-list'
    },
    filteredAmount: {
      selector: '#filtered-amount'
    },
    firstRow: {
      selector: 'tr:first-child td.subscriber a'
    }
  }
};
