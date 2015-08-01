'use strict';

(function() {
	// Yarn receipt entries Controller Spec
	describe('Yarn receipt entries Controller Tests', function() {
		// Initialize global variables
		var YarnReceiptEntriesController,
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

			// Initialize the Yarn receipt entries controller.
			YarnReceiptEntriesController = $controller('YarnReceiptEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Yarn receipt entry object fetched from XHR', inject(function(YarnReceiptEntries) {
			// Create sample Yarn receipt entry using the Yarn receipt entries service
			var sampleYarnReceiptEntry = new YarnReceiptEntries({
				name: 'New Yarn receipt entry'
			});

			// Create a sample Yarn receipt entries array that includes the new Yarn receipt entry
			var sampleYarnReceiptEntries = [sampleYarnReceiptEntry];

			// Set GET response
			$httpBackend.expectGET('yarn-receipt-entries').respond(sampleYarnReceiptEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.yarnReceiptEntries).toEqualData(sampleYarnReceiptEntries);
		}));

		it('$scope.findOne() should create an array with one Yarn receipt entry object fetched from XHR using a yarnReceiptEntryId URL parameter', inject(function(YarnReceiptEntries) {
			// Define a sample Yarn receipt entry object
			var sampleYarnReceiptEntry = new YarnReceiptEntries({
				name: 'New Yarn receipt entry'
			});

			// Set the URL parameter
			$stateParams.yarnReceiptEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/yarn-receipt-entries\/([0-9a-fA-F]{24})$/).respond(sampleYarnReceiptEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.yarnReceiptEntry).toEqualData(sampleYarnReceiptEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(YarnReceiptEntries) {
			// Create a sample Yarn receipt entry object
			var sampleYarnReceiptEntryPostData = new YarnReceiptEntries({
				name: 'New Yarn receipt entry'
			});

			// Create a sample Yarn receipt entry response
			var sampleYarnReceiptEntryResponse = new YarnReceiptEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Yarn receipt entry'
			});

			// Fixture mock form input values
			scope.name = 'New Yarn receipt entry';

			// Set POST response
			$httpBackend.expectPOST('yarn-receipt-entries', sampleYarnReceiptEntryPostData).respond(sampleYarnReceiptEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Yarn receipt entry was created
			expect($location.path()).toBe('/yarn-receipt-entries/' + sampleYarnReceiptEntryResponse._id);
		}));

		it('$scope.update() should update a valid Yarn receipt entry', inject(function(YarnReceiptEntries) {
			// Define a sample Yarn receipt entry put data
			var sampleYarnReceiptEntryPutData = new YarnReceiptEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Yarn receipt entry'
			});

			// Mock Yarn receipt entry in scope
			scope.yarnReceiptEntry = sampleYarnReceiptEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/yarn-receipt-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/yarn-receipt-entries/' + sampleYarnReceiptEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid yarnReceiptEntryId and remove the Yarn receipt entry from the scope', inject(function(YarnReceiptEntries) {
			// Create new Yarn receipt entry object
			var sampleYarnReceiptEntry = new YarnReceiptEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Yarn receipt entries array and include the Yarn receipt entry
			scope.yarnReceiptEntries = [sampleYarnReceiptEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/yarn-receipt-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleYarnReceiptEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.yarnReceiptEntries.length).toBe(0);
		}));
	});
}());