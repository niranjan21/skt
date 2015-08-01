'use strict';

(function() {
	// Job cards Controller Spec
	describe('Job cards Controller Tests', function() {
		// Initialize global variables
		var JobCardsController,
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

			// Initialize the Job cards controller.
			JobCardsController = $controller('JobCardsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Job card object fetched from XHR', inject(function(JobCards) {
			// Create sample Job card using the Job cards service
			var sampleJobCard = new JobCards({
				name: 'New Job card'
			});

			// Create a sample Job cards array that includes the new Job card
			var sampleJobCards = [sampleJobCard];

			// Set GET response
			$httpBackend.expectGET('job-cards').respond(sampleJobCards);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.jobCards).toEqualData(sampleJobCards);
		}));

		it('$scope.findOne() should create an array with one Job card object fetched from XHR using a jobCardId URL parameter', inject(function(JobCards) {
			// Define a sample Job card object
			var sampleJobCard = new JobCards({
				name: 'New Job card'
			});

			// Set the URL parameter
			$stateParams.jobCardId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/job-cards\/([0-9a-fA-F]{24})$/).respond(sampleJobCard);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.jobCard).toEqualData(sampleJobCard);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(JobCards) {
			// Create a sample Job card object
			var sampleJobCardPostData = new JobCards({
				name: 'New Job card'
			});

			// Create a sample Job card response
			var sampleJobCardResponse = new JobCards({
				_id: '525cf20451979dea2c000001',
				name: 'New Job card'
			});

			// Fixture mock form input values
			scope.name = 'New Job card';

			// Set POST response
			$httpBackend.expectPOST('job-cards', sampleJobCardPostData).respond(sampleJobCardResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Job card was created
			expect($location.path()).toBe('/job-cards/' + sampleJobCardResponse._id);
		}));

		it('$scope.update() should update a valid Job card', inject(function(JobCards) {
			// Define a sample Job card put data
			var sampleJobCardPutData = new JobCards({
				_id: '525cf20451979dea2c000001',
				name: 'New Job card'
			});

			// Mock Job card in scope
			scope.jobCard = sampleJobCardPutData;

			// Set PUT response
			$httpBackend.expectPUT(/job-cards\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/job-cards/' + sampleJobCardPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid jobCardId and remove the Job card from the scope', inject(function(JobCards) {
			// Create new Job card object
			var sampleJobCard = new JobCards({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Job cards array and include the Job card
			scope.jobCards = [sampleJobCard];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/job-cards\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleJobCard);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.jobCards.length).toBe(0);
		}));
	});
}());