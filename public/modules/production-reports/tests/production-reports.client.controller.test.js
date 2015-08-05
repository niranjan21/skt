'use strict';

(function() {
	// Production reports Controller Spec
	describe('Production reports Controller Tests', function() {
		// Initialize global variables
		var ProductionReportsController,
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

			// Initialize the Production reports controller.
			ProductionReportsController = $controller('ProductionReportsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Production report object fetched from XHR', inject(function(ProductionReports) {
			// Create sample Production report using the Production reports service
			var sampleProductionReport = new ProductionReports({
				name: 'New Production report'
			});

			// Create a sample Production reports array that includes the new Production report
			var sampleProductionReports = [sampleProductionReport];

			// Set GET response
			$httpBackend.expectGET('production-reports').respond(sampleProductionReports);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.productionReports).toEqualData(sampleProductionReports);
		}));

		it('$scope.findOne() should create an array with one Production report object fetched from XHR using a productionReportId URL parameter', inject(function(ProductionReports) {
			// Define a sample Production report object
			var sampleProductionReport = new ProductionReports({
				name: 'New Production report'
			});

			// Set the URL parameter
			$stateParams.productionReportId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/production-reports\/([0-9a-fA-F]{24})$/).respond(sampleProductionReport);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.productionReport).toEqualData(sampleProductionReport);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ProductionReports) {
			// Create a sample Production report object
			var sampleProductionReportPostData = new ProductionReports({
				name: 'New Production report'
			});

			// Create a sample Production report response
			var sampleProductionReportResponse = new ProductionReports({
				_id: '525cf20451979dea2c000001',
				name: 'New Production report'
			});

			// Fixture mock form input values
			scope.name = 'New Production report';

			// Set POST response
			$httpBackend.expectPOST('production-reports', sampleProductionReportPostData).respond(sampleProductionReportResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Production report was created
			expect($location.path()).toBe('/production-reports/' + sampleProductionReportResponse._id);
		}));

		it('$scope.update() should update a valid Production report', inject(function(ProductionReports) {
			// Define a sample Production report put data
			var sampleProductionReportPutData = new ProductionReports({
				_id: '525cf20451979dea2c000001',
				name: 'New Production report'
			});

			// Mock Production report in scope
			scope.productionReport = sampleProductionReportPutData;

			// Set PUT response
			$httpBackend.expectPUT(/production-reports\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/production-reports/' + sampleProductionReportPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid productionReportId and remove the Production report from the scope', inject(function(ProductionReports) {
			// Create new Production report object
			var sampleProductionReport = new ProductionReports({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Production reports array and include the Production report
			scope.productionReports = [sampleProductionReport];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/production-reports\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProductionReport);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.productionReports.length).toBe(0);
		}));
	});
}());