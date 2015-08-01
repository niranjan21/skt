'use strict';

(function() {
	// Power consumption entries Controller Spec
	describe('Power consumption entries Controller Tests', function() {
		// Initialize global variables
		var PowerConsumptionEntriesController,
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

			// Initialize the Power consumption entries controller.
			PowerConsumptionEntriesController = $controller('PowerConsumptionEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Power consumption entry object fetched from XHR', inject(function(PowerConsumptionEntries) {
			// Create sample Power consumption entry using the Power consumption entries service
			var samplePowerConsumptionEntry = new PowerConsumptionEntries({
				name: 'New Power consumption entry'
			});

			// Create a sample Power consumption entries array that includes the new Power consumption entry
			var samplePowerConsumptionEntries = [samplePowerConsumptionEntry];

			// Set GET response
			$httpBackend.expectGET('power-consumption-entries').respond(samplePowerConsumptionEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.powerConsumptionEntries).toEqualData(samplePowerConsumptionEntries);
		}));

		it('$scope.findOne() should create an array with one Power consumption entry object fetched from XHR using a powerConsumptionEntryId URL parameter', inject(function(PowerConsumptionEntries) {
			// Define a sample Power consumption entry object
			var samplePowerConsumptionEntry = new PowerConsumptionEntries({
				name: 'New Power consumption entry'
			});

			// Set the URL parameter
			$stateParams.powerConsumptionEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/power-consumption-entries\/([0-9a-fA-F]{24})$/).respond(samplePowerConsumptionEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.powerConsumptionEntry).toEqualData(samplePowerConsumptionEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PowerConsumptionEntries) {
			// Create a sample Power consumption entry object
			var samplePowerConsumptionEntryPostData = new PowerConsumptionEntries({
				name: 'New Power consumption entry'
			});

			// Create a sample Power consumption entry response
			var samplePowerConsumptionEntryResponse = new PowerConsumptionEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Power consumption entry'
			});

			// Fixture mock form input values
			scope.name = 'New Power consumption entry';

			// Set POST response
			$httpBackend.expectPOST('power-consumption-entries', samplePowerConsumptionEntryPostData).respond(samplePowerConsumptionEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Power consumption entry was created
			expect($location.path()).toBe('/power-consumption-entries/' + samplePowerConsumptionEntryResponse._id);
		}));

		it('$scope.update() should update a valid Power consumption entry', inject(function(PowerConsumptionEntries) {
			// Define a sample Power consumption entry put data
			var samplePowerConsumptionEntryPutData = new PowerConsumptionEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Power consumption entry'
			});

			// Mock Power consumption entry in scope
			scope.powerConsumptionEntry = samplePowerConsumptionEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/power-consumption-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/power-consumption-entries/' + samplePowerConsumptionEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid powerConsumptionEntryId and remove the Power consumption entry from the scope', inject(function(PowerConsumptionEntries) {
			// Create new Power consumption entry object
			var samplePowerConsumptionEntry = new PowerConsumptionEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Power consumption entries array and include the Power consumption entry
			scope.powerConsumptionEntries = [samplePowerConsumptionEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/power-consumption-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePowerConsumptionEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.powerConsumptionEntries.length).toBe(0);
		}));
	});
}());