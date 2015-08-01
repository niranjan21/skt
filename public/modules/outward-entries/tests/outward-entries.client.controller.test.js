'use strict';

(function() {
	// Outward entries Controller Spec
	describe('Outward entries Controller Tests', function() {
		// Initialize global variables
		var OutwardEntriesController,
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

			// Initialize the Outward entries controller.
			OutwardEntriesController = $controller('OutwardEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Outward entry object fetched from XHR', inject(function(OutwardEntries) {
			// Create sample Outward entry using the Outward entries service
			var sampleOutwardEntry = new OutwardEntries({
				name: 'New Outward entry'
			});

			// Create a sample Outward entries array that includes the new Outward entry
			var sampleOutwardEntries = [sampleOutwardEntry];

			// Set GET response
			$httpBackend.expectGET('outward-entries').respond(sampleOutwardEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.outwardEntries).toEqualData(sampleOutwardEntries);
		}));

		it('$scope.findOne() should create an array with one Outward entry object fetched from XHR using a outwardEntryId URL parameter', inject(function(OutwardEntries) {
			// Define a sample Outward entry object
			var sampleOutwardEntry = new OutwardEntries({
				name: 'New Outward entry'
			});

			// Set the URL parameter
			$stateParams.outwardEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/outward-entries\/([0-9a-fA-F]{24})$/).respond(sampleOutwardEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.outwardEntry).toEqualData(sampleOutwardEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(OutwardEntries) {
			// Create a sample Outward entry object
			var sampleOutwardEntryPostData = new OutwardEntries({
				name: 'New Outward entry'
			});

			// Create a sample Outward entry response
			var sampleOutwardEntryResponse = new OutwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Outward entry'
			});

			// Fixture mock form input values
			scope.name = 'New Outward entry';

			// Set POST response
			$httpBackend.expectPOST('outward-entries', sampleOutwardEntryPostData).respond(sampleOutwardEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Outward entry was created
			expect($location.path()).toBe('/outward-entries/' + sampleOutwardEntryResponse._id);
		}));

		it('$scope.update() should update a valid Outward entry', inject(function(OutwardEntries) {
			// Define a sample Outward entry put data
			var sampleOutwardEntryPutData = new OutwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Outward entry'
			});

			// Mock Outward entry in scope
			scope.outwardEntry = sampleOutwardEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/outward-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/outward-entries/' + sampleOutwardEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid outwardEntryId and remove the Outward entry from the scope', inject(function(OutwardEntries) {
			// Create new Outward entry object
			var sampleOutwardEntry = new OutwardEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Outward entries array and include the Outward entry
			scope.outwardEntries = [sampleOutwardEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/outward-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOutwardEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.outwardEntries.length).toBe(0);
		}));
	});
}());