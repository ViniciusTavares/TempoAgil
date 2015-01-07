(function () {
    'use strict';

    var app = angular.module('app');

    app.config(['$routeProvider', '$stateProvider', '$urlRouterProvider', routeConfigurator]);

    function routeConfigurator($routeProvider, $stateProvider, $urlRouterProvider) {

        $stateProvider

        $stateProvider.state('home', {
            url: '/',
            views: {
                home: {
                    templateUrl: 'app/templates/home.html',
                    controller: 'weatherIndexController'
                }
            }
          
        })

        $stateProvider.state('about', {
            url: '/about',
            views: {
                about: {
                    templateUrl: 'app/templates/about.html',
                    controller: 'aboutController'           
                }
            }
        })

        $urlRouterProvider.otherwise('/')
    }
})();