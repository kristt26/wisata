angular
	.module('data.service', [])
	.factory('GambarService', GambarService)
	.factory('SiswaService', SiswaService)
	.factory('ObjekService', ObjekService)
	.factory('KategoriService', KategoriService);

function GambarService($http, $q, message, AuthService, helperServices) {
	var url = helperServices.url + '/api/gambar';
	var service = {
		Items: []
	};

	service.get = function() {
		var def = $q.defer();
		if (service.instance) {
			def.resolve(service.Items);
		} else {
			$http({
				method: 'Get',
				url: url,
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					service.instance = true;
					service.Items = response.data;
					def.resolve(service.Items);
				},
				(err) => {
					message.error(err.data);
					def.reject(err);
				}
			);
		}

		return def.promise;
	};

	service.getById = function(id) {
		var def = $q.defer();
		if (service.instance) {
			var data = service.Items.find((x) => x.idcontent == id);
			def.resolve(data);
		} else {
			$http({
				method: 'Get',
				url: url + '/' + id,
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					service.Items.push(response.data);
					def.resolve(response.data);
				},
				(err) => {
					message.error(err.data);
					def.reject(err);
				}
			);
		}

		return def.promise;
	};

	service.getPengumuman = function() {
		var def = $q.defer();
		if (service.instance) {
			var data = service.Items.find((x) => x.type == 'pengumuman');
			def.resolve(data);
		} else {
			service.get().then((result) => {
				var data = result.Items.find((x) => x.type == 'pengumuman');
				def.resolve(data);
			});
		}

		return def.promise;
	};

	service.getInformasi = function() {
		var def = $q.defer();
		if (service.instance) {
			var data = service.Items.find((x) => x.type == 'informasi');
			def.resolve(data);
		} else {
			service.get().then((result) => {
				var data = result.Items.find((x) => x.type == 'informasi');
				def.resolve(data);
			});
		}

		return def.promise;
	};

	service.post = function(param) {
		var def = $q.defer();
		$http({
			method: 'Post',
			url: url,
			headers: AuthService.getHeader(),
			data: param
		}).then(
			(response) => {
				var data = service.Items.find((x)=>x.idobjek==param.idobjek);
				data.gambar.push(response.data)
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				def.reject(err);
			}
		);

		return def.promise;
	};

	service.put = function(param) {
		var def = $q.defer();
		$http({
			method: 'Put',
			url: url,
			headers: AuthService.getHeader(),
			data: param
		}).then(
			(response) => {
				var data = service.Items.find((x) => x.idcontent == param.idcontent);
				if (data) {
					data.content = param.content;
					data.publish = param.publish;
					data.created = param.created;
					data.title = param.title;
				}
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				def.reject(err);
			}
		);
		return def.promise;
	};

	service.delete = function(id) {
		var def = $q.defer();
		$http({
			method: 'Delete',
			url: url + '/' + id,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				var data = service.Items.find((x) => x.idpegawai == id);
				if (data) {
					var index = service.Items.indexOf(data);
					service.Items.splice(index, 1);
					def.resolve(true);
				}
			},
			(err) => {
				message.error(err.data);
				def.reject(err);
			}
		);
		return def.promise;
	};

	return service;
}

function SiswaService($http, $q, message, AuthService, helperServices) {
	var url = helperServices.url + '/api/siswa';
	var service = { Items: [] };

	service.get = function() {
		var def = $q.defer();
		if (service.instance) {
			def.resolve(service.Items);
		} else {
			$http({
				method: 'Get',
				url: url,
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					service.instance = true;
					service.Items = response.data;
					def.resolve(service.Items);
				},
				(err) => {
					message.error(err.data);
					def.reject(err);
				}
			);
		}

		return def.promise;
	};

	service.getById = function(id) {
		var def = $q.defer();
		if (service.instance) {
			var data = service.Items.find((x) => x.idkategori == id);
			def.resolve(data);
		} else {
			$http({
				method: 'Get',
				url: url + '/' + id,
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					service.Items.push(response.data);
					def.resolve(response.data);
				},
				(err) => {
					message.error(err.data);
					def.reject(err);
				}
			);
		}

		return def.promise;
	};

	service.post = function(param) {
		var def = $q.defer();
		$http({
			method: 'Post',
			url: url,
			headers: AuthService.getHeader(),
			data: param
		}).then(
			(response) => {
				service.Items.push(response.data);
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				def.reject(err);
			}
		);

		return def.promise;
	};

	service.put = function(param) {
		var def = $q.defer();
		$http({
			method: 'Put',
			url: url,
			headers: AuthService.getHeader(),
			data: param
		}).then(
			(response) => {
				var data = service.Items.find((x) => x.idsiswa == param.idsiswa);
				if (data) {
					data.nis = param.nis;
					data.nama = param.nama;
					data.jeniskelamin = param.jeniskelamin;
					data.jurusan = param.jurusan;
					data.alamat = param.alamat;
					data.kontak = param.kontak;
					data.kelas = param.kelas;
					data.tempatlahir = param.tempatlahir;
					data.tanggallahir = param.tanggallahir;
				}

				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				def.reject(err);
			}
		);
		return def.promise;
	};

	service.delete = function(id) {
		var def = $q.defer();
		$http({
			method: 'Delete',
			url: url + '/' + id,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				var data = service.Items.find((x) => x.idsiswa == id);
				if (data) {
					var index = service.Items.indexOf(data);
					service.Items.splice(index, 1);
					def.resolve(true);
				}
			},
			(err) => {
				message.error(err.data);
				def.reject(err);
			}
		);
		return def.promise;
	};

	return service;
}

function ObjekService($http, $q, message, AuthService, helperServices) {
	var url = helperServices.url + '/api/objek';
	var service = {
		Items: []
	};

	service.get = function() {
		var def = $q.defer();
		if (service.instance) {
			def.resolve(service.Items);
		} else {
			$http({
				method: 'Get',
				url: url,
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					service.instance = true;
					if (!response.data) {
						service.Items = [];
					} else service.Items = response.data;
					def.resolve(service.Items);
				},
				(err) => {
					message.error(err.data);
					def.reject(err);
				}
			);
		}

		return def.promise;
	};

	service.getById = function(id) {
		var def = $q.defer();
		service.get().then((x)=>{
			var data = service.Items.find((x) => x.idobjek == id);
			def.resolve(data);
		})
		return def.promise;
	};

	service.post = function(param) {
		var def = $q.defer();
		$http({
			method: 'Post',
			url: url,
			headers: AuthService.getHeader(),
			data: param
		}).then(
			(response) => {
				param.idobjek = response.data;
				service.Items.push(angular.copy(param));
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				def.reject(err);
			}
		);

		return def.promise;
	};

	service.put = function(param) {
		var def = $q.defer();
		$http({
			method: 'Put',
			url: url,
			headers: AuthService.getHeader(),
			data: param
		}).then(
			(response) => {
				var data = service.Items.find((x) => x.idobjek == param.idobjek);
				if (data) {
					data.nama = param.nama;
					data.longitude = param.longitude;
					data.latitude = param.latitude;
					data.keterangan = param.keterangan;
				}
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				def.reject(err);
			}
		);
		return def.promise;
	};

	service.delete = function(param) {
		var def = $q.defer();
		$http({
			method: 'Delete',
			url: url + '/' + param,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				var index = service.Items.indexOf(param);
				service.Items.splice(index, 1);
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				def.reject(err);
			}
		);
		return def.promise;
	};

	return service;
}

function KategoriService($http, $q, message, AuthService, helperServices) {
	var url = helperServices.url + '/api/kategori';
	var service = {
		Items: []
	};

	service.get = function() {
		var def = $q.defer();
		if (service.instance) {
			def.resolve(service.Items);
		} else {
			$http({
				method: 'Get',
				url: url+"/1",
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					service.instance = true;
					if (!response.data) {
						service.Items = [];
					} else service.Items = response.data;
					def.resolve(service.Items);
				},
				(err) => {
					message.error(err.data);
					def.reject(err);
				}
			);
		}

		return def.promise;
	};

	service.getAll = function() {
		var def = $q.defer();
		if (service.instance) {
			def.resolve(service.Items);
		} else {
			$http({
				method: 'Get',
				url: url,
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					service.instance = true;
					if (!response.data) {
						service.Items = [];
					} else service.Items = response.data;
					def.resolve(service.Items);
				},
				(err) => {
					message.error(err.data);
					def.reject(err);
				}
			);
		}

		return def.promise;
	};

	service.getById = function(id) {
		var def = $q.defer();
		if (service.instance) {
			var data = service.Items.find((x) => x.idkategori == id);
			def.resolve(data);
		} else {
			$http({
				method: 'Get',
				url: url + '/' + id,
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					service.Items.push(response.data);
					def.resolve(response.data);
				},
				(err) => {
					message.error(err.data);
					def.reject(err);
				}
			);
		}

		return def.promise;
	};

	service.post = function(param) {
		var def = $q.defer();
		$http({
			method: 'Post',
			url: url,
			headers: AuthService.getHeader(),
			data: param
		}).then(
			(response) => {
				param.idkategori = response.data
				service.Items.push(angular.copy(param));
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				def.reject(err);
			}
		);

		return def.promise;
	};

	service.put = function(param) {
		var def = $q.defer();
		$http({
			method: 'Put',
			url: url,
			headers: AuthService.getHeader(),
			data: param
		}).then(
			(response) => {
				var data = service.Items.find((x) => x.idkategori == param.idkategori);
				if (data) {
					data.nama = param.nama;
					data.keterangan = param.keterangan;
				}
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				def.reject(err);
			}
		);
		return def.promise;
	};

	service.delete = function(param) {
		var def = $q.defer();
		$http({
			method: 'Delete',
			url: url + '/' + param,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				var index = service.Items.indexOf(param);
				service.Items.splice(index, 1);
				def.resolve(response.data);
			},
			(err) => {
				message.error(err.data);
				def.reject(err);
			}
		);
		return def.promise;
	};

	return service;
}
