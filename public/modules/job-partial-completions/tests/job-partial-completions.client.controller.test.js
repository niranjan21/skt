'use strict';

(function() {
	// Job partial completions Controller Spec
	describe('Job partial completions Controller Tests', function() {
		// Initialize global variables
		var JobPartialCompletionsController,
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

			// Initialize the Job partial completions controller.
			JobPartialCompletionsController = $controller('JobPartialCompletionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Job partial completion object fetched from XHR', inject(function(JobPartialCompletions) {
			// Create sample Job partial completion using the Job partial completions service
			var sampleJobPartialCompletion = new JobPartialCompletions({
				name: 'New Job partial completion'
			});

			// Create a sample Job partial completions array that includes the new Job partial completion
			var sampleJobPartialCompletions = [sampleJobPartialCompletion];

			// Set GET response
			$httpBackend.expectGET('job-partial-completions').respond(sampleJobPartialCompletions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.jobPartialCompletions).toEqualData(sampleJobPartialCompletions);
		}));

		it('$scope.findOne() should create an array with one Job partial completion object fetched from XHR using a jobPartialCompletionId URL parameter', inject(function(JobPartialCompletions) {
			// Define a sample Job partial completion object
			var sampleJobPartialCompletion = new JobPartialCompletions({
				name: 'New Job partial completion'
			});

			// Set the URL parameter
			$stateParams.jobPartialCompletionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/job-partial-completions\/([0-9a-fA-F]{24})$/).respond(sampleJobPartialCompletion);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.jobPartialCompletion).toEqualData(sampleJobPartialCompletion);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(JobPartialCompletions) {
			// Create a sample Job partial completion object
			var sampleJobPartialCompletionPostData = new JobPartialCompletions({
				name: 'New Job partial completion'
			});

			// Create a sample Job partial completion response
			var sampleJobPartialCompletionResponse = new JobPartialCompletions({
				_id: '525cf20451979dea2c000001',
				name: 'New Job partial completion'
			});

			// Fixture mock form input values
			scope.name = 'New Job partial completion';

			// Set POST response
			$httpBackend.expectPOST('job-partial-completions', sampleJobPartialCompletionPostData).respond(sampleJobPartialCompletionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Job partial completion was created
			expect($location.path()).toBe('/job-partial-completions/' + sampleJobPartialCompletionResponse._id);
		}));

		it('$scope.update() should update a valid Job partial completion', inject(function(JobPartialCompletions) {
			// Define a sample Job partial completion put data
			var sampleJobPartialCompletionPutData = new JobPartialCompletions({
				_id: '525cf20451979dea2c000001',
				name: 'New Job partial completion'
			});

			// Mock Job partial completion in scope
			scope.jobPartialCompletion = sampleJobPartialCompletionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/job-partial-completions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/job-partial-completions/' + sampleJobPartialCompletionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid jobPartialCompletionId and remove the Job partial completion from the scope', inject(function(JobPartialCompletions) {
			// Create new Job partial completion object
			var sampleJobPartialCompletion = new JobPartialCompletions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Job partial completions array and include the Job partial completion
			scope.jobPartialCompletions = [sampleJobPartialCompletion];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/job-partial-completions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleJobPartialCompletion);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.jobPartialCompletions.length).toBe(0);
		}));
	});
}());