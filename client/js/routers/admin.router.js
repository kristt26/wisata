angular.module('admin.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('admin', {
			url: '/admin',
			controller: 'adminController',
			templateUrl: './client/views/admin/index.html'
		})
		.state('admin-home', {
			url: '/home',
			parent: 'admin',
			controller: 'adminHomeController',
			templateUrl: './client/views/admin/home.html'
		})
		.state('admin-gambar', {
			url: '/gambar',
			parent: 'admin',
			controller: 'adminGambarController',
			templateUrl: './client/views/admin/gambar.html'
		})
		.state('admin-ta', {
			url: '/kategori',
			parent: 'admin',
			controller: 'adminKategoriController',
			templateUrl: './client/views/admin/tahunajaran.html'
		})
		.state('admin-objek', {
			url: '/objek',
			parent: 'admin',
			controller: 'adminObjekController',
			templateUrl: './client/views/admin/objek.html'
		});
});
