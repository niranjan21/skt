'use strict';

(function() {
	// Fabric stock reports Controller Spec
	describe('Fabric stock reports Controller Tests', function() {
		// Initialize global variables
		var FabricStockReportsController,
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

			// Initialize the Fabric stock reports controller.
			FabricStockReportsController = $controller('FabricStockReportsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fabric stock report object fetched from XHR', inject(function(FabricStockReports) {
			// Create sample Fabric stock report using the Fabric stock reports service
			var sampleFabricStockReport = new FabricStockReports({
				name: 'New Fabric stock report'
			});

			// Create a sample Fabric stock reports array that includes the new Fabric stock report
			var sampleFabricStockReports = [sampleFabricStockReport];

			// Set GET response
			$httpBackend.expectGET('fabric-stock-reports').respond(sampleFabricStockReports);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricStockReports).toEqualData(sampleFabricStockReports);
		}));

		it('$scope.findOne() should create an array with one Fabric stock report object fetched from XHR using a fabricStockReportId URL parameter', inject(function(FabricStockReports) {
			// Define a sample Fabric stock report object
			var sampleFabricStockReport = new FabricStockReports({
				name: 'New Fabric stock report'
			});

			// Set the URL parameter
			$stateParams.fabricStockReportId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fabric-stock-reports\/([0-9a-fA-F]{24})$/).respond(sampleFabricStockReport);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricStockReport).toEqualData(sampleFabricStockReport);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FabricStockReports) {
			// Create a sample Fabric stock report object
			var sampleFabricStockReportPostData = new FabricStockReports({
				name: 'New Fabric stock report'
			});

			// Create a sample Fabric stock report response
			var sampleFabricStockReportResponse = new FabricStockReports({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric stock report'
			});

			// Fixture mock form input values
			scope.name = 'New Fabric stock report';

			// Set POST response
			$httpBackend.expectPOST('fabric-stock-reports', sampleFabricStockReportPostData).respond(sampleFabricStockReportResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fabric stock report was created
			expect($location.path()).toBe('/fabric-stock-reports/' + sampleFabricStockReportResponse._id);
		}));

		it('$scope.update() should update a valid Fabric stock report', inject(function(FabricStockReports) {
			// Define a sample Fabric stock report put data
			var sampleFabricStockReportPutData = new FabricStockReports({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric stock report'
			});

			// Mock Fabric stock report in scope
			scope.fabricStockReport = sampleFabricStockReportPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fabric-stock-reports\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fabric-stock-reports/' + sampleFabricStockReportPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fabricStockReportId and remove the Fabric stock report from the scope', inject(function(FabricStockReports) {
			// Create new Fabric stock report object
			var sampleFabricStockReport = new FabricStockReports({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fabric stock reports array and include the Fabric stock report
			scope.fabricStockReports = [sampleFabricStockReport];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fabric-stock-reports\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFabricStockReport);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fabricStockReports.length).toBe(0);
		}));
	});
}());