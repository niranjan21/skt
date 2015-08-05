'use strict';

(function() {
	// Roll quality control entries Controller Spec
	describe('Roll quality control entries Controller Tests', function() {
		// Initialize global variables
		var RollQualityControlEntriesController,
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

			// Initialize the Roll quality control entries controller.
			RollQualityControlEntriesController = $controller('RollQualityControlEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Roll quality control entry object fetched from XHR', inject(function(RollQualityControlEntries) {
			// Create sample Roll quality control entry using the Roll quality control entries service
			var sampleRollQualityControlEntry = new RollQualityControlEntries({
				name: 'New Roll quality control entry'
			});

			// Create a sample Roll quality control entries array that includes the new Roll quality control entry
			var sampleRollQualityControlEntries = [sampleRollQualityControlEntry];

			// Set GET response
			$httpBackend.expectGET('roll-quality-control-entries').respond(sampleRollQualityControlEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rollQualityControlEntries).toEqualData(sampleRollQualityControlEntries);
		}));

		it('$scope.findOne() should create an array with one Roll quality control entry object fetched from XHR using a rollQualityControlEntryId URL parameter', inject(function(RollQualityControlEntries) {
			// Define a sample Roll quality control entry object
			var sampleRollQualityControlEntry = new RollQualityControlEntries({
				name: 'New Roll quality control entry'
			});

			// Set the URL parameter
			$stateParams.rollQualityControlEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/roll-quality-control-entries\/([0-9a-fA-F]{24})$/).respond(sampleRollQualityControlEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rollQualityControlEntry).toEqualData(sampleRollQualityControlEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(RollQualityControlEntries) {
			// Create a sample Roll quality control entry object
			var sampleRollQualityControlEntryPostData = new RollQualityControlEntries({
				name: 'New Roll quality control entry'
			});

			// Create a sample Roll quality control entry response
			var sampleRollQualityControlEntryResponse = new RollQualityControlEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Roll quality control entry'
			});

			// Fixture mock form input values
			scope.name = 'New Roll quality control entry';

			// Set POST response
			$httpBackend.expectPOST('roll-quality-control-entries', sampleRollQualityControlEntryPostData).respond(sampleRollQualityControlEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Roll quality control entry was created
			expect($location.path()).toBe('/roll-quality-control-entries/' + sampleRollQualityControlEntryResponse._id);
		}));

		it('$scope.update() should update a valid Roll quality control entry', inject(function(RollQualityControlEntries) {
			// Define a sample Roll quality control entry put data
			var sampleRollQualityControlEntryPutData = new RollQualityControlEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Roll quality control entry'
			});

			// Mock Roll quality control entry in scope
			scope.rollQualityControlEntry = sampleRollQualityControlEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/roll-quality-control-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/roll-quality-control-entries/' + sampleRollQualityControlEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid rollQualityControlEntryId and remove the Roll quality control entry from the scope', inject(function(RollQualityControlEntries) {
			// Create new Roll quality control entry object
			var sampleRollQualityControlEntry = new RollQualityControlEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Roll quality control entries array and include the Roll quality control entry
			scope.rollQualityControlEntries = [sampleRollQualityControlEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/roll-quality-control-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRollQualityControlEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.rollQualityControlEntries.length).toBe(0);
		}));
	});
}());