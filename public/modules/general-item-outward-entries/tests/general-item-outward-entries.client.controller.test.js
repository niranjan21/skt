'use strict';

(function() {
	// General item outward entries Controller Spec
	describe('General item outward entries Controller Tests', function() {
		// Initialize global variables
		var GeneralItemOutwardEntriesController,
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

			// Initialize the General item outward entries controller.
			GeneralItemOutwardEntriesController = $controller('GeneralItemOutwardEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one General item outward entry object fetched from XHR', inject(function(GeneralItemOutwardEntries) {
			// Create sample General item outward entry using the General item outward entries service
			var sampleGeneralItemOutwardEntry = new GeneralItemOutwardEntries({
				name: 'New General item outward entry'
			});

			// Create a sample General item outward entries array that includes the new General item outward entry
			var sampleGeneralItemOutwardEntries = [sampleGeneralItemOutwardEntry];

			// Set GET response
			$httpBackend.expectGET('general-item-outward-entries').respond(sampleGeneralItemOutwardEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generalItemOutwardEntries).toEqualData(sampleGeneralItemOutwardEntries);
		}));

		it('$scope.findOne() should create an array with one General item outward entry object fetched from XHR using a generalItemOutwardEntryId URL parameter', inject(function(GeneralItemOutwardEntries) {
			// Define a sample General item outward entry object
			var sampleGeneralItemOutwardEntry = new GeneralItemOutwardEntries({
				name: 'New General item outward entry'
			});

			// Set the URL parameter
			$stateParams.generalItemOutwardEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/general-item-outward-entries\/([0-9a-fA-F]{24})$/).respond(sampleGeneralItemOutwardEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generalItemOutwardEntry).toEqualData(sampleGeneralItemOutwardEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(GeneralItemOutwardEntries) {
			// Create a sample General item outward entry object
			var sampleGeneralItemOutwardEntryPostData = new GeneralItemOutwardEntries({
				name: 'New General item outward entry'
			});

			// Create a sample General item outward entry response
			var sampleGeneralItemOutwardEntryResponse = new GeneralItemOutwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New General item outward entry'
			});

			// Fixture mock form input values
			scope.name = 'New General item outward entry';

			// Set POST response
			$httpBackend.expectPOST('general-item-outward-entries', sampleGeneralItemOutwardEntryPostData).respond(sampleGeneralItemOutwardEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the General item outward entry was created
			expect($location.path()).toBe('/general-item-outward-entries/' + sampleGeneralItemOutwardEntryResponse._id);
		}));

		it('$scope.update() should update a valid General item outward entry', inject(function(GeneralItemOutwardEntries) {
			// Define a sample General item outward entry put data
			var sampleGeneralItemOutwardEntryPutData = new GeneralItemOutwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New General item outward entry'
			});

			// Mock General item outward entry in scope
			scope.generalItemOutwardEntry = sampleGeneralItemOutwardEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/general-item-outward-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/general-item-outward-entries/' + sampleGeneralItemOutwardEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid generalItemOutwardEntryId and remove the General item outward entry from the scope', inject(function(GeneralItemOutwardEntries) {
			// Create new General item outward entry object
			var sampleGeneralItemOutwardEntry = new GeneralItemOutwardEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new General item outward entries array and include the General item outward entry
			scope.generalItemOutwardEntries = [sampleGeneralItemOutwardEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/general-item-outward-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGeneralItemOutwardEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.generalItemOutwardEntries.length).toBe(0);
		}));
	});
}());