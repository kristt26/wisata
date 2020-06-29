angular.module('account.router', [ 'ui.router' ]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('account', {
			url: '/account',
			templateUrl: './client/views/account/index.html'
		})
		.state('login', {
			url: '/login',
			parent: 'account',
			controller: 'LoginController',
			templateUrl: './client/views/account/sign-in.html'
		})
		.state('registrasi', {
			url: '/registrasi',
			parent: 'account',
			controller: 'registrasiController',
			templateUrl: './client/views/account/sign-up.html'
		});
});
