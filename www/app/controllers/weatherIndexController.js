(function () {
	var controllerId = 'weatherIndexController';

	angular.module('app').controller(controllerId, ['$scope', 'common', 'translatorService', 'weatherService', weatherIndexController]);

	function weatherIndexController($scope, common, translatorService, weatherService) { 
		var vm = this;

		weatherService.getCurrentWeather().then(function(response){ 

			$scope.forecasts = response.data.query.results.channel.item.forecast; 
			$scope.forecasts.splice(0, 1);

			$scope.currentForecast = $scope.forecasts[0];
			$scope.currentForecast.temp = common.convertFahrenheitToCelsius(response.data.query.results.channel.item.condition.temp);
			processForecasts(); 
		}); 

		function processForecasts() { 
			$scope.forecasts.forEach(function(item){ 
				item.high = common.convertFahrenheitToCelsius(item.high);
				item.low = common.convertFahrenheitToCelsius(item.low);
				item.day = translatorService.translateDayOfWeek(item.day); 
				item.text = translatorService.translateDayDescription(item.text);
			});
		}
	} 
})();