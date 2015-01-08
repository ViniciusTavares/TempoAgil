var app = angular.module('app');  

var serviceId = 'translatorService';  

app.factory(serviceId, ['$http', '$q', translatorService]);


function translatorService($http, $q) { 
	return { 
		translateDayOfWeek : translateDayOfWeek,
		translateDayDescription : translateDayDescription
	}

	function translateDayOfWeek(day) {
		switch(day.toLowerCase()) { 
			case('mon'): 
				return 'Segunda';  
			break;
			case('tue'): 
				return 'Terça';  
			break;
			case('wed'): 
				return 'Quarta';  
			break;
			case('thu'): 
				return 'Quinta';  
			break;
			case('fri'): 
				return 'Sexta';  
			break;
			case('sat'): 
				return 'Sábado';  
			break;
			case('sun'): 
				return 'Domingo';  
			break;
		}
	}

	function translateDayDescription(description) { 
		switch(description.toLowerCase()) { 
			case('thunderstorms'): 
				return 'Segunda';  
			break;
			case('mostly sunny'): 
				return 'Ensolarado';  
			break;
			case('isolated thunderstorms'): 
				return 'Trovoadas';  
			break;
			case('thunderstorms early'): 
				return 'Ensolorado'
			break;			
		}
	}
}