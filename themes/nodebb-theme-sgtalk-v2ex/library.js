'use strict';

const library = module.exports;

const escapeRoutes = [
	'/',
	'/recent',
	'/popular',
	'/categories',
	'/category/',
	'/topic/',
	'/user/',
	'/register',
	'/register/abort',
	'/login',
	'/logout',
	'/auth/google',
	'/confirm/',
	'/reset',
	'/assets/',
	'/plugins/',
];

library.allowRegistrationEscapeRoutes = async function (data) {
	data.allowed = Array.from(new Set([...(data.allowed || []), ...escapeRoutes]));
	return data;
};
