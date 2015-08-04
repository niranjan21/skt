'use strict';

(function() {
	// Mills Controller Spec
	describe('Mills Controller Tests', function() {
		// Initialize global variables
		var MillsController,
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

			// Initialize the Mills controller.
			MillsController = $controller('MillsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Mill object fetched from XHR', inject(function(Mills) {
			// Create sample Mill using the Mills service
			var sampleMill = new Mills({
				name: 'New Mill'
			});

			// Create a sample Mills array that includes the new Mill
			var sampleMills = [sampleMill];

			// Set GET response
			$httpBackend.expectGET('mills').respond(sampleMills);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mills).toEqualData(sampleMills);
		}));

		it('$scope.findOne() should create an array with one Mill object fetched from XHR using a millId URL parameter', inject(function(Mills) {
			// Define a sample Mill object
			var sampleMill = new Mills({
				name: 'New Mill'
			});

			// Set the URL parameter
			$stateParams.millId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/mills\/([0-9a-fA-F]{24})$/).respond(sampleMill);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mill).toEqualData(sampleMill);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Mills) {
			// Create a sample Mill object
			var sampleMillPostData = new Mills({
				name: 'New Mill'
			});

			// Create a sample Mill response
			var sampleMillResponse = new Mills({
				_id: '525cf20451979dea2c000001',
				name: 'New Mill'
			});

			// Fixture mock form input values
			scope.name = 'New Mill';

			// Set POST response
			$httpBackend.expectPOST('mills', sampleMillPostData).respond(sampleMillResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Mill was created
			expect($location.path()).toBe('/mills/' + sampleMillResponse._id);
		}));

		it('$scope.update() should update a valid Mill', inject(function(Mills) {
			// Define a sample Mill put data
			var sampleMillPutData = new Mills({
				_id: '525cf20451979dea2c000001',
				name: 'New Mill'
			});

			// Mock Mill in scope
			scope.mill = sampleMillPutData;

			// Set PUT response
			$httpBackend.expectPUT(/mills\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/mills/' + sampleMillPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid millId and remove the Mill from the scope', inject(function(Mills) {
			// Create new Mill object
			var sampleMill = new Mills({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Mills array and include the Mill
			scope.mills = [sampleMill];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/mills\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMill);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.mills.length).toBe(0);
		}));
	});
}());