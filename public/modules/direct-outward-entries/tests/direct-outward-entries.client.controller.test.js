'use strict';

(function() {
	// Direct outward entries Controller Spec
	describe('Direct outward entries Controller Tests', function() {
		// Initialize global variables
		var DirectOutwardEntriesController,
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

			// Initialize the Direct outward entries controller.
			DirectOutwardEntriesController = $controller('DirectOutwardEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Direct outward entry object fetched from XHR', inject(function(DirectOutwardEntries) {
			// Create sample Direct outward entry using the Direct outward entries service
			var sampleDirectOutwardEntry = new DirectOutwardEntries({
				name: 'New Direct outward entry'
			});

			// Create a sample Direct outward entries array that includes the new Direct outward entry
			var sampleDirectOutwardEntries = [sampleDirectOutwardEntry];

			// Set GET response
			$httpBackend.expectGET('direct-outward-entries').respond(sampleDirectOutwardEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.directOutwardEntries).toEqualData(sampleDirectOutwardEntries);
		}));

		it('$scope.findOne() should create an array with one Direct outward entry object fetched from XHR using a directOutwardEntryId URL parameter', inject(function(DirectOutwardEntries) {
			// Define a sample Direct outward entry object
			var sampleDirectOutwardEntry = new DirectOutwardEntries({
				name: 'New Direct outward entry'
			});

			// Set the URL parameter
			$stateParams.directOutwardEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/direct-outward-entries\/([0-9a-fA-F]{24})$/).respond(sampleDirectOutwardEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.directOutwardEntry).toEqualData(sampleDirectOutwardEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(DirectOutwardEntries) {
			// Create a sample Direct outward entry object
			var sampleDirectOutwardEntryPostData = new DirectOutwardEntries({
				name: 'New Direct outward entry'
			});

			// Create a sample Direct outward entry response
			var sampleDirectOutwardEntryResponse = new DirectOutwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Direct outward entry'
			});

			// Fixture mock form input values
			scope.name = 'New Direct outward entry';

			// Set POST response
			$httpBackend.expectPOST('direct-outward-entries', sampleDirectOutwardEntryPostData).respond(sampleDirectOutwardEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Direct outward entry was created
			expect($location.path()).toBe('/direct-outward-entries/' + sampleDirectOutwardEntryResponse._id);
		}));

		it('$scope.update() should update a valid Direct outward entry', inject(function(DirectOutwardEntries) {
			// Define a sample Direct outward entry put data
			var sampleDirectOutwardEntryPutData = new DirectOutwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Direct outward entry'
			});

			// Mock Direct outward entry in scope
			scope.directOutwardEntry = sampleDirectOutwardEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/direct-outward-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/direct-outward-entries/' + sampleDirectOutwardEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid directOutwardEntryId and remove the Direct outward entry from the scope', inject(function(DirectOutwardEntries) {
			// Create new Direct outward entry object
			var sampleDirectOutwardEntry = new DirectOutwardEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Direct outward entries array and include the Direct outward entry
			scope.directOutwardEntries = [sampleDirectOutwardEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/direct-outward-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDirectOutwardEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.directOutwardEntries.length).toBe(0);
		}));
	});
}());