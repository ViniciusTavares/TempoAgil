(function () {
	var controllerId = 'forecastController';

	angular.module('app').controller(controllerId, ['$scope', 'common',  '$state', 'translatorService', 'weatherService', forecastController]);

	function forecastController($scope, common, $state, translatorService, weatherService) { 
		var vm = this;

		$scope.updateBinding = function() {
			weatherService.getCurrentWeather().then(function(response){ 

				// $state.go('about');
				$scope.showFavoriteList = false; 
				$scope.forecasts = response.data.query.results.channel.item.forecast; 
				$scope.forecasts.splice(0, 1);	

				$scope.currentForecast = $scope.forecasts[0];

				$scope.currentForecast.temp = common.convertFahrenheitToCelsius(response.data.query.results.channel.item.condition.temp);
				$scope.heatIndex = common.calculateHeatIndex( $scope.currentForecast.temp, response.data.query.results.channel.atmosphere.humidity)
				$scope.currentForecast.condition = response.data.query.results.channel.item.condition.text; 
				$scope.showNextForecasts = false;
				processForecasts(); 
			}); 
		}

		function processForecasts() { 
			$scope.forecasts.forEach(function(item){				
				item.date = getForecastDay(item.date);				
			});
		}

		function getForecastDay(date) { 
			return date.substring(0,date.indexOf(' '));
		}

		$scope.alert = function() { 
			alert(); 
		}

		$scope.updateBinding(); 
	} 
})();