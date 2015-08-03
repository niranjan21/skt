'use strict';

(function() {
	// Fabric groups Controller Spec
	describe('Fabric groups Controller Tests', function() {
		// Initialize global variables
		var FabricGroupsController,
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

			// Initialize the Fabric groups controller.
			FabricGroupsController = $controller('FabricGroupsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fabric group object fetched from XHR', inject(function(FabricGroups) {
			// Create sample Fabric group using the Fabric groups service
			var sampleFabricGroup = new FabricGroups({
				name: 'New Fabric group'
			});

			// Create a sample Fabric groups array that includes the new Fabric group
			var sampleFabricGroups = [sampleFabricGroup];

			// Set GET response
			$httpBackend.expectGET('fabric-groups').respond(sampleFabricGroups);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricGroups).toEqualData(sampleFabricGroups);
		}));

		it('$scope.findOne() should create an array with one Fabric group object fetched from XHR using a fabricGroupId URL parameter', inject(function(FabricGroups) {
			// Define a sample Fabric group object
			var sampleFabricGroup = new FabricGroups({
				name: 'New Fabric group'
			});

			// Set the URL parameter
			$stateParams.fabricGroupId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fabric-groups\/([0-9a-fA-F]{24})$/).respond(sampleFabricGroup);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricGroup).toEqualData(sampleFabricGroup);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FabricGroups) {
			// Create a sample Fabric group object
			var sampleFabricGroupPostData = new FabricGroups({
				name: 'New Fabric group'
			});

			// Create a sample Fabric group response
			var sampleFabricGroupResponse = new FabricGroups({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric group'
			});

			// Fixture mock form input values
			scope.name = 'New Fabric group';

			// Set POST response
			$httpBackend.expectPOST('fabric-groups', sampleFabricGroupPostData).respond(sampleFabricGroupResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fabric group was created
			expect($location.path()).toBe('/fabric-groups/' + sampleFabricGroupResponse._id);
		}));

		it('$scope.update() should update a valid Fabric group', inject(function(FabricGroups) {
			// Define a sample Fabric group put data
			var sampleFabricGroupPutData = new FabricGroups({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric group'
			});

			// Mock Fabric group in scope
			scope.fabricGroup = sampleFabricGroupPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fabric-groups\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fabric-groups/' + sampleFabricGroupPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fabricGroupId and remove the Fabric group from the scope', inject(function(FabricGroups) {
			// Create new Fabric group object
			var sampleFabricGroup = new FabricGroups({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fabric groups array and include the Fabric group
			scope.fabricGroups = [sampleFabricGroup];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fabric-groups\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFabricGroup);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fabricGroups.length).toBe(0);
		}));
	});
}());