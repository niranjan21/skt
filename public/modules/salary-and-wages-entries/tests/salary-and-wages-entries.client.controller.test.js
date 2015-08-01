'use strict';

(function() {
	// Salary and wages entries Controller Spec
	describe('Salary and wages entries Controller Tests', function() {
		// Initialize global variables
		var SalaryAndWagesEntriesController,
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

			// Initialize the Salary and wages entries controller.
			SalaryAndWagesEntriesController = $controller('SalaryAndWagesEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Salary and wages entry object fetched from XHR', inject(function(SalaryAndWagesEntries) {
			// Create sample Salary and wages entry using the Salary and wages entries service
			var sampleSalaryAndWagesEntry = new SalaryAndWagesEntries({
				name: 'New Salary and wages entry'
			});

			// Create a sample Salary and wages entries array that includes the new Salary and wages entry
			var sampleSalaryAndWagesEntries = [sampleSalaryAndWagesEntry];

			// Set GET response
			$httpBackend.expectGET('salary-and-wages-entries').respond(sampleSalaryAndWagesEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.salaryAndWagesEntries).toEqualData(sampleSalaryAndWagesEntries);
		}));

		it('$scope.findOne() should create an array with one Salary and wages entry object fetched from XHR using a salaryAndWagesEntryId URL parameter', inject(function(SalaryAndWagesEntries) {
			// Define a sample Salary and wages entry object
			var sampleSalaryAndWagesEntry = new SalaryAndWagesEntries({
				name: 'New Salary and wages entry'
			});

			// Set the URL parameter
			$stateParams.salaryAndWagesEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/salary-and-wages-entries\/([0-9a-fA-F]{24})$/).respond(sampleSalaryAndWagesEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.salaryAndWagesEntry).toEqualData(sampleSalaryAndWagesEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(SalaryAndWagesEntries) {
			// Create a sample Salary and wages entry object
			var sampleSalaryAndWagesEntryPostData = new SalaryAndWagesEntries({
				name: 'New Salary and wages entry'
			});

			// Create a sample Salary and wages entry response
			var sampleSalaryAndWagesEntryResponse = new SalaryAndWagesEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Salary and wages entry'
			});

			// Fixture mock form input values
			scope.name = 'New Salary and wages entry';

			// Set POST response
			$httpBackend.expectPOST('salary-and-wages-entries', sampleSalaryAndWagesEntryPostData).respond(sampleSalaryAndWagesEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Salary and wages entry was created
			expect($location.path()).toBe('/salary-and-wages-entries/' + sampleSalaryAndWagesEntryResponse._id);
		}));

		it('$scope.update() should update a valid Salary and wages entry', inject(function(SalaryAndWagesEntries) {
			// Define a sample Salary and wages entry put data
			var sampleSalaryAndWagesEntryPutData = new SalaryAndWagesEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Salary and wages entry'
			});

			// Mock Salary and wages entry in scope
			scope.salaryAndWagesEntry = sampleSalaryAndWagesEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/salary-and-wages-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/salary-and-wages-entries/' + sampleSalaryAndWagesEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid salaryAndWagesEntryId and remove the Salary and wages entry from the scope', inject(function(SalaryAndWagesEntries) {
			// Create new Salary and wages entry object
			var sampleSalaryAndWagesEntry = new SalaryAndWagesEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Salary and wages entries array and include the Salary and wages entry
			scope.salaryAndWagesEntries = [sampleSalaryAndWagesEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/salary-and-wages-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSalaryAndWagesEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.salaryAndWagesEntries.length).toBe(0);
		}));
	});
}());