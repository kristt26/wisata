angular
	.module('account.controller', [])
	.controller('LoginController', LoginController)
	.controller('registrasiController', registrasiController);

function LoginController($scope, $state, AuthService, helperServices) {
	$scope.helper = helperServices;
	$scope.login = function(user) {
		helperServices.IsBusy = true;
		AuthService.login(user).then((x) => {
			$scope.helper.IsBusy = false;
			if (x.role == 'calonsiswa') $state.go('guest' + '-home');
			else $state.go(x.role + '-home');
		});
	};
}

function registrasiController($scope, $state, AuthService) {}
