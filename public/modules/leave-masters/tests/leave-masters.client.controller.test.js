'use strict';

(function() {
	// Leave masters Controller Spec
	describe('Leave masters Controller Tests', function() {
		// Initialize global variables
		var LeaveMastersController,
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

			// Initialize the Leave masters controller.
			LeaveMastersController = $controller('LeaveMastersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Leave master object fetched from XHR', inject(function(LeaveMasters) {
			// Create sample Leave master using the Leave masters service
			var sampleLeaveMaster = new LeaveMasters({
				name: 'New Leave master'
			});

			// Create a sample Leave masters array that includes the new Leave master
			var sampleLeaveMasters = [sampleLeaveMaster];

			// Set GET response
			$httpBackend.expectGET('leave-masters').respond(sampleLeaveMasters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.leaveMasters).toEqualData(sampleLeaveMasters);
		}));

		it('$scope.findOne() should create an array with one Leave master object fetched from XHR using a leaveMasterId URL parameter', inject(function(LeaveMasters) {
			// Define a sample Leave master object
			var sampleLeaveMaster = new LeaveMasters({
				name: 'New Leave master'
			});

			// Set the URL parameter
			$stateParams.leaveMasterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/leave-masters\/([0-9a-fA-F]{24})$/).respond(sampleLeaveMaster);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.leaveMaster).toEqualData(sampleLeaveMaster);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(LeaveMasters) {
			// Create a sample Leave master object
			var sampleLeaveMasterPostData = new LeaveMasters({
				name: 'New Leave master'
			});

			// Create a sample Leave master response
			var sampleLeaveMasterResponse = new LeaveMasters({
				_id: '525cf20451979dea2c000001',
				name: 'New Leave master'
			});

			// Fixture mock form input values
			scope.name = 'New Leave master';

			// Set POST response
			$httpBackend.expectPOST('leave-masters', sampleLeaveMasterPostData).respond(sampleLeaveMasterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Leave master was created
			expect($location.path()).toBe('/leave-masters/' + sampleLeaveMasterResponse._id);
		}));

		it('$scope.update() should update a valid Leave master', inject(function(LeaveMasters) {
			// Define a sample Leave master put data
			var sampleLeaveMasterPutData = new LeaveMasters({
				_id: '525cf20451979dea2c000001',
				name: 'New Leave master'
			});

			// Mock Leave master in scope
			scope.leaveMaster = sampleLeaveMasterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/leave-masters\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/leave-masters/' + sampleLeaveMasterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid leaveMasterId and remove the Leave master from the scope', inject(function(LeaveMasters) {
			// Create new Leave master object
			var sampleLeaveMaster = new LeaveMasters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Leave masters array and include the Leave master
			scope.leaveMasters = [sampleLeaveMaster];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/leave-masters\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLeaveMaster);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.leaveMasters.length).toBe(0);
		}));
	});
}());