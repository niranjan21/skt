'use strict';

(function() {
	// Fabric transfers Controller Spec
	describe('Fabric transfers Controller Tests', function() {
		// Initialize global variables
		var FabricTransfersController,
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

			// Initialize the Fabric transfers controller.
			FabricTransfersController = $controller('FabricTransfersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fabric transfer object fetched from XHR', inject(function(FabricTransfers) {
			// Create sample Fabric transfer using the Fabric transfers service
			var sampleFabricTransfer = new FabricTransfers({
				name: 'New Fabric transfer'
			});

			// Create a sample Fabric transfers array that includes the new Fabric transfer
			var sampleFabricTransfers = [sampleFabricTransfer];

			// Set GET response
			$httpBackend.expectGET('fabric-transfers').respond(sampleFabricTransfers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricTransfers).toEqualData(sampleFabricTransfers);
		}));

		it('$scope.findOne() should create an array with one Fabric transfer object fetched from XHR using a fabricTransferId URL parameter', inject(function(FabricTransfers) {
			// Define a sample Fabric transfer object
			var sampleFabricTransfer = new FabricTransfers({
				name: 'New Fabric transfer'
			});

			// Set the URL parameter
			$stateParams.fabricTransferId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fabric-transfers\/([0-9a-fA-F]{24})$/).respond(sampleFabricTransfer);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricTransfer).toEqualData(sampleFabricTransfer);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FabricTransfers) {
			// Create a sample Fabric transfer object
			var sampleFabricTransferPostData = new FabricTransfers({
				name: 'New Fabric transfer'
			});

			// Create a sample Fabric transfer response
			var sampleFabricTransferResponse = new FabricTransfers({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric transfer'
			});

			// Fixture mock form input values
			scope.name = 'New Fabric transfer';

			// Set POST response
			$httpBackend.expectPOST('fabric-transfers', sampleFabricTransferPostData).respond(sampleFabricTransferResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fabric transfer was created
			expect($location.path()).toBe('/fabric-transfers/' + sampleFabricTransferResponse._id);
		}));

		it('$scope.update() should update a valid Fabric transfer', inject(function(FabricTransfers) {
			// Define a sample Fabric transfer put data
			var sampleFabricTransferPutData = new FabricTransfers({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric transfer'
			});

			// Mock Fabric transfer in scope
			scope.fabricTransfer = sampleFabricTransferPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fabric-transfers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fabric-transfers/' + sampleFabricTransferPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fabricTransferId and remove the Fabric transfer from the scope', inject(function(FabricTransfers) {
			// Create new Fabric transfer object
			var sampleFabricTransfer = new FabricTransfers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fabric transfers array and include the Fabric transfer
			scope.fabricTransfers = [sampleFabricTransfer];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fabric-transfers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFabricTransfer);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fabricTransfers.length).toBe(0);
		}));
	});
}());