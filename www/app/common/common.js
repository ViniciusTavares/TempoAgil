(function () {
    'use strict';

    var commonModule = angular.module('common', []);

    commonModule.factory('common', common);

    function common() {

        var service = {
         convertFahrenheitToCelsius : convertFahrenheitToCelsius
        };

        return service;

        function convertFahrenheitToCelsius(fahrenheit ) { 
         return Math.round((fahrenheit - 32) / 1.8); 
        };
    }
})();