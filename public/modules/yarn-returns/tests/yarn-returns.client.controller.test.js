'use strict';

(function() {
	// Yarn returns Controller Spec
	describe('Yarn returns Controller Tests', function() {
		// Initialize global variables
		var YarnReturnsController,
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

			// Initialize the Yarn returns controller.
			YarnReturnsController = $controller('YarnReturnsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Yarn return object fetched from XHR', inject(function(YarnReturns) {
			// Create sample Yarn return using the Yarn returns service
			var sampleYarnReturn = new YarnReturns({
				name: 'New Yarn return'
			});

			// Create a sample Yarn returns array that includes the new Yarn return
			var sampleYarnReturns = [sampleYarnReturn];

			// Set GET response
			$httpBackend.expectGET('yarn-returns').respond(sampleYarnReturns);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.yarnReturns).toEqualData(sampleYarnReturns);
		}));

		it('$scope.findOne() should create an array with one Yarn return object fetched from XHR using a yarnReturnId URL parameter', inject(function(YarnReturns) {
			// Define a sample Yarn return object
			var sampleYarnReturn = new YarnReturns({
				name: 'New Yarn return'
			});

			// Set the URL parameter
			$stateParams.yarnReturnId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/yarn-returns\/([0-9a-fA-F]{24})$/).respond(sampleYarnReturn);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.yarnReturn).toEqualData(sampleYarnReturn);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(YarnReturns) {
			// Create a sample Yarn return object
			var sampleYarnReturnPostData = new YarnReturns({
				name: 'New Yarn return'
			});

			// Create a sample Yarn return response
			var sampleYarnReturnResponse = new YarnReturns({
				_id: '525cf20451979dea2c000001',
				name: 'New Yarn return'
			});

			// Fixture mock form input values
			scope.name = 'New Yarn return';

			// Set POST response
			$httpBackend.expectPOST('yarn-returns', sampleYarnReturnPostData).respond(sampleYarnReturnResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Yarn return was created
			expect($location.path()).toBe('/yarn-returns/' + sampleYarnReturnResponse._id);
		}));

		it('$scope.update() should update a valid Yarn return', inject(function(YarnReturns) {
			// Define a sample Yarn return put data
			var sampleYarnReturnPutData = new YarnReturns({
				_id: '525cf20451979dea2c000001',
				name: 'New Yarn return'
			});

			// Mock Yarn return in scope
			scope.yarnReturn = sampleYarnReturnPutData;

			// Set PUT response
			$httpBackend.expectPUT(/yarn-returns\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/yarn-returns/' + sampleYarnReturnPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid yarnReturnId and remove the Yarn return from the scope', inject(function(YarnReturns) {
			// Create new Yarn return object
			var sampleYarnReturn = new YarnReturns({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Yarn returns array and include the Yarn return
			scope.yarnReturns = [sampleYarnReturn];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/yarn-returns\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleYarnReturn);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.yarnReturns.length).toBe(0);
		}));
	});
}());