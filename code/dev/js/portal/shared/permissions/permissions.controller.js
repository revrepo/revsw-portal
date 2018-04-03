(function () {
    'use strict';

    angular
        .module('revapm.Portal.Shared')
        .controller('PermissionsController', PermissionsController);

    /*@ngInject*/
    function PermissionsController($scope, $q, Users, $rootScope,
        User, $injector, $state, $stateParams, Companies,
        DomainsConfig, Groups, Apps, DNSZones, $attrs) {

        $scope.getPageType = function () {
            return $attrs.pagetype;
        };

        $scope.pageType = {
            isAPIKey: function () {
                return $scope.getPageType() === 'APIKey';
            },
            isUser: function () {
                return $scope.getPageType() === 'user';
            },
            isGroup: function () {
                return $scope.getPageType() === 'group';
            }
        };
        
        $scope.modelList = ['apps_list', 'domains_list', 'web_analytics_list',
        'security_analytics_list', 'cache_purge_list', 'dns_zones_list',
        'accounts_list', 'dns_analytics_list', 'apps_analytics_list'];

        var permissionFilter = {
            operation: 'permission_list'
        };
        Apps.query({filters: JSON.stringify(permissionFilter)}).$promise.then(function (apps) {
            $scope.apps = apps;            
            $scope.apps_full = apps;
            $scope.setListsByAcc($scope.model.account_id);
        });


        DomainsConfig.getByOperation({filters: JSON.stringify(permissionFilter)}).$promise.then(function (domains) {
            $scope.domains = domains;
            $scope.domains_full = domains;
            $scope.setListsByAcc($scope.model.account_id);
        });

        DNSZones.query({filters: JSON.stringify(permissionFilter)}).$promise.then(function (zones) {
            $scope.dnsZones = zones;
            $scope.dnsZones_full = zones;
            $scope.setListsByAcc($scope.model.account_id);
        });

        Companies.query({filters: JSON.stringify(permissionFilter)}).$promise.then(function (accs) {
            $scope.companies = accs;
            $scope.companies_full = accs;
            $scope.setListsByAcc($scope.model.account_id);
        });

        $scope.pushItemsById = function (list, pushList, collection) {
            if ($scope && $scope.model && $scope.model.permissions && $scope.model.permissions[list].list) {
                $scope.model[pushList] = $scope.model[pushList] || [];
                $scope.model.permissions[list].list = $scope.model.permissions[list].list || [];
                $scope.model.permissions[list].list.forEach(function (val) {
                    $scope[collection].forEach(function (fullVal) {
                        if (fullVal.id === val) {

                            $scope.model[pushList].push(fullVal);
                        }
                    });
                });                
            }
        };

        $scope.clearLists = function () {
            $scope.modelList.forEach(function (list) {
                if($scope.model && $scope.model[list]) {
                    $scope.model[list] = null;
                    delete $scope.model[list];
                }
            });
        };

        $scope.initLists = function () {
            $scope.clearLists();
            $scope.pushItemsById('mobile_apps', 'apps_list', 'apps');
            $scope.pushItemsById('mobile_analytics', 'apps_analytics_list', 'apps');
            $scope.pushItemsById('domains', 'domains_list', 'domains');
            $scope.pushItemsById('web_analytics', 'web_analytics_list', 'domains');
            $scope.pushItemsById('security_analytics', 'security_analytics_list', 'domains');
            $scope.pushItemsById('cache_purge', 'cache_purge_list', 'domains');
            $scope.pushItemsById('dns_zones', 'dns_zones_list', 'dnsZones');
            $scope.pushItemsById('dns_analytics', 'dns_analytics_list', 'dnsZones');
            $scope.pushItemsById('accounts', 'accounts_list', 'companies');            
        };

        $scope.$watch('groupPermissions', function () {
            if ($scope.groupPermissions) {
                $scope.model.permissions = $scope.groupPermissions;                
            }
            $scope.initLists();      
        });

        $scope.$watch('apps', function () {
            if ($scope.apps) {
                $scope.pushItemsById('mobile_apps', 'apps_list', 'apps');
                $scope.pushItemsById('mobile_analytics', 'apps_analytics_list', 'apps');
            }
        });

        $scope.$watch('domains', function () {
            if ($scope.domains) {
                $scope.pushItemsById('domains', 'domains_list', 'domains');
                $scope.pushItemsById('web_analytics', 'web_analytics_list', 'domains');
                $scope.pushItemsById('security_analytics', 'security_analytics_list', 'domains');
                $scope.pushItemsById('cache_purge', 'cache_purge_list', 'domains');
            }
        });

        $scope.$watch('dnsZones', function () {
            if ($scope.dnsZones) {
                $scope.pushItemsById('dns_zones', 'dns_zones_list', 'dnsZones');
                $scope.pushItemsById('dns_analytics', 'dns_analytics_list', 'dnsZones');
            }
        });

        $scope.$watch('companies', function () {
            if ($scope.companies) {
                $scope.pushItemsById('accounts', 'accounts_list', 'companies');
            }
        });

        $scope.$watch('model.account_id', function (newVal, oldVal) {
            $scope.setListsByAcc(newVal);
        });

        $scope.setListsByAcc = function (accId) {
            if (accId) {
                ['domains', 'apps', 'dnsZones'].forEach(function (list) {
                    if ($scope[list] && $scope[list + '_full']) {
                        $scope[list] = $scope[list + '_full'].filter(function (item) {
                            return item.account_id === accId;
                        });
                    }
                });
            }
        };

        /**
         * @name  addItemToList
         * @description
         *
         * Add an item to a list of items (apps, domains, dns_zones...)
         *
         * @param  {[type]} item [description]
         * @return {[type]}       [description]
         */
        $scope.addItemToList = function (event, item, list) {
            event.searchInput.focus();
            if (item && list) {
                if (!$scope.model.permissions[list]) {
                    $scope.model.permissions[list] = {
                        access: true,
                        list: [],
                        allow_list: true
                    };
                }

                if (!$scope.model.permissions[list].list || !$scope.model.permissions[list].list.length) {
                    $scope.model.permissions[list].list = [];
                }

                if ($scope.model.permissions[list].list.indexOf(item.id) === -1) {
                    $scope.model.permissions[list].list.push(item.id);
                }
            }
        };

        /**
         * @name  removeItemFromList
         * @description
         *
         * Remove an item from a list of items (apps, domains, dns_zones...)
         *
         * @param  {[type]} item [description]
         * @return {[type]}       [description]
         */
        $scope.removeItemFromList = function (item, list) {
            return $scope
                .model
                .permissions[list]
                .list
                .splice($scope.model.permissions[list].list.indexOf(item.id), 1);
        };

        $scope.getMobileAppName = function (id) {
            if (!$scope.apps) {
                return;
            }
            var appToReturn;
            $scope.apps.forEach(function (app) {
                if (app.id === id) {
                    appToReturn = app;
                }
            });
            return appToReturn;
        };

        $scope.getDomain = function (id) {
            if (!$scope.domains) {
                return;
            }
            var domainToReturn;
            $scope.domains.forEach(function (domain) {
                if (domain.id === id) {
                    domainToReturn = domain;
                }
            });
            return domainToReturn;
        };

        $scope.getDNSZone = function (id) {
            if (!$scope.dnsZones) {
                return;
            }
            var zoneToReturn;
            $scope.dnsZones.forEach(function (zone) {
                if (zone.id === id) {
                    zoneToReturn = zone;
                }
            });
            return zoneToReturn;
        };

        $scope.getAccount = function (id) {
            if (!$scope.companies) {
                return;
            }
            var accR;
            $scope.companies.forEach(function (acc) {
                if (acc.id === id) {
                    accR = acc;
                }
            });
            return accR;
        };


        /**
         * check if we have any items in a list we inherit from a group
         * @param {String} list the list in the permissions object
         */
        $scope.hasListInRO = function (list) {
            if ($scope.model.permissions && $scope.model.permissions[list]) {
                if ($scope.readOnly && $scope.model.permissions[list].list && $scope.model.permissions[list].list.length > 0) {
                    return true;
                } else if ($scope.readOnly && (!$scope.model.permissions[list].list || $scope.model.permissions[list].list.length === 0)) {
                    return false;
                } else if (!$scope.readOnly) {
                    return true;
                }
            }

            return true;
        };
    }
})();
