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
		.state('admin-siswa', {
			url: '/siswa',
			parent: 'admin',
			controller: 'adminSiswaController',
			templateUrl: './client/views/admin/siswa.html'
		})
		.state('admin-detailsiswa', {
			url: '/siswadetail/:id',
			parent: 'admin',
			controller: 'adminSiswaDetailController',
			templateUrl: './client/views/admin/siswadetail.html'
		})
		.state('admin-ta', {
			url: '/tahunajaran',
			parent: 'admin',
			controller: 'adminTahunAjaranController',
			templateUrl: './client/views/admin/tahunajaran.html'
		})
		.state('admin-pengumuman', {
			url: '/pengumuman',
			parent: 'admin',
			controller: 'adminPengumumanController',
			templateUrl: './client/views/admin/pengumuman.html'
		})
		.state('admin-informasi', {
			url: '/informasi',
			parent: 'admin',
			controller: 'adminInformasiController',
			templateUrl: './client/views/admin/informasi.html'
		})
		.state('admin-persyaratan', {
			url: '/persyaratan',
			parent: 'admin',
			controller: 'adminPersyaratanController',
			templateUrl: './client/views/admin/persyaratan.html'
		});
});
