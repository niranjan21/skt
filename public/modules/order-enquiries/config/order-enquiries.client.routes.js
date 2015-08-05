'use strict';

//Setting up route
angular.module('order-enquiries').config(['$stateProvider',
	function($stateProvider) {
		// Order enquiries state routing
		$stateProvider.
		state('listOrderEnquiries', {
			url: '/order-enquiries',
			templateUrl: 'modules/order-enquiries/views/list-order-enquiries.client.view.html'
		}).
		state('createOrderEnquiry', {
			url: '/order-enquiries/create',
			templateUrl: 'modules/order-enquiries/views/create-order-enquiry.client.view.html'
		}).
		state('viewOrderEnquiry', {
			url: '/order-enquiries/:orderEnquiryId',
			templateUrl: 'modules/order-enquiries/views/view-order-enquiry.client.view.html'
		}).
		state('editOrderEnquiry', {
			url: '/order-enquiries/:orderEnquiryId/edit',
			templateUrl: 'modules/order-enquiries/views/edit-order-enquiry.client.view.html'
		});
	}
]);