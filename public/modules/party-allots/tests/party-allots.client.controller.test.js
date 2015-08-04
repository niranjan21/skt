'use strict';

(function() {
	// Party allots Controller Spec
	describe('Party allots Controller Tests', function() {
		// Initialize global variables
		var PartyAllotsController,
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

			// Initialize the Party allots controller.
			PartyAllotsController = $controller('PartyAllotsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Party allot object fetched from XHR', inject(function(PartyAllots) {
			// Create sample Party allot using the Party allots service
			var samplePartyAllot = new PartyAllots({
				name: 'New Party allot'
			});

			// Create a sample Party allots array that includes the new Party allot
			var samplePartyAllots = [samplePartyAllot];

			// Set GET response
			$httpBackend.expectGET('party-allots').respond(samplePartyAllots);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.partyAllots).toEqualData(samplePartyAllots);
		}));

		it('$scope.findOne() should create an array with one Party allot object fetched from XHR using a partyAllotId URL parameter', inject(function(PartyAllots) {
			// Define a sample Party allot object
			var samplePartyAllot = new PartyAllots({
				name: 'New Party allot'
			});

			// Set the URL parameter
			$stateParams.partyAllotId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/party-allots\/([0-9a-fA-F]{24})$/).respond(samplePartyAllot);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.partyAllot).toEqualData(samplePartyAllot);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PartyAllots) {
			// Create a sample Party allot object
			var samplePartyAllotPostData = new PartyAllots({
				name: 'New Party allot'
			});

			// Create a sample Party allot response
			var samplePartyAllotResponse = new PartyAllots({
				_id: '525cf20451979dea2c000001',
				name: 'New Party allot'
			});

			// Fixture mock form input values
			scope.name = 'New Party allot';

			// Set POST response
			$httpBackend.expectPOST('party-allots', samplePartyAllotPostData).respond(samplePartyAllotResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Party allot was created
			expect($location.path()).toBe('/party-allots/' + samplePartyAllotResponse._id);
		}));

		it('$scope.update() should update a valid Party allot', inject(function(PartyAllots) {
			// Define a sample Party allot put data
			var samplePartyAllotPutData = new PartyAllots({
				_id: '525cf20451979dea2c000001',
				name: 'New Party allot'
			});

			// Mock Party allot in scope
			scope.partyAllot = samplePartyAllotPutData;

			// Set PUT response
			$httpBackend.expectPUT(/party-allots\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/party-allots/' + samplePartyAllotPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid partyAllotId and remove the Party allot from the scope', inject(function(PartyAllots) {
			// Create new Party allot object
			var samplePartyAllot = new PartyAllots({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Party allots array and include the Party allot
			scope.partyAllots = [samplePartyAllot];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/party-allots\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePartyAllot);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.partyAllots.length).toBe(0);
		}));
	});
}());