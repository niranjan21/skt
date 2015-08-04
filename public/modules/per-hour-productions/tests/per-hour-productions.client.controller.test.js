'use strict';

(function() {
	// Per hour productions Controller Spec
	describe('Per hour productions Controller Tests', function() {
		// Initialize global variables
		var PerHourProductionsController,
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

			// Initialize the Per hour productions controller.
			PerHourProductionsController = $controller('PerHourProductionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Per hour production object fetched from XHR', inject(function(PerHourProductions) {
			// Create sample Per hour production using the Per hour productions service
			var samplePerHourProduction = new PerHourProductions({
				name: 'New Per hour production'
			});

			// Create a sample Per hour productions array that includes the new Per hour production
			var samplePerHourProductions = [samplePerHourProduction];

			// Set GET response
			$httpBackend.expectGET('per-hour-productions').respond(samplePerHourProductions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.perHourProductions).toEqualData(samplePerHourProductions);
		}));

		it('$scope.findOne() should create an array with one Per hour production object fetched from XHR using a perHourProductionId URL parameter', inject(function(PerHourProductions) {
			// Define a sample Per hour production object
			var samplePerHourProduction = new PerHourProductions({
				name: 'New Per hour production'
			});

			// Set the URL parameter
			$stateParams.perHourProductionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/per-hour-productions\/([0-9a-fA-F]{24})$/).respond(samplePerHourProduction);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.perHourProduction).toEqualData(samplePerHourProduction);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PerHourProductions) {
			// Create a sample Per hour production object
			var samplePerHourProductionPostData = new PerHourProductions({
				name: 'New Per hour production'
			});

			// Create a sample Per hour production response
			var samplePerHourProductionResponse = new PerHourProductions({
				_id: '525cf20451979dea2c000001',
				name: 'New Per hour production'
			});

			// Fixture mock form input values
			scope.name = 'New Per hour production';

			// Set POST response
			$httpBackend.expectPOST('per-hour-productions', samplePerHourProductionPostData).respond(samplePerHourProductionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Per hour production was created
			expect($location.path()).toBe('/per-hour-productions/' + samplePerHourProductionResponse._id);
		}));

		it('$scope.update() should update a valid Per hour production', inject(function(PerHourProductions) {
			// Define a sample Per hour production put data
			var samplePerHourProductionPutData = new PerHourProductions({
				_id: '525cf20451979dea2c000001',
				name: 'New Per hour production'
			});

			// Mock Per hour production in scope
			scope.perHourProduction = samplePerHourProductionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/per-hour-productions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/per-hour-productions/' + samplePerHourProductionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid perHourProductionId and remove the Per hour production from the scope', inject(function(PerHourProductions) {
			// Create new Per hour production object
			var samplePerHourProduction = new PerHourProductions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Per hour productions array and include the Per hour production
			scope.perHourProductions = [samplePerHourProduction];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/per-hour-productions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePerHourProduction);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.perHourProductions.length).toBe(0);
		}));
	});
}());