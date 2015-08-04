'use strict';

(function() {
	// Needles Controller Spec
	describe('Needles Controller Tests', function() {
		// Initialize global variables
		var NeedlesController,
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

			// Initialize the Needles controller.
			NeedlesController = $controller('NeedlesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Needle object fetched from XHR', inject(function(Needles) {
			// Create sample Needle using the Needles service
			var sampleNeedle = new Needles({
				name: 'New Needle'
			});

			// Create a sample Needles array that includes the new Needle
			var sampleNeedles = [sampleNeedle];

			// Set GET response
			$httpBackend.expectGET('needles').respond(sampleNeedles);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.needles).toEqualData(sampleNeedles);
		}));

		it('$scope.findOne() should create an array with one Needle object fetched from XHR using a needleId URL parameter', inject(function(Needles) {
			// Define a sample Needle object
			var sampleNeedle = new Needles({
				name: 'New Needle'
			});

			// Set the URL parameter
			$stateParams.needleId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/needles\/([0-9a-fA-F]{24})$/).respond(sampleNeedle);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.needle).toEqualData(sampleNeedle);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Needles) {
			// Create a sample Needle object
			var sampleNeedlePostData = new Needles({
				name: 'New Needle'
			});

			// Create a sample Needle response
			var sampleNeedleResponse = new Needles({
				_id: '525cf20451979dea2c000001',
				name: 'New Needle'
			});

			// Fixture mock form input values
			scope.name = 'New Needle';

			// Set POST response
			$httpBackend.expectPOST('needles', sampleNeedlePostData).respond(sampleNeedleResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Needle was created
			expect($location.path()).toBe('/needles/' + sampleNeedleResponse._id);
		}));

		it('$scope.update() should update a valid Needle', inject(function(Needles) {
			// Define a sample Needle put data
			var sampleNeedlePutData = new Needles({
				_id: '525cf20451979dea2c000001',
				name: 'New Needle'
			});

			// Mock Needle in scope
			scope.needle = sampleNeedlePutData;

			// Set PUT response
			$httpBackend.expectPUT(/needles\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/needles/' + sampleNeedlePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid needleId and remove the Needle from the scope', inject(function(Needles) {
			// Create new Needle object
			var sampleNeedle = new Needles({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Needles array and include the Needle
			scope.needles = [sampleNeedle];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/needles\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleNeedle);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.needles.length).toBe(0);
		}));
	});
}());