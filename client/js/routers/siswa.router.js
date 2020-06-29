angular.module('siswa.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('siswa', {
			url: '/siswa',
			controller: 'siswaController',
			templateUrl: './client/views/siswa/index.html'
		})
		.state('siswa-home', {
			url: '/home',
			parent: 'siswa',
			controller: 'siswaHomeController',
			templateUrl: './client/views/siswa/home.html'
		})
		.state('siswa-profile', {
			url: '/profile',
			parent: 'siswa',
			controller: 'siswaProfileController',
			templateUrl: './client/views/siswa/profile.html'
		})
		.state('siswa-pengumuman', {
			url: '/pengumuman',
			parent: 'siswa',
			controller: 'siswaPengumumanController',
			templateUrl: './client/views/siswa/pengumuman.html'
		})
		.state('siswa-edit', {
			url: '/edit',
			parent: 'siswa',
			controller: 'daftarController',
			templateUrl: './client/views/guest/daftar.html'
		});
});
