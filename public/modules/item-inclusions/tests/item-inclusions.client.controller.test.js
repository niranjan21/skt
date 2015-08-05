'use strict';

(function() {
	// Item inclusions Controller Spec
	describe('Item inclusions Controller Tests', function() {
		// Initialize global variables
		var ItemInclusionsController,
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

			// Initialize the Item inclusions controller.
			ItemInclusionsController = $controller('ItemInclusionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Item inclusion object fetched from XHR', inject(function(ItemInclusions) {
			// Create sample Item inclusion using the Item inclusions service
			var sampleItemInclusion = new ItemInclusions({
				name: 'New Item inclusion'
			});

			// Create a sample Item inclusions array that includes the new Item inclusion
			var sampleItemInclusions = [sampleItemInclusion];

			// Set GET response
			$httpBackend.expectGET('item-inclusions').respond(sampleItemInclusions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.itemInclusions).toEqualData(sampleItemInclusions);
		}));

		it('$scope.findOne() should create an array with one Item inclusion object fetched from XHR using a itemInclusionId URL parameter', inject(function(ItemInclusions) {
			// Define a sample Item inclusion object
			var sampleItemInclusion = new ItemInclusions({
				name: 'New Item inclusion'
			});

			// Set the URL parameter
			$stateParams.itemInclusionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/item-inclusions\/([0-9a-fA-F]{24})$/).respond(sampleItemInclusion);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.itemInclusion).toEqualData(sampleItemInclusion);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ItemInclusions) {
			// Create a sample Item inclusion object
			var sampleItemInclusionPostData = new ItemInclusions({
				name: 'New Item inclusion'
			});

			// Create a sample Item inclusion response
			var sampleItemInclusionResponse = new ItemInclusions({
				_id: '525cf20451979dea2c000001',
				name: 'New Item inclusion'
			});

			// Fixture mock form input values
			scope.name = 'New Item inclusion';

			// Set POST response
			$httpBackend.expectPOST('item-inclusions', sampleItemInclusionPostData).respond(sampleItemInclusionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Item inclusion was created
			expect($location.path()).toBe('/item-inclusions/' + sampleItemInclusionResponse._id);
		}));

		it('$scope.update() should update a valid Item inclusion', inject(function(ItemInclusions) {
			// Define a sample Item inclusion put data
			var sampleItemInclusionPutData = new ItemInclusions({
				_id: '525cf20451979dea2c000001',
				name: 'New Item inclusion'
			});

			// Mock Item inclusion in scope
			scope.itemInclusion = sampleItemInclusionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/item-inclusions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/item-inclusions/' + sampleItemInclusionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid itemInclusionId and remove the Item inclusion from the scope', inject(function(ItemInclusions) {
			// Create new Item inclusion object
			var sampleItemInclusion = new ItemInclusions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Item inclusions array and include the Item inclusion
			scope.itemInclusions = [sampleItemInclusion];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/item-inclusions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleItemInclusion);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.itemInclusions.length).toBe(0);
		}));
	});
}());