'use strict';

(function() {
	// Yarn deliveries Controller Spec
	describe('Yarn deliveries Controller Tests', function() {
		// Initialize global variables
		var YarnDeliveriesController,
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

			// Initialize the Yarn deliveries controller.
			YarnDeliveriesController = $controller('YarnDeliveriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Yarn delivery object fetched from XHR', inject(function(YarnDeliveries) {
			// Create sample Yarn delivery using the Yarn deliveries service
			var sampleYarnDelivery = new YarnDeliveries({
				name: 'New Yarn delivery'
			});

			// Create a sample Yarn deliveries array that includes the new Yarn delivery
			var sampleYarnDeliveries = [sampleYarnDelivery];

			// Set GET response
			$httpBackend.expectGET('yarn-deliveries').respond(sampleYarnDeliveries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.yarnDeliveries).toEqualData(sampleYarnDeliveries);
		}));

		it('$scope.findOne() should create an array with one Yarn delivery object fetched from XHR using a yarnDeliveryId URL parameter', inject(function(YarnDeliveries) {
			// Define a sample Yarn delivery object
			var sampleYarnDelivery = new YarnDeliveries({
				name: 'New Yarn delivery'
			});

			// Set the URL parameter
			$stateParams.yarnDeliveryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/yarn-deliveries\/([0-9a-fA-F]{24})$/).respond(sampleYarnDelivery);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.yarnDelivery).toEqualData(sampleYarnDelivery);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(YarnDeliveries) {
			// Create a sample Yarn delivery object
			var sampleYarnDeliveryPostData = new YarnDeliveries({
				name: 'New Yarn delivery'
			});

			// Create a sample Yarn delivery response
			var sampleYarnDeliveryResponse = new YarnDeliveries({
				_id: '525cf20451979dea2c000001',
				name: 'New Yarn delivery'
			});

			// Fixture mock form input values
			scope.name = 'New Yarn delivery';

			// Set POST response
			$httpBackend.expectPOST('yarn-deliveries', sampleYarnDeliveryPostData).respond(sampleYarnDeliveryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Yarn delivery was created
			expect($location.path()).toBe('/yarn-deliveries/' + sampleYarnDeliveryResponse._id);
		}));

		it('$scope.update() should update a valid Yarn delivery', inject(function(YarnDeliveries) {
			// Define a sample Yarn delivery put data
			var sampleYarnDeliveryPutData = new YarnDeliveries({
				_id: '525cf20451979dea2c000001',
				name: 'New Yarn delivery'
			});

			// Mock Yarn delivery in scope
			scope.yarnDelivery = sampleYarnDeliveryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/yarn-deliveries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/yarn-deliveries/' + sampleYarnDeliveryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid yarnDeliveryId and remove the Yarn delivery from the scope', inject(function(YarnDeliveries) {
			// Create new Yarn delivery object
			var sampleYarnDelivery = new YarnDeliveries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Yarn deliveries array and include the Yarn delivery
			scope.yarnDeliveries = [sampleYarnDelivery];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/yarn-deliveries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleYarnDelivery);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.yarnDeliveries.length).toBe(0);
		}));
	});
}());