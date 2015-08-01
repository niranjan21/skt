'use strict';

//Salary and wages entries service used to communicate Salary and wages entries REST endpoints
angular.module('salary-and-wages-entries').factory('SalaryAndWagesEntries', ['$resource',
	function($resource) {
		return $resource('salary-and-wages-entries/:salaryAndWagesEntryId', { salaryAndWagesEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);