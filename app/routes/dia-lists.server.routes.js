'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var diaLists = require('../../app/controllers/dia-lists.server.controller');

	// Dia lists Routes
	app.route('/dia-lists')
		.get(diaLists.list)
		.post(users.requiresLogin, diaLists.create);

	app.route('/dia-lists/:diaListId')
		.get(diaLists.read)
		.put(users.requiresLogin, diaLists.hasAuthorization, diaLists.update)
		.delete(users.requiresLogin, diaLists.hasAuthorization, diaLists.delete);

	// Finish by binding the Dia list middleware
	app.param('diaListId', diaLists.diaListByID);
};
