'use strict';

(function() {
	// Deduction entries Controller Spec
	describe('Deduction entries Controller Tests', function() {
		// Initialize global variables
		var DeductionEntriesController,
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

			// Initialize the Deduction entries controller.
			DeductionEntriesController = $controller('DeductionEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Deduction entry object fetched from XHR', inject(function(DeductionEntries) {
			// Create sample Deduction entry using the Deduction entries service
			var sampleDeductionEntry = new DeductionEntries({
				name: 'New Deduction entry'
			});

			// Create a sample Deduction entries array that includes the new Deduction entry
			var sampleDeductionEntries = [sampleDeductionEntry];

			// Set GET response
			$httpBackend.expectGET('deduction-entries').respond(sampleDeductionEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.deductionEntries).toEqualData(sampleDeductionEntries);
		}));

		it('$scope.findOne() should create an array with one Deduction entry object fetched from XHR using a deductionEntryId URL parameter', inject(function(DeductionEntries) {
			// Define a sample Deduction entry object
			var sampleDeductionEntry = new DeductionEntries({
				name: 'New Deduction entry'
			});

			// Set the URL parameter
			$stateParams.deductionEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/deduction-entries\/([0-9a-fA-F]{24})$/).respond(sampleDeductionEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.deductionEntry).toEqualData(sampleDeductionEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(DeductionEntries) {
			// Create a sample Deduction entry object
			var sampleDeductionEntryPostData = new DeductionEntries({
				name: 'New Deduction entry'
			});

			// Create a sample Deduction entry response
			var sampleDeductionEntryResponse = new DeductionEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Deduction entry'
			});

			// Fixture mock form input values
			scope.name = 'New Deduction entry';

			// Set POST response
			$httpBackend.expectPOST('deduction-entries', sampleDeductionEntryPostData).respond(sampleDeductionEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Deduction entry was created
			expect($location.path()).toBe('/deduction-entries/' + sampleDeductionEntryResponse._id);
		}));

		it('$scope.update() should update a valid Deduction entry', inject(function(DeductionEntries) {
			// Define a sample Deduction entry put data
			var sampleDeductionEntryPutData = new DeductionEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Deduction entry'
			});

			// Mock Deduction entry in scope
			scope.deductionEntry = sampleDeductionEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/deduction-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/deduction-entries/' + sampleDeductionEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid deductionEntryId and remove the Deduction entry from the scope', inject(function(DeductionEntries) {
			// Create new Deduction entry object
			var sampleDeductionEntry = new DeductionEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Deduction entries array and include the Deduction entry
			scope.deductionEntries = [sampleDeductionEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/deduction-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDeductionEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.deductionEntries.length).toBe(0);
		}));
	});
}());