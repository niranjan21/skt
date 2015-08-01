'use strict';

(function() {
	// Payment entries Controller Spec
	describe('Payment entries Controller Tests', function() {
		// Initialize global variables
		var PaymentEntriesController,
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

			// Initialize the Payment entries controller.
			PaymentEntriesController = $controller('PaymentEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Payment entry object fetched from XHR', inject(function(PaymentEntries) {
			// Create sample Payment entry using the Payment entries service
			var samplePaymentEntry = new PaymentEntries({
				name: 'New Payment entry'
			});

			// Create a sample Payment entries array that includes the new Payment entry
			var samplePaymentEntries = [samplePaymentEntry];

			// Set GET response
			$httpBackend.expectGET('payment-entries').respond(samplePaymentEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.paymentEntries).toEqualData(samplePaymentEntries);
		}));

		it('$scope.findOne() should create an array with one Payment entry object fetched from XHR using a paymentEntryId URL parameter', inject(function(PaymentEntries) {
			// Define a sample Payment entry object
			var samplePaymentEntry = new PaymentEntries({
				name: 'New Payment entry'
			});

			// Set the URL parameter
			$stateParams.paymentEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/payment-entries\/([0-9a-fA-F]{24})$/).respond(samplePaymentEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.paymentEntry).toEqualData(samplePaymentEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PaymentEntries) {
			// Create a sample Payment entry object
			var samplePaymentEntryPostData = new PaymentEntries({
				name: 'New Payment entry'
			});

			// Create a sample Payment entry response
			var samplePaymentEntryResponse = new PaymentEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Payment entry'
			});

			// Fixture mock form input values
			scope.name = 'New Payment entry';

			// Set POST response
			$httpBackend.expectPOST('payment-entries', samplePaymentEntryPostData).respond(samplePaymentEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Payment entry was created
			expect($location.path()).toBe('/payment-entries/' + samplePaymentEntryResponse._id);
		}));

		it('$scope.update() should update a valid Payment entry', inject(function(PaymentEntries) {
			// Define a sample Payment entry put data
			var samplePaymentEntryPutData = new PaymentEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Payment entry'
			});

			// Mock Payment entry in scope
			scope.paymentEntry = samplePaymentEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/payment-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/payment-entries/' + samplePaymentEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid paymentEntryId and remove the Payment entry from the scope', inject(function(PaymentEntries) {
			// Create new Payment entry object
			var samplePaymentEntry = new PaymentEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Payment entries array and include the Payment entry
			scope.paymentEntries = [samplePaymentEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/payment-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePaymentEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.paymentEntries.length).toBe(0);
		}));
	});
}());