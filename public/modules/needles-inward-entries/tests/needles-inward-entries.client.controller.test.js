'use strict';

(function() {
	// Needles inward entries Controller Spec
	describe('Needles inward entries Controller Tests', function() {
		// Initialize global variables
		var NeedlesInwardEntriesController,
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

			// Initialize the Needles inward entries controller.
			NeedlesInwardEntriesController = $controller('NeedlesInwardEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Needles inward entry object fetched from XHR', inject(function(NeedlesInwardEntries) {
			// Create sample Needles inward entry using the Needles inward entries service
			var sampleNeedlesInwardEntry = new NeedlesInwardEntries({
				name: 'New Needles inward entry'
			});

			// Create a sample Needles inward entries array that includes the new Needles inward entry
			var sampleNeedlesInwardEntries = [sampleNeedlesInwardEntry];

			// Set GET response
			$httpBackend.expectGET('needles-inward-entries').respond(sampleNeedlesInwardEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.needlesInwardEntries).toEqualData(sampleNeedlesInwardEntries);
		}));

		it('$scope.findOne() should create an array with one Needles inward entry object fetched from XHR using a needlesInwardEntryId URL parameter', inject(function(NeedlesInwardEntries) {
			// Define a sample Needles inward entry object
			var sampleNeedlesInwardEntry = new NeedlesInwardEntries({
				name: 'New Needles inward entry'
			});

			// Set the URL parameter
			$stateParams.needlesInwardEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/needles-inward-entries\/([0-9a-fA-F]{24})$/).respond(sampleNeedlesInwardEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.needlesInwardEntry).toEqualData(sampleNeedlesInwardEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(NeedlesInwardEntries) {
			// Create a sample Needles inward entry object
			var sampleNeedlesInwardEntryPostData = new NeedlesInwardEntries({
				name: 'New Needles inward entry'
			});

			// Create a sample Needles inward entry response
			var sampleNeedlesInwardEntryResponse = new NeedlesInwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Needles inward entry'
			});

			// Fixture mock form input values
			scope.name = 'New Needles inward entry';

			// Set POST response
			$httpBackend.expectPOST('needles-inward-entries', sampleNeedlesInwardEntryPostData).respond(sampleNeedlesInwardEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Needles inward entry was created
			expect($location.path()).toBe('/needles-inward-entries/' + sampleNeedlesInwardEntryResponse._id);
		}));

		it('$scope.update() should update a valid Needles inward entry', inject(function(NeedlesInwardEntries) {
			// Define a sample Needles inward entry put data
			var sampleNeedlesInwardEntryPutData = new NeedlesInwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Needles inward entry'
			});

			// Mock Needles inward entry in scope
			scope.needlesInwardEntry = sampleNeedlesInwardEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/needles-inward-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/needles-inward-entries/' + sampleNeedlesInwardEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid needlesInwardEntryId and remove the Needles inward entry from the scope', inject(function(NeedlesInwardEntries) {
			// Create new Needles inward entry object
			var sampleNeedlesInwardEntry = new NeedlesInwardEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Needles inward entries array and include the Needles inward entry
			scope.needlesInwardEntries = [sampleNeedlesInwardEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/needles-inward-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleNeedlesInwardEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.needlesInwardEntries.length).toBe(0);
		}));
	});
}());