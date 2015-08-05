'use strict';

//Yarn returns service used to communicate Yarn returns REST endpoints
angular.module('yarn-returns').factory('YarnReturns', ['$resource',
	function($resource) {
		return $resource('yarn-returns/:yarnReturnId', { yarnReturnId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);