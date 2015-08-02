'use strict';

(function() {
	// Direct inward entries Controller Spec
	describe('Direct inward entries Controller Tests', function() {
		// Initialize global variables
		var DirectInwardEntriesController,
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

			// Initialize the Direct inward entries controller.
			DirectInwardEntriesController = $controller('DirectInwardEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Direct inward entry object fetched from XHR', inject(function(DirectInwardEntries) {
			// Create sample Direct inward entry using the Direct inward entries service
			var sampleDirectInwardEntry = new DirectInwardEntries({
				name: 'New Direct inward entry'
			});

			// Create a sample Direct inward entries array that includes the new Direct inward entry
			var sampleDirectInwardEntries = [sampleDirectInwardEntry];

			// Set GET response
			$httpBackend.expectGET('direct-inward-entries').respond(sampleDirectInwardEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.directInwardEntries).toEqualData(sampleDirectInwardEntries);
		}));

		it('$scope.findOne() should create an array with one Direct inward entry object fetched from XHR using a directInwardEntryId URL parameter', inject(function(DirectInwardEntries) {
			// Define a sample Direct inward entry object
			var sampleDirectInwardEntry = new DirectInwardEntries({
				name: 'New Direct inward entry'
			});

			// Set the URL parameter
			$stateParams.directInwardEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/direct-inward-entries\/([0-9a-fA-F]{24})$/).respond(sampleDirectInwardEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.directInwardEntry).toEqualData(sampleDirectInwardEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(DirectInwardEntries) {
			// Create a sample Direct inward entry object
			var sampleDirectInwardEntryPostData = new DirectInwardEntries({
				name: 'New Direct inward entry'
			});

			// Create a sample Direct inward entry response
			var sampleDirectInwardEntryResponse = new DirectInwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Direct inward entry'
			});

			// Fixture mock form input values
			scope.name = 'New Direct inward entry';

			// Set POST response
			$httpBackend.expectPOST('direct-inward-entries', sampleDirectInwardEntryPostData).respond(sampleDirectInwardEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Direct inward entry was created
			expect($location.path()).toBe('/direct-inward-entries/' + sampleDirectInwardEntryResponse._id);
		}));

		it('$scope.update() should update a valid Direct inward entry', inject(function(DirectInwardEntries) {
			// Define a sample Direct inward entry put data
			var sampleDirectInwardEntryPutData = new DirectInwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Direct inward entry'
			});

			// Mock Direct inward entry in scope
			scope.directInwardEntry = sampleDirectInwardEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/direct-inward-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/direct-inward-entries/' + sampleDirectInwardEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid directInwardEntryId and remove the Direct inward entry from the scope', inject(function(DirectInwardEntries) {
			// Create new Direct inward entry object
			var sampleDirectInwardEntry = new DirectInwardEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Direct inward entries array and include the Direct inward entry
			scope.directInwardEntries = [sampleDirectInwardEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/direct-inward-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDirectInwardEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.directInwardEntries.length).toBe(0);
		}));
	});
}());