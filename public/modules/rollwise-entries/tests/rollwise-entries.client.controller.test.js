'use strict';

(function() {
	// Rollwise entries Controller Spec
	describe('Rollwise entries Controller Tests', function() {
		// Initialize global variables
		var RollwiseEntriesController,
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

			// Initialize the Rollwise entries controller.
			RollwiseEntriesController = $controller('RollwiseEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Rollwise entry object fetched from XHR', inject(function(RollwiseEntries) {
			// Create sample Rollwise entry using the Rollwise entries service
			var sampleRollwiseEntry = new RollwiseEntries({
				name: 'New Rollwise entry'
			});

			// Create a sample Rollwise entries array that includes the new Rollwise entry
			var sampleRollwiseEntries = [sampleRollwiseEntry];

			// Set GET response
			$httpBackend.expectGET('rollwise-entries').respond(sampleRollwiseEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rollwiseEntries).toEqualData(sampleRollwiseEntries);
		}));

		it('$scope.findOne() should create an array with one Rollwise entry object fetched from XHR using a rollwiseEntryId URL parameter', inject(function(RollwiseEntries) {
			// Define a sample Rollwise entry object
			var sampleRollwiseEntry = new RollwiseEntries({
				name: 'New Rollwise entry'
			});

			// Set the URL parameter
			$stateParams.rollwiseEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/rollwise-entries\/([0-9a-fA-F]{24})$/).respond(sampleRollwiseEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rollwiseEntry).toEqualData(sampleRollwiseEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(RollwiseEntries) {
			// Create a sample Rollwise entry object
			var sampleRollwiseEntryPostData = new RollwiseEntries({
				name: 'New Rollwise entry'
			});

			// Create a sample Rollwise entry response
			var sampleRollwiseEntryResponse = new RollwiseEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Rollwise entry'
			});

			// Fixture mock form input values
			scope.name = 'New Rollwise entry';

			// Set POST response
			$httpBackend.expectPOST('rollwise-entries', sampleRollwiseEntryPostData).respond(sampleRollwiseEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Rollwise entry was created
			expect($location.path()).toBe('/rollwise-entries/' + sampleRollwiseEntryResponse._id);
		}));

		it('$scope.update() should update a valid Rollwise entry', inject(function(RollwiseEntries) {
			// Define a sample Rollwise entry put data
			var sampleRollwiseEntryPutData = new RollwiseEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Rollwise entry'
			});

			// Mock Rollwise entry in scope
			scope.rollwiseEntry = sampleRollwiseEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/rollwise-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/rollwise-entries/' + sampleRollwiseEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid rollwiseEntryId and remove the Rollwise entry from the scope', inject(function(RollwiseEntries) {
			// Create new Rollwise entry object
			var sampleRollwiseEntry = new RollwiseEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Rollwise entries array and include the Rollwise entry
			scope.rollwiseEntries = [sampleRollwiseEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/rollwise-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRollwiseEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.rollwiseEntries.length).toBe(0);
		}));
	});
}());