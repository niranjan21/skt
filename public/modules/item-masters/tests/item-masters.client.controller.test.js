'use strict';

(function() {
	// Item masters Controller Spec
	describe('Item masters Controller Tests', function() {
		// Initialize global variables
		var ItemMastersController,
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

			// Initialize the Item masters controller.
			ItemMastersController = $controller('ItemMastersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Item master object fetched from XHR', inject(function(ItemMasters) {
			// Create sample Item master using the Item masters service
			var sampleItemMaster = new ItemMasters({
				name: 'New Item master'
			});

			// Create a sample Item masters array that includes the new Item master
			var sampleItemMasters = [sampleItemMaster];

			// Set GET response
			$httpBackend.expectGET('item-masters').respond(sampleItemMasters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.itemMasters).toEqualData(sampleItemMasters);
		}));

		it('$scope.findOne() should create an array with one Item master object fetched from XHR using a itemMasterId URL parameter', inject(function(ItemMasters) {
			// Define a sample Item master object
			var sampleItemMaster = new ItemMasters({
				name: 'New Item master'
			});

			// Set the URL parameter
			$stateParams.itemMasterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/item-masters\/([0-9a-fA-F]{24})$/).respond(sampleItemMaster);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.itemMaster).toEqualData(sampleItemMaster);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ItemMasters) {
			// Create a sample Item master object
			var sampleItemMasterPostData = new ItemMasters({
				name: 'New Item master'
			});

			// Create a sample Item master response
			var sampleItemMasterResponse = new ItemMasters({
				_id: '525cf20451979dea2c000001',
				name: 'New Item master'
			});

			// Fixture mock form input values
			scope.name = 'New Item master';

			// Set POST response
			$httpBackend.expectPOST('item-masters', sampleItemMasterPostData).respond(sampleItemMasterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Item master was created
			expect($location.path()).toBe('/item-masters/' + sampleItemMasterResponse._id);
		}));

		it('$scope.update() should update a valid Item master', inject(function(ItemMasters) {
			// Define a sample Item master put data
			var sampleItemMasterPutData = new ItemMasters({
				_id: '525cf20451979dea2c000001',
				name: 'New Item master'
			});

			// Mock Item master in scope
			scope.itemMaster = sampleItemMasterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/item-masters\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/item-masters/' + sampleItemMasterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid itemMasterId and remove the Item master from the scope', inject(function(ItemMasters) {
			// Create new Item master object
			var sampleItemMaster = new ItemMasters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Item masters array and include the Item master
			scope.itemMasters = [sampleItemMaster];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/item-masters\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleItemMaster);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.itemMasters.length).toBe(0);
		}));
	});
}());