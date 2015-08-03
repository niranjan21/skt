'use strict';

(function() {
	// Fabrics Controller Spec
	describe('Fabrics Controller Tests', function() {
		// Initialize global variables
		var FabricsController,
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

			// Initialize the Fabrics controller.
			FabricsController = $controller('FabricsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fabric object fetched from XHR', inject(function(Fabrics) {
			// Create sample Fabric using the Fabrics service
			var sampleFabric = new Fabrics({
				name: 'New Fabric'
			});

			// Create a sample Fabrics array that includes the new Fabric
			var sampleFabrics = [sampleFabric];

			// Set GET response
			$httpBackend.expectGET('fabrics').respond(sampleFabrics);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabrics).toEqualData(sampleFabrics);
		}));

		it('$scope.findOne() should create an array with one Fabric object fetched from XHR using a fabricId URL parameter', inject(function(Fabrics) {
			// Define a sample Fabric object
			var sampleFabric = new Fabrics({
				name: 'New Fabric'
			});

			// Set the URL parameter
			$stateParams.fabricId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fabrics\/([0-9a-fA-F]{24})$/).respond(sampleFabric);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabric).toEqualData(sampleFabric);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Fabrics) {
			// Create a sample Fabric object
			var sampleFabricPostData = new Fabrics({
				name: 'New Fabric'
			});

			// Create a sample Fabric response
			var sampleFabricResponse = new Fabrics({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric'
			});

			// Fixture mock form input values
			scope.name = 'New Fabric';

			// Set POST response
			$httpBackend.expectPOST('fabrics', sampleFabricPostData).respond(sampleFabricResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fabric was created
			expect($location.path()).toBe('/fabrics/' + sampleFabricResponse._id);
		}));

		it('$scope.update() should update a valid Fabric', inject(function(Fabrics) {
			// Define a sample Fabric put data
			var sampleFabricPutData = new Fabrics({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric'
			});

			// Mock Fabric in scope
			scope.fabric = sampleFabricPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fabrics\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fabrics/' + sampleFabricPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fabricId and remove the Fabric from the scope', inject(function(Fabrics) {
			// Create new Fabric object
			var sampleFabric = new Fabrics({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fabrics array and include the Fabric
			scope.fabrics = [sampleFabric];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fabrics\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFabric);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fabrics.length).toBe(0);
		}));
	});
}());