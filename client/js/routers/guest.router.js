angular.module('guest.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/guest/home');
	$stateProvider
		.state('guest', {
			url: '/guest',
			controller: 'guestController',
			templateUrl: './client/views/guest/index.html'
		})
		.state('guest-home', {
			url: '/home',
			parent: 'guest',
			controller: 'guestHomeController',
			templateUrl: './client/views/guest/home.html'
		})
		.state('guest-daftar', {
			url: '/daftar',
			parent: 'guest',
			controller: 'daftarController',
			templateUrl: './client/views/guest/daftar.html'
		})
		.state('guest-informasi', {
			url: '/informasi',
			parent: 'guest',
			controller: 'informasiController',
			templateUrl: './client/views/guest/informasi.html'
		})
		.state('guest-pengumuman', {
			url: '/pengumuman',
			parent: 'guest',
			controller: 'pengumumanController',
			templateUrl: './client/views/guest/pengumuman.html'
		})
		.state('guest-detail', {
			url: '/detail/:id',
			parent: 'guest',
			controller: 'detailController',
			templateUrl: './client/views/guest/detail.html'
		});
});
