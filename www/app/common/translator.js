var app = angular.module('app');  

var serviceId = 'translatorService';  

app.factory(serviceId, ['$http', '$q', translatorService]);


function translatorService($http, $q) { 
	return { 
		translateDayOfWeek : translateDayOfWeek,
		getDescriptionOfDayCondition : getDescriptionOfDayCondition
	}

	function translateDayOfWeek(day) {
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
	}

	function getDescriptionOfDayCondition(description) { 
		switch(description.toLowerCase()) { 
			case('thunderstorms'): 
			return 'Trovoadas';  
			break;
			case('mostly sunny'): 
			return 'Ensolarado';  
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
		}
	}

	function getClassIconOfDayCondition(description) { 
		switch(description.toLowerCase()) { 
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
}