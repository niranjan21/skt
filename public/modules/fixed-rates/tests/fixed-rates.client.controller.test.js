'use strict';

(function() {
	// Fixed rates Controller Spec
	describe('Fixed rates Controller Tests', function() {
		// Initialize global variables
		var FixedRatesController,
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

			// Initialize the Fixed rates controller.
			FixedRatesController = $controller('FixedRatesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fixed rate object fetched from XHR', inject(function(FixedRates) {
			// Create sample Fixed rate using the Fixed rates service
			var sampleFixedRate = new FixedRates({
				name: 'New Fixed rate'
			});

			// Create a sample Fixed rates array that includes the new Fixed rate
			var sampleFixedRates = [sampleFixedRate];

			// Set GET response
			$httpBackend.expectGET('fixed-rates').respond(sampleFixedRates);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fixedRates).toEqualData(sampleFixedRates);
		}));

		it('$scope.findOne() should create an array with one Fixed rate object fetched from XHR using a fixedRateId URL parameter', inject(function(FixedRates) {
			// Define a sample Fixed rate object
			var sampleFixedRate = new FixedRates({
				name: 'New Fixed rate'
			});

			// Set the URL parameter
			$stateParams.fixedRateId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fixed-rates\/([0-9a-fA-F]{24})$/).respond(sampleFixedRate);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fixedRate).toEqualData(sampleFixedRate);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FixedRates) {
			// Create a sample Fixed rate object
			var sampleFixedRatePostData = new FixedRates({
				name: 'New Fixed rate'
			});

			// Create a sample Fixed rate response
			var sampleFixedRateResponse = new FixedRates({
				_id: '525cf20451979dea2c000001',
				name: 'New Fixed rate'
			});

			// Fixture mock form input values
			scope.name = 'New Fixed rate';

			// Set POST response
			$httpBackend.expectPOST('fixed-rates', sampleFixedRatePostData).respond(sampleFixedRateResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fixed rate was created
			expect($location.path()).toBe('/fixed-rates/' + sampleFixedRateResponse._id);
		}));

		it('$scope.update() should update a valid Fixed rate', inject(function(FixedRates) {
			// Define a sample Fixed rate put data
			var sampleFixedRatePutData = new FixedRates({
				_id: '525cf20451979dea2c000001',
				name: 'New Fixed rate'
			});

			// Mock Fixed rate in scope
			scope.fixedRate = sampleFixedRatePutData;

			// Set PUT response
			$httpBackend.expectPUT(/fixed-rates\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fixed-rates/' + sampleFixedRatePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fixedRateId and remove the Fixed rate from the scope', inject(function(FixedRates) {
			// Create new Fixed rate object
			var sampleFixedRate = new FixedRates({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fixed rates array and include the Fixed rate
			scope.fixedRates = [sampleFixedRate];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fixed-rates\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFixedRate);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fixedRates.length).toBe(0);
		}));
	});
}());