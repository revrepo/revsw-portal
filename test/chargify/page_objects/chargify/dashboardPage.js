var config = require('config');
var _url = config.get('url_site_revapm');

module.exports = {
  url: _url+'/dashboard',
  elements:{
    linkToSubscription:{
      selector: 'a[href="'+_url+'/subscriptions"]'
    }
  }
};
