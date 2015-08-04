'use strict';

(function() {
	// Bulk needle change entries Controller Spec
	describe('Bulk needle change entries Controller Tests', function() {
		// Initialize global variables
		var BulkNeedleChangeEntriesController,
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

			// Initialize the Bulk needle change entries controller.
			BulkNeedleChangeEntriesController = $controller('BulkNeedleChangeEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bulk needle change entry object fetched from XHR', inject(function(BulkNeedleChangeEntries) {
			// Create sample Bulk needle change entry using the Bulk needle change entries service
			var sampleBulkNeedleChangeEntry = new BulkNeedleChangeEntries({
				name: 'New Bulk needle change entry'
			});

			// Create a sample Bulk needle change entries array that includes the new Bulk needle change entry
			var sampleBulkNeedleChangeEntries = [sampleBulkNeedleChangeEntry];

			// Set GET response
			$httpBackend.expectGET('bulk-needle-change-entries').respond(sampleBulkNeedleChangeEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bulkNeedleChangeEntries).toEqualData(sampleBulkNeedleChangeEntries);
		}));

		it('$scope.findOne() should create an array with one Bulk needle change entry object fetched from XHR using a bulkNeedleChangeEntryId URL parameter', inject(function(BulkNeedleChangeEntries) {
			// Define a sample Bulk needle change entry object
			var sampleBulkNeedleChangeEntry = new BulkNeedleChangeEntries({
				name: 'New Bulk needle change entry'
			});

			// Set the URL parameter
			$stateParams.bulkNeedleChangeEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/bulk-needle-change-entries\/([0-9a-fA-F]{24})$/).respond(sampleBulkNeedleChangeEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bulkNeedleChangeEntry).toEqualData(sampleBulkNeedleChangeEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(BulkNeedleChangeEntries) {
			// Create a sample Bulk needle change entry object
			var sampleBulkNeedleChangeEntryPostData = new BulkNeedleChangeEntries({
				name: 'New Bulk needle change entry'
			});

			// Create a sample Bulk needle change entry response
			var sampleBulkNeedleChangeEntryResponse = new BulkNeedleChangeEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Bulk needle change entry'
			});

			// Fixture mock form input values
			scope.name = 'New Bulk needle change entry';

			// Set POST response
			$httpBackend.expectPOST('bulk-needle-change-entries', sampleBulkNeedleChangeEntryPostData).respond(sampleBulkNeedleChangeEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bulk needle change entry was created
			expect($location.path()).toBe('/bulk-needle-change-entries/' + sampleBulkNeedleChangeEntryResponse._id);
		}));

		it('$scope.update() should update a valid Bulk needle change entry', inject(function(BulkNeedleChangeEntries) {
			// Define a sample Bulk needle change entry put data
			var sampleBulkNeedleChangeEntryPutData = new BulkNeedleChangeEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Bulk needle change entry'
			});

			// Mock Bulk needle change entry in scope
			scope.bulkNeedleChangeEntry = sampleBulkNeedleChangeEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/bulk-needle-change-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/bulk-needle-change-entries/' + sampleBulkNeedleChangeEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid bulkNeedleChangeEntryId and remove the Bulk needle change entry from the scope', inject(function(BulkNeedleChangeEntries) {
			// Create new Bulk needle change entry object
			var sampleBulkNeedleChangeEntry = new BulkNeedleChangeEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Bulk needle change entries array and include the Bulk needle change entry
			scope.bulkNeedleChangeEntries = [sampleBulkNeedleChangeEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/bulk-needle-change-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBulkNeedleChangeEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.bulkNeedleChangeEntries.length).toBe(0);
		}));
	});
}());