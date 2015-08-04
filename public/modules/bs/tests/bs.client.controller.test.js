'use strict';

(function() {
	// Bs Controller Spec
	describe('Bs Controller Tests', function() {
		// Initialize global variables
		var BsController,
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

			// Initialize the Bs controller.
			BsController = $controller('BsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one B object fetched from XHR', inject(function(Bs) {
			// Create sample B using the Bs service
			var sampleB = new Bs({
				name: 'New B'
			});

			// Create a sample Bs array that includes the new B
			var sampleBs = [sampleB];

			// Set GET response
			$httpBackend.expectGET('bs').respond(sampleBs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bs).toEqualData(sampleBs);
		}));

		it('$scope.findOne() should create an array with one B object fetched from XHR using a bId URL parameter', inject(function(Bs) {
			// Define a sample B object
			var sampleB = new Bs({
				name: 'New B'
			});

			// Set the URL parameter
			$stateParams.bId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/bs\/([0-9a-fA-F]{24})$/).respond(sampleB);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.b).toEqualData(sampleB);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Bs) {
			// Create a sample B object
			var sampleBPostData = new Bs({
				name: 'New B'
			});

			// Create a sample B response
			var sampleBResponse = new Bs({
				_id: '525cf20451979dea2c000001',
				name: 'New B'
			});

			// Fixture mock form input values
			scope.name = 'New B';

			// Set POST response
			$httpBackend.expectPOST('bs', sampleBPostData).respond(sampleBResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the B was created
			expect($location.path()).toBe('/bs/' + sampleBResponse._id);
		}));

		it('$scope.update() should update a valid B', inject(function(Bs) {
			// Define a sample B put data
			var sampleBPutData = new Bs({
				_id: '525cf20451979dea2c000001',
				name: 'New B'
			});

			// Mock B in scope
			scope.b = sampleBPutData;

			// Set PUT response
			$httpBackend.expectPUT(/bs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/bs/' + sampleBPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid bId and remove the B from the scope', inject(function(Bs) {
			// Create new B object
			var sampleB = new Bs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Bs array and include the B
			scope.bs = [sampleB];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/bs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleB);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.bs.length).toBe(0);
		}));
	});
}());