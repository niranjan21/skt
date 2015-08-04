'use strict';

(function() {
	// Stoppages Controller Spec
	describe('Stoppages Controller Tests', function() {
		// Initialize global variables
		var StoppagesController,
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

			// Initialize the Stoppages controller.
			StoppagesController = $controller('StoppagesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Stoppage object fetched from XHR', inject(function(Stoppages) {
			// Create sample Stoppage using the Stoppages service
			var sampleStoppage = new Stoppages({
				name: 'New Stoppage'
			});

			// Create a sample Stoppages array that includes the new Stoppage
			var sampleStoppages = [sampleStoppage];

			// Set GET response
			$httpBackend.expectGET('stoppages').respond(sampleStoppages);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.stoppages).toEqualData(sampleStoppages);
		}));

		it('$scope.findOne() should create an array with one Stoppage object fetched from XHR using a stoppageId URL parameter', inject(function(Stoppages) {
			// Define a sample Stoppage object
			var sampleStoppage = new Stoppages({
				name: 'New Stoppage'
			});

			// Set the URL parameter
			$stateParams.stoppageId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/stoppages\/([0-9a-fA-F]{24})$/).respond(sampleStoppage);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.stoppage).toEqualData(sampleStoppage);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Stoppages) {
			// Create a sample Stoppage object
			var sampleStoppagePostData = new Stoppages({
				name: 'New Stoppage'
			});

			// Create a sample Stoppage response
			var sampleStoppageResponse = new Stoppages({
				_id: '525cf20451979dea2c000001',
				name: 'New Stoppage'
			});

			// Fixture mock form input values
			scope.name = 'New Stoppage';

			// Set POST response
			$httpBackend.expectPOST('stoppages', sampleStoppagePostData).respond(sampleStoppageResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Stoppage was created
			expect($location.path()).toBe('/stoppages/' + sampleStoppageResponse._id);
		}));

		it('$scope.update() should update a valid Stoppage', inject(function(Stoppages) {
			// Define a sample Stoppage put data
			var sampleStoppagePutData = new Stoppages({
				_id: '525cf20451979dea2c000001',
				name: 'New Stoppage'
			});

			// Mock Stoppage in scope
			scope.stoppage = sampleStoppagePutData;

			// Set PUT response
			$httpBackend.expectPUT(/stoppages\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/stoppages/' + sampleStoppagePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid stoppageId and remove the Stoppage from the scope', inject(function(Stoppages) {
			// Create new Stoppage object
			var sampleStoppage = new Stoppages({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Stoppages array and include the Stoppage
			scope.stoppages = [sampleStoppage];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/stoppages\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleStoppage);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.stoppages.length).toBe(0);
		}));
	});
}());