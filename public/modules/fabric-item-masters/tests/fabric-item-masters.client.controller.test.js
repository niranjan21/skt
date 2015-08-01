'use strict';

(function() {
	// Fabric item masters Controller Spec
	describe('Fabric item masters Controller Tests', function() {
		// Initialize global variables
		var FabricItemMastersController,
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

			// Initialize the Fabric item masters controller.
			FabricItemMastersController = $controller('FabricItemMastersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fabric item master object fetched from XHR', inject(function(FabricItemMasters) {
			// Create sample Fabric item master using the Fabric item masters service
			var sampleFabricItemMaster = new FabricItemMasters({
				name: 'New Fabric item master'
			});

			// Create a sample Fabric item masters array that includes the new Fabric item master
			var sampleFabricItemMasters = [sampleFabricItemMaster];

			// Set GET response
			$httpBackend.expectGET('fabric-item-masters').respond(sampleFabricItemMasters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricItemMasters).toEqualData(sampleFabricItemMasters);
		}));

		it('$scope.findOne() should create an array with one Fabric item master object fetched from XHR using a fabricItemMasterId URL parameter', inject(function(FabricItemMasters) {
			// Define a sample Fabric item master object
			var sampleFabricItemMaster = new FabricItemMasters({
				name: 'New Fabric item master'
			});

			// Set the URL parameter
			$stateParams.fabricItemMasterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fabric-item-masters\/([0-9a-fA-F]{24})$/).respond(sampleFabricItemMaster);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricItemMaster).toEqualData(sampleFabricItemMaster);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FabricItemMasters) {
			// Create a sample Fabric item master object
			var sampleFabricItemMasterPostData = new FabricItemMasters({
				name: 'New Fabric item master'
			});

			// Create a sample Fabric item master response
			var sampleFabricItemMasterResponse = new FabricItemMasters({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric item master'
			});

			// Fixture mock form input values
			scope.name = 'New Fabric item master';

			// Set POST response
			$httpBackend.expectPOST('fabric-item-masters', sampleFabricItemMasterPostData).respond(sampleFabricItemMasterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fabric item master was created
			expect($location.path()).toBe('/fabric-item-masters/' + sampleFabricItemMasterResponse._id);
		}));

		it('$scope.update() should update a valid Fabric item master', inject(function(FabricItemMasters) {
			// Define a sample Fabric item master put data
			var sampleFabricItemMasterPutData = new FabricItemMasters({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric item master'
			});

			// Mock Fabric item master in scope
			scope.fabricItemMaster = sampleFabricItemMasterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fabric-item-masters\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fabric-item-masters/' + sampleFabricItemMasterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fabricItemMasterId and remove the Fabric item master from the scope', inject(function(FabricItemMasters) {
			// Create new Fabric item master object
			var sampleFabricItemMaster = new FabricItemMasters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fabric item masters array and include the Fabric item master
			scope.fabricItemMasters = [sampleFabricItemMaster];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fabric-item-masters\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFabricItemMaster);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fabricItemMasters.length).toBe(0);
		}));
	});
}());