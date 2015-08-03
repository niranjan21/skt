'use strict';

(function() {
	// Dia lists Controller Spec
	describe('Dia lists Controller Tests', function() {
		// Initialize global variables
		var DiaListsController,
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

			// Initialize the Dia lists controller.
			DiaListsController = $controller('DiaListsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Dia list object fetched from XHR', inject(function(DiaLists) {
			// Create sample Dia list using the Dia lists service
			var sampleDiaList = new DiaLists({
				name: 'New Dia list'
			});

			// Create a sample Dia lists array that includes the new Dia list
			var sampleDiaLists = [sampleDiaList];

			// Set GET response
			$httpBackend.expectGET('dia-lists').respond(sampleDiaLists);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.diaLists).toEqualData(sampleDiaLists);
		}));

		it('$scope.findOne() should create an array with one Dia list object fetched from XHR using a diaListId URL parameter', inject(function(DiaLists) {
			// Define a sample Dia list object
			var sampleDiaList = new DiaLists({
				name: 'New Dia list'
			});

			// Set the URL parameter
			$stateParams.diaListId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/dia-lists\/([0-9a-fA-F]{24})$/).respond(sampleDiaList);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.diaList).toEqualData(sampleDiaList);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(DiaLists) {
			// Create a sample Dia list object
			var sampleDiaListPostData = new DiaLists({
				name: 'New Dia list'
			});

			// Create a sample Dia list response
			var sampleDiaListResponse = new DiaLists({
				_id: '525cf20451979dea2c000001',
				name: 'New Dia list'
			});

			// Fixture mock form input values
			scope.name = 'New Dia list';

			// Set POST response
			$httpBackend.expectPOST('dia-lists', sampleDiaListPostData).respond(sampleDiaListResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Dia list was created
			expect($location.path()).toBe('/dia-lists/' + sampleDiaListResponse._id);
		}));

		it('$scope.update() should update a valid Dia list', inject(function(DiaLists) {
			// Define a sample Dia list put data
			var sampleDiaListPutData = new DiaLists({
				_id: '525cf20451979dea2c000001',
				name: 'New Dia list'
			});

			// Mock Dia list in scope
			scope.diaList = sampleDiaListPutData;

			// Set PUT response
			$httpBackend.expectPUT(/dia-lists\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/dia-lists/' + sampleDiaListPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid diaListId and remove the Dia list from the scope', inject(function(DiaLists) {
			// Create new Dia list object
			var sampleDiaList = new DiaLists({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Dia lists array and include the Dia list
			scope.diaLists = [sampleDiaList];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/dia-lists\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDiaList);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.diaLists.length).toBe(0);
		}));
	});
}());