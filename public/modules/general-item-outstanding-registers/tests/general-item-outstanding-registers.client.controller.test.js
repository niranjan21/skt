'use strict';

(function() {
	// General item outstanding registers Controller Spec
	describe('General item outstanding registers Controller Tests', function() {
		// Initialize global variables
		var GeneralItemOutstandingRegistersController,
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

			// Initialize the General item outstanding registers controller.
			GeneralItemOutstandingRegistersController = $controller('GeneralItemOutstandingRegistersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one General item outstanding register object fetched from XHR', inject(function(GeneralItemOutstandingRegisters) {
			// Create sample General item outstanding register using the General item outstanding registers service
			var sampleGeneralItemOutstandingRegister = new GeneralItemOutstandingRegisters({
				name: 'New General item outstanding register'
			});

			// Create a sample General item outstanding registers array that includes the new General item outstanding register
			var sampleGeneralItemOutstandingRegisters = [sampleGeneralItemOutstandingRegister];

			// Set GET response
			$httpBackend.expectGET('general-item-outstanding-registers').respond(sampleGeneralItemOutstandingRegisters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generalItemOutstandingRegisters).toEqualData(sampleGeneralItemOutstandingRegisters);
		}));

		it('$scope.findOne() should create an array with one General item outstanding register object fetched from XHR using a generalItemOutstandingRegisterId URL parameter', inject(function(GeneralItemOutstandingRegisters) {
			// Define a sample General item outstanding register object
			var sampleGeneralItemOutstandingRegister = new GeneralItemOutstandingRegisters({
				name: 'New General item outstanding register'
			});

			// Set the URL parameter
			$stateParams.generalItemOutstandingRegisterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/general-item-outstanding-registers\/([0-9a-fA-F]{24})$/).respond(sampleGeneralItemOutstandingRegister);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generalItemOutstandingRegister).toEqualData(sampleGeneralItemOutstandingRegister);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(GeneralItemOutstandingRegisters) {
			// Create a sample General item outstanding register object
			var sampleGeneralItemOutstandingRegisterPostData = new GeneralItemOutstandingRegisters({
				name: 'New General item outstanding register'
			});

			// Create a sample General item outstanding register response
			var sampleGeneralItemOutstandingRegisterResponse = new GeneralItemOutstandingRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New General item outstanding register'
			});

			// Fixture mock form input values
			scope.name = 'New General item outstanding register';

			// Set POST response
			$httpBackend.expectPOST('general-item-outstanding-registers', sampleGeneralItemOutstandingRegisterPostData).respond(sampleGeneralItemOutstandingRegisterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the General item outstanding register was created
			expect($location.path()).toBe('/general-item-outstanding-registers/' + sampleGeneralItemOutstandingRegisterResponse._id);
		}));

		it('$scope.update() should update a valid General item outstanding register', inject(function(GeneralItemOutstandingRegisters) {
			// Define a sample General item outstanding register put data
			var sampleGeneralItemOutstandingRegisterPutData = new GeneralItemOutstandingRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New General item outstanding register'
			});

			// Mock General item outstanding register in scope
			scope.generalItemOutstandingRegister = sampleGeneralItemOutstandingRegisterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/general-item-outstanding-registers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/general-item-outstanding-registers/' + sampleGeneralItemOutstandingRegisterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid generalItemOutstandingRegisterId and remove the General item outstanding register from the scope', inject(function(GeneralItemOutstandingRegisters) {
			// Create new General item outstanding register object
			var sampleGeneralItemOutstandingRegister = new GeneralItemOutstandingRegisters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new General item outstanding registers array and include the General item outstanding register
			scope.generalItemOutstandingRegisters = [sampleGeneralItemOutstandingRegister];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/general-item-outstanding-registers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGeneralItemOutstandingRegister);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.generalItemOutstandingRegisters.length).toBe(0);
		}));
	});
}());