'use strict';

//Setting up route
angular.module('employee-masters').config(['$stateProvider',
	function($stateProvider) {
		// Employee masters state routing
		$stateProvider.
		state('listEmployeeMasters', {
			url: '/employee-masters',
			templateUrl: 'modules/employee-masters/views/list-employee-masters.client.view.html'
		}).
		state('createEmployeeMaster', {
			url: '/employee-masters/create',
			templateUrl: 'modules/employee-masters/views/create-employee-master.client.view.html'
		}).
		state('viewEmployeeMaster', {
			url: '/employee-masters/:employeeMasterId',
			templateUrl: 'modules/employee-masters/views/view-employee-master.client.view.html'
		}).
		state('editEmployeeMaster', {
			url: '/employee-masters/:employeeMasterId/edit',
			templateUrl: 'modules/employee-masters/views/edit-employee-master.client.view.html'
		});
	}
]);