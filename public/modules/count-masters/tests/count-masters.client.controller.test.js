'use strict';

(function() {
	// Count masters Controller Spec
	describe('Count masters Controller Tests', function() {
		// Initialize global variables
		var CountMastersController,
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

			// Initialize the Count masters controller.
			CountMastersController = $controller('CountMastersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Count master object fetched from XHR', inject(function(CountMasters) {
			// Create sample Count master using the Count masters service
			var sampleCountMaster = new CountMasters({
				name: 'New Count master'
			});

			// Create a sample Count masters array that includes the new Count master
			var sampleCountMasters = [sampleCountMaster];

			// Set GET response
			$httpBackend.expectGET('count-masters').respond(sampleCountMasters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.countMasters).toEqualData(sampleCountMasters);
		}));

		it('$scope.findOne() should create an array with one Count master object fetched from XHR using a countMasterId URL parameter', inject(function(CountMasters) {
			// Define a sample Count master object
			var sampleCountMaster = new CountMasters({
				name: 'New Count master'
			});

			// Set the URL parameter
			$stateParams.countMasterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/count-masters\/([0-9a-fA-F]{24})$/).respond(sampleCountMaster);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.countMaster).toEqualData(sampleCountMaster);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(CountMasters) {
			// Create a sample Count master object
			var sampleCountMasterPostData = new CountMasters({
				name: 'New Count master'
			});

			// Create a sample Count master response
			var sampleCountMasterResponse = new CountMasters({
				_id: '525cf20451979dea2c000001',
				name: 'New Count master'
			});

			// Fixture mock form input values
			scope.name = 'New Count master';

			// Set POST response
			$httpBackend.expectPOST('count-masters', sampleCountMasterPostData).respond(sampleCountMasterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Count master was created
			expect($location.path()).toBe('/count-masters/' + sampleCountMasterResponse._id);
		}));

		it('$scope.update() should update a valid Count master', inject(function(CountMasters) {
			// Define a sample Count master put data
			var sampleCountMasterPutData = new CountMasters({
				_id: '525cf20451979dea2c000001',
				name: 'New Count master'
			});

			// Mock Count master in scope
			scope.countMaster = sampleCountMasterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/count-masters\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/count-masters/' + sampleCountMasterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid countMasterId and remove the Count master from the scope', inject(function(CountMasters) {
			// Create new Count master object
			var sampleCountMaster = new CountMasters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Count masters array and include the Count master
			scope.countMasters = [sampleCountMaster];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/count-masters\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCountMaster);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.countMasters.length).toBe(0);
		}));
	});
}());