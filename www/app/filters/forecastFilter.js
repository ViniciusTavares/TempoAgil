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
				case('thunder'): 
				return 'Trovoadas';  
				break;
				case('scattered thunderstorms'): 
				return 'Pouco nublado';  
				break;
				case('partly cloudy'):
				return 'Céu limpo'
				break;
				case('mostly cloudy'):
				return 'Parcialmente Nublado'
				break; 
				case('light rain with thunder'): 
				return 'Garoa com chuva'
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
				case('thunder'): 
				return 'thunderstorm';  
				break;
				case('scattered thunderstorms'): 
				return '';  
				break;
				case('partly cloudy'):
				return 'partly-cloudy'
				break;
				case('light rain with thunder'): 
				return 'rain-with-thunder'
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