'use strict';

(function() {
	// Expense entries Controller Spec
	describe('Expense entries Controller Tests', function() {
		// Initialize global variables
		var ExpenseEntriesController,
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

			// Initialize the Expense entries controller.
			ExpenseEntriesController = $controller('ExpenseEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Expense entry object fetched from XHR', inject(function(ExpenseEntries) {
			// Create sample Expense entry using the Expense entries service
			var sampleExpenseEntry = new ExpenseEntries({
				name: 'New Expense entry'
			});

			// Create a sample Expense entries array that includes the new Expense entry
			var sampleExpenseEntries = [sampleExpenseEntry];

			// Set GET response
			$httpBackend.expectGET('expense-entries').respond(sampleExpenseEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.expenseEntries).toEqualData(sampleExpenseEntries);
		}));

		it('$scope.findOne() should create an array with one Expense entry object fetched from XHR using a expenseEntryId URL parameter', inject(function(ExpenseEntries) {
			// Define a sample Expense entry object
			var sampleExpenseEntry = new ExpenseEntries({
				name: 'New Expense entry'
			});

			// Set the URL parameter
			$stateParams.expenseEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/expense-entries\/([0-9a-fA-F]{24})$/).respond(sampleExpenseEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.expenseEntry).toEqualData(sampleExpenseEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ExpenseEntries) {
			// Create a sample Expense entry object
			var sampleExpenseEntryPostData = new ExpenseEntries({
				name: 'New Expense entry'
			});

			// Create a sample Expense entry response
			var sampleExpenseEntryResponse = new ExpenseEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Expense entry'
			});

			// Fixture mock form input values
			scope.name = 'New Expense entry';

			// Set POST response
			$httpBackend.expectPOST('expense-entries', sampleExpenseEntryPostData).respond(sampleExpenseEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Expense entry was created
			expect($location.path()).toBe('/expense-entries/' + sampleExpenseEntryResponse._id);
		}));

		it('$scope.update() should update a valid Expense entry', inject(function(ExpenseEntries) {
			// Define a sample Expense entry put data
			var sampleExpenseEntryPutData = new ExpenseEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Expense entry'
			});

			// Mock Expense entry in scope
			scope.expenseEntry = sampleExpenseEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/expense-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/expense-entries/' + sampleExpenseEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid expenseEntryId and remove the Expense entry from the scope', inject(function(ExpenseEntries) {
			// Create new Expense entry object
			var sampleExpenseEntry = new ExpenseEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Expense entries array and include the Expense entry
			scope.expenseEntries = [sampleExpenseEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/expense-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleExpenseEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.expenseEntries.length).toBe(0);
		}));
	});
}());