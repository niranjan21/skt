'use strict';

(function() {
	// Fabric descriptions Controller Spec
	describe('Fabric descriptions Controller Tests', function() {
		// Initialize global variables
		var FabricDescriptionsController,
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

			// Initialize the Fabric descriptions controller.
			FabricDescriptionsController = $controller('FabricDescriptionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fabric description object fetched from XHR', inject(function(FabricDescriptions) {
			// Create sample Fabric description using the Fabric descriptions service
			var sampleFabricDescription = new FabricDescriptions({
				name: 'New Fabric description'
			});

			// Create a sample Fabric descriptions array that includes the new Fabric description
			var sampleFabricDescriptions = [sampleFabricDescription];

			// Set GET response
			$httpBackend.expectGET('fabric-descriptions').respond(sampleFabricDescriptions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricDescriptions).toEqualData(sampleFabricDescriptions);
		}));

		it('$scope.findOne() should create an array with one Fabric description object fetched from XHR using a fabricDescriptionId URL parameter', inject(function(FabricDescriptions) {
			// Define a sample Fabric description object
			var sampleFabricDescription = new FabricDescriptions({
				name: 'New Fabric description'
			});

			// Set the URL parameter
			$stateParams.fabricDescriptionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fabric-descriptions\/([0-9a-fA-F]{24})$/).respond(sampleFabricDescription);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fabricDescription).toEqualData(sampleFabricDescription);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FabricDescriptions) {
			// Create a sample Fabric description object
			var sampleFabricDescriptionPostData = new FabricDescriptions({
				name: 'New Fabric description'
			});

			// Create a sample Fabric description response
			var sampleFabricDescriptionResponse = new FabricDescriptions({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric description'
			});

			// Fixture mock form input values
			scope.name = 'New Fabric description';

			// Set POST response
			$httpBackend.expectPOST('fabric-descriptions', sampleFabricDescriptionPostData).respond(sampleFabricDescriptionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fabric description was created
			expect($location.path()).toBe('/fabric-descriptions/' + sampleFabricDescriptionResponse._id);
		}));

		it('$scope.update() should update a valid Fabric description', inject(function(FabricDescriptions) {
			// Define a sample Fabric description put data
			var sampleFabricDescriptionPutData = new FabricDescriptions({
				_id: '525cf20451979dea2c000001',
				name: 'New Fabric description'
			});

			// Mock Fabric description in scope
			scope.fabricDescription = sampleFabricDescriptionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fabric-descriptions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fabric-descriptions/' + sampleFabricDescriptionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fabricDescriptionId and remove the Fabric description from the scope', inject(function(FabricDescriptions) {
			// Create new Fabric description object
			var sampleFabricDescription = new FabricDescriptions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fabric descriptions array and include the Fabric description
			scope.fabricDescriptions = [sampleFabricDescription];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fabric-descriptions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFabricDescription);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fabricDescriptions.length).toBe(0);
		}));
	});
}());