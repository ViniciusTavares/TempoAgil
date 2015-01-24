(function () {
    'use strict';

    var app = angular.module('app');

    app.config(['$httpProvider', '$ionicConfigProvider', function ($httpProvider, $ionicConfigProvider) {
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
        // $httpProvider.defaults.withCredentials = true;

        $ionicConfigProvider.tabs.position('bottom');

        $httpProvider.interceptors.push(function($rootScope) {
            return {
              request: function(config) {
                $rootScope.$broadcast('loading:show')
                return config
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide')
                return response
            }
        }
    })
    }]);

})();