angular.module('app.fileinput.conponent', []).component('fileinput', {
	bindings: {
		model: '=',
		showview: '<',
		height: '<',
		width: '<',
		idname: '<',
		src: '<'
	},
	controller: function($scope) {
		$scope.fileName = 'test';
		setTimeout((x) => {
			var inp = document.getElementById($scope.$ctrl.idname);
			inp.addEventListener('change', function(e) {
				var files = e.target.files;
				var f = files[0];
				$scope.change(f);
				if (f) {
					var reader = new FileReader();
					reader.readAsDataURL(f);
					reader.onload = function(xx) {
						$scope.$apply((x) => {
							$scope.$ctrl.fileName = f.name;
							var data = reader.result.split(',');
							$scope.$ctrl.model = data[1];
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
			var inp = document.getElementById($scope.$ctrl.idname);
			inp.click();
		};
	},
	templateUrl: 'client/js/components/templates/fileInput.html'
});
