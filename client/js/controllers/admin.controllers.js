angular
	.module('admin.controller', [])
	.controller('adminController', adminController)
	.controller('adminSiswaController', adminSiswaController)
	.controller('adminPengumumanController', adminPengumumanController)
	.controller('adminInformasiController', adminInformasiController)
	.controller('adminTahunAjaranController', adminTahunAjaranController)
	.controller('adminPersyaratanController', adminPersyartanController)
	.controller('adminHomeController', adminHomeController)
	.controller('adminSiswaDetailController', adminSiswaDetailController);

function adminController($scope, $state, AuthService) {
	if (!AuthService.userIsLogin()) {
		$state.go('login');
	}
}

function adminPersyartanController($scope, message, PersyaratanService, helperServices) {
	$scope.helper = helperServices;
	$scope.helper.IsBusy = true;
	PersyaratanService.get().then((result) => {
		$scope.helper.IsBusy = false;
		$scope.source = result;
	});

	$scope.edit = (model) => {
		$scope.model = angular.copy(model);
		$scope.title = 'Edit Persyaratan';
	};
	$scope.save = (model) => {
		$scope.helper.IsBusy = true;
		if (model.idpersyaratan) {
			PersyaratanService.put(model).then(
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
			PersyaratanService.post(model).then(
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
				PersyaratanService.delete(item.idpegawai).then((x) => {
					message.info('Data Berhasil Dihapus');
				});
			},
			(err) => {
				message.error('Data Gagal Dihapus');
			}
		);
	};
}
function adminSiswaController($scope, message, CalonSiswaService, helperServices, $state) {
	$scope.helper = helperServices;
	$scope.helper.IsBusy = true;

	CalonSiswaService.get().then(
		(result) => {
			$scope.source = result;
			$scope.helper.IsBusy = false;
			setTimeout(() => {
				exportTableToExcel();
			}, 2000);
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

	$scope.edit = (model) => {
		$scope.model = angular.copy(model);
		$scope.model.tanggallahir = new Date(model.tanggallahir);
		$scope.title = 'Edit Siswa';
	};
	$scope.detail = (model) => {
		$state.go('admin-detailsiswa', { id: model.idcalonsiswa }, { reload: true });
	};
	$scope.save = (model) => {
		$scope.helper.IsBusy = true;
		CalonSiswaService.saveCalonSiswa(model).then(
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

function adminSiswaDetailController($scope, message, CalonSiswaService, helperServices, $stateParams) {
	$scope.helper = helperServices;
	$scope.helper.IsBusy = true;
	CalonSiswaService.getById($stateParams.id).then(
		(result) => {
			$scope.source = result;
			$scope.helper.IsBusy = false;
		},
		(err) => {
			$scope.helper.IsBusy = false;
		}
	);

	$scope.edit = (model) => {
		$scope.model = angular.copy(model);
		$scope.model.tanggallahir = new Date(model.tanggallahir);
		$scope.title = 'Edit Siswa';
	};
	$scope.view = (model) => {
		$scope.File = helperServices.url + '/client/berkas/' + model.berkas;
		$('#ViewDocument').modal('show');
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
}
function adminPengumumanController($scope, message, ContentService, helperServices) {
	$scope.helper = helperServices;
	$scope.helper.IsBusy = true;
	ContentService.get().then((result) => {
		$scope.source = result;
		$scope.helper.IsBusy = false;
	});

	$scope.edit = (model) => {
		$scope.model = angular.copy(model);
		$scope.title = 'Edit Pengumuman';
	};
	$scope.save = (model) => {
		$scope.helper.IsBusy = true;
		if (model.idcontent) {
			ContentService.put(model).then(
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
			ContentService.post(model).then(
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
				ContentService.delete(item.idpegawai).then((x) => {
					message.info('Data Berhasil Dihapus');
				});
			},
			(err) => {
				message.error('Data Gagal Dihapus');
			}
		);
	};
}

function adminInformasiController($scope, ContentService, message, helperServices, TahunAjaranService) {
	$scope.helper = helperServices;
	$scope.helper.IsBusy = true;
	ContentService.get().then((result) => {
		$scope.source = result;
		$scope.helper.IsBusy = false;
	});

	$scope.edit = (model) => {
		$scope.model = angular.copy(model);
		$scope.title = 'Edit Informasi';
	};
	$scope.save = (model) => {
		$scope.helper.IsBusy = true;
		if (model.idcontent) {
			ContentService.put(model).then(
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
			ContentService.post(model).then(
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
				ContentService.delete(item.idpegawai).then((x) => {
					message.info('Data Berhasil Dihapus');
				});
			},
			(err) => {
				message.error('Data Gagal Dihapus');
			}
		);
	};
}
function adminTahunAjaranController($scope, message, TahunAjaranService, helperServices) {
	$scope.helper = helperServices;
	$scope.helper.IsBusy = true;
	TahunAjaranService.get().then((result) => {
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
		if (model.idtahunajaran) {
			TahunAjaranService.put(model).then(
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
			TahunAjaranService.post(model).then(
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
				TahunAjaranService.delete(item.idtahunajaran).then((x) => {
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
