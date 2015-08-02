'use strict';

(function() {
	// General test reports Controller Spec
	describe('General test reports Controller Tests', function() {
		// Initialize global variables
		var GeneralTestReportsController,
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

			// Initialize the General test reports controller.
			GeneralTestReportsController = $controller('GeneralTestReportsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one General test report object fetched from XHR', inject(function(GeneralTestReports) {
			// Create sample General test report using the General test reports service
			var sampleGeneralTestReport = new GeneralTestReports({
				name: 'New General test report'
			});

			// Create a sample General test reports array that includes the new General test report
			var sampleGeneralTestReports = [sampleGeneralTestReport];

			// Set GET response
			$httpBackend.expectGET('general-test-reports').respond(sampleGeneralTestReports);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generalTestReports).toEqualData(sampleGeneralTestReports);
		}));

		it('$scope.findOne() should create an array with one General test report object fetched from XHR using a generalTestReportId URL parameter', inject(function(GeneralTestReports) {
			// Define a sample General test report object
			var sampleGeneralTestReport = new GeneralTestReports({
				name: 'New General test report'
			});

			// Set the URL parameter
			$stateParams.generalTestReportId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/general-test-reports\/([0-9a-fA-F]{24})$/).respond(sampleGeneralTestReport);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generalTestReport).toEqualData(sampleGeneralTestReport);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(GeneralTestReports) {
			// Create a sample General test report object
			var sampleGeneralTestReportPostData = new GeneralTestReports({
				name: 'New General test report'
			});

			// Create a sample General test report response
			var sampleGeneralTestReportResponse = new GeneralTestReports({
				_id: '525cf20451979dea2c000001',
				name: 'New General test report'
			});

			// Fixture mock form input values
			scope.name = 'New General test report';

			// Set POST response
			$httpBackend.expectPOST('general-test-reports', sampleGeneralTestReportPostData).respond(sampleGeneralTestReportResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the General test report was created
			expect($location.path()).toBe('/general-test-reports/' + sampleGeneralTestReportResponse._id);
		}));

		it('$scope.update() should update a valid General test report', inject(function(GeneralTestReports) {
			// Define a sample General test report put data
			var sampleGeneralTestReportPutData = new GeneralTestReports({
				_id: '525cf20451979dea2c000001',
				name: 'New General test report'
			});

			// Mock General test report in scope
			scope.generalTestReport = sampleGeneralTestReportPutData;

			// Set PUT response
			$httpBackend.expectPUT(/general-test-reports\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/general-test-reports/' + sampleGeneralTestReportPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid generalTestReportId and remove the General test report from the scope', inject(function(GeneralTestReports) {
			// Create new General test report object
			var sampleGeneralTestReport = new GeneralTestReports({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new General test reports array and include the General test report
			scope.generalTestReports = [sampleGeneralTestReport];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/general-test-reports\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGeneralTestReport);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.generalTestReports.length).toBe(0);
		}));
	});
}());