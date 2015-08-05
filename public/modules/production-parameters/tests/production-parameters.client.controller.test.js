'use strict';

(function() {
	// Production parameters Controller Spec
	describe('Production parameters Controller Tests', function() {
		// Initialize global variables
		var ProductionParametersController,
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

			// Initialize the Production parameters controller.
			ProductionParametersController = $controller('ProductionParametersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Production parameter object fetched from XHR', inject(function(ProductionParameters) {
			// Create sample Production parameter using the Production parameters service
			var sampleProductionParameter = new ProductionParameters({
				name: 'New Production parameter'
			});

			// Create a sample Production parameters array that includes the new Production parameter
			var sampleProductionParameters = [sampleProductionParameter];

			// Set GET response
			$httpBackend.expectGET('production-parameters').respond(sampleProductionParameters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.productionParameters).toEqualData(sampleProductionParameters);
		}));

		it('$scope.findOne() should create an array with one Production parameter object fetched from XHR using a productionParameterId URL parameter', inject(function(ProductionParameters) {
			// Define a sample Production parameter object
			var sampleProductionParameter = new ProductionParameters({
				name: 'New Production parameter'
			});

			// Set the URL parameter
			$stateParams.productionParameterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/production-parameters\/([0-9a-fA-F]{24})$/).respond(sampleProductionParameter);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.productionParameter).toEqualData(sampleProductionParameter);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ProductionParameters) {
			// Create a sample Production parameter object
			var sampleProductionParameterPostData = new ProductionParameters({
				name: 'New Production parameter'
			});

			// Create a sample Production parameter response
			var sampleProductionParameterResponse = new ProductionParameters({
				_id: '525cf20451979dea2c000001',
				name: 'New Production parameter'
			});

			// Fixture mock form input values
			scope.name = 'New Production parameter';

			// Set POST response
			$httpBackend.expectPOST('production-parameters', sampleProductionParameterPostData).respond(sampleProductionParameterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Production parameter was created
			expect($location.path()).toBe('/production-parameters/' + sampleProductionParameterResponse._id);
		}));

		it('$scope.update() should update a valid Production parameter', inject(function(ProductionParameters) {
			// Define a sample Production parameter put data
			var sampleProductionParameterPutData = new ProductionParameters({
				_id: '525cf20451979dea2c000001',
				name: 'New Production parameter'
			});

			// Mock Production parameter in scope
			scope.productionParameter = sampleProductionParameterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/production-parameters\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/production-parameters/' + sampleProductionParameterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid productionParameterId and remove the Production parameter from the scope', inject(function(ProductionParameters) {
			// Create new Production parameter object
			var sampleProductionParameter = new ProductionParameters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Production parameters array and include the Production parameter
			scope.productionParameters = [sampleProductionParameter];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/production-parameters\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProductionParameter);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.productionParameters.length).toBe(0);
		}));
	});
}());