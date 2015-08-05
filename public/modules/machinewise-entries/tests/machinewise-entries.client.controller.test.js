'use strict';

(function() {
	// Machinewise entries Controller Spec
	describe('Machinewise entries Controller Tests', function() {
		// Initialize global variables
		var MachinewiseEntriesController,
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

			// Initialize the Machinewise entries controller.
			MachinewiseEntriesController = $controller('MachinewiseEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Machinewise entry object fetched from XHR', inject(function(MachinewiseEntries) {
			// Create sample Machinewise entry using the Machinewise entries service
			var sampleMachinewiseEntry = new MachinewiseEntries({
				name: 'New Machinewise entry'
			});

			// Create a sample Machinewise entries array that includes the new Machinewise entry
			var sampleMachinewiseEntries = [sampleMachinewiseEntry];

			// Set GET response
			$httpBackend.expectGET('machinewise-entries').respond(sampleMachinewiseEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.machinewiseEntries).toEqualData(sampleMachinewiseEntries);
		}));

		it('$scope.findOne() should create an array with one Machinewise entry object fetched from XHR using a machinewiseEntryId URL parameter', inject(function(MachinewiseEntries) {
			// Define a sample Machinewise entry object
			var sampleMachinewiseEntry = new MachinewiseEntries({
				name: 'New Machinewise entry'
			});

			// Set the URL parameter
			$stateParams.machinewiseEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/machinewise-entries\/([0-9a-fA-F]{24})$/).respond(sampleMachinewiseEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.machinewiseEntry).toEqualData(sampleMachinewiseEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(MachinewiseEntries) {
			// Create a sample Machinewise entry object
			var sampleMachinewiseEntryPostData = new MachinewiseEntries({
				name: 'New Machinewise entry'
			});

			// Create a sample Machinewise entry response
			var sampleMachinewiseEntryResponse = new MachinewiseEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Machinewise entry'
			});

			// Fixture mock form input values
			scope.name = 'New Machinewise entry';

			// Set POST response
			$httpBackend.expectPOST('machinewise-entries', sampleMachinewiseEntryPostData).respond(sampleMachinewiseEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Machinewise entry was created
			expect($location.path()).toBe('/machinewise-entries/' + sampleMachinewiseEntryResponse._id);
		}));

		it('$scope.update() should update a valid Machinewise entry', inject(function(MachinewiseEntries) {
			// Define a sample Machinewise entry put data
			var sampleMachinewiseEntryPutData = new MachinewiseEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Machinewise entry'
			});

			// Mock Machinewise entry in scope
			scope.machinewiseEntry = sampleMachinewiseEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/machinewise-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/machinewise-entries/' + sampleMachinewiseEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid machinewiseEntryId and remove the Machinewise entry from the scope', inject(function(MachinewiseEntries) {
			// Create new Machinewise entry object
			var sampleMachinewiseEntry = new MachinewiseEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Machinewise entries array and include the Machinewise entry
			scope.machinewiseEntries = [sampleMachinewiseEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/machinewise-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMachinewiseEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.machinewiseEntries.length).toBe(0);
		}));
	});
}());