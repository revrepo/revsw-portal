var config = require('config');
var _url = config.get('url_app_chargify');

module.exports = {
  url: _url + '/login.html',
  elements: {
    username: {
      selector: 'input[name="user_session[login]"]'
    },
    password: {
      selector: 'input[name="user_session[password]"]'
    },
    submit: {
      selector: 'input[name="commit"]'
    }
  }
};
