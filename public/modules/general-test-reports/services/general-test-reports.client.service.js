'use strict';

//General test reports service used to communicate General test reports REST endpoints
angular.module('general-test-reports').factory('GeneralTestReports', ['$resource',
	function($resource) {
		return $resource('general-test-reports/:generalTestReportId', { generalTestReportId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);