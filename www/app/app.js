(function () {
  'use strict';

  var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',
        'ngSanitize',
        'ngRoute',
        'ionic',
        'ion-google-place',
        'common'
        ]);

  app.run(['$rootScope', '$route', '$location', '$ionicPlatform', '$ionicLoading',
    function ($rootScope, $route, $location, $ionicPlatform, $ionicLoading) {

      $rootScope["serverAddress"] = "http://localhost:5000/"

      $rootScope.$on("$locationChangeStart", function (event) {

       $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
       if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);  }

        if(window.StatusBar) {
          StatusBar.styleDefault();
        }  });

       $rootScope.$on('loading:show', function() {
        $ionicLoading.show({
         content: 'Carregando',
         animation: 'fade-in',
         showBackdrop: false,
         maxWidth: 200,
         // showDelay: 500
       })
      });

      //   $rootScope.$on('loading:show', function() {
      //   $ionicLoading.show({template: 'loading'})
      // });

      $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide()
      });


    });
    }]);
})();