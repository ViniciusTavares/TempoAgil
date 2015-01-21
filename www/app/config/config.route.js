(function () {
    'use strict';

    var app = angular.module('app');

    app.config(['$routeProvider', '$stateProvider', '$urlRouterProvider', routeConfigurator]);

    function routeConfigurator($routeProvider, $stateProvider, $urlRouterProvider) {

       $stateProvider.state('forecast', {
            url: '/',
            views: {
                forecast: {
                    templateUrl: 'app/templates/forecast.html',
                    controller: 'forecastController'           
                }
            }   
        })


        .state('addANewCity', {
            url: '/addANewCity',
            views: {
                addANewCity: {
                    templateUrl: 'app/templates/addANewCity.html',
                    controller: 'addANewCityController'           
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