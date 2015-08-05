'use strict';

(function() {
	// Fabric receipts Controller Spec
	describe('Fabric receipts Controller Tests', function() {
		// Initialize global variables
		var FabricReceiptsController,
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

			// Initialize the Fabric receipts controller.
			FabricReceiptsController = $controller('FabricReceiptsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fabric receipt object fetched from XHR', inject(function(FabricReceipts) {
			// Create sample Fabric receipt using the Fabric receipts service
			var sampleFabricReceipt = new FabricReceipts({
				name: 'New Fabric receipt'
			});

			// Create a sample Fabric receipts array that includes the new Fabric receipt
			var sampleFabricReceipts = [sampleFabricReceipt];

			// Set GET response
			$httpBackend.expectGET('fabric-receipts').respond(sampleFabricReceipts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricReceipts).toEqualData(sampleFabricReceipts);
		}));

		it('$scope.findOne() should create an array with one Fabric receipt object fetched from XHR using a fabricReceiptId URL parameter', inject(function(FabricReceipts) {
			// Define a sample Fabric receipt object
			var sampleFabricReceipt = new FabricReceipts({
				name: 'New Fabric receipt'
			});

			// Set the URL parameter
			$stateParams.fabricReceiptId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fabric-receipts\/([0-9a-fA-F]{24})$/).respond(sampleFabricReceipt);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricReceipt).toEqualData(sampleFabricReceipt);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FabricReceipts) {
			// Create a sample Fabric receipt object
			var sampleFabricReceiptPostData = new FabricReceipts({
				name: 'New Fabric receipt'
			});

			// Create a sample Fabric receipt response
			var sampleFabricReceiptResponse = new FabricReceipts({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric receipt'
			});

			// Fixture mock form input values
			scope.name = 'New Fabric receipt';

			// Set POST response
			$httpBackend.expectPOST('fabric-receipts', sampleFabricReceiptPostData).respond(sampleFabricReceiptResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fabric receipt was created
			expect($location.path()).toBe('/fabric-receipts/' + sampleFabricReceiptResponse._id);
		}));

		it('$scope.update() should update a valid Fabric receipt', inject(function(FabricReceipts) {
			// Define a sample Fabric receipt put data
			var sampleFabricReceiptPutData = new FabricReceipts({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric receipt'
			});

			// Mock Fabric receipt in scope
			scope.fabricReceipt = sampleFabricReceiptPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fabric-receipts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fabric-receipts/' + sampleFabricReceiptPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fabricReceiptId and remove the Fabric receipt from the scope', inject(function(FabricReceipts) {
			// Create new Fabric receipt object
			var sampleFabricReceipt = new FabricReceipts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fabric receipts array and include the Fabric receipt
			scope.fabricReceipts = [sampleFabricReceipt];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fabric-receipts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFabricReceipt);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fabricReceipts.length).toBe(0);
		}));
	});
}());