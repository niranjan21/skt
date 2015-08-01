'use strict';

//Expense entries service used to communicate Expense entries REST endpoints
angular.module('expense-entries').factory('ExpenseEntries', ['$resource',
	function($resource) {
		return $resource('expense-entries/:expenseEntryId', { expenseEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);