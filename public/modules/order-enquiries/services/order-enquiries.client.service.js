'use strict';

//Order enquiries service used to communicate Order enquiries REST endpoints
angular.module('order-enquiries').factory('OrderEnquiries', ['$resource',
	function($resource) {
		return $resource('order-enquiries/:orderEnquiryId', { orderEnquiryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);