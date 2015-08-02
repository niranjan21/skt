'use strict';

//General invoice registers service used to communicate General invoice registers REST endpoints
angular.module('general-invoice-registers').factory('GeneralInvoiceRegisters', ['$resource',
	function($resource) {
		return $resource('general-invoice-registers/:generalInvoiceRegisterId', { generalInvoiceRegisterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);