(function () {
    'use strict';

    angular
        .module('revapm.Portal.Shared')
        .controller('PermissionsController', PermissionsController);

    /*@ngInject*/
    function PermissionsController($scope, $q, Users, $rootScope,
        User, $injector, $state, $stateParams, Companies,
        DomainsConfig, Groups, Apps, DNSZones, $attrs) {        

        Apps.query().$promise.then(function (apps) {
            $scope.apps = apps;
        });

        DomainsConfig.query().$promise.then(function (domains) {
            $scope.domains = domains;
        });

        DNSZones.query().$promise.then(function (zones) {
            $scope.dnsZones = zones;
        });

        Companies.query().$promise.then(function (accs) {
            $scope.companies = accs;
        });

        $scope.pushItemsById = function (list, pushList, collection) {
            if ($scope && $scope.model && $scope.model.permissions) {
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

        $scope.$watch('groupPermissions', function () {
            if ($scope.groupPermissions) {
                $scope.model.permissions = $scope.groupPermissions;
            }
        });

        $scope.$watch('apps', function () {
            if ($scope.apps) {
                $scope.pushItemsById('mobile_apps', 'apps_list', 'apps');
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
            }
        });

        $scope.$watch('companies', function () {
            if ($scope.companies) {
                $scope.pushItemsById('accounts', 'accounts_list', 'companies');
            }
        });

        /**
         * @name  addItemToList
         * @description
         *
         * Add an item to a list of items (apps, domains, dns_zones...)
         *
         * @param  {[type]} item [description]
         * @return {[type]}       [description]
         */
        $scope.addItemToList = function (item, list) {
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
    }
})();
