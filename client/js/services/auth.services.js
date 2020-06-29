angular.module('auth.service', []).factory('AuthService', AuthService);

function AuthService($http, $q, StorageService, $state, helperServices, message) {
	var controller = '/api/users';
	var service = {};

	return {
		Init: InitLoad,
		login: login,
		logOff: logoff,
		userIsLogin: userIsLogin,
		getUserName: getUserName,
		userIsLogin: userIsLogin,
		userInRole: userInRole,
		getHeader: getHeader,
		url: service.url,
		profile: profile,
		registerPembeli: registerPembeli,
		registerPenjual: registerPenjual,
		getToken: getToken,
		updatePhotoProfile: updatePhotoProfile
	};

	function updatePhotoProfile(userid, data) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + controller + '/photoprofile/' + userid,
			headers: getHeader(),
			data: data
		}).then(
			(res) => {
				StorageService.addObject('user', res.data);
				def.resolve(res.data);
			},
			(err) => {
				message.error(err);
				def.reject();
			}
		);
		return def.promise;
	}

	function InitLoad(params) {
		var isFound = false;
		params.forEach((x) => {
			if (userInRole(x)) isFound = true;
		});

		if (!isFound) $state.go('login');
		else return isFound;
	}

	function profile() {
		var def = $q.defer();
		var result = StorageService.getObject('user');
		if (result) {
			def.resolve(result);
		} else {
			def.resolve(null);
		}

		return def.promise;
	}

	function login(user) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + controller,
			headers: getHeader(),
			data: user
		}).then(
			(res) => {
				StorageService.addObject('user', res.data);
				def.resolve(res.data);
			},
			(err) => {
				message.error(err.data);
				def.reject();
			}
		);
		return def.promise;
	}

	function registerPenjual(data) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + controller + '/RegisterPenjual',
			headers: getHeader(),
			data: data
		}).then(
			(res) => {
				message.info('Registrasi Berhasil, Periksa Email Anda Untuk Konfirmasi Email');
				def.resolve(res.data);
			},
			(err) => {
				message.error(err);
				def.reject();
			}
		);
		return def.promise;
	}

	function registerPembeli(data) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + controller + '/RegisterPembeli',
			headers: getHeader(),
			data: data
		}).then(
			(res) => {
				message.info('Registrasi Berhasil, Periksa Email Anda Untuk Konfirmasi Email');
				def.resolve(res.data);
			},
			(err) => {
				message.error(err);
				def.reject();
			}
		);
		return def.promise;
	}

	function getHeader() {
		try {
			if (userIsLogin()) {
				var token = getToken();
				return {
					'Content-Type': 'application/json',
					Authorization: token
				};
			}
			throw new Error('Not Found Token');
		} catch (err) {
			return {
				'Content-Type': 'application/json'
			};
		}
	}

	function logoff() {
		StorageService.clear();
		$state.go('login');
	}

	function getUserName() {
		if (userIsLogin) {
			var result = StorageService.getObject('user');
			return result.Username;
		}
	}

	function getToken() {
		var result = StorageService.getObject('user');
		return result.Token;
	}

	function userIsLogin() {
		var result = StorageService.getObject('user');
		if (result) {
			return true;
		}
		return false;
	}

	function userInRole(role) {
		var result = StorageService.getObject('user');
		if (result && result.role == role) {
			return true;
		}
		return false;
	}
}
