'use strict';

//Setting up route
angular.module('leave-masters').config(['$stateProvider',
	function($stateProvider) {
		// Leave masters state routing
		$stateProvider.
		state('listLeaveMasters', {
			url: '/leave-masters',
			templateUrl: 'modules/leave-masters/views/list-leave-masters.client.view.html'
		}).
		state('createLeaveMaster', {
			url: '/leave-masters/create',
			templateUrl: 'modules/leave-masters/views/create-leave-master.client.view.html'
		}).
		state('viewLeaveMaster', {
			url: '/leave-masters/:leaveMasterId',
			templateUrl: 'modules/leave-masters/views/view-leave-master.client.view.html'
		}).
		state('editLeaveMaster', {
			url: '/leave-masters/:leaveMasterId/edit',
			templateUrl: 'modules/leave-masters/views/edit-leave-master.client.view.html'
		});
	}
]);