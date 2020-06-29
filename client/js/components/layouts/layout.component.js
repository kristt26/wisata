const appFooter = {
	controller: function($scope, AuthService) {
		$scope.isLogin = AuthService.userIsLogin();
		if ($scope.isLogin) {
			// AuthService.profile().then((profile) => {
			// 	$scope.profile = profile;
			// });
		}

		$scope.logoff = function() {
			AuthService.logOff();
		};

		$scope.updateAdminProfile = (iduser, photodata) => {
			AuthService.updatePhotoProfile(iduser, photodata).then((x) => {});
		};
	},
	templateUrl: 'client/js/components/layouts/footer.html'
};

const loading = {
	bindings: { busy: '=' },
	controller: function($scope) {},
	templateUrl: 'client/js/components/layouts/loading.html'
};

angular.module('app.layout.conponent', []).component('app.footer', appFooter).component('app.loading', loading);
