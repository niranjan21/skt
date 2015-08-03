'use strict';

(function() {
	// Collar sizes Controller Spec
	describe('Collar sizes Controller Tests', function() {
		// Initialize global variables
		var CollarSizesController,
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

			// Initialize the Collar sizes controller.
			CollarSizesController = $controller('CollarSizesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Collar size object fetched from XHR', inject(function(CollarSizes) {
			// Create sample Collar size using the Collar sizes service
			var sampleCollarSize = new CollarSizes({
				name: 'New Collar size'
			});

			// Create a sample Collar sizes array that includes the new Collar size
			var sampleCollarSizes = [sampleCollarSize];

			// Set GET response
			$httpBackend.expectGET('collar-sizes').respond(sampleCollarSizes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.collarSizes).toEqualData(sampleCollarSizes);
		}));

		it('$scope.findOne() should create an array with one Collar size object fetched from XHR using a collarSizeId URL parameter', inject(function(CollarSizes) {
			// Define a sample Collar size object
			var sampleCollarSize = new CollarSizes({
				name: 'New Collar size'
			});

			// Set the URL parameter
			$stateParams.collarSizeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/collar-sizes\/([0-9a-fA-F]{24})$/).respond(sampleCollarSize);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.collarSize).toEqualData(sampleCollarSize);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(CollarSizes) {
			// Create a sample Collar size object
			var sampleCollarSizePostData = new CollarSizes({
				name: 'New Collar size'
			});

			// Create a sample Collar size response
			var sampleCollarSizeResponse = new CollarSizes({
				_id: '525cf20451979dea2c000001',
				name: 'New Collar size'
			});

			// Fixture mock form input values
			scope.name = 'New Collar size';

			// Set POST response
			$httpBackend.expectPOST('collar-sizes', sampleCollarSizePostData).respond(sampleCollarSizeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Collar size was created
			expect($location.path()).toBe('/collar-sizes/' + sampleCollarSizeResponse._id);
		}));

		it('$scope.update() should update a valid Collar size', inject(function(CollarSizes) {
			// Define a sample Collar size put data
			var sampleCollarSizePutData = new CollarSizes({
				_id: '525cf20451979dea2c000001',
				name: 'New Collar size'
			});

			// Mock Collar size in scope
			scope.collarSize = sampleCollarSizePutData;

			// Set PUT response
			$httpBackend.expectPUT(/collar-sizes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/collar-sizes/' + sampleCollarSizePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid collarSizeId and remove the Collar size from the scope', inject(function(CollarSizes) {
			// Create new Collar size object
			var sampleCollarSize = new CollarSizes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Collar sizes array and include the Collar size
			scope.collarSizes = [sampleCollarSize];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/collar-sizes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCollarSize);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.collarSizes.length).toBe(0);
		}));
	});
}());