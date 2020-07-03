angular
	.module('guest.controller', [])
	.controller('guestController', guestController)
	.controller('guestHomeController', guestHomeController)
	.controller('detailController', detailController);

function guestController($scope, $state, AuthService) { }

function detailController($scope, $stateParams, $sce, ObjekService) {
	$scope.model;
	ObjekService.getById($stateParams.id).then((result) => {
		$scope.model = result;
		var mapOptions = {
			zoom: 7,
			center: new google.maps.LatLng(-2.722428, 140.627437),
			mapTypeId: google.maps.MapTypeId.TERRAIN
		}
	
		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	
		$scope.markers = [];
	
		var infoWindow = new google.maps.InfoWindow();
	
		var createMarker = function (info) {
	
			var marker = new google.maps.Marker({
				map: $scope.map,
				position: new google.maps.LatLng(parseFloat(info.longitude),parseFloat(info.latitude)),
				title: info.nama
			});
			marker.content = '<div class="infoWindowContent">' + info.keterangan + '</div>';
	
			google.maps.event.addListener(marker, 'click', function () {
				infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
				infoWindow.open($scope.map, marker);
			});
	
			$scope.markers.push(marker);
	
		}
		createMarker($scope.model);
		// for (i = 0; i < cities.length; i++) {
		// 	createMarker(cities[i]);
		// }
	
		$scope.openInfoWindow = function (e, selectedMarker) {
			e.preventDefault();
			google.maps.event.trigger(selectedMarker, 'click');
		}
	});


	var cities = [
		{
			city : 'Toronto',
			desc : 'This is the best city in the world!',
			lat : 140.709191,
			long : -2.578831
		}
	];

	
}

function guestHomeController($scope, KategoriService, $sce, $state, AuthService) {
	$scope.Categories = [];
	KategoriService.getAll().then((result) => {
		$scope.Categories = angular.copy(result);
	});
}
