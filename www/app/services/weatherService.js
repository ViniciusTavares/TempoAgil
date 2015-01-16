var app = angular.module('app');  

var serviceId = 'weatherService';  

app.factory(serviceId, ['$http', '$q', weatherService]);


function weatherService($http, $q) { 
	return { 
		getCurrentWeather : getCurrentWeather 
	}

	function getCurrentWeather(location) {

		var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22s%C3%A3o%20paulo%2C%20sp%22)&format=json';

		var deferred = $q.defer();
		return $http.get(url)

		.success(function(response) {
			deferred.resolve(response);
		})
		.error(function(response) {
			deferred.reject(response);
		});
	}
}