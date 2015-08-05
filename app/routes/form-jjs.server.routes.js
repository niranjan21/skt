'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var formJjs = require('../../app/controllers/form-jjs.server.controller');

	// Form jjs Routes
	app.route('/form-jjs')
		.get(formJjs.list)
		.post(users.requiresLogin, formJjs.create);

	app.route('/form-jjs/:formJjId')
		.get(formJjs.read)
		.put(users.requiresLogin, formJjs.hasAuthorization, formJjs.update)
		.delete(users.requiresLogin, formJjs.hasAuthorization, formJjs.delete);

	// Finish by binding the Form jj middleware
	app.param('formJjId', formJjs.formJjByID);
};
