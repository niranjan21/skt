'use strict';

(function() {
	// General item outward registers Controller Spec
	describe('General item outward registers Controller Tests', function() {
		// Initialize global variables
		var GeneralItemOutwardRegistersController,
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

			// Initialize the General item outward registers controller.
			GeneralItemOutwardRegistersController = $controller('GeneralItemOutwardRegistersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one General item outward register object fetched from XHR', inject(function(GeneralItemOutwardRegisters) {
			// Create sample General item outward register using the General item outward registers service
			var sampleGeneralItemOutwardRegister = new GeneralItemOutwardRegisters({
				name: 'New General item outward register'
			});

			// Create a sample General item outward registers array that includes the new General item outward register
			var sampleGeneralItemOutwardRegisters = [sampleGeneralItemOutwardRegister];

			// Set GET response
			$httpBackend.expectGET('general-item-outward-registers').respond(sampleGeneralItemOutwardRegisters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generalItemOutwardRegisters).toEqualData(sampleGeneralItemOutwardRegisters);
		}));

		it('$scope.findOne() should create an array with one General item outward register object fetched from XHR using a generalItemOutwardRegisterId URL parameter', inject(function(GeneralItemOutwardRegisters) {
			// Define a sample General item outward register object
			var sampleGeneralItemOutwardRegister = new GeneralItemOutwardRegisters({
				name: 'New General item outward register'
			});

			// Set the URL parameter
			$stateParams.generalItemOutwardRegisterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/general-item-outward-registers\/([0-9a-fA-F]{24})$/).respond(sampleGeneralItemOutwardRegister);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generalItemOutwardRegister).toEqualData(sampleGeneralItemOutwardRegister);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(GeneralItemOutwardRegisters) {
			// Create a sample General item outward register object
			var sampleGeneralItemOutwardRegisterPostData = new GeneralItemOutwardRegisters({
				name: 'New General item outward register'
			});

			// Create a sample General item outward register response
			var sampleGeneralItemOutwardRegisterResponse = new GeneralItemOutwardRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New General item outward register'
			});

			// Fixture mock form input values
			scope.name = 'New General item outward register';

			// Set POST response
			$httpBackend.expectPOST('general-item-outward-registers', sampleGeneralItemOutwardRegisterPostData).respond(sampleGeneralItemOutwardRegisterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the General item outward register was created
			expect($location.path()).toBe('/general-item-outward-registers/' + sampleGeneralItemOutwardRegisterResponse._id);
		}));

		it('$scope.update() should update a valid General item outward register', inject(function(GeneralItemOutwardRegisters) {
			// Define a sample General item outward register put data
			var sampleGeneralItemOutwardRegisterPutData = new GeneralItemOutwardRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New General item outward register'
			});

			// Mock General item outward register in scope
			scope.generalItemOutwardRegister = sampleGeneralItemOutwardRegisterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/general-item-outward-registers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/general-item-outward-registers/' + sampleGeneralItemOutwardRegisterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid generalItemOutwardRegisterId and remove the General item outward register from the scope', inject(function(GeneralItemOutwardRegisters) {
			// Create new General item outward register object
			var sampleGeneralItemOutwardRegister = new GeneralItemOutwardRegisters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new General item outward registers array and include the General item outward register
			scope.generalItemOutwardRegisters = [sampleGeneralItemOutwardRegister];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/general-item-outward-registers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGeneralItemOutwardRegister);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.generalItemOutwardRegisters.length).toBe(0);
		}));
	});
}());