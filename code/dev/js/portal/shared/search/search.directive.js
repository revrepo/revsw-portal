(function(angular, _) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('search', function($location, $localStorage, DomainsConfig, Companies, Users, Apps, DashboardSrv, ApiKeys){
      return {
        restrict: 'AE',
        templateUrl: 'parts/shared/search/search.html',
        scope: { },

        link: function (scope) {
          scope.list = [];
          scope.searchTerm = '';
          scope.types = {
            domains: 'Domains',
            app_names: 'App names',
            dashboards: 'Dashboards',
            users: 'Users',
            api_keys: 'API Keys',
            accounts: 'Accounts'
          };

          function init(){
            // DOMAINS
            DomainsConfig.query().$promise.then(function(data){
              data.forEach(function(item){
                item.searchType = 'domain';
                scope.list.push(item);
              });
            });

            Companies.query().$promise.then(function(data){
              data.forEach(function(item){
                item.searchType = 'company';
                scope.list.push(item);
              });
            });

            Users.query().$promise.then(function(data){
              data.forEach(function(item){
                item.searchType = 'user';
                scope.list.push(item);
              });
            });


            Apps.query().$promise.then(function(data){
              data.forEach(function(item){
                item.searchType = 'app';
                scope.list.push(item);
              });
            });

            //ApiKeys.query().$promise.then(function(data){
            //  data.forEach(function(item){
            //    item.searchType = 'apiKey';
            //    scope.list.push(item);
            //  });
            //});

            DashboardSrv.getAll().then(function(data){
              data.forEach(function(item){
                item.searchType = 'dashboard';
                scope.list.push(item);
              });
            });

          } init();

          scope.getFilteredList = function(term,x,y,z) {
            scope.searchTerm = term;
            var results = [];
            term = (term || '').toLowerCase();
            var list = angular.copy(scope.list);

            list.forEach(function(item){
              switch(item.searchType){
                case 'domain':
                  if((item.domain_name || '').toLowerCase().indexOf(term) >= 0){
                    item.searchBarText = item.domain_name + ' (Edit Domain)';
                    item.searchDisplayText = item.domain_name;
                    item.searchAction = 'edit';
                    results.push(item);

                    var copy = angular.copy(item);
                    copy.searchBarText = copy.domain_name + ' (Web Analytics)';
                    copy.searchAction = 'analytics';
                    results.push(copy);
                  }
                  break;
                case 'company':
                  if((item.companyName || '').toLowerCase().indexOf(term) >= 0){
                    item.searchBarText = item.companyName + ' (Edit Account)';
                    item.searchDisplayText = item.companyName;
                    item.searchAction = 'edit';
                    results.push(item);

                    var companyCopy = angular.copy(item);
                    companyCopy.searchBarText = companyCopy.companyName + ' (Usage Report)';
                    companyCopy.searchAction = 'usage';
                    results.push(companyCopy);
                  }
                  break;
                case 'user':
                  var fullName = item.firstname + ' ' + item.lastname;
                  var searchString = fullName + ' ' +  item.email;

                  if((searchString || '').toLowerCase().indexOf(term) >= 0){
                    item.searchBarText = fullName + ' (Edit User)';
                    item.searchDisplayText = fullName;
                    item.searchAction = 'edit';
                    results.push(item);
                  }
                  break;
                case 'app':
                  if((item.app_name || '').toLowerCase().indexOf(term) >= 0){
                    item.searchBarText = item.app_name + ' (Edit App)';
                    item.searchDisplayText = item.app_name;
                    item.searchAction = 'edit';
                    results.push(item);

                    var appCopy = angular.copy(item);
                    appCopy.searchBarText = appCopy.app_name + ' (Mobile Analytics)';
                    appCopy.searchAction = 'analytics';
                    results.push(appCopy);
                  }
                  break;
                case 'apiKey':
                  if((item.key_name || '').toLowerCase().indexOf(term) >= 0){
                    item.searchBarText = item.key_name + ' (Edit API Key)';
                    item.searchDisplayText = item.key_name;
                    item.searchAction = 'edit';
                    results.push(item);
                  }
                  break;
                case 'dashboard':
                  if((item.title || '').toLowerCase().indexOf(term) >= 0){
                    item.searchBarText = item.title + ' (Dashboard)';
                    item.searchDisplayText = item.title;
                    item.searchAction = 'edit';
                    results.push(item);
                  }
                  break;
              }
            });

            return results;
          };

          scope.searchItemSelected = function(item){
            item.searchBarText = item.searchDisplayText;

            switch(item.searchType){
              case 'domain':
                if(item.searchAction === 'edit'){
                  $location.path('domains/edit/' + item.id);
                } else if(item.searchAction === 'analytics'){
                  selectDomain(item);
                  if($location.path().indexOf('reports') !== -1){
                    window.location.reload();
                  } else {
                    $location.path('reports/proxy');
                  }
                }
                break;
              case 'company':
                if(item.searchAction === 'edit'){
                  $location.path('companies/edit/' + item.id);
                } else if(item.searchAction === 'usage'){
                  selectAccount(item);
                  if($location.path() === '/usage'){
                    window.location.reload();
                  } else {
                    $location.path('usage');
                  }
                }
                break;
              case 'user':
                if(item.searchAction === 'edit'){
                  $location.path('users/edit/' + item.user_id);
                }
                break;
              case 'app':
                if(item.searchAction === 'edit'){
                  var path = 'apps/' + item.app_platform.toLowerCase() + '/edit/' + item.id;
                  $location.path(path);
                } else if(item.searchAction === 'analytics'){
                  selectApp(item);
                  if($location.path().indexOf('mobile') !== -1){
                    window.location.reload();
                  } else {
                    $location.path('mobile/traffic');
                  }
                }
                break;
              case 'apiKey':
                if(item.searchAction === 'edit'){
                  $location.path('users/edit/' + item.id);
                }
                break;
              case 'dashboard':
                if(item.searchAction === 'edit'){
                  $location.path('dashboard/' + item.id);
                }
                break;
            }
          };

          scope.clearSearchBar = function(){
            scope.searchTerm = '';
          };


          function selectDomain(domain){
            $localStorage.selectedDomain = domain;
          }

          function selectApp(app){
            $localStorage.selectedApplication = app;
          }

          function selectAccount(account){
            $localStorage.selectedAccount = {
              acc_name: account.companyName,
              acc_id: account.id
            };
          }
        }
      };
    });
})(angular, _);
