'use strict';

(function() {
	// Employee masters Controller Spec
	describe('Employee masters Controller Tests', function() {
		// Initialize global variables
		var EmployeeMastersController,
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

			// Initialize the Employee masters controller.
			EmployeeMastersController = $controller('EmployeeMastersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Employee master object fetched from XHR', inject(function(EmployeeMasters) {
			// Create sample Employee master using the Employee masters service
			var sampleEmployeeMaster = new EmployeeMasters({
				name: 'New Employee master'
			});

			// Create a sample Employee masters array that includes the new Employee master
			var sampleEmployeeMasters = [sampleEmployeeMaster];

			// Set GET response
			$httpBackend.expectGET('employee-masters').respond(sampleEmployeeMasters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.employeeMasters).toEqualData(sampleEmployeeMasters);
		}));

		it('$scope.findOne() should create an array with one Employee master object fetched from XHR using a employeeMasterId URL parameter', inject(function(EmployeeMasters) {
			// Define a sample Employee master object
			var sampleEmployeeMaster = new EmployeeMasters({
				name: 'New Employee master'
			});

			// Set the URL parameter
			$stateParams.employeeMasterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/employee-masters\/([0-9a-fA-F]{24})$/).respond(sampleEmployeeMaster);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.employeeMaster).toEqualData(sampleEmployeeMaster);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(EmployeeMasters) {
			// Create a sample Employee master object
			var sampleEmployeeMasterPostData = new EmployeeMasters({
				name: 'New Employee master'
			});

			// Create a sample Employee master response
			var sampleEmployeeMasterResponse = new EmployeeMasters({
				_id: '525cf20451979dea2c000001',
				name: 'New Employee master'
			});

			// Fixture mock form input values
			scope.name = 'New Employee master';

			// Set POST response
			$httpBackend.expectPOST('employee-masters', sampleEmployeeMasterPostData).respond(sampleEmployeeMasterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Employee master was created
			expect($location.path()).toBe('/employee-masters/' + sampleEmployeeMasterResponse._id);
		}));

		it('$scope.update() should update a valid Employee master', inject(function(EmployeeMasters) {
			// Define a sample Employee master put data
			var sampleEmployeeMasterPutData = new EmployeeMasters({
				_id: '525cf20451979dea2c000001',
				name: 'New Employee master'
			});

			// Mock Employee master in scope
			scope.employeeMaster = sampleEmployeeMasterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/employee-masters\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/employee-masters/' + sampleEmployeeMasterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid employeeMasterId and remove the Employee master from the scope', inject(function(EmployeeMasters) {
			// Create new Employee master object
			var sampleEmployeeMaster = new EmployeeMasters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Employee masters array and include the Employee master
			scope.employeeMasters = [sampleEmployeeMaster];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/employee-masters\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEmployeeMaster);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.employeeMasters.length).toBe(0);
		}));
	});
}());