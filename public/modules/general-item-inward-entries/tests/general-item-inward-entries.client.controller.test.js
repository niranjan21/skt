'use strict';

(function() {
	// General item inward entries Controller Spec
	describe('General item inward entries Controller Tests', function() {
		// Initialize global variables
		var GeneralItemInwardEntriesController,
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

			// Initialize the General item inward entries controller.
			GeneralItemInwardEntriesController = $controller('GeneralItemInwardEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one General item inward entry object fetched from XHR', inject(function(GeneralItemInwardEntries) {
			// Create sample General item inward entry using the General item inward entries service
			var sampleGeneralItemInwardEntry = new GeneralItemInwardEntries({
				name: 'New General item inward entry'
			});

			// Create a sample General item inward entries array that includes the new General item inward entry
			var sampleGeneralItemInwardEntries = [sampleGeneralItemInwardEntry];

			// Set GET response
			$httpBackend.expectGET('general-item-inward-entries').respond(sampleGeneralItemInwardEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generalItemInwardEntries).toEqualData(sampleGeneralItemInwardEntries);
		}));

		it('$scope.findOne() should create an array with one General item inward entry object fetched from XHR using a generalItemInwardEntryId URL parameter', inject(function(GeneralItemInwardEntries) {
			// Define a sample General item inward entry object
			var sampleGeneralItemInwardEntry = new GeneralItemInwardEntries({
				name: 'New General item inward entry'
			});

			// Set the URL parameter
			$stateParams.generalItemInwardEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/general-item-inward-entries\/([0-9a-fA-F]{24})$/).respond(sampleGeneralItemInwardEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generalItemInwardEntry).toEqualData(sampleGeneralItemInwardEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(GeneralItemInwardEntries) {
			// Create a sample General item inward entry object
			var sampleGeneralItemInwardEntryPostData = new GeneralItemInwardEntries({
				name: 'New General item inward entry'
			});

			// Create a sample General item inward entry response
			var sampleGeneralItemInwardEntryResponse = new GeneralItemInwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New General item inward entry'
			});

			// Fixture mock form input values
			scope.name = 'New General item inward entry';

			// Set POST response
			$httpBackend.expectPOST('general-item-inward-entries', sampleGeneralItemInwardEntryPostData).respond(sampleGeneralItemInwardEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the General item inward entry was created
			expect($location.path()).toBe('/general-item-inward-entries/' + sampleGeneralItemInwardEntryResponse._id);
		}));

		it('$scope.update() should update a valid General item inward entry', inject(function(GeneralItemInwardEntries) {
			// Define a sample General item inward entry put data
			var sampleGeneralItemInwardEntryPutData = new GeneralItemInwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New General item inward entry'
			});

			// Mock General item inward entry in scope
			scope.generalItemInwardEntry = sampleGeneralItemInwardEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/general-item-inward-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/general-item-inward-entries/' + sampleGeneralItemInwardEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid generalItemInwardEntryId and remove the General item inward entry from the scope', inject(function(GeneralItemInwardEntries) {
			// Create new General item inward entry object
			var sampleGeneralItemInwardEntry = new GeneralItemInwardEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new General item inward entries array and include the General item inward entry
			scope.generalItemInwardEntries = [sampleGeneralItemInwardEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/general-item-inward-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGeneralItemInwardEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.generalItemInwardEntries.length).toBe(0);
		}));
	});
}());