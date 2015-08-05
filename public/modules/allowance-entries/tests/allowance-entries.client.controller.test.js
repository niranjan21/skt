'use strict';

(function() {
	// Allowance entries Controller Spec
	describe('Allowance entries Controller Tests', function() {
		// Initialize global variables
		var AllowanceEntriesController,
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

			// Initialize the Allowance entries controller.
			AllowanceEntriesController = $controller('AllowanceEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Allowance entry object fetched from XHR', inject(function(AllowanceEntries) {
			// Create sample Allowance entry using the Allowance entries service
			var sampleAllowanceEntry = new AllowanceEntries({
				name: 'New Allowance entry'
			});

			// Create a sample Allowance entries array that includes the new Allowance entry
			var sampleAllowanceEntries = [sampleAllowanceEntry];

			// Set GET response
			$httpBackend.expectGET('allowance-entries').respond(sampleAllowanceEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.allowanceEntries).toEqualData(sampleAllowanceEntries);
		}));

		it('$scope.findOne() should create an array with one Allowance entry object fetched from XHR using a allowanceEntryId URL parameter', inject(function(AllowanceEntries) {
			// Define a sample Allowance entry object
			var sampleAllowanceEntry = new AllowanceEntries({
				name: 'New Allowance entry'
			});

			// Set the URL parameter
			$stateParams.allowanceEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/allowance-entries\/([0-9a-fA-F]{24})$/).respond(sampleAllowanceEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.allowanceEntry).toEqualData(sampleAllowanceEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(AllowanceEntries) {
			// Create a sample Allowance entry object
			var sampleAllowanceEntryPostData = new AllowanceEntries({
				name: 'New Allowance entry'
			});

			// Create a sample Allowance entry response
			var sampleAllowanceEntryResponse = new AllowanceEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Allowance entry'
			});

			// Fixture mock form input values
			scope.name = 'New Allowance entry';

			// Set POST response
			$httpBackend.expectPOST('allowance-entries', sampleAllowanceEntryPostData).respond(sampleAllowanceEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Allowance entry was created
			expect($location.path()).toBe('/allowance-entries/' + sampleAllowanceEntryResponse._id);
		}));

		it('$scope.update() should update a valid Allowance entry', inject(function(AllowanceEntries) {
			// Define a sample Allowance entry put data
			var sampleAllowanceEntryPutData = new AllowanceEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Allowance entry'
			});

			// Mock Allowance entry in scope
			scope.allowanceEntry = sampleAllowanceEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/allowance-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/allowance-entries/' + sampleAllowanceEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid allowanceEntryId and remove the Allowance entry from the scope', inject(function(AllowanceEntries) {
			// Create new Allowance entry object
			var sampleAllowanceEntry = new AllowanceEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Allowance entries array and include the Allowance entry
			scope.allowanceEntries = [sampleAllowanceEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/allowance-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAllowanceEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.allowanceEntries.length).toBe(0);
		}));
	});
}());