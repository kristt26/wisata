angular
	.module('siswa.controller', [])
	.controller('siswaController', siswaController)
	.controller('siswaProfileController', siswaProfileController)
	.controller('siswaPengumumanController', siswaPengumumanController)
	.controller('siswaHomeController', siswaHomeController);

function siswaController($scope, $state, AuthService, StorageService) {
	if (!AuthService.userIsLogin()) {
		$state.go('login');
	} else {
		$scope.siswa = StorageService.getObject('user');
	}
}

function siswaHomeController($scope, AuthService, CalonSiswaService) {}

function siswaProfileController($scope, AuthService, CalonSiswaService, TahunAjaranService) {
	AuthService.profile().then((profile) => {
		CalonSiswaService.getById(profile.biodata.idcalonsiswa).then((data) => {
			$scope.model = data;
			TahunAjaranService.get().then((result) => {
				$scope.taActive = result.find((x) => x.status);
			});
		});
	});

	$scope.print = () => {
		setTimeout(() => {
			window.print();
		}, 3000);
	};
}

function siswaPengumumanController($scope, AuthService, TahunAjaranService) {
	$scope.pengumuman = false;
	$scope.belumAdaPengumuman = false;
	TahunAjaranService.get().then((ta) => {
		var taActive = ta.find((x) => x.status);
		if (taActive.pengumuman) {
			$scope.pengumuman = true;
		} else {
			$scope.belumAdaPengumuman = true;
		}

		AuthService.profile().then((profile) => {
			if (profile.biodata.status) {
				// $scope.pengumuman = true;
				if (profile.biodata.status == '1') {
					profile.biodata.status = 'Lulus';
				} else {
					profile.biodata.status = 'Tidak Lulus';
				}
			}
			$scope.model = profile;
		});
	});
}
