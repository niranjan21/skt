'use strict';

(function() {
	// Concerns Controller Spec
	describe('Concerns Controller Tests', function() {
		// Initialize global variables
		var ConcernsController,
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

			// Initialize the Concerns controller.
			ConcernsController = $controller('ConcernsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Concern object fetched from XHR', inject(function(Concerns) {
			// Create sample Concern using the Concerns service
			var sampleConcern = new Concerns({
				name: 'New Concern'
			});

			// Create a sample Concerns array that includes the new Concern
			var sampleConcerns = [sampleConcern];

			// Set GET response
			$httpBackend.expectGET('concerns').respond(sampleConcerns);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.concerns).toEqualData(sampleConcerns);
		}));

		it('$scope.findOne() should create an array with one Concern object fetched from XHR using a concernId URL parameter', inject(function(Concerns) {
			// Define a sample Concern object
			var sampleConcern = new Concerns({
				name: 'New Concern'
			});

			// Set the URL parameter
			$stateParams.concernId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/concerns\/([0-9a-fA-F]{24})$/).respond(sampleConcern);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.concern).toEqualData(sampleConcern);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Concerns) {
			// Create a sample Concern object
			var sampleConcernPostData = new Concerns({
				name: 'New Concern'
			});

			// Create a sample Concern response
			var sampleConcernResponse = new Concerns({
				_id: '525cf20451979dea2c000001',
				name: 'New Concern'
			});

			// Fixture mock form input values
			scope.name = 'New Concern';

			// Set POST response
			$httpBackend.expectPOST('concerns', sampleConcernPostData).respond(sampleConcernResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Concern was created
			expect($location.path()).toBe('/concerns/' + sampleConcernResponse._id);
		}));

		it('$scope.update() should update a valid Concern', inject(function(Concerns) {
			// Define a sample Concern put data
			var sampleConcernPutData = new Concerns({
				_id: '525cf20451979dea2c000001',
				name: 'New Concern'
			});

			// Mock Concern in scope
			scope.concern = sampleConcernPutData;

			// Set PUT response
			$httpBackend.expectPUT(/concerns\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/concerns/' + sampleConcernPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid concernId and remove the Concern from the scope', inject(function(Concerns) {
			// Create new Concern object
			var sampleConcern = new Concerns({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Concerns array and include the Concern
			scope.concerns = [sampleConcern];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/concerns\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleConcern);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.concerns.length).toBe(0);
		}));
	});
}());