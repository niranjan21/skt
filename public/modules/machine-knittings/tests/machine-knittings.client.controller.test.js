'use strict';

(function() {
	// Machine knittings Controller Spec
	describe('Machine knittings Controller Tests', function() {
		// Initialize global variables
		var MachineKnittingsController,
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

			// Initialize the Machine knittings controller.
			MachineKnittingsController = $controller('MachineKnittingsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Machine knitting object fetched from XHR', inject(function(MachineKnittings) {
			// Create sample Machine knitting using the Machine knittings service
			var sampleMachineKnitting = new MachineKnittings({
				name: 'New Machine knitting'
			});

			// Create a sample Machine knittings array that includes the new Machine knitting
			var sampleMachineKnittings = [sampleMachineKnitting];

			// Set GET response
			$httpBackend.expectGET('machine-knittings').respond(sampleMachineKnittings);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.machineKnittings).toEqualData(sampleMachineKnittings);
		}));

		it('$scope.findOne() should create an array with one Machine knitting object fetched from XHR using a machineKnittingId URL parameter', inject(function(MachineKnittings) {
			// Define a sample Machine knitting object
			var sampleMachineKnitting = new MachineKnittings({
				name: 'New Machine knitting'
			});

			// Set the URL parameter
			$stateParams.machineKnittingId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/machine-knittings\/([0-9a-fA-F]{24})$/).respond(sampleMachineKnitting);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.machineKnitting).toEqualData(sampleMachineKnitting);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(MachineKnittings) {
			// Create a sample Machine knitting object
			var sampleMachineKnittingPostData = new MachineKnittings({
				name: 'New Machine knitting'
			});

			// Create a sample Machine knitting response
			var sampleMachineKnittingResponse = new MachineKnittings({
				_id: '525cf20451979dea2c000001',
				name: 'New Machine knitting'
			});

			// Fixture mock form input values
			scope.name = 'New Machine knitting';

			// Set POST response
			$httpBackend.expectPOST('machine-knittings', sampleMachineKnittingPostData).respond(sampleMachineKnittingResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Machine knitting was created
			expect($location.path()).toBe('/machine-knittings/' + sampleMachineKnittingResponse._id);
		}));

		it('$scope.update() should update a valid Machine knitting', inject(function(MachineKnittings) {
			// Define a sample Machine knitting put data
			var sampleMachineKnittingPutData = new MachineKnittings({
				_id: '525cf20451979dea2c000001',
				name: 'New Machine knitting'
			});

			// Mock Machine knitting in scope
			scope.machineKnitting = sampleMachineKnittingPutData;

			// Set PUT response
			$httpBackend.expectPUT(/machine-knittings\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/machine-knittings/' + sampleMachineKnittingPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid machineKnittingId and remove the Machine knitting from the scope', inject(function(MachineKnittings) {
			// Create new Machine knitting object
			var sampleMachineKnitting = new MachineKnittings({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Machine knittings array and include the Machine knitting
			scope.machineKnittings = [sampleMachineKnitting];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/machine-knittings\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMachineKnitting);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.machineKnittings.length).toBe(0);
		}));
	});
}());