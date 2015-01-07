(function () {
	var controllerId = 'weatherIndexController';

	angular.module('app').controller(controllerId, ['$scope','weatherService', weatherIndexController]);

	function weatherIndexController($scope, weatherService) { 
		var vm = this;

		weatherService.getCurrentWeather().then(function(response){ 

			$scope.forecasts = response.data.query.results.channel.item.forecast;  

			$scope.currentForecast = $scope.forecasts[0];

			$scope.currentForecast.high = Math.round(($scope.currentForecast.high - 32) / 1.8); 

			$scope.currentForecast.low = Math.round(($scope.currentForecast.low - 32) / 1.8); 

		})
	} 
})();