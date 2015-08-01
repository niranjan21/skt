'use strict';

(function() {
	// Fabric requirement inward entries Controller Spec
	describe('Fabric requirement inward entries Controller Tests', function() {
		// Initialize global variables
		var FabricRequirementInwardEntriesController,
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

			// Initialize the Fabric requirement inward entries controller.
			FabricRequirementInwardEntriesController = $controller('FabricRequirementInwardEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fabric requirement inward entry object fetched from XHR', inject(function(FabricRequirementInwardEntries) {
			// Create sample Fabric requirement inward entry using the Fabric requirement inward entries service
			var sampleFabricRequirementInwardEntry = new FabricRequirementInwardEntries({
				name: 'New Fabric requirement inward entry'
			});

			// Create a sample Fabric requirement inward entries array that includes the new Fabric requirement inward entry
			var sampleFabricRequirementInwardEntries = [sampleFabricRequirementInwardEntry];

			// Set GET response
			$httpBackend.expectGET('fabric-requirement-inward-entries').respond(sampleFabricRequirementInwardEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricRequirementInwardEntries).toEqualData(sampleFabricRequirementInwardEntries);
		}));

		it('$scope.findOne() should create an array with one Fabric requirement inward entry object fetched from XHR using a fabricRequirementInwardEntryId URL parameter', inject(function(FabricRequirementInwardEntries) {
			// Define a sample Fabric requirement inward entry object
			var sampleFabricRequirementInwardEntry = new FabricRequirementInwardEntries({
				name: 'New Fabric requirement inward entry'
			});

			// Set the URL parameter
			$stateParams.fabricRequirementInwardEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fabric-requirement-inward-entries\/([0-9a-fA-F]{24})$/).respond(sampleFabricRequirementInwardEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricRequirementInwardEntry).toEqualData(sampleFabricRequirementInwardEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FabricRequirementInwardEntries) {
			// Create a sample Fabric requirement inward entry object
			var sampleFabricRequirementInwardEntryPostData = new FabricRequirementInwardEntries({
				name: 'New Fabric requirement inward entry'
			});

			// Create a sample Fabric requirement inward entry response
			var sampleFabricRequirementInwardEntryResponse = new FabricRequirementInwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric requirement inward entry'
			});

			// Fixture mock form input values
			scope.name = 'New Fabric requirement inward entry';

			// Set POST response
			$httpBackend.expectPOST('fabric-requirement-inward-entries', sampleFabricRequirementInwardEntryPostData).respond(sampleFabricRequirementInwardEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fabric requirement inward entry was created
			expect($location.path()).toBe('/fabric-requirement-inward-entries/' + sampleFabricRequirementInwardEntryResponse._id);
		}));

		it('$scope.update() should update a valid Fabric requirement inward entry', inject(function(FabricRequirementInwardEntries) {
			// Define a sample Fabric requirement inward entry put data
			var sampleFabricRequirementInwardEntryPutData = new FabricRequirementInwardEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric requirement inward entry'
			});

			// Mock Fabric requirement inward entry in scope
			scope.fabricRequirementInwardEntry = sampleFabricRequirementInwardEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fabric-requirement-inward-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fabric-requirement-inward-entries/' + sampleFabricRequirementInwardEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fabricRequirementInwardEntryId and remove the Fabric requirement inward entry from the scope', inject(function(FabricRequirementInwardEntries) {
			// Create new Fabric requirement inward entry object
			var sampleFabricRequirementInwardEntry = new FabricRequirementInwardEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fabric requirement inward entries array and include the Fabric requirement inward entry
			scope.fabricRequirementInwardEntries = [sampleFabricRequirementInwardEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fabric-requirement-inward-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFabricRequirementInwardEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fabricRequirementInwardEntries.length).toBe(0);
		}));
	});
}());