'use strict';

(function() {
	// Stoppages entries Controller Spec
	describe('Stoppages entries Controller Tests', function() {
		// Initialize global variables
		var StoppagesEntriesController,
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

			// Initialize the Stoppages entries controller.
			StoppagesEntriesController = $controller('StoppagesEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Stoppages entry object fetched from XHR', inject(function(StoppagesEntries) {
			// Create sample Stoppages entry using the Stoppages entries service
			var sampleStoppagesEntry = new StoppagesEntries({
				name: 'New Stoppages entry'
			});

			// Create a sample Stoppages entries array that includes the new Stoppages entry
			var sampleStoppagesEntries = [sampleStoppagesEntry];

			// Set GET response
			$httpBackend.expectGET('stoppages-entries').respond(sampleStoppagesEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.stoppagesEntries).toEqualData(sampleStoppagesEntries);
		}));

		it('$scope.findOne() should create an array with one Stoppages entry object fetched from XHR using a stoppagesEntryId URL parameter', inject(function(StoppagesEntries) {
			// Define a sample Stoppages entry object
			var sampleStoppagesEntry = new StoppagesEntries({
				name: 'New Stoppages entry'
			});

			// Set the URL parameter
			$stateParams.stoppagesEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/stoppages-entries\/([0-9a-fA-F]{24})$/).respond(sampleStoppagesEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.stoppagesEntry).toEqualData(sampleStoppagesEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(StoppagesEntries) {
			// Create a sample Stoppages entry object
			var sampleStoppagesEntryPostData = new StoppagesEntries({
				name: 'New Stoppages entry'
			});

			// Create a sample Stoppages entry response
			var sampleStoppagesEntryResponse = new StoppagesEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Stoppages entry'
			});

			// Fixture mock form input values
			scope.name = 'New Stoppages entry';

			// Set POST response
			$httpBackend.expectPOST('stoppages-entries', sampleStoppagesEntryPostData).respond(sampleStoppagesEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Stoppages entry was created
			expect($location.path()).toBe('/stoppages-entries/' + sampleStoppagesEntryResponse._id);
		}));

		it('$scope.update() should update a valid Stoppages entry', inject(function(StoppagesEntries) {
			// Define a sample Stoppages entry put data
			var sampleStoppagesEntryPutData = new StoppagesEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Stoppages entry'
			});

			// Mock Stoppages entry in scope
			scope.stoppagesEntry = sampleStoppagesEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/stoppages-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/stoppages-entries/' + sampleStoppagesEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid stoppagesEntryId and remove the Stoppages entry from the scope', inject(function(StoppagesEntries) {
			// Create new Stoppages entry object
			var sampleStoppagesEntry = new StoppagesEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Stoppages entries array and include the Stoppages entry
			scope.stoppagesEntries = [sampleStoppagesEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/stoppages-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleStoppagesEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.stoppagesEntries.length).toBe(0);
		}));
	});
}());