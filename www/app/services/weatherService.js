var app = angular.module('app');  

var service = 'weatherService';  

app.factory(service, ['$http', weatherService]);

var weatherService = function() { 
	return 'dee';  
}