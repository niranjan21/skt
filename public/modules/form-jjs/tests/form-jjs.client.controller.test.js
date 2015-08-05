'use strict';

(function() {
	// Form jjs Controller Spec
	describe('Form jjs Controller Tests', function() {
		// Initialize global variables
		var FormJjsController,
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

			// Initialize the Form jjs controller.
			FormJjsController = $controller('FormJjsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Form jj object fetched from XHR', inject(function(FormJjs) {
			// Create sample Form jj using the Form jjs service
			var sampleFormJj = new FormJjs({
				name: 'New Form jj'
			});

			// Create a sample Form jjs array that includes the new Form jj
			var sampleFormJjs = [sampleFormJj];

			// Set GET response
			$httpBackend.expectGET('form-jjs').respond(sampleFormJjs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.formJjs).toEqualData(sampleFormJjs);
		}));

		it('$scope.findOne() should create an array with one Form jj object fetched from XHR using a formJjId URL parameter', inject(function(FormJjs) {
			// Define a sample Form jj object
			var sampleFormJj = new FormJjs({
				name: 'New Form jj'
			});

			// Set the URL parameter
			$stateParams.formJjId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/form-jjs\/([0-9a-fA-F]{24})$/).respond(sampleFormJj);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.formJj).toEqualData(sampleFormJj);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FormJjs) {
			// Create a sample Form jj object
			var sampleFormJjPostData = new FormJjs({
				name: 'New Form jj'
			});

			// Create a sample Form jj response
			var sampleFormJjResponse = new FormJjs({
				_id: '525cf20451979dea2c000001',
				name: 'New Form jj'
			});

			// Fixture mock form input values
			scope.name = 'New Form jj';

			// Set POST response
			$httpBackend.expectPOST('form-jjs', sampleFormJjPostData).respond(sampleFormJjResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Form jj was created
			expect($location.path()).toBe('/form-jjs/' + sampleFormJjResponse._id);
		}));

		it('$scope.update() should update a valid Form jj', inject(function(FormJjs) {
			// Define a sample Form jj put data
			var sampleFormJjPutData = new FormJjs({
				_id: '525cf20451979dea2c000001',
				name: 'New Form jj'
			});

			// Mock Form jj in scope
			scope.formJj = sampleFormJjPutData;

			// Set PUT response
			$httpBackend.expectPUT(/form-jjs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/form-jjs/' + sampleFormJjPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid formJjId and remove the Form jj from the scope', inject(function(FormJjs) {
			// Create new Form jj object
			var sampleFormJj = new FormJjs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Form jjs array and include the Form jj
			scope.formJjs = [sampleFormJj];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/form-jjs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFormJj);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.formJjs.length).toBe(0);
		}));
	});
}());