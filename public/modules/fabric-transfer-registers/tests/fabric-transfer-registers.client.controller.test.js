'use strict';

(function() {
	// Fabric transfer registers Controller Spec
	describe('Fabric transfer registers Controller Tests', function() {
		// Initialize global variables
		var FabricTransferRegistersController,
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

			// Initialize the Fabric transfer registers controller.
			FabricTransferRegistersController = $controller('FabricTransferRegistersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fabric transfer register object fetched from XHR', inject(function(FabricTransferRegisters) {
			// Create sample Fabric transfer register using the Fabric transfer registers service
			var sampleFabricTransferRegister = new FabricTransferRegisters({
				name: 'New Fabric transfer register'
			});

			// Create a sample Fabric transfer registers array that includes the new Fabric transfer register
			var sampleFabricTransferRegisters = [sampleFabricTransferRegister];

			// Set GET response
			$httpBackend.expectGET('fabric-transfer-registers').respond(sampleFabricTransferRegisters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricTransferRegisters).toEqualData(sampleFabricTransferRegisters);
		}));

		it('$scope.findOne() should create an array with one Fabric transfer register object fetched from XHR using a fabricTransferRegisterId URL parameter', inject(function(FabricTransferRegisters) {
			// Define a sample Fabric transfer register object
			var sampleFabricTransferRegister = new FabricTransferRegisters({
				name: 'New Fabric transfer register'
			});

			// Set the URL parameter
			$stateParams.fabricTransferRegisterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fabric-transfer-registers\/([0-9a-fA-F]{24})$/).respond(sampleFabricTransferRegister);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricTransferRegister).toEqualData(sampleFabricTransferRegister);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FabricTransferRegisters) {
			// Create a sample Fabric transfer register object
			var sampleFabricTransferRegisterPostData = new FabricTransferRegisters({
				name: 'New Fabric transfer register'
			});

			// Create a sample Fabric transfer register response
			var sampleFabricTransferRegisterResponse = new FabricTransferRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric transfer register'
			});

			// Fixture mock form input values
			scope.name = 'New Fabric transfer register';

			// Set POST response
			$httpBackend.expectPOST('fabric-transfer-registers', sampleFabricTransferRegisterPostData).respond(sampleFabricTransferRegisterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fabric transfer register was created
			expect($location.path()).toBe('/fabric-transfer-registers/' + sampleFabricTransferRegisterResponse._id);
		}));

		it('$scope.update() should update a valid Fabric transfer register', inject(function(FabricTransferRegisters) {
			// Define a sample Fabric transfer register put data
			var sampleFabricTransferRegisterPutData = new FabricTransferRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric transfer register'
			});

			// Mock Fabric transfer register in scope
			scope.fabricTransferRegister = sampleFabricTransferRegisterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fabric-transfer-registers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fabric-transfer-registers/' + sampleFabricTransferRegisterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fabricTransferRegisterId and remove the Fabric transfer register from the scope', inject(function(FabricTransferRegisters) {
			// Create new Fabric transfer register object
			var sampleFabricTransferRegister = new FabricTransferRegisters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fabric transfer registers array and include the Fabric transfer register
			scope.fabricTransferRegisters = [sampleFabricTransferRegister];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fabric-transfer-registers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFabricTransferRegister);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fabricTransferRegisters.length).toBe(0);
		}));
	});
}());