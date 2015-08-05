'use strict';

(function() {
	// Shift entries Controller Spec
	describe('Shift entries Controller Tests', function() {
		// Initialize global variables
		var ShiftEntriesController,
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

			// Initialize the Shift entries controller.
			ShiftEntriesController = $controller('ShiftEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Shift entry object fetched from XHR', inject(function(ShiftEntries) {
			// Create sample Shift entry using the Shift entries service
			var sampleShiftEntry = new ShiftEntries({
				name: 'New Shift entry'
			});

			// Create a sample Shift entries array that includes the new Shift entry
			var sampleShiftEntries = [sampleShiftEntry];

			// Set GET response
			$httpBackend.expectGET('shift-entries').respond(sampleShiftEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.shiftEntries).toEqualData(sampleShiftEntries);
		}));

		it('$scope.findOne() should create an array with one Shift entry object fetched from XHR using a shiftEntryId URL parameter', inject(function(ShiftEntries) {
			// Define a sample Shift entry object
			var sampleShiftEntry = new ShiftEntries({
				name: 'New Shift entry'
			});

			// Set the URL parameter
			$stateParams.shiftEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/shift-entries\/([0-9a-fA-F]{24})$/).respond(sampleShiftEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.shiftEntry).toEqualData(sampleShiftEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ShiftEntries) {
			// Create a sample Shift entry object
			var sampleShiftEntryPostData = new ShiftEntries({
				name: 'New Shift entry'
			});

			// Create a sample Shift entry response
			var sampleShiftEntryResponse = new ShiftEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Shift entry'
			});

			// Fixture mock form input values
			scope.name = 'New Shift entry';

			// Set POST response
			$httpBackend.expectPOST('shift-entries', sampleShiftEntryPostData).respond(sampleShiftEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Shift entry was created
			expect($location.path()).toBe('/shift-entries/' + sampleShiftEntryResponse._id);
		}));

		it('$scope.update() should update a valid Shift entry', inject(function(ShiftEntries) {
			// Define a sample Shift entry put data
			var sampleShiftEntryPutData = new ShiftEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Shift entry'
			});

			// Mock Shift entry in scope
			scope.shiftEntry = sampleShiftEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/shift-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/shift-entries/' + sampleShiftEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid shiftEntryId and remove the Shift entry from the scope', inject(function(ShiftEntries) {
			// Create new Shift entry object
			var sampleShiftEntry = new ShiftEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Shift entries array and include the Shift entry
			scope.shiftEntries = [sampleShiftEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/shift-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleShiftEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.shiftEntries.length).toBe(0);
		}));
	});
}());