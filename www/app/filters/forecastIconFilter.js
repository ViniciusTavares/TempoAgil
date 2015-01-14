var app = angular.module('app');  

app.filter('weatherIcon', function() {
	return function(weather) {

		switch(weather) { 
			case(''): 
			return 'className';  
			break;
			default 
			return weather; 
			break;
		}
	};
});