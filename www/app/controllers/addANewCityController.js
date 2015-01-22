(function () {
	var controllerId = 'addANewCityController';

	angular.module('app').controller(controllerId, ['$scope', '$ionicSideMenuDelegate', addANewCityController]);

	function addANewCityController($scope, $ionicSideMenuDelegate) {
		$scope.toggleLeft = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};
	}

})();