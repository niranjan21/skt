'use strict';

(function() {
	// Party masters Controller Spec
	describe('Party masters Controller Tests', function() {
		// Initialize global variables
		var PartyMastersController,
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

			// Initialize the Party masters controller.
			PartyMastersController = $controller('PartyMastersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Party master object fetched from XHR', inject(function(PartyMasters) {
			// Create sample Party master using the Party masters service
			var samplePartyMaster = new PartyMasters({
				name: 'New Party master'
			});

			// Create a sample Party masters array that includes the new Party master
			var samplePartyMasters = [samplePartyMaster];

			// Set GET response
			$httpBackend.expectGET('party-masters').respond(samplePartyMasters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.partyMasters).toEqualData(samplePartyMasters);
		}));

		it('$scope.findOne() should create an array with one Party master object fetched from XHR using a partyMasterId URL parameter', inject(function(PartyMasters) {
			// Define a sample Party master object
			var samplePartyMaster = new PartyMasters({
				name: 'New Party master'
			});

			// Set the URL parameter
			$stateParams.partyMasterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/party-masters\/([0-9a-fA-F]{24})$/).respond(samplePartyMaster);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.partyMaster).toEqualData(samplePartyMaster);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PartyMasters) {
			// Create a sample Party master object
			var samplePartyMasterPostData = new PartyMasters({
				name: 'New Party master'
			});

			// Create a sample Party master response
			var samplePartyMasterResponse = new PartyMasters({
				_id: '525cf20451979dea2c000001',
				name: 'New Party master'
			});

			// Fixture mock form input values
			scope.name = 'New Party master';

			// Set POST response
			$httpBackend.expectPOST('party-masters', samplePartyMasterPostData).respond(samplePartyMasterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Party master was created
			expect($location.path()).toBe('/party-masters/' + samplePartyMasterResponse._id);
		}));

		it('$scope.update() should update a valid Party master', inject(function(PartyMasters) {
			// Define a sample Party master put data
			var samplePartyMasterPutData = new PartyMasters({
				_id: '525cf20451979dea2c000001',
				name: 'New Party master'
			});

			// Mock Party master in scope
			scope.partyMaster = samplePartyMasterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/party-masters\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/party-masters/' + samplePartyMasterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid partyMasterId and remove the Party master from the scope', inject(function(PartyMasters) {
			// Create new Party master object
			var samplePartyMaster = new PartyMasters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Party masters array and include the Party master
			scope.partyMasters = [samplePartyMaster];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/party-masters\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePartyMaster);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.partyMasters.length).toBe(0);
		}));
	});
}());