'use strict';

(function() {
	// Inward entries Controller Spec
	describe('Inward entries Controller Tests', function() {
		// Initialize global variables
		var InwardEntriesController,
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

			// Initialize the Inward entries controller.
			InwardEntriesController = $controller('InwardEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Inward entry object fetched from XHR', inject(function(InwardEntries) {
			// Create sample Inward entry using the Inward entries service
			var sampleInwardEntry = new InwardEntries({
				name: 'New Inward entry'
			});

			// Create a sample Inward entries array that includes the new Inward entry
			var sampleInwardEntries = [sampleInwardEntry];

			// Set GET response
			$httpBackend.expectGET('inward-entries').respond(sampleInwardEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.inwardEntries).toEqualData(sampleInwardEntries);
		}));

		it('$scope.findOne() should create an array with one Inward entry object fetched from XHR using a inwardEntryId URL parameter', inject(function(InwardEntries) {
			// Define a sample Inward entry object
			var sampleInwardEntry = new InwardEntries({
				name: 'New Inward entry'
			});

			// Set the URL parameter
			$stateParams.inwardEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/inward-entries\/([0-9a-fA-F]{24})$/).respond(sampleInwardEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.inwardEntry).toEqualData(sampleInwardEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(InwardEntries) {
			// Create a sample Inward entry object
			var sampleInwardEntryPostData = new InwardEntries({
				name: 'New Inward entry'
			});

			// Create a sample Inward entry response
			var sampleInwardEntryResponse = new InwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Inward entry'
			});

			// Fixture mock form input values
			scope.name = 'New Inward entry';

			// Set POST response
			$httpBackend.expectPOST('inward-entries', sampleInwardEntryPostData).respond(sampleInwardEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Inward entry was created
			expect($location.path()).toBe('/inward-entries/' + sampleInwardEntryResponse._id);
		}));

		it('$scope.update() should update a valid Inward entry', inject(function(InwardEntries) {
			// Define a sample Inward entry put data
			var sampleInwardEntryPutData = new InwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Inward entry'
			});

			// Mock Inward entry in scope
			scope.inwardEntry = sampleInwardEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/inward-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/inward-entries/' + sampleInwardEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid inwardEntryId and remove the Inward entry from the scope', inject(function(InwardEntries) {
			// Create new Inward entry object
			var sampleInwardEntry = new InwardEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Inward entries array and include the Inward entry
			scope.inwardEntries = [sampleInwardEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/inward-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleInwardEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.inwardEntries.length).toBe(0);
		}));
	});
}());