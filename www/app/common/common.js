(function() {
    'use strict';

    var commonModule = angular.module('common', []);

    commonModule.factory('common', common);

    function common() {

        var service = {
            convertFahrenheitToCelsius: convertFahrenheitToCelsius,
            convertToFahrenheit : convertToFahrenheit, 
            calculateHeatIndex : calculateHeatIndex
        };

        return service;

        function convertFahrenheitToCelsius(fahrenheit) {
            return Math.round((fahrenheit - 32) / 1.8);
        };

        function calculateHeatIndex(celsius, humidity) {

            var r = humidity; 
            var b = celsius; 
                var t = convertToFahrenheit(b); //convert to fahrenheit
                var t2 = Math.pow(t, 2);
                var t3 = Math.pow(t, 3);
                var rh2 = Math.pow(r, 2);
                var rh3 = Math.pow(r, 3);

                var index = 16.923 + 0.185212 * t + 5.37941 * r - 0.100254 * t * r + 0.941695e-2 * t2 + 0.728898e-2 * rh2 + 0.345372e-3 * t2 * r - 0.814971e-3 * t * rh2 + 0.102102e-4 * t2 * rh2 - 0.38646e-4 * t3 + 0.291583e-4 * rh3 + 0.142721e-5 * t3 * r + 0.197483e-6 * t * rh3 - 0.218429e-7 * t3 * rh2 + 0.843296e-9 * t2 * rh3 - 0.481975e-10 * t3 * rh3;

                var m = 5 / 9 * (index - 32); //convert to celsius

                var heatIndex = 0;  

                if (m < 26.67)
                    heatIndex = Math.round(m);

                else if (m < 32.22)
                   heatIndex = Math.round(m);

               else if (m < 40.56)
                   heatIndex = Math.round(m);

               else if (m < 54.44)
                   heatIndex = Math.round(m);

               else
                   heatIndex = Math.round(m);

               return heatIndex;
           };

           function convertToFahrenheit(celsius) {
            return celsius * (9 / 5) + 32;
        };

    }

})();