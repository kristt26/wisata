angular.module('calon.service', []).factory('CalonSiswaService', CalonSiswaService);

function CalonSiswaService($http, $q, message, AuthService, helperServices, StorageService) {
	var service = {};
	service.siswa = {};
	service.Items = {};

	service.get = () => {
		var def = $q.defer();
		var url = helperServices.url + '/api/calonsiswa';
		if (service.instance) {
		} else {
			$http({
				method: 'Get',
				url: url,
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					service.Items = response.data;
					def.resolve(service.Items);
				},
				(err) => {
					message.error(err.data);
					helperServices.IsBusy = false;
					def.reject(err);
				}
			);
		}

		return def.promise;
	};

	service.getById = (id) => {
		var def = $q.defer();
		var url = helperServices.url + '/api/calonsiswa';
		$http({
			method: 'Get',
			url: url + '?idcalonsiswa=' + id,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				service.siswa = response.data;
				def.resolve(service.siswa);
			},
			(err) => {
				message.error(err.data);
				helperServices.IsBusy = false;
				def.reject(err);
			}
		);

		return def.promise;
	};

	service.saveCalonSiswa = function(model) {
		var def = $q.defer();
		var url = helperServices.url + '/api/calonsiswa';
		if (!model.idcalonsiswa) {
			$http({
				method: 'Post',
				url: url,
				headers: AuthService.getHeader(),
				data: model
			}).then(
				(response) => {
					service.siswa.idcalonsiswa = response.data.biodata.idcalonsiswa;
					StorageService.addObject('user', response.data);
					def.resolve(response.data);
				},
				(err) => {
					message.error(err.data);
					helperServices.IsBusy = false;
					def.reject(err);
				}
			);
		} else {
			$http({
				method: 'PUT',
				url: url,
				headers: AuthService.getHeader(),
				data: model
			}).then(
				(response) => {
					//update Item
					def.resolve(response.data);
				},
				(err) => {
					message.error(err.data);
					helperServices.IsBusy = false;
					def.reject(err);
				}
			);
		}

		return def.promise;
	};

	service.addBeasiswa = function(model, idcalonsiswa) {
		var def = $q.defer();
		var url = helperServices.url + '/api/beasiswa/' + idcalonsiswa;
		model.forEach((element) => {
			element.idcalonsiswa = service.siswa.idcalonsiswa;
		});

		$http({
			method: 'Post',
			url: url,
			headers: AuthService.getHeader(),
			data: model
		}).then(
			(response) => {
				response.data.forEach((item) => {
					var ortu = service.siswa.beasiswa.find((x) => x.idbeasiswa == item.idbeasiswa);
					ortu = item;
				});
				service.siswa.beasiswa = response.data;
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				helperServices.IsBusy = false;
				def.reject(err);
			}
		);
		return def.promise;
	};

	service.saveOrangTua = function(model) {
		var def = $q.defer();
		var url = helperServices.url + '/api/orangtua';
		model = model.filter((x) => x.nama).map((x) => {
			x.idcalonsiswa = service.siswa.idcalonsiswa;
			return x;
		});

		$http({
			method: 'Post',
			url: url,
			headers: AuthService.getHeader(),
			data: model
		}).then(
			(response) => {
				if (!service.siswa.orangtua) {
					service.siswa.orangtua = response.data;
				} else {
					response.data.forEach((item) => {
						var ortu = service.siswa.orangtua.find((x) => x.jenisorangtua == item.jenisorangtua);
						ortu = item;
					});
				}
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				helperServices.IsBusy = false;
				def.reject(err);
			}
		);

		return def.promise;
	};

	service.saveNilai = function(model) {
		var def = $q.defer();
		var url = helperServices.url + '/api/nilai';

		if (model.idnilai == undefined) model.idnilai = 0;
		model.idcalonsiswa = service.siswa.idcalonsiswa;

		$http({
			method: 'Post',
			url: url,
			headers: AuthService.getHeader(),
			data: model
		}).then(
			(response) => {
				service.siswa.nilai = response.data;
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				helperServices.IsBusy = false;
				def.reject(err);
			}
		);

		return def.promise;
	};

	service.addKesejahteraan = function(model, idcalonsiswa) {
		var def = $q.defer();
		var url = helperServices.url + '/api/kesejahteraan/' + idcalonsiswa;
		model.forEach((element) => {
			element.idcalonsiswa = service.siswa.idcalonsiswa;
		});

		$http({
			method: 'Post',
			url: url,
			headers: AuthService.getHeader(),
			data: model
		}).then(
			(response) => {
				response.data.forEach((item) => {
					var kesejahteraan = service.siswa.kesejahteraan.find(
						(x) => x.idkesejahteraan == item.idkesejahteraan
					);
					kesejahteraan = item;
				});
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				helperServices.IsBusy = false;
				def.reject(err);
			}
		);

		return def.promise;
	};

	service.addPrestasi = function(model, idcalonsiswa) {
		var def = $q.defer();
		var url = helperServices.url + '/api/prestasi/' + idcalonsiswa;

		model.forEach((element) => {
			element.idcalonsiswa = service.siswa.idcalonsiswa;
		});

		$http({
			method: 'Post',
			url: url,
			headers: AuthService.getHeader(),
			data: model
		}).then(
			(response) => {
				response.data.forEach((item) => {
					var prestasi = service.siswa.prestasi.find((x) => x.idprestasi == item.idprestasi);
					prestasi = item;
				});
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				helperServices.IsBusy = false;
				def.reject(err);
			}
		);

		return def.promise;
	};

	service.addBerkas = function(model) {
		var def = $q.defer();
		var url = helperServices.url + '/api/berkas';
		model.idcalonsiswa = service.siswa.idcalonsiswa;
		$http({
			method: 'Post',
			url: url,
			headers: AuthService.getHeader(),
			data: model
		}).then(
			(response) => {
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				helperServices.IsBusy = false;
				def.reject(err);
			}
		);
		return def.promise;
	};

	service.finish = function(idcalonsiswa) {
		var def = $q.defer();
		var url = helperServices.url + '/api/statusselesai?idcalonsiswa=' + idcalonsiswa;
		$http({
			method: 'Get',
			url: url,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				helperServices.IsBusy = false;
				def.reject(err);
			}
		);
		return def.promise;
	};

	return service;
}
