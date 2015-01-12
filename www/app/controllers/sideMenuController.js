(function () {
	var controllerId = 'sideMenuController';

	angular.module('app').controller(controllerId, ['$scope', '$ionicSideMenuDelegate', sideMenuController]);

	function sideMenuController($scope, $ionicSideMenuDelegate) {
		$scope.toggleLeft = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};
	}

})();