'use strict';

(function() {
	// Fabric return entries Controller Spec
	describe('Fabric return entries Controller Tests', function() {
		// Initialize global variables
		var FabricReturnEntriesController,
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

			// Initialize the Fabric return entries controller.
			FabricReturnEntriesController = $controller('FabricReturnEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fabric return entry object fetched from XHR', inject(function(FabricReturnEntries) {
			// Create sample Fabric return entry using the Fabric return entries service
			var sampleFabricReturnEntry = new FabricReturnEntries({
				name: 'New Fabric return entry'
			});

			// Create a sample Fabric return entries array that includes the new Fabric return entry
			var sampleFabricReturnEntries = [sampleFabricReturnEntry];

			// Set GET response
			$httpBackend.expectGET('fabric-return-entries').respond(sampleFabricReturnEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricReturnEntries).toEqualData(sampleFabricReturnEntries);
		}));

		it('$scope.findOne() should create an array with one Fabric return entry object fetched from XHR using a fabricReturnEntryId URL parameter', inject(function(FabricReturnEntries) {
			// Define a sample Fabric return entry object
			var sampleFabricReturnEntry = new FabricReturnEntries({
				name: 'New Fabric return entry'
			});

			// Set the URL parameter
			$stateParams.fabricReturnEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fabric-return-entries\/([0-9a-fA-F]{24})$/).respond(sampleFabricReturnEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricReturnEntry).toEqualData(sampleFabricReturnEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FabricReturnEntries) {
			// Create a sample Fabric return entry object
			var sampleFabricReturnEntryPostData = new FabricReturnEntries({
				name: 'New Fabric return entry'
			});

			// Create a sample Fabric return entry response
			var sampleFabricReturnEntryResponse = new FabricReturnEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric return entry'
			});

			// Fixture mock form input values
			scope.name = 'New Fabric return entry';

			// Set POST response
			$httpBackend.expectPOST('fabric-return-entries', sampleFabricReturnEntryPostData).respond(sampleFabricReturnEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fabric return entry was created
			expect($location.path()).toBe('/fabric-return-entries/' + sampleFabricReturnEntryResponse._id);
		}));

		it('$scope.update() should update a valid Fabric return entry', inject(function(FabricReturnEntries) {
			// Define a sample Fabric return entry put data
			var sampleFabricReturnEntryPutData = new FabricReturnEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric return entry'
			});

			// Mock Fabric return entry in scope
			scope.fabricReturnEntry = sampleFabricReturnEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fabric-return-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fabric-return-entries/' + sampleFabricReturnEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fabricReturnEntryId and remove the Fabric return entry from the scope', inject(function(FabricReturnEntries) {
			// Create new Fabric return entry object
			var sampleFabricReturnEntry = new FabricReturnEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fabric return entries array and include the Fabric return entry
			scope.fabricReturnEntries = [sampleFabricReturnEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fabric-return-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFabricReturnEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fabricReturnEntries.length).toBe(0);
		}));
	});
}());