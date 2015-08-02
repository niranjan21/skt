'use strict';

(function() {
	// Fabric sale registers Controller Spec
	describe('Fabric sale registers Controller Tests', function() {
		// Initialize global variables
		var FabricSaleRegistersController,
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

			// Initialize the Fabric sale registers controller.
			FabricSaleRegistersController = $controller('FabricSaleRegistersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fabric sale register object fetched from XHR', inject(function(FabricSaleRegisters) {
			// Create sample Fabric sale register using the Fabric sale registers service
			var sampleFabricSaleRegister = new FabricSaleRegisters({
				name: 'New Fabric sale register'
			});

			// Create a sample Fabric sale registers array that includes the new Fabric sale register
			var sampleFabricSaleRegisters = [sampleFabricSaleRegister];

			// Set GET response
			$httpBackend.expectGET('fabric-sale-registers').respond(sampleFabricSaleRegisters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricSaleRegisters).toEqualData(sampleFabricSaleRegisters);
		}));

		it('$scope.findOne() should create an array with one Fabric sale register object fetched from XHR using a fabricSaleRegisterId URL parameter', inject(function(FabricSaleRegisters) {
			// Define a sample Fabric sale register object
			var sampleFabricSaleRegister = new FabricSaleRegisters({
				name: 'New Fabric sale register'
			});

			// Set the URL parameter
			$stateParams.fabricSaleRegisterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fabric-sale-registers\/([0-9a-fA-F]{24})$/).respond(sampleFabricSaleRegister);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricSaleRegister).toEqualData(sampleFabricSaleRegister);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FabricSaleRegisters) {
			// Create a sample Fabric sale register object
			var sampleFabricSaleRegisterPostData = new FabricSaleRegisters({
				name: 'New Fabric sale register'
			});

			// Create a sample Fabric sale register response
			var sampleFabricSaleRegisterResponse = new FabricSaleRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric sale register'
			});

			// Fixture mock form input values
			scope.name = 'New Fabric sale register';

			// Set POST response
			$httpBackend.expectPOST('fabric-sale-registers', sampleFabricSaleRegisterPostData).respond(sampleFabricSaleRegisterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fabric sale register was created
			expect($location.path()).toBe('/fabric-sale-registers/' + sampleFabricSaleRegisterResponse._id);
		}));

		it('$scope.update() should update a valid Fabric sale register', inject(function(FabricSaleRegisters) {
			// Define a sample Fabric sale register put data
			var sampleFabricSaleRegisterPutData = new FabricSaleRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric sale register'
			});

			// Mock Fabric sale register in scope
			scope.fabricSaleRegister = sampleFabricSaleRegisterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fabric-sale-registers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fabric-sale-registers/' + sampleFabricSaleRegisterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fabricSaleRegisterId and remove the Fabric sale register from the scope', inject(function(FabricSaleRegisters) {
			// Create new Fabric sale register object
			var sampleFabricSaleRegister = new FabricSaleRegisters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fabric sale registers array and include the Fabric sale register
			scope.fabricSaleRegisters = [sampleFabricSaleRegister];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fabric-sale-registers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFabricSaleRegister);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fabricSaleRegisters.length).toBe(0);
		}));
	});
}());