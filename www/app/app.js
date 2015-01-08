(function () {
    'use strict';

    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',
        'ngSanitize',
        'ngRoute',
        'ionic',
        'common'
        ]);

    app.run(['$rootScope', '$route', '$location', '$ionicPlatform',
        function ($rootScope, $route, $location, $ionicPlatform) {

            $rootScope["serverAddress"] = "http://localhost:5000/"

            $rootScope.$on("$locationChangeStart", function (event) {

             $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
             if(window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }
          
          if(window.StatusBar) {
              StatusBar.styleDefault();
          }
      });

         });
        }]);
})();