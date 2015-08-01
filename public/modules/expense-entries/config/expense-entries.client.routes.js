'use strict';

//Setting up route
angular.module('expense-entries').config(['$stateProvider',
	function($stateProvider) {
		// Expense entries state routing
		$stateProvider.
		state('listExpenseEntries', {
			url: '/expense-entries',
			templateUrl: 'modules/expense-entries/views/list-expense-entries.client.view.html'
		}).
		state('createExpenseEntry', {
			url: '/expense-entries/create',
			templateUrl: 'modules/expense-entries/views/create-expense-entry.client.view.html'
		}).
		state('viewExpenseEntry', {
			url: '/expense-entries/:expenseEntryId',
			templateUrl: 'modules/expense-entries/views/view-expense-entry.client.view.html'
		}).
		state('editExpenseEntry', {
			url: '/expense-entries/:expenseEntryId/edit',
			templateUrl: 'modules/expense-entries/views/edit-expense-entry.client.view.html'
		});
	}
]);