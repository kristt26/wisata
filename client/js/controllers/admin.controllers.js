angular
	.module('admin.controller', [])
	.controller('adminController', adminController)
	.controller('adminGambarController', adminGambarController)
	.controller('adminKategoriController', adminKategoriController)
	.controller('adminObjekController', adminObjekController)
	.controller('adminHomeController', adminHomeController)

function adminController($scope, $state, AuthService) {
	if (!AuthService.userIsLogin()) {
		$state.go('login');
	}
}

function adminObjekController($scope, message, ObjekService, helperServices, KategoriService) {
	$scope.helper = helperServices;
	$scope.helper.IsBusy = true;
	$scope.itemkategori = {};
	ObjekService.get().then((result) => {
		$scope.helper.IsBusy = false;
		$scope.source = result;
		KategoriService.get().then((x)=>{
			$scope.Kategori = x;
		})
	});

	$scope.edit = (model) => {
		$scope.model = angular.copy(model);
		$scope.title = 'Edit Persyaratan';
		$scope.itemkategori = $scope.Kategori.find(x=>x.idkategori==model.idkategori);
	};
	$scope.save = (model) => {
		$scope.helper.IsBusy = true;
		model.idkategori =  $scope.itemkategori.idkategori;
		if (model.idobjek) {
			ObjekService.put(model).then(
				(x) => {
					$scope.helper.IsBusy = false;
					message.info('Data Berhasil Disimpan');
					$('#exampleModal').modal('hide') 
				},
				(err) => {
					$scope.helper.IsBusy = false;
					message.error('Data Gagal Disimpan');
				}
			);
		} else {
			ObjekService.post(model).then(
				(result) => {
					$scope.helper.IsBusy = false;
					message.info('Data Berhasil Disimpan');
					$('#exampleModal').modal('hide') 
				},
				(err) => {
					$scope.helper.IsBusy = false;
					message.error('Data Gagal Disimpan');
				}
			);
		}
	};

	$scope.delete = (item) => {
		message.dialog().then(
			(x) => {
				ObjekService.delete(item.objek).then((x) => {
					message.info('Data Berhasil Dihapus');
				});
			},
			(err) => {
				message.error('Data Gagal Dihapus');
			}
		);
	};
}
function adminGambarController($scope, message, GambarService,  helperServices, $state) {
	$scope.helper = helperServices;
	$scope.helper.IsBusy = true;
	

	GambarService.get().then(
		(result) => {
			$scope.source = result;
			$scope.helper.IsBusy = false;
		},
		(err) => {
			$scope.helper.IsBusy = false;
		}
	);
	$scope.stringnumber = (number) => {
		var str = '' + number;
		while (str.length < 3) {
			str = '0' + str;
		}
		return str;
	};

	$scope.Selec = (item)=>{
		$scope.Objek=item;
		
	}

	$scope.edit = (model) => {
		$scope.model = angular.copy(model);
		$scope.model.tanggallahir = new Date(model.tanggallahir);
		$scope.title = 'Edit Siswa';
	};
	$scope.detail = (model) => {
		$state.go('admin-detailsiswa', { id: model.idcalonsiswa }, { reload: true });
	};
	$scope.save = (model) => {
		model.idobjek= $scope.ItemObjek.idobjek;
		$scope.helper.IsBusy = true;
		GambarService.post(model).then(
			(x) => {
				$scope.helper.IsBusy = false;
				message.info('Data Berhasil Disimpan');
			},
			(err) => {
				$scope.helper.IsBusy = false;
				message.error('Data Gagal Disimpan');
			}
		);
	};

	$scope.delete = (item) => {
		message.dialog().then(
			(x) => {
				SiswaService.delete(item.idsiswa).then((x) => {
					message.info('Data Berhasil Dihapus');
				});
			},
			(err) => {
				message.error('Data Gagal Dihapus');
			}
		);
	};

	$scope.download = () => {
		var downloadLink;
		var filename = 'calonsiswa';
		var dataType = 'application/vnd.ms-excel';
		var tableSelect = document.getElementById('tableSiswa');
		var tableHTML = tableSelect.outerHTML;
		filename = filename ? filename + '.xls' : 'excel_data.xls';
		downloadLink = document.createElement('a');
		var download = document.getElementById('download');
		download.appendChild(downloadLink);
		window.open('data:' + dataType + ',' + encodeURIComponent(tableHTML));
	};
}

function adminKategoriController($scope, message, KategoriService, helperServices) {
	$scope.helper = helperServices;
	$scope.helper.IsBusy = true;
	KategoriService.get().then((result) => {
		$scope.source = result;
		$scope.helper.IsBusy = false;
	});

	$scope.edit = (model) => {
		$scope.model = angular.copy(model);
		$scope.model.tanggalbuka = new Date(model.tanggalbuka);
		$scope.model.tanggaltutup = new Date(model.tanggaltutup);
		$scope.title = 'Edit Tahun Ajaran';
	};
	$scope.save = (model) => {
		$scope.helper.IsBusy = true;
		if (model.idkategori) {
			KategoriService.put(model).then(
				(x) => {
					$scope.helper.IsBusy = false;
					message.info('Data Berhasil Disimpan');
				},
				(err) => {
					$scope.helper.IsBusy = false;
					message.error('Data Gagal Disimpan');
				}
			);
		} else {
			KategoriService.post(model).then(
				(result) => {
					$scope.helper.IsBusy = false;
					message.info('Data Berhasil Disimpan');
				},
				(err) => {
					$scope.helper.IsBusy = false;
					message.error('Data Gagal Disimpan');
				}
			);
		}
	};

	$scope.delete = (item) => {
		message.dialog().then(
			(x) => {
				KategoriService.delete(item.idkategori).then((x) => {
					message.info('Data Berhasil Dihapus');
				});
			},
			(err) => {
				message.error('Data Gagal Dihapus');
			}
		);
	};
}

function adminHomeController($scope, $state, AuthService) {}
