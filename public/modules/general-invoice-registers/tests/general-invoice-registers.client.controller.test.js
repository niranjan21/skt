'use strict';

(function() {
	// General invoice registers Controller Spec
	describe('General invoice registers Controller Tests', function() {
		// Initialize global variables
		var GeneralInvoiceRegistersController,
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

			// Initialize the General invoice registers controller.
			GeneralInvoiceRegistersController = $controller('GeneralInvoiceRegistersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one General invoice register object fetched from XHR', inject(function(GeneralInvoiceRegisters) {
			// Create sample General invoice register using the General invoice registers service
			var sampleGeneralInvoiceRegister = new GeneralInvoiceRegisters({
				name: 'New General invoice register'
			});

			// Create a sample General invoice registers array that includes the new General invoice register
			var sampleGeneralInvoiceRegisters = [sampleGeneralInvoiceRegister];

			// Set GET response
			$httpBackend.expectGET('general-invoice-registers').respond(sampleGeneralInvoiceRegisters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generalInvoiceRegisters).toEqualData(sampleGeneralInvoiceRegisters);
		}));

		it('$scope.findOne() should create an array with one General invoice register object fetched from XHR using a generalInvoiceRegisterId URL parameter', inject(function(GeneralInvoiceRegisters) {
			// Define a sample General invoice register object
			var sampleGeneralInvoiceRegister = new GeneralInvoiceRegisters({
				name: 'New General invoice register'
			});

			// Set the URL parameter
			$stateParams.generalInvoiceRegisterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/general-invoice-registers\/([0-9a-fA-F]{24})$/).respond(sampleGeneralInvoiceRegister);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generalInvoiceRegister).toEqualData(sampleGeneralInvoiceRegister);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(GeneralInvoiceRegisters) {
			// Create a sample General invoice register object
			var sampleGeneralInvoiceRegisterPostData = new GeneralInvoiceRegisters({
				name: 'New General invoice register'
			});

			// Create a sample General invoice register response
			var sampleGeneralInvoiceRegisterResponse = new GeneralInvoiceRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New General invoice register'
			});

			// Fixture mock form input values
			scope.name = 'New General invoice register';

			// Set POST response
			$httpBackend.expectPOST('general-invoice-registers', sampleGeneralInvoiceRegisterPostData).respond(sampleGeneralInvoiceRegisterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the General invoice register was created
			expect($location.path()).toBe('/general-invoice-registers/' + sampleGeneralInvoiceRegisterResponse._id);
		}));

		it('$scope.update() should update a valid General invoice register', inject(function(GeneralInvoiceRegisters) {
			// Define a sample General invoice register put data
			var sampleGeneralInvoiceRegisterPutData = new GeneralInvoiceRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New General invoice register'
			});

			// Mock General invoice register in scope
			scope.generalInvoiceRegister = sampleGeneralInvoiceRegisterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/general-invoice-registers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/general-invoice-registers/' + sampleGeneralInvoiceRegisterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid generalInvoiceRegisterId and remove the General invoice register from the scope', inject(function(GeneralInvoiceRegisters) {
			// Create new General invoice register object
			var sampleGeneralInvoiceRegister = new GeneralInvoiceRegisters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new General invoice registers array and include the General invoice register
			scope.generalInvoiceRegisters = [sampleGeneralInvoiceRegister];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/general-invoice-registers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGeneralInvoiceRegister);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.generalInvoiceRegisters.length).toBe(0);
		}));
	});
}());