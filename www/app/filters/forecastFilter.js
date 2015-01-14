var app = angular.module('app');  

app.filter('translateDayName', function() {
	return function(day) {
		switch(day.toLowerCase()) { 
			case('mon'): 
			return 'Seg';  
			break;
			case('tue'): 
			return 'Ter'; 
			break;
			case('wed'): 
			return 'Qua';  
			break;
			case('thu'): 
			return 'Qui';  
			break;
			case('fri'): 
			return 'Sex';  
			break;
			case('sat'): 
			return 'Sab';  
			break;
			case('sun'): 
			return 'Dom';  
			break;
		}
	};
});

app.filter('translateDayCondition', function() {
	return function(condition) {

		if ( condition) { 

			switch(condition.toLowerCase()) { 
				case('thunderstorms'): 
				return 'Trovoadas';  
				break;
				case('mostly sunny'): 
				return 'Ensolarado';  
				break;
				case('sunny'): 
				return 'Ensolarado'
				break;
				case('isolated thunderstorms'): 
				return 'Trovoadas';  
				break;
				case('thunderstorms early'): 
				return 'Trovoadas de manhã'
				break;
				case('pm thunderstorms'): 
				return 'Trovoadas a Noite'
				case('partly cloudy'):
				return 'Céu limpo'
				break;
				case('mostly cloudy'):
				return 'Parcialmente Nublado'
				break; 
			}
		}

		return condition; 
	};
});


app.filter('getClassIconOfDayCondition', function() {
	return function(condition) {

		if ( condition) { 

			switch(condition.toLowerCase()) { 
				case('thunderstorms'): 
				return 'thunderstorms';  
				break;
				case('mostly sunny'): 
				return 'sunny';  
				break;
				case('isolated thunderstorms'): 
				return 'thunderstorms';  
				break;
				case('thunderstorms early'): 
				return 'thunderstorms-am'
				break;
				case('pm thunderstorms'): 
				return 'thunderstorm-pm'
				case('partly cloudy'):
				return 'partly-cloudy'
				break;
			}
		}
		return condition; 
	};
});


app.filter('convertToCelsius', ['common', function(common) {
	return function(fahrenheit) {
		return common.convertFahrenheitToCelsius(fahrenheit);
	};
}]);