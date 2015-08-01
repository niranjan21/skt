'use strict';

(function() {
	// Delivery entries Controller Spec
	describe('Delivery entries Controller Tests', function() {
		// Initialize global variables
		var DeliveryEntriesController,
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

			// Initialize the Delivery entries controller.
			DeliveryEntriesController = $controller('DeliveryEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Delivery entry object fetched from XHR', inject(function(DeliveryEntries) {
			// Create sample Delivery entry using the Delivery entries service
			var sampleDeliveryEntry = new DeliveryEntries({
				name: 'New Delivery entry'
			});

			// Create a sample Delivery entries array that includes the new Delivery entry
			var sampleDeliveryEntries = [sampleDeliveryEntry];

			// Set GET response
			$httpBackend.expectGET('delivery-entries').respond(sampleDeliveryEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.deliveryEntries).toEqualData(sampleDeliveryEntries);
		}));

		it('$scope.findOne() should create an array with one Delivery entry object fetched from XHR using a deliveryEntryId URL parameter', inject(function(DeliveryEntries) {
			// Define a sample Delivery entry object
			var sampleDeliveryEntry = new DeliveryEntries({
				name: 'New Delivery entry'
			});

			// Set the URL parameter
			$stateParams.deliveryEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/delivery-entries\/([0-9a-fA-F]{24})$/).respond(sampleDeliveryEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.deliveryEntry).toEqualData(sampleDeliveryEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(DeliveryEntries) {
			// Create a sample Delivery entry object
			var sampleDeliveryEntryPostData = new DeliveryEntries({
				name: 'New Delivery entry'
			});

			// Create a sample Delivery entry response
			var sampleDeliveryEntryResponse = new DeliveryEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Delivery entry'
			});

			// Fixture mock form input values
			scope.name = 'New Delivery entry';

			// Set POST response
			$httpBackend.expectPOST('delivery-entries', sampleDeliveryEntryPostData).respond(sampleDeliveryEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Delivery entry was created
			expect($location.path()).toBe('/delivery-entries/' + sampleDeliveryEntryResponse._id);
		}));

		it('$scope.update() should update a valid Delivery entry', inject(function(DeliveryEntries) {
			// Define a sample Delivery entry put data
			var sampleDeliveryEntryPutData = new DeliveryEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Delivery entry'
			});

			// Mock Delivery entry in scope
			scope.deliveryEntry = sampleDeliveryEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/delivery-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/delivery-entries/' + sampleDeliveryEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid deliveryEntryId and remove the Delivery entry from the scope', inject(function(DeliveryEntries) {
			// Create new Delivery entry object
			var sampleDeliveryEntry = new DeliveryEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Delivery entries array and include the Delivery entry
			scope.deliveryEntries = [sampleDeliveryEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/delivery-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDeliveryEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.deliveryEntries.length).toBe(0);
		}));
	});
}());