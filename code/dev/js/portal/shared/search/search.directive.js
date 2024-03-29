(function(angular, _) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('search', function($location, $localStorage, $state, $rootScope, DomainsConfig,
      Companies, Users, User, Apps, DashboardSrv, ApiKeys, DNSZones, WAF_Rules, Groups) {
      return {
        restrict: 'AE',
        templateUrl: 'parts/shared/search/search.html',
        scope: {},

        link: function(scope) {
          scope.list = [];
          scope.searchTerm = $rootScope.searchTerm;

          function init() {
            scope.list = [];
            scope.list.length = 0;

            // DOMAINS
            DomainsConfig.query().$promise.then(function(data) {
              data.forEach(function(item) {
                item.searchType = 'domain';
                item.domain_name += ' ';
                scope.list.push(item);
              });
            });

            Companies.query().$promise.then(function(data) {
              data.forEach(function(item) {
                item.searchType = 'company';
                item.companyName += ' ';
                scope.list.push(item);
              });
            });

            User.getUserAccounts().then(function(data) {
              data.forEach(function(item) {
                item.searchType = 'billing';
                item.acc_name += ' ';
                scope.list.push(item);
              });
            });

            Users.query().$promise.then(function(data) {
              data.forEach(function(item) {
                item.searchType = 'user';
                scope.list.push(item);
              });
            });

            Apps.query().$promise.then(function(data) {
              data.forEach(function(item) {
                item.searchType = 'app';
                item.app_name += ' ';
                scope.list.push(item);
              });
            });

            ApiKeys.query().$promise.then(function(data) {
              data.forEach(function(item) {
                item.searchType = 'apiKey';
                item.key_name += ' ';
                scope.list.push(item);
              });
            });

            DashboardSrv.getAll().then(function(data) {
              data.forEach(function(item) {
                item.searchType = 'dashboard';
                item.title += ' ';
                scope.list.push(item);
              });
            });
            DNSZones.query().$promise.then(function(data) {
              data.forEach(function(item) {
                item.searchType = 'zones';
                item.title += ' ';
                scope.list.push(item);
              });
            });

            Groups.query().$promise.then(function(data) {
              data.forEach(function(item) {
                item.searchType = 'group';
                item.title += ' ';
                scope.list.push(item);
              });
            });

            if (!User.isRevadmin()) {
              var  filters = {
                rule_type: 'customer'
              };

              WAF_Rules.query({filters:filters}).$promise
                .then(function(data) {
                  data.forEach(function(item) {
                    item.searchType = 'wafRule';
                    item.title += ' ';
                    scope.list.push(item);
                  });
                });
            }
          }

          if (User.isAuthed()) {
            init();
          }

          scope.getFilteredList = function(term) {
            /* jshint maxstatements:100 */
            /* Ignore statements, its a long search.. */
            scope.searchTerm = term;
            $rootScope.searchTerm = term;

            var results = [];
            term = (term || '').toLowerCase();
            var list = angular.copy(scope.list);
            list.forEach(function(item) {
              switch (item.searchType) {
                case 'domain':
                  if ((item.domain_name || '').toLowerCase().indexOf(term) >= 0) {
                    item.searchBarText = item.domain_name + ' (Edit Domain)';
                    item.searchDisplayText = item.domain_name;
                    item.searchAction = 'edit';
                    if (User.hasAccessTo('domains')) {
                    results.push(item);
                    }

                    var copy = angular.copy(item);
                    copy.searchBarText = copy.domain_name + ' (Web Analytics)';
                    copy.searchAction = 'analytics';
                    if (User.hasAccessTo('web_analytics')) {
                    results.push(copy);
                    }

                    var purgeCopy = angular.copy(item);
                    purgeCopy.searchBarText = purgeCopy.domain_name + ' (Purge Cache)';
                    purgeCopy.searchAction = 'purge';
                    if (User.hasAccessTo('cache_purge')) {
                    results.push(purgeCopy);
                    }
                  }
                  break;
                case 'company':
                  if ((item.companyName || '').toLowerCase().indexOf(term) >= 0) {
                    item.searchBarText = item.companyName + ' (Edit Account)';
                    item.searchDisplayText = item.companyName;
                    item.searchAction = 'edit';
                    if (User.isAdmin() && User.hasAccessTo('account_profile')) {
                      results.push(item);
                    } else if (User.hasAccessTo('accounts')) {
                      results.push(item);
                    }

                    var companyCopy = angular.copy(item);
                    companyCopy.searchBarText = companyCopy.companyName + ' (Usage Report)';
                    companyCopy.searchAction = 'usage';
                    if (User.hasAccessTo('usage_reports')) {
                      results.push(companyCopy);
                    }                    
                  }
                  break;
                case 'billing':
                  if ((item.acc_name || '').toLowerCase().indexOf(term) >= 0) {
                    item.searchDisplayText = item.acc_name;
                    item.searchBarText = item.acc_name + ' (Billing Statements)';
                    item.searchAction = 'billing';
                    if (User.hasAccessTo('billing_statements') && User.hasBillingPlan()) {
                    results.push(item);
                    }
                  }
                  break;
                case 'user':
                  var fullName = item.firstname + ' ' + item.lastname;
                  var searchString = fullName + ' ' + item.email;

                  if ((searchString || '').toLowerCase().indexOf(term) >= 0) {
                    item.searchBarText = fullName + ' (Edit User)';
                    item.searchDisplayText = fullName;
                    item.searchAction = 'edit';
                    if (User.hasAccessTo('users')) {
                    results.push(item);
                    }
                  }
                  break;
                case 'group':
                  if ((item.name || '').toLowerCase().indexOf(term) >= 0) {
                    item.searchBarText = item.name + ' (Edit Group)';
                    item.searchDisplayText = item.name;
                    item.searchAction = 'edit';
                    if (User.hasAccessTo('groups')) {
                    results.push(item);
                    }
                  }
                  break;
                case 'app':
                  if ((item.app_name || '').toLowerCase().indexOf(term) >= 0) {
                    item.searchBarText = item.app_name +
                      '<i>'+item.app_platform.replace('_',' ')+'</i> (Edit App)';
                    item.searchDisplayText = item.app_name;
                    item.searchAction = 'edit';
                    results.push(item);

                    var appCopy = angular.copy(item);
                    appCopy.searchBarText = appCopy.app_name +
                      '<i>'+item.app_platform.replace('_',' ')+'</i>  (Mobile Analytics)';
                    appCopy.searchAction = 'analytics';
                    if (User.hasAccessTo('mobile_analytics')) {
                    results.push(appCopy);
                    }
                  }
                  break;
                case 'apiKey':
                  if ((item.key_name || '').toLowerCase().indexOf(term) >= 0) {
                    item.searchBarText = item.key_name + ' (Edit API Key)';
                    item.searchDisplayText = item.key_name;
                    item.searchAction = 'edit';
                    results.push(item);
                  }
                  break;
                case 'dashboard':
                  if ((item.title || '').toLowerCase().indexOf(term) >= 0) {
                    item.searchBarText = item.title + ' (Dashboard)';
                    item.searchDisplayText = item.title;
                    item.searchAction = 'edit';
                    if (User.hasAccessTo('dashboards')) {
                    results.push(item);
                    }
                  }
                  break;
                case 'zones':
                  if ((item.zone || '').toLowerCase().indexOf(term) >= 0) {
                    item.searchBarText = item.zone + ' (Edit DNS Zone)';
                    item.searchDisplayText = item.zone;
                    item.searchAction = 'edit';
                    results.push(item);
                  }
                  break;
               case 'wafRule':
                  if ((item.rule_name || '').toLowerCase().indexOf(term) >= 0) {
                    item.searchBarText = item.rule_name + ' (Edit WAF Rule)';
                    item.searchDisplayText = item.rule_name;
                    item.searchAction = 'edit';
                    results.push(item);
                  }
                  break;
              }
            });

            return results;
          };

          scope.searchItemSelected = function(item) {
            item.searchBarText = item.searchDisplayText.trim();
            scope.searchTerm = item.searchBarText;
            $rootScope.searchTerm = item.searchBarText;

            switch (item.searchType) {
              case 'domain':
                if (item.searchAction === 'edit') {
                  $location.path('domains/edit/' + item.id);
                } else if (item.searchAction === 'analytics') {
                  selectDomain(item);
                  if ($location.path().indexOf('reports/proxy') !== -1) {
                    $state.reload();
                  } else {
                    $location.path('reports/proxy');
                  }
                } else if (item.searchAction === 'purge') {
                  selectDomain(item);
                  if ($location.path().indexOf('cache/purge') !== -1) {
                    $state.reload();
                  } else {
                    $location.path('cache/purge');
                  }
                }
                break;
              case 'company':
                if (item.searchAction === 'edit') {
                  console.log($localStorage.userMainAccount);
                  console.log(item);
                  if (item.id === $localStorage.userMainAccount.id) {
                    $location.path('account');
                  } else {
                    $location.path('accounts/edit/' + item.id);
                  }                  
                } else if (item.searchAction === 'usage') {
                  selectAccount(item);
                  if ($location.path() === '/usage') {
                    $state.reload();
                  } else {
                    $location.path('usage');
                  }
                }
                break;
              case 'billing':
                if (item.searchAction === 'billing') {
                  User.selectAccount(item);
                  $state.go('index.billing.statements',{},{reload:true,inherit: false, notify: true});
                }
                break;
              case 'user':
                if (item.searchAction === 'edit') {
                  $location.path('users/edit/' + item.user_id);
                }
                break;
              case 'group':
                if (item.searchAction === 'edit') {
                  $location.path('groups/edit/' + item.id);
                }
                break;
              case 'app':
                if (item.searchAction === 'edit') {
                  var path = 'apps/' + item.app_platform.toLowerCase() + '/edit/' + item.id;
                  $location.path(path);
                } else if (item.searchAction === 'analytics') {
                  selectApp(item);
                  if ($location.path().indexOf('mobile/traffic') !== -1) {
                    $state.reload();
                  } else {
                    $location.path('mobile/traffic');
                  }
                }
                break;
              case 'apiKey':
                if (item.searchAction === 'edit') {
                  $location.path('keys/edit/' + item.id);
                }
                break;
              case 'dashboard':
                if (item.searchAction === 'edit') {
                  $location.path('dashboard/' + item.id);
                }
                break;
              case 'zones':
                if (item.searchAction === 'edit') {
                  $location.path('dns/zones/' + item.id+'/records');
                }
                break;
              case 'wafRule':
                if (item.searchAction === 'edit') {
                  $location.path('waf_rules/edit/' + item.id);
                }
                break;
            }
          };

          scope.clearSearchBar = function() {
            scope.searchTerm = '';
            $rootScope.searchTerm = '';
          };

          scope.showClear = function() {
            return ($rootScope.searchTerm || '').trim().length;
          };

          scope.$on('update:searchData', function() {
            init();
          });

          function selectDomain(domain) {
            $localStorage.selectedDomain = domain;
          }

          function selectApp(app) {
            User.selectApplication(app);
          }

          function selectAccount(account) {
            $localStorage.selectedAccount = {
              acc_name: account.companyName,
              acc_id: account.id
            };
          }
        }
      };
    });
})(angular, _);
