angular.module('app.fileinput.conponent', []).component('fileinput', {
	bindings: {
		model: '=',
		filename: '=',
		persyaratan: '=',
		showview: '@',
		height: '@',
		width: '@',
		name: '=',
		src: '@'
	},
	controller: function($scope, CalonSiswaService) {
		$scope.$ctrl.src = '';

		setTimeout((x) => {
			var inp = document.getElementById('data' + $scope.$ctrl.name);
			inp.addEventListener('change', function(e) {
				var files = e.target.files;
				var f = files[0];
				$scope.change(f);
				if (f) {
					var reader = new FileReader();
					reader.readAsDataURL(f);
					reader.onload = function(xx) {
						$scope.$apply((x) => {
							var data = reader.result.split(',');
							//$scope.$ctrl.model = data[1];
							$scope.$ctrl.persyaratan.file = data[1];
							CalonSiswaService.addBerkas($scope.$ctrl.persyaratan).then((x) => {
								$scope.$ctrl.filename = x.berkas;
								$scope.$ctrl.persyaratan.iddetailpersyaratan = x.iddetailpersyaratan;
							});
						});
					};
					reader.onerror = function(error) {
						$scope.$ctrl.model = null;
					};
				} else {
					$scope.$ctrl.model = null;
				}
			});
		}, 1000);

		$scope.change = (file) => {
			var d = 1;
		};

		$scope.openFile = function() {
			var inp = document.getElementById('data' + $scope.$ctrl.name);
			inp.click();
		};
	},
	templateUrl: 'client/js/components/templates/fileInput.html'
});
