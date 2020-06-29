angular.module('message.service', []).factory('ChatService', ChatService).factory('message', MessageServices);

function MessageServices(swangular, $q, $state) {
	return { info: info, error: error, warning: warning, dialog: dialog };

	function info(params) {
		swangular.swal({
			title: 'Sukses',
			text: params,
			type: 'info'
		});
	}

	function error(params) {
		var message = params;
		var title = 'Error';
		if (params && params.status) {
			switch (params.status) {
				case 400:
					message = params.data;
					break;
				case 401:
					title = 'Unauthorize';
					message = 'Anda Tidak Memiliki Akses';
					if (params.data && params.data != '') message = params.data;
					setTimeout(() => {
						$state.go('login');
					}, 500);
					break;
				case 404:
					title = 'Link Not Found';
					message = 'URL Not Found';
					break;

				default:
					break;
			}
		}
		if (!message) message = 'Terjadi Kesalahan';

		swangular.swal({
			title: title,
			text: message,
			type: 'error'
		});
	}

	function warning(params) {
		swangular.swal({
			title: 'Sukses',
			text: params,
			type: 'warning'
		});
	}

	function dialog(messageText, yesBtn, cancelBtn) {
		var def = $q.defer();
		var yesText = 'Ya';
		var cancelText = 'Batal';

		if (yesBtn) yesText = yesBtn;

		if (cancelBtn) cancelText = cancelBtn;

		swangular
			.swal({
				title: 'Yakin ?',
				text: messageText,
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: yesText,
				cancelButtonText: cancelText,
				reverseButtons: true
			})
			.then((result) => {
				if (result.value) {
					def.resolve(result.value);
				} else {
					def.reject(result.value);
				}
			});

		return def.promise;
	}
}

function ChatService($http, message, helperServices, $q, AuthService, $rootScope) {
	var service = {};
	service.idpengirim = null;
	service.idpenerima = null;
	service.isOpened = false;
	service.signalR = null;

	service.startSignalR = () => {
		service.signalR = new signalR.HubConnectionBuilder()
			.withUrl('/chatHub', { accessTokenFactory: () => AuthService.getToken() })
			.configureLogging(signalR.LogLevel.Information)
			.build();

		service.signalR.start();
	};

	service.sendChat = (user, message) => {
		service.signalR.invoke('SendMessage', user, message).catch((err) => {
			console.error(err.toString());
		});
	};

	service.post = (data) => {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + '/api/chat',
			headers: AuthService.getHeader(),
			data: data
		}).then(
			(response) => {
				def.resolve(response.data);
			},
			(err) => {
				message.error(err);
				def.reject(err);
			}
		);
		return def.promise;
	};

	service.get = () => {
		var def = $q.defer();
		$http({
			method: 'get',
			url: helperServices.url + '/api/chat',
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				def.resolve(response.data);
			},
			(err) => {
				message.error(err);
				def.reject(err);
			}
		);
		return def.promise;
	};

	service.getchatwith = (id) => {
		var def = $q.defer();
		$http({
			method: 'get',
			url: helperServices.url + '/api/chat/chatwith/' + id,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				def.resolve(response.data);
			},
			(err) => {
				message.error(err);
				def.reject(err);
			}
		);
		return def.promise;
	};

	service.chatWith = (idpenerima) => {
		$rootScope.$broadcast('openChat', idpenerima);
	};

	return service;
}
