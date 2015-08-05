'use strict';

(function() {
	// Order enquiries Controller Spec
	describe('Order enquiries Controller Tests', function() {
		// Initialize global variables
		var OrderEnquiriesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Order enquiries controller.
			OrderEnquiriesController = $controller('OrderEnquiriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Order enquiry object fetched from XHR', inject(function(OrderEnquiries) {
			// Create sample Order enquiry using the Order enquiries service
			var sampleOrderEnquiry = new OrderEnquiries({
				name: 'New Order enquiry'
			});

			// Create a sample Order enquiries array that includes the new Order enquiry
			var sampleOrderEnquiries = [sampleOrderEnquiry];

			// Set GET response
			$httpBackend.expectGET('order-enquiries').respond(sampleOrderEnquiries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderEnquiries).toEqualData(sampleOrderEnquiries);
		}));

		it('$scope.findOne() should create an array with one Order enquiry object fetched from XHR using a orderEnquiryId URL parameter', inject(function(OrderEnquiries) {
			// Define a sample Order enquiry object
			var sampleOrderEnquiry = new OrderEnquiries({
				name: 'New Order enquiry'
			});

			// Set the URL parameter
			$stateParams.orderEnquiryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/order-enquiries\/([0-9a-fA-F]{24})$/).respond(sampleOrderEnquiry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderEnquiry).toEqualData(sampleOrderEnquiry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(OrderEnquiries) {
			// Create a sample Order enquiry object
			var sampleOrderEnquiryPostData = new OrderEnquiries({
				name: 'New Order enquiry'
			});

			// Create a sample Order enquiry response
			var sampleOrderEnquiryResponse = new OrderEnquiries({
				_id: '525cf20451979dea2c000001',
				name: 'New Order enquiry'
			});

			// Fixture mock form input values
			scope.name = 'New Order enquiry';

			// Set POST response
			$httpBackend.expectPOST('order-enquiries', sampleOrderEnquiryPostData).respond(sampleOrderEnquiryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Order enquiry was created
			expect($location.path()).toBe('/order-enquiries/' + sampleOrderEnquiryResponse._id);
		}));

		it('$scope.update() should update a valid Order enquiry', inject(function(OrderEnquiries) {
			// Define a sample Order enquiry put data
			var sampleOrderEnquiryPutData = new OrderEnquiries({
				_id: '525cf20451979dea2c000001',
				name: 'New Order enquiry'
			});

			// Mock Order enquiry in scope
			scope.orderEnquiry = sampleOrderEnquiryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/order-enquiries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/order-enquiries/' + sampleOrderEnquiryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid orderEnquiryId and remove the Order enquiry from the scope', inject(function(OrderEnquiries) {
			// Create new Order enquiry object
			var sampleOrderEnquiry = new OrderEnquiries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Order enquiries array and include the Order enquiry
			scope.orderEnquiries = [sampleOrderEnquiry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/order-enquiries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOrderEnquiry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.orderEnquiries.length).toBe(0);
		}));
	});
}());