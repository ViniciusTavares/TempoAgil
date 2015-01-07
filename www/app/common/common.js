(function () {
    'use strict';

    // Define the common module 
    // Contains services:
    //  - common
    //  - logger
    //  - spinner
    var commonModule = angular.module('common', []);

    // Must configure the common service and set its 
    // events via the commonConfigProvider
    commonModule.provider('commonConfig', function () {
        this.config = {
            // These are the properties we need to set
            //controllerActivateSuccessEvent: '',
            //spinnerToggleEvent: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    });

    commonModule.factory('common',
        ['$q', '$rootScope', '$timeout', '$cookieStore', 'commonConfig', 'logger', common]);

    function common($q, $rootScope, $timeout, $cookieStore, commonConfig, logger) {
        var throttles = {};

        var service = {
            // common angular dependencies
            $broadcast: $broadcast,
            $q: $q,
            $timeout: $timeout,
            // generic
            activateController: activateController,
            createSearchThrottle: createSearchThrottle,
            debouncedThrottle: debouncedThrottle,
            isNumber: isNumber,
            logger: logger, // for accessibility
            textContains: textContains,
            regularExpression: regularExpression,
            resetForm: resetForm,
            scrollAction: scrollAction,
            resetSelect2: resetSelect2,
            toPtShortDate: toPtShortDate,
            toUsShortDate: toUsShortDate,
            mountPtDateString: mountPtDateString,
            toHour: toHour,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            convertToDecimalValue: convertToDecimalValue,
            convertToNumberValue: convertToNumberValue,
            logOff: logOff,
            isDate: isDate,
            getRandomColor: getRandomColor,
            convertToDateFromPtShortString: convertToDateFromPtShortString,
            convertToDate: convertToDate,
            timeSpanToTime: timeSpanToTime
        };

        return service;

        function logOff() {
            $cookieStore.remove("hashAuth");
        }

        function getCurrentUser() {
            var hash = $cookieStore.get('hashAuth');

            if (hash) {
                return JSON.parse(atob(hash));
            } else {
                return undefined;
            }
        }

        function setCurrentUser(user, mode) {
            $cookieStore.put('hashAuth', btoa(JSON.stringify(user)));
            $cookieStore.put('mode', mode);
        }

        function activateController(promises, controllerId) {
            return $q.all(promises).then(function (eventArgs) {
                var data = { controllerId: controllerId };
                $broadcast(commonConfig.config.controllerActivateSuccessEvent, data);
            });
        }

        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function createSearchThrottle(viewmodel, list, filteredList, filter, delay) {
            // custom delay or use default
            delay = +delay || 300;
            // if only vm and list parameters were passed, set others by naming convention 
            if (!filteredList) {
                // assuming list is named sessions,
                // filteredList is filteredSessions
                filteredList = 'filtered' + list[0].toUpperCase() + list.substr(1).toLowerCase(); // string
                // filter function is named sessionFilter
                filter = list + 'Filter'; // function in string form
            }

            // create the filtering function we will call from here
            var filterFn = function () {
                // translates to ...
                // vm.filteredSessions 
                //      = vm.sessions.filter(function(item( { returns vm.sessionFilter (item) } );
                viewmodel[filteredList] = viewmodel[list].filter(function (item) {
                    return viewmodel[filter](item);
                });
            };

            return (function () {
                // Wrapped in outer IFFE so we can use closure 
                // over filterInputTimeout which references the timeout
                var filterInputTimeout;

                // return what becomes the 'applyFilter' function in the controller
                return function (searchNow) {
                    if (filterInputTimeout) {
                        $timeout.cancel(filterInputTimeout);
                        filterInputTimeout = null;
                    }
                    if (searchNow || !delay) {
                        filterFn();
                    } else {
                        filterInputTimeout = $timeout(filterFn, delay);
                    }
                };
            })();
        }

        function debouncedThrottle(key, callback, delay, immediate) {
            var defaultDelay = 1000;
            delay = delay || defaultDelay;
            if (throttles[key]) {
                $timeout.cancel(throttles[key]);
                throttles[key] = undefined;
            }
            if (immediate) {
                callback();
            } else {
                throttles[key] = $timeout(callback, delay);
            }
        }

        function isNumber(val) {
            // negative or positive
            return /^[-]?\d+$/.test(val);
        }

        function textContains(text, searchText) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        }


        function regularExpression(vm) {
            vm.onlyDecimals = /^\d*\.?\d*$/;

            vm.onlyNumbers = /^\d+$/;

            vm.date = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;

            vm.time = /^(([0-9])|([0-1][0-9])|([2][0-3]))(:(([0-9])|([0-5][0-9])))?$/;
        }

        function resetForm(vm) {
            var reset = {};

            vm.model = angular.copy(reset);
            resetSelect2();
        };

        function scrollAction(id) {
            $('html, head').animate({
                scrollTop: $(id).offset().top
            }, 1500);
        };

        function mountPtDateString(param) {
            var stringToReturn = param.substr(0, 2) + '/' + param.substr(2, 2) + '/' + param.substr(4, 4);

            return stringToReturn;
        }

        function toPtShortDate(myDate) {

            if (myDate) {

                if (myDate.toString().indexOf('T00:00') > -1) {
                    myDate = myDate.replace('T00:00', 'T03:00');
                }

                var date = new Date(myDate);

                date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

                return ("0" + (date.getDate())).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
            }
            return null;
        }

        function toHour(myHour) {
            return myHour.substr(0, 5);
        }

        function timeSpanToTime(myTimespan) {
            if (!myTimespan)
                return;
            var firstPoint = myTimespan.indexOf('.');
            var firstColon = myTimespan.indexOf(':');

            var days = myTimespan.split('.');
            if (days.length > 1 && firstPoint < firstColon) {
                var daysHours = (days[0] * 24);
                var hours = daysHours < 0 ? (-1) * (((-1) * daysHours) + parseInt(days[1].split(':')[0])) : daysHours + parseInt(days[1].split(':')[0]);
                return hours + ':' + days[1].split(':')[1];
            }
            return myTimespan.split(':')[0] + ':' + myTimespan.split(':')[1];
        }

        function toUsShortDate(myDate) {
            var date = myDate.substr(3, 3) + myDate.substr(0, 3) + myDate.substr(6, 4);

            return date;
        }

        function convertToDecimalValue(value) {

            if (value) {
                value = value.toString();

                if (value != "0") {
                    var decimalValue = value.replace(/\./g, '');
                    return decimalValue.replace(',', '.');
                } else {
                    return 0;
                }
            }
            return null;
        }

        function convertToNumberValue(value) {

            if (value) {
                value = value.toString();

                if (value != "0") {
                    var decimalValue = value.replace(/\,/g, '');
                    return decimalValue.replace('.', ',');
                } else {
                    return 0;
                }
            }
            return null;
        }

        function isDate(year, month, day) {
            month = month - 1;
            var tempDate = new Date(year, month, day);
            if ((getYear(tempDate.getYear()) == year && year > 1900) &&
            (month == tempDate.getMonth()) &&
            (day == tempDate.getDate()))
                return true;
            else
                return false;
        }

        function getYear(d) {
            return (d < 1000) ? d + 1900 : d;
        }

        function convertToDate(year, month, day) {
            return new Date(year, month, day);
        }

        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.round(Math.random() * 15)];
            }
            return color;
        }
    }
})();