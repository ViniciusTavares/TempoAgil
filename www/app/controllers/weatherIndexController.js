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
			$scope.currentForecast.condition = response.data.query.results.channel.item.condition.text; 
			$scope.showNextForecasts = false;
			processForecasts(); 
		}); 

		function processForecasts() { 
			$scope.forecasts.forEach(function(item){				
				item.date = getForecastDay(item.date);				
			});
		}

		function getForecastDay(date) { 
			return date.substring(0,date.indexOf(' '));
		}
	} 
})();