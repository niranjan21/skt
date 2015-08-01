'use strict';

(function() {
	// Yarn return entries Controller Spec
	describe('Yarn return entries Controller Tests', function() {
		// Initialize global variables
		var YarnReturnEntriesController,
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

			// Initialize the Yarn return entries controller.
			YarnReturnEntriesController = $controller('YarnReturnEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Yarn return entry object fetched from XHR', inject(function(YarnReturnEntries) {
			// Create sample Yarn return entry using the Yarn return entries service
			var sampleYarnReturnEntry = new YarnReturnEntries({
				name: 'New Yarn return entry'
			});

			// Create a sample Yarn return entries array that includes the new Yarn return entry
			var sampleYarnReturnEntries = [sampleYarnReturnEntry];

			// Set GET response
			$httpBackend.expectGET('yarn-return-entries').respond(sampleYarnReturnEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.yarnReturnEntries).toEqualData(sampleYarnReturnEntries);
		}));

		it('$scope.findOne() should create an array with one Yarn return entry object fetched from XHR using a yarnReturnEntryId URL parameter', inject(function(YarnReturnEntries) {
			// Define a sample Yarn return entry object
			var sampleYarnReturnEntry = new YarnReturnEntries({
				name: 'New Yarn return entry'
			});

			// Set the URL parameter
			$stateParams.yarnReturnEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/yarn-return-entries\/([0-9a-fA-F]{24})$/).respond(sampleYarnReturnEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.yarnReturnEntry).toEqualData(sampleYarnReturnEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(YarnReturnEntries) {
			// Create a sample Yarn return entry object
			var sampleYarnReturnEntryPostData = new YarnReturnEntries({
				name: 'New Yarn return entry'
			});

			// Create a sample Yarn return entry response
			var sampleYarnReturnEntryResponse = new YarnReturnEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Yarn return entry'
			});

			// Fixture mock form input values
			scope.name = 'New Yarn return entry';

			// Set POST response
			$httpBackend.expectPOST('yarn-return-entries', sampleYarnReturnEntryPostData).respond(sampleYarnReturnEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Yarn return entry was created
			expect($location.path()).toBe('/yarn-return-entries/' + sampleYarnReturnEntryResponse._id);
		}));

		it('$scope.update() should update a valid Yarn return entry', inject(function(YarnReturnEntries) {
			// Define a sample Yarn return entry put data
			var sampleYarnReturnEntryPutData = new YarnReturnEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Yarn return entry'
			});

			// Mock Yarn return entry in scope
			scope.yarnReturnEntry = sampleYarnReturnEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/yarn-return-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/yarn-return-entries/' + sampleYarnReturnEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid yarnReturnEntryId and remove the Yarn return entry from the scope', inject(function(YarnReturnEntries) {
			// Create new Yarn return entry object
			var sampleYarnReturnEntry = new YarnReturnEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Yarn return entries array and include the Yarn return entry
			scope.yarnReturnEntries = [sampleYarnReturnEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/yarn-return-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleYarnReturnEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.yarnReturnEntries.length).toBe(0);
		}));
	});
}());