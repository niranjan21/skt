'use strict';

(function() {
	// Production remarks entries Controller Spec
	describe('Production remarks entries Controller Tests', function() {
		// Initialize global variables
		var ProductionRemarksEntriesController,
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

			// Initialize the Production remarks entries controller.
			ProductionRemarksEntriesController = $controller('ProductionRemarksEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Production remarks entry object fetched from XHR', inject(function(ProductionRemarksEntries) {
			// Create sample Production remarks entry using the Production remarks entries service
			var sampleProductionRemarksEntry = new ProductionRemarksEntries({
				name: 'New Production remarks entry'
			});

			// Create a sample Production remarks entries array that includes the new Production remarks entry
			var sampleProductionRemarksEntries = [sampleProductionRemarksEntry];

			// Set GET response
			$httpBackend.expectGET('production-remarks-entries').respond(sampleProductionRemarksEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.productionRemarksEntries).toEqualData(sampleProductionRemarksEntries);
		}));

		it('$scope.findOne() should create an array with one Production remarks entry object fetched from XHR using a productionRemarksEntryId URL parameter', inject(function(ProductionRemarksEntries) {
			// Define a sample Production remarks entry object
			var sampleProductionRemarksEntry = new ProductionRemarksEntries({
				name: 'New Production remarks entry'
			});

			// Set the URL parameter
			$stateParams.productionRemarksEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/production-remarks-entries\/([0-9a-fA-F]{24})$/).respond(sampleProductionRemarksEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.productionRemarksEntry).toEqualData(sampleProductionRemarksEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ProductionRemarksEntries) {
			// Create a sample Production remarks entry object
			var sampleProductionRemarksEntryPostData = new ProductionRemarksEntries({
				name: 'New Production remarks entry'
			});

			// Create a sample Production remarks entry response
			var sampleProductionRemarksEntryResponse = new ProductionRemarksEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Production remarks entry'
			});

			// Fixture mock form input values
			scope.name = 'New Production remarks entry';

			// Set POST response
			$httpBackend.expectPOST('production-remarks-entries', sampleProductionRemarksEntryPostData).respond(sampleProductionRemarksEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Production remarks entry was created
			expect($location.path()).toBe('/production-remarks-entries/' + sampleProductionRemarksEntryResponse._id);
		}));

		it('$scope.update() should update a valid Production remarks entry', inject(function(ProductionRemarksEntries) {
			// Define a sample Production remarks entry put data
			var sampleProductionRemarksEntryPutData = new ProductionRemarksEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Production remarks entry'
			});

			// Mock Production remarks entry in scope
			scope.productionRemarksEntry = sampleProductionRemarksEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/production-remarks-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/production-remarks-entries/' + sampleProductionRemarksEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid productionRemarksEntryId and remove the Production remarks entry from the scope', inject(function(ProductionRemarksEntries) {
			// Create new Production remarks entry object
			var sampleProductionRemarksEntry = new ProductionRemarksEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Production remarks entries array and include the Production remarks entry
			scope.productionRemarksEntries = [sampleProductionRemarksEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/production-remarks-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProductionRemarksEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.productionRemarksEntries.length).toBe(0);
		}));
	});
}());