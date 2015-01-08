var app = angular.module('app');

app.filter('skipCurrentForecast', function() {
  return function(items) {
    return day != new Date().getDate(); 
  };
});