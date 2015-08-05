'use strict';

(function() {
	// Production test entries Controller Spec
	describe('Production test entries Controller Tests', function() {
		// Initialize global variables
		var ProductionTestEntriesController,
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

			// Initialize the Production test entries controller.
			ProductionTestEntriesController = $controller('ProductionTestEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Production test entry object fetched from XHR', inject(function(ProductionTestEntries) {
			// Create sample Production test entry using the Production test entries service
			var sampleProductionTestEntry = new ProductionTestEntries({
				name: 'New Production test entry'
			});

			// Create a sample Production test entries array that includes the new Production test entry
			var sampleProductionTestEntries = [sampleProductionTestEntry];

			// Set GET response
			$httpBackend.expectGET('production-test-entries').respond(sampleProductionTestEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.productionTestEntries).toEqualData(sampleProductionTestEntries);
		}));

		it('$scope.findOne() should create an array with one Production test entry object fetched from XHR using a productionTestEntryId URL parameter', inject(function(ProductionTestEntries) {
			// Define a sample Production test entry object
			var sampleProductionTestEntry = new ProductionTestEntries({
				name: 'New Production test entry'
			});

			// Set the URL parameter
			$stateParams.productionTestEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/production-test-entries\/([0-9a-fA-F]{24})$/).respond(sampleProductionTestEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.productionTestEntry).toEqualData(sampleProductionTestEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ProductionTestEntries) {
			// Create a sample Production test entry object
			var sampleProductionTestEntryPostData = new ProductionTestEntries({
				name: 'New Production test entry'
			});

			// Create a sample Production test entry response
			var sampleProductionTestEntryResponse = new ProductionTestEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Production test entry'
			});

			// Fixture mock form input values
			scope.name = 'New Production test entry';

			// Set POST response
			$httpBackend.expectPOST('production-test-entries', sampleProductionTestEntryPostData).respond(sampleProductionTestEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Production test entry was created
			expect($location.path()).toBe('/production-test-entries/' + sampleProductionTestEntryResponse._id);
		}));

		it('$scope.update() should update a valid Production test entry', inject(function(ProductionTestEntries) {
			// Define a sample Production test entry put data
			var sampleProductionTestEntryPutData = new ProductionTestEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Production test entry'
			});

			// Mock Production test entry in scope
			scope.productionTestEntry = sampleProductionTestEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/production-test-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/production-test-entries/' + sampleProductionTestEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid productionTestEntryId and remove the Production test entry from the scope', inject(function(ProductionTestEntries) {
			// Create new Production test entry object
			var sampleProductionTestEntry = new ProductionTestEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Production test entries array and include the Production test entry
			scope.productionTestEntries = [sampleProductionTestEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/production-test-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProductionTestEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.productionTestEntries.length).toBe(0);
		}));
	});
}());