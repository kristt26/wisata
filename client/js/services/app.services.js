angular
	.module('app.service', [
		'message.service',
		'auth.service',
		'storage.services',
		'helper.service',
		'data.service',
		'calon.service'
	])
	.controller('homeController', homeController);
