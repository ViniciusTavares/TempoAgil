(function () {
    'use strict';

    var app = angular.module('app');

    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    var config = {
        appErrorPrefix: '[Weather App Error] ', 
        docTitle: 'Weather App : ',
        version: '1.0.0'
    };

    app.value('config', config);

    app.config(['$logProvider', function ($logProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.withCredentials = true;
    }]);

})();