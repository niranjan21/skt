'use strict';

(function() {
	// Bulk needle change reports Controller Spec
	describe('Bulk needle change reports Controller Tests', function() {
		// Initialize global variables
		var BulkNeedleChangeReportsController,
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

			// Initialize the Bulk needle change reports controller.
			BulkNeedleChangeReportsController = $controller('BulkNeedleChangeReportsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bulk needle change report object fetched from XHR', inject(function(BulkNeedleChangeReports) {
			// Create sample Bulk needle change report using the Bulk needle change reports service
			var sampleBulkNeedleChangeReport = new BulkNeedleChangeReports({
				name: 'New Bulk needle change report'
			});

			// Create a sample Bulk needle change reports array that includes the new Bulk needle change report
			var sampleBulkNeedleChangeReports = [sampleBulkNeedleChangeReport];

			// Set GET response
			$httpBackend.expectGET('bulk-needle-change-reports').respond(sampleBulkNeedleChangeReports);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bulkNeedleChangeReports).toEqualData(sampleBulkNeedleChangeReports);
		}));

		it('$scope.findOne() should create an array with one Bulk needle change report object fetched from XHR using a bulkNeedleChangeReportId URL parameter', inject(function(BulkNeedleChangeReports) {
			// Define a sample Bulk needle change report object
			var sampleBulkNeedleChangeReport = new BulkNeedleChangeReports({
				name: 'New Bulk needle change report'
			});

			// Set the URL parameter
			$stateParams.bulkNeedleChangeReportId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/bulk-needle-change-reports\/([0-9a-fA-F]{24})$/).respond(sampleBulkNeedleChangeReport);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bulkNeedleChangeReport).toEqualData(sampleBulkNeedleChangeReport);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(BulkNeedleChangeReports) {
			// Create a sample Bulk needle change report object
			var sampleBulkNeedleChangeReportPostData = new BulkNeedleChangeReports({
				name: 'New Bulk needle change report'
			});

			// Create a sample Bulk needle change report response
			var sampleBulkNeedleChangeReportResponse = new BulkNeedleChangeReports({
				_id: '525cf20451979dea2c000001',
				name: 'New Bulk needle change report'
			});

			// Fixture mock form input values
			scope.name = 'New Bulk needle change report';

			// Set POST response
			$httpBackend.expectPOST('bulk-needle-change-reports', sampleBulkNeedleChangeReportPostData).respond(sampleBulkNeedleChangeReportResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bulk needle change report was created
			expect($location.path()).toBe('/bulk-needle-change-reports/' + sampleBulkNeedleChangeReportResponse._id);
		}));

		it('$scope.update() should update a valid Bulk needle change report', inject(function(BulkNeedleChangeReports) {
			// Define a sample Bulk needle change report put data
			var sampleBulkNeedleChangeReportPutData = new BulkNeedleChangeReports({
				_id: '525cf20451979dea2c000001',
				name: 'New Bulk needle change report'
			});

			// Mock Bulk needle change report in scope
			scope.bulkNeedleChangeReport = sampleBulkNeedleChangeReportPutData;

			// Set PUT response
			$httpBackend.expectPUT(/bulk-needle-change-reports\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/bulk-needle-change-reports/' + sampleBulkNeedleChangeReportPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid bulkNeedleChangeReportId and remove the Bulk needle change report from the scope', inject(function(BulkNeedleChangeReports) {
			// Create new Bulk needle change report object
			var sampleBulkNeedleChangeReport = new BulkNeedleChangeReports({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Bulk needle change reports array and include the Bulk needle change report
			scope.bulkNeedleChangeReports = [sampleBulkNeedleChangeReport];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/bulk-needle-change-reports\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBulkNeedleChangeReport);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.bulkNeedleChangeReports.length).toBe(0);
		}));
	});
}());