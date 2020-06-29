angular.module('app.account.conponent', []).component('userlogin', {
	controller: function($scope, AuthService, $rootScope) {
		$scope.isLogin = AuthService.userIsLogin();
		if ($scope.isLogin) {
			// AuthService.profile().then((profile) => {
			// 	$scope.profile = profile;
			// });
		}
		$rootScope.$on('onLogin', (x) => {
			$scope.isLogin = AuthService.userIsLogin();
		});

		$scope.logoff = function() {
			AuthService.logOff();
		};

		$scope.updateAdminProfile = (iduser, photodata) => {
			AuthService.updatePhotoProfile(iduser, photodata).then((x) => {});
		};
	},
	templateUrl: 'client/js/components/templates/userlogin.html'
});
