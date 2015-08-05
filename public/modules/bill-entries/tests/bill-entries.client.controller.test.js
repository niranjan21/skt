'use strict';

(function() {
	// Bill entries Controller Spec
	describe('Bill entries Controller Tests', function() {
		// Initialize global variables
		var BillEntriesController,
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

			// Initialize the Bill entries controller.
			BillEntriesController = $controller('BillEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bill entry object fetched from XHR', inject(function(BillEntries) {
			// Create sample Bill entry using the Bill entries service
			var sampleBillEntry = new BillEntries({
				name: 'New Bill entry'
			});

			// Create a sample Bill entries array that includes the new Bill entry
			var sampleBillEntries = [sampleBillEntry];

			// Set GET response
			$httpBackend.expectGET('bill-entries').respond(sampleBillEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.billEntries).toEqualData(sampleBillEntries);
		}));

		it('$scope.findOne() should create an array with one Bill entry object fetched from XHR using a billEntryId URL parameter', inject(function(BillEntries) {
			// Define a sample Bill entry object
			var sampleBillEntry = new BillEntries({
				name: 'New Bill entry'
			});

			// Set the URL parameter
			$stateParams.billEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/bill-entries\/([0-9a-fA-F]{24})$/).respond(sampleBillEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.billEntry).toEqualData(sampleBillEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(BillEntries) {
			// Create a sample Bill entry object
			var sampleBillEntryPostData = new BillEntries({
				name: 'New Bill entry'
			});

			// Create a sample Bill entry response
			var sampleBillEntryResponse = new BillEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Bill entry'
			});

			// Fixture mock form input values
			scope.name = 'New Bill entry';

			// Set POST response
			$httpBackend.expectPOST('bill-entries', sampleBillEntryPostData).respond(sampleBillEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bill entry was created
			expect($location.path()).toBe('/bill-entries/' + sampleBillEntryResponse._id);
		}));

		it('$scope.update() should update a valid Bill entry', inject(function(BillEntries) {
			// Define a sample Bill entry put data
			var sampleBillEntryPutData = new BillEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Bill entry'
			});

			// Mock Bill entry in scope
			scope.billEntry = sampleBillEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/bill-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/bill-entries/' + sampleBillEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid billEntryId and remove the Bill entry from the scope', inject(function(BillEntries) {
			// Create new Bill entry object
			var sampleBillEntry = new BillEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Bill entries array and include the Bill entry
			scope.billEntries = [sampleBillEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/bill-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBillEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.billEntries.length).toBe(0);
		}));
	});
}());