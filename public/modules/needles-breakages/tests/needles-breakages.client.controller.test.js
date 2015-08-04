'use strict';

(function() {
	// Needles breakages Controller Spec
	describe('Needles breakages Controller Tests', function() {
		// Initialize global variables
		var NeedlesBreakagesController,
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

			// Initialize the Needles breakages controller.
			NeedlesBreakagesController = $controller('NeedlesBreakagesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Needles breakage object fetched from XHR', inject(function(NeedlesBreakages) {
			// Create sample Needles breakage using the Needles breakages service
			var sampleNeedlesBreakage = new NeedlesBreakages({
				name: 'New Needles breakage'
			});

			// Create a sample Needles breakages array that includes the new Needles breakage
			var sampleNeedlesBreakages = [sampleNeedlesBreakage];

			// Set GET response
			$httpBackend.expectGET('needles-breakages').respond(sampleNeedlesBreakages);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.needlesBreakages).toEqualData(sampleNeedlesBreakages);
		}));

		it('$scope.findOne() should create an array with one Needles breakage object fetched from XHR using a needlesBreakageId URL parameter', inject(function(NeedlesBreakages) {
			// Define a sample Needles breakage object
			var sampleNeedlesBreakage = new NeedlesBreakages({
				name: 'New Needles breakage'
			});

			// Set the URL parameter
			$stateParams.needlesBreakageId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/needles-breakages\/([0-9a-fA-F]{24})$/).respond(sampleNeedlesBreakage);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.needlesBreakage).toEqualData(sampleNeedlesBreakage);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(NeedlesBreakages) {
			// Create a sample Needles breakage object
			var sampleNeedlesBreakagePostData = new NeedlesBreakages({
				name: 'New Needles breakage'
			});

			// Create a sample Needles breakage response
			var sampleNeedlesBreakageResponse = new NeedlesBreakages({
				_id: '525cf20451979dea2c000001',
				name: 'New Needles breakage'
			});

			// Fixture mock form input values
			scope.name = 'New Needles breakage';

			// Set POST response
			$httpBackend.expectPOST('needles-breakages', sampleNeedlesBreakagePostData).respond(sampleNeedlesBreakageResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Needles breakage was created
			expect($location.path()).toBe('/needles-breakages/' + sampleNeedlesBreakageResponse._id);
		}));

		it('$scope.update() should update a valid Needles breakage', inject(function(NeedlesBreakages) {
			// Define a sample Needles breakage put data
			var sampleNeedlesBreakagePutData = new NeedlesBreakages({
				_id: '525cf20451979dea2c000001',
				name: 'New Needles breakage'
			});

			// Mock Needles breakage in scope
			scope.needlesBreakage = sampleNeedlesBreakagePutData;

			// Set PUT response
			$httpBackend.expectPUT(/needles-breakages\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/needles-breakages/' + sampleNeedlesBreakagePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid needlesBreakageId and remove the Needles breakage from the scope', inject(function(NeedlesBreakages) {
			// Create new Needles breakage object
			var sampleNeedlesBreakage = new NeedlesBreakages({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Needles breakages array and include the Needles breakage
			scope.needlesBreakages = [sampleNeedlesBreakage];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/needles-breakages\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleNeedlesBreakage);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.needlesBreakages.length).toBe(0);
		}));
	});
}());