'use strict';

(function() {
	// Marketings Controller Spec
	describe('Marketings Controller Tests', function() {
		// Initialize global variables
		var MarketingsController,
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

			// Initialize the Marketings controller.
			MarketingsController = $controller('MarketingsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Marketing object fetched from XHR', inject(function(Marketings) {
			// Create sample Marketing using the Marketings service
			var sampleMarketing = new Marketings({
				name: 'New Marketing'
			});

			// Create a sample Marketings array that includes the new Marketing
			var sampleMarketings = [sampleMarketing];

			// Set GET response
			$httpBackend.expectGET('marketings').respond(sampleMarketings);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.marketings).toEqualData(sampleMarketings);
		}));

		it('$scope.findOne() should create an array with one Marketing object fetched from XHR using a marketingId URL parameter', inject(function(Marketings) {
			// Define a sample Marketing object
			var sampleMarketing = new Marketings({
				name: 'New Marketing'
			});

			// Set the URL parameter
			$stateParams.marketingId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/marketings\/([0-9a-fA-F]{24})$/).respond(sampleMarketing);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.marketing).toEqualData(sampleMarketing);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Marketings) {
			// Create a sample Marketing object
			var sampleMarketingPostData = new Marketings({
				name: 'New Marketing'
			});

			// Create a sample Marketing response
			var sampleMarketingResponse = new Marketings({
				_id: '525cf20451979dea2c000001',
				name: 'New Marketing'
			});

			// Fixture mock form input values
			scope.name = 'New Marketing';

			// Set POST response
			$httpBackend.expectPOST('marketings', sampleMarketingPostData).respond(sampleMarketingResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Marketing was created
			expect($location.path()).toBe('/marketings/' + sampleMarketingResponse._id);
		}));

		it('$scope.update() should update a valid Marketing', inject(function(Marketings) {
			// Define a sample Marketing put data
			var sampleMarketingPutData = new Marketings({
				_id: '525cf20451979dea2c000001',
				name: 'New Marketing'
			});

			// Mock Marketing in scope
			scope.marketing = sampleMarketingPutData;

			// Set PUT response
			$httpBackend.expectPUT(/marketings\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/marketings/' + sampleMarketingPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid marketingId and remove the Marketing from the scope', inject(function(Marketings) {
			// Create new Marketing object
			var sampleMarketing = new Marketings({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Marketings array and include the Marketing
			scope.marketings = [sampleMarketing];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/marketings\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMarketing);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.marketings.length).toBe(0);
		}));
	});
}());