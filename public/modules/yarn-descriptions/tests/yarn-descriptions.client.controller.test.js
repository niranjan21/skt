'use strict';

(function() {
	// Yarn descriptions Controller Spec
	describe('Yarn descriptions Controller Tests', function() {
		// Initialize global variables
		var YarnDescriptionsController,
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

			// Initialize the Yarn descriptions controller.
			YarnDescriptionsController = $controller('YarnDescriptionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Yarn description object fetched from XHR', inject(function(YarnDescriptions) {
			// Create sample Yarn description using the Yarn descriptions service
			var sampleYarnDescription = new YarnDescriptions({
				name: 'New Yarn description'
			});

			// Create a sample Yarn descriptions array that includes the new Yarn description
			var sampleYarnDescriptions = [sampleYarnDescription];

			// Set GET response
			$httpBackend.expectGET('yarn-descriptions').respond(sampleYarnDescriptions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.yarnDescriptions).toEqualData(sampleYarnDescriptions);
		}));

		it('$scope.findOne() should create an array with one Yarn description object fetched from XHR using a yarnDescriptionId URL parameter', inject(function(YarnDescriptions) {
			// Define a sample Yarn description object
			var sampleYarnDescription = new YarnDescriptions({
				name: 'New Yarn description'
			});

			// Set the URL parameter
			$stateParams.yarnDescriptionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/yarn-descriptions\/([0-9a-fA-F]{24})$/).respond(sampleYarnDescription);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.yarnDescription).toEqualData(sampleYarnDescription);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(YarnDescriptions) {
			// Create a sample Yarn description object
			var sampleYarnDescriptionPostData = new YarnDescriptions({
				name: 'New Yarn description'
			});

			// Create a sample Yarn description response
			var sampleYarnDescriptionResponse = new YarnDescriptions({
				_id: '525cf20451979dea2c000001',
				name: 'New Yarn description'
			});

			// Fixture mock form input values
			scope.name = 'New Yarn description';

			// Set POST response
			$httpBackend.expectPOST('yarn-descriptions', sampleYarnDescriptionPostData).respond(sampleYarnDescriptionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Yarn description was created
			expect($location.path()).toBe('/yarn-descriptions/' + sampleYarnDescriptionResponse._id);
		}));

		it('$scope.update() should update a valid Yarn description', inject(function(YarnDescriptions) {
			// Define a sample Yarn description put data
			var sampleYarnDescriptionPutData = new YarnDescriptions({
				_id: '525cf20451979dea2c000001',
				name: 'New Yarn description'
			});

			// Mock Yarn description in scope
			scope.yarnDescription = sampleYarnDescriptionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/yarn-descriptions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/yarn-descriptions/' + sampleYarnDescriptionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid yarnDescriptionId and remove the Yarn description from the scope', inject(function(YarnDescriptions) {
			// Create new Yarn description object
			var sampleYarnDescription = new YarnDescriptions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Yarn descriptions array and include the Yarn description
			scope.yarnDescriptions = [sampleYarnDescription];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/yarn-descriptions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleYarnDescription);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.yarnDescriptions.length).toBe(0);
		}));
	});
}());