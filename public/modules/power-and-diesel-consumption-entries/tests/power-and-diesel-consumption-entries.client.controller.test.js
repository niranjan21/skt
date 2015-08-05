'use strict';

(function() {
	// Power and diesel consumption entries Controller Spec
	describe('Power and diesel consumption entries Controller Tests', function() {
		// Initialize global variables
		var PowerAndDieselConsumptionEntriesController,
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

			// Initialize the Power and diesel consumption entries controller.
			PowerAndDieselConsumptionEntriesController = $controller('PowerAndDieselConsumptionEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Power and diesel consumption entry object fetched from XHR', inject(function(PowerAndDieselConsumptionEntries) {
			// Create sample Power and diesel consumption entry using the Power and diesel consumption entries service
			var samplePowerAndDieselConsumptionEntry = new PowerAndDieselConsumptionEntries({
				name: 'New Power and diesel consumption entry'
			});

			// Create a sample Power and diesel consumption entries array that includes the new Power and diesel consumption entry
			var samplePowerAndDieselConsumptionEntries = [samplePowerAndDieselConsumptionEntry];

			// Set GET response
			$httpBackend.expectGET('power-and-diesel-consumption-entries').respond(samplePowerAndDieselConsumptionEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.powerAndDieselConsumptionEntries).toEqualData(samplePowerAndDieselConsumptionEntries);
		}));

		it('$scope.findOne() should create an array with one Power and diesel consumption entry object fetched from XHR using a powerAndDieselConsumptionEntryId URL parameter', inject(function(PowerAndDieselConsumptionEntries) {
			// Define a sample Power and diesel consumption entry object
			var samplePowerAndDieselConsumptionEntry = new PowerAndDieselConsumptionEntries({
				name: 'New Power and diesel consumption entry'
			});

			// Set the URL parameter
			$stateParams.powerAndDieselConsumptionEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/power-and-diesel-consumption-entries\/([0-9a-fA-F]{24})$/).respond(samplePowerAndDieselConsumptionEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.powerAndDieselConsumptionEntry).toEqualData(samplePowerAndDieselConsumptionEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PowerAndDieselConsumptionEntries) {
			// Create a sample Power and diesel consumption entry object
			var samplePowerAndDieselConsumptionEntryPostData = new PowerAndDieselConsumptionEntries({
				name: 'New Power and diesel consumption entry'
			});

			// Create a sample Power and diesel consumption entry response
			var samplePowerAndDieselConsumptionEntryResponse = new PowerAndDieselConsumptionEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Power and diesel consumption entry'
			});

			// Fixture mock form input values
			scope.name = 'New Power and diesel consumption entry';

			// Set POST response
			$httpBackend.expectPOST('power-and-diesel-consumption-entries', samplePowerAndDieselConsumptionEntryPostData).respond(samplePowerAndDieselConsumptionEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Power and diesel consumption entry was created
			expect($location.path()).toBe('/power-and-diesel-consumption-entries/' + samplePowerAndDieselConsumptionEntryResponse._id);
		}));

		it('$scope.update() should update a valid Power and diesel consumption entry', inject(function(PowerAndDieselConsumptionEntries) {
			// Define a sample Power and diesel consumption entry put data
			var samplePowerAndDieselConsumptionEntryPutData = new PowerAndDieselConsumptionEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Power and diesel consumption entry'
			});

			// Mock Power and diesel consumption entry in scope
			scope.powerAndDieselConsumptionEntry = samplePowerAndDieselConsumptionEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/power-and-diesel-consumption-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/power-and-diesel-consumption-entries/' + samplePowerAndDieselConsumptionEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid powerAndDieselConsumptionEntryId and remove the Power and diesel consumption entry from the scope', inject(function(PowerAndDieselConsumptionEntries) {
			// Create new Power and diesel consumption entry object
			var samplePowerAndDieselConsumptionEntry = new PowerAndDieselConsumptionEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Power and diesel consumption entries array and include the Power and diesel consumption entry
			scope.powerAndDieselConsumptionEntries = [samplePowerAndDieselConsumptionEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/power-and-diesel-consumption-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePowerAndDieselConsumptionEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.powerAndDieselConsumptionEntries.length).toBe(0);
		}));
	});
}());