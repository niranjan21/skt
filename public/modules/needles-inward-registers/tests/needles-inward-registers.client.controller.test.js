'use strict';

(function() {
	// Needles inward registers Controller Spec
	describe('Needles inward registers Controller Tests', function() {
		// Initialize global variables
		var NeedlesInwardRegistersController,
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

			// Initialize the Needles inward registers controller.
			NeedlesInwardRegistersController = $controller('NeedlesInwardRegistersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Needles inward register object fetched from XHR', inject(function(NeedlesInwardRegisters) {
			// Create sample Needles inward register using the Needles inward registers service
			var sampleNeedlesInwardRegister = new NeedlesInwardRegisters({
				name: 'New Needles inward register'
			});

			// Create a sample Needles inward registers array that includes the new Needles inward register
			var sampleNeedlesInwardRegisters = [sampleNeedlesInwardRegister];

			// Set GET response
			$httpBackend.expectGET('needles-inward-registers').respond(sampleNeedlesInwardRegisters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.needlesInwardRegisters).toEqualData(sampleNeedlesInwardRegisters);
		}));

		it('$scope.findOne() should create an array with one Needles inward register object fetched from XHR using a needlesInwardRegisterId URL parameter', inject(function(NeedlesInwardRegisters) {
			// Define a sample Needles inward register object
			var sampleNeedlesInwardRegister = new NeedlesInwardRegisters({
				name: 'New Needles inward register'
			});

			// Set the URL parameter
			$stateParams.needlesInwardRegisterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/needles-inward-registers\/([0-9a-fA-F]{24})$/).respond(sampleNeedlesInwardRegister);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.needlesInwardRegister).toEqualData(sampleNeedlesInwardRegister);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(NeedlesInwardRegisters) {
			// Create a sample Needles inward register object
			var sampleNeedlesInwardRegisterPostData = new NeedlesInwardRegisters({
				name: 'New Needles inward register'
			});

			// Create a sample Needles inward register response
			var sampleNeedlesInwardRegisterResponse = new NeedlesInwardRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New Needles inward register'
			});

			// Fixture mock form input values
			scope.name = 'New Needles inward register';

			// Set POST response
			$httpBackend.expectPOST('needles-inward-registers', sampleNeedlesInwardRegisterPostData).respond(sampleNeedlesInwardRegisterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Needles inward register was created
			expect($location.path()).toBe('/needles-inward-registers/' + sampleNeedlesInwardRegisterResponse._id);
		}));

		it('$scope.update() should update a valid Needles inward register', inject(function(NeedlesInwardRegisters) {
			// Define a sample Needles inward register put data
			var sampleNeedlesInwardRegisterPutData = new NeedlesInwardRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New Needles inward register'
			});

			// Mock Needles inward register in scope
			scope.needlesInwardRegister = sampleNeedlesInwardRegisterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/needles-inward-registers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/needles-inward-registers/' + sampleNeedlesInwardRegisterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid needlesInwardRegisterId and remove the Needles inward register from the scope', inject(function(NeedlesInwardRegisters) {
			// Create new Needles inward register object
			var sampleNeedlesInwardRegister = new NeedlesInwardRegisters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Needles inward registers array and include the Needles inward register
			scope.needlesInwardRegisters = [sampleNeedlesInwardRegister];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/needles-inward-registers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleNeedlesInwardRegister);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.needlesInwardRegisters.length).toBe(0);
		}));
	});
}());