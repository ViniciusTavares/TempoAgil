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
			$scope.heatIndex = common.calculateHeatIndex( $scope.currentForecast.temp, response.data.query.results.channel.atmosphere.humidity)
			$scope.currentForecast.condition = translatorService.getDescriptionOfDayCondition(response.data.query.results.channel.item.condition.text); 
			
			processForecasts(); 
		}); 

		function processForecasts() { 
			$scope.forecasts.forEach(function(item){ 
				item.high = common.convertFahrenheitToCelsius(item.high);
				item.low = common.convertFahrenheitToCelsius(item.low);
				item.dayDescription = translatorService.translateDayOfWeek(item.day);
				item.day = getForecastDay(item.date);
				item.text = translatorService.getDescriptionOfDayCondition(item.text);
			});
		}

		function getForecastDay(date) { 
			return date.substring(0,date.indexOf(' '));
		}
	} 
})();