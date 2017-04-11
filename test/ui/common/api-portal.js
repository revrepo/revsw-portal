module.exports = {
  accounts: {
    getOne: function (id) {
      console.log('api-portal', id)
      return browser.executeAsyncScript(function (callback) {
        var api = angular.injector(['revapm.Portal.Resources',
          'ngResource',
          'revapm.Portal.Shared',
          'revapm.Portal.Config'
        ]).get('Companies');
        api.get({
          id: id
        }, function (data) {
          console.log(data)
          callback(data);
        });
      })
    },
    getAll: function (id) {
      return browser.executeAsyncScript(function (callback) {
        var api = angular.injector(['revapm.Portal.Resources']).get('Companies');
        api.query({}, function (data) {
          console.log('accounts.getAll', data)
          callback(data);
        });
      })
    },
  },
  apiKeys: {
    getOne: function (id) {
      return browser.executeAsyncScript(function (callback) {
        var api = angular.injector(['revapm.Portal.Resources']).get('ApiKeys');
        api.get({
          id: id
        }, function (data) {
          console.log(data)
          callback(data);
        });
      })
    },
    // findAll: function() {
    //   return browser.executeAsyncScript(function(callback) {
    //     var api = angular.injector(['ProtractorMeetupApp']).get('apiService');
    //     api.member.query({}, function(data) {
    //       callback(data);
    //     });
    //   })
    // },
    // create: function(data) {
    //   return browser.executeAsyncScript(function(data, callback) {
    //     var api = angular.injector(['ProtractorMeetupApp']).get('apiService');
    //     api.member.save(data, function(newItem) {
    //       callback(newItem._id);
    //     })
    //   }, data);
    // }
  }
};
