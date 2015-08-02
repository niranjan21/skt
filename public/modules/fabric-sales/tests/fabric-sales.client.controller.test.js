'use strict';

(function() {
	// Fabric sales Controller Spec
	describe('Fabric sales Controller Tests', function() {
		// Initialize global variables
		var FabricSalesController,
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

			// Initialize the Fabric sales controller.
			FabricSalesController = $controller('FabricSalesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fabric sale object fetched from XHR', inject(function(FabricSales) {
			// Create sample Fabric sale using the Fabric sales service
			var sampleFabricSale = new FabricSales({
				name: 'New Fabric sale'
			});

			// Create a sample Fabric sales array that includes the new Fabric sale
			var sampleFabricSales = [sampleFabricSale];

			// Set GET response
			$httpBackend.expectGET('fabric-sales').respond(sampleFabricSales);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricSales).toEqualData(sampleFabricSales);
		}));

		it('$scope.findOne() should create an array with one Fabric sale object fetched from XHR using a fabricSaleId URL parameter', inject(function(FabricSales) {
			// Define a sample Fabric sale object
			var sampleFabricSale = new FabricSales({
				name: 'New Fabric sale'
			});

			// Set the URL parameter
			$stateParams.fabricSaleId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fabric-sales\/([0-9a-fA-F]{24})$/).respond(sampleFabricSale);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricSale).toEqualData(sampleFabricSale);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FabricSales) {
			// Create a sample Fabric sale object
			var sampleFabricSalePostData = new FabricSales({
				name: 'New Fabric sale'
			});

			// Create a sample Fabric sale response
			var sampleFabricSaleResponse = new FabricSales({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric sale'
			});

			// Fixture mock form input values
			scope.name = 'New Fabric sale';

			// Set POST response
			$httpBackend.expectPOST('fabric-sales', sampleFabricSalePostData).respond(sampleFabricSaleResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fabric sale was created
			expect($location.path()).toBe('/fabric-sales/' + sampleFabricSaleResponse._id);
		}));

		it('$scope.update() should update a valid Fabric sale', inject(function(FabricSales) {
			// Define a sample Fabric sale put data
			var sampleFabricSalePutData = new FabricSales({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric sale'
			});

			// Mock Fabric sale in scope
			scope.fabricSale = sampleFabricSalePutData;

			// Set PUT response
			$httpBackend.expectPUT(/fabric-sales\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fabric-sales/' + sampleFabricSalePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fabricSaleId and remove the Fabric sale from the scope', inject(function(FabricSales) {
			// Create new Fabric sale object
			var sampleFabricSale = new FabricSales({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fabric sales array and include the Fabric sale
			scope.fabricSales = [sampleFabricSale];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fabric-sales\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFabricSale);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fabricSales.length).toBe(0);
		}));
	});
}());