(function () {
    'use strict';

    angular
        .module('revapm.Portal.Groups')
        .config(routesConfig);

    /*@ngInject*/
    function routesConfig($stateProvider) {
        $stateProvider
            .state('index.accountSettings.groups', {
                url: '/groups',
                views: {
                    main: {
                        controller: 'GroupsCrudController',
                        templateUrl: 'parts/groups/list.html'
                    }
                }
            })
            .state('index.accountSettings.groups.new', {
                url: '/new',
                views: {
                    page: {
                        controller: 'GroupsCrudController',
                        templateUrl: 'parts/groups/new.html'
                    }
                }
            })
            .state('index.accountSettings.groups.edit', {
                url: '/edit/:id',
                views: {
                    page: {
                        controller: 'GroupsCrudController',
                        templateUrl: 'parts/groups/edit.html'
                    }
                }
            });
    }
})();
