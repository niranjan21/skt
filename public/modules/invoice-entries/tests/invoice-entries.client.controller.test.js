'use strict';

(function() {
	// Invoice entries Controller Spec
	describe('Invoice entries Controller Tests', function() {
		// Initialize global variables
		var InvoiceEntriesController,
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

			// Initialize the Invoice entries controller.
			InvoiceEntriesController = $controller('InvoiceEntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Invoice entry object fetched from XHR', inject(function(InvoiceEntries) {
			// Create sample Invoice entry using the Invoice entries service
			var sampleInvoiceEntry = new InvoiceEntries({
				name: 'New Invoice entry'
			});

			// Create a sample Invoice entries array that includes the new Invoice entry
			var sampleInvoiceEntries = [sampleInvoiceEntry];

			// Set GET response
			$httpBackend.expectGET('invoice-entries').respond(sampleInvoiceEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.invoiceEntries).toEqualData(sampleInvoiceEntries);
		}));

		it('$scope.findOne() should create an array with one Invoice entry object fetched from XHR using a invoiceEntryId URL parameter', inject(function(InvoiceEntries) {
			// Define a sample Invoice entry object
			var sampleInvoiceEntry = new InvoiceEntries({
				name: 'New Invoice entry'
			});

			// Set the URL parameter
			$stateParams.invoiceEntryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/invoice-entries\/([0-9a-fA-F]{24})$/).respond(sampleInvoiceEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.invoiceEntry).toEqualData(sampleInvoiceEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(InvoiceEntries) {
			// Create a sample Invoice entry object
			var sampleInvoiceEntryPostData = new InvoiceEntries({
				name: 'New Invoice entry'
			});

			// Create a sample Invoice entry response
			var sampleInvoiceEntryResponse = new InvoiceEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Invoice entry'
			});

			// Fixture mock form input values
			scope.name = 'New Invoice entry';

			// Set POST response
			$httpBackend.expectPOST('invoice-entries', sampleInvoiceEntryPostData).respond(sampleInvoiceEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Invoice entry was created
			expect($location.path()).toBe('/invoice-entries/' + sampleInvoiceEntryResponse._id);
		}));

		it('$scope.update() should update a valid Invoice entry', inject(function(InvoiceEntries) {
			// Define a sample Invoice entry put data
			var sampleInvoiceEntryPutData = new InvoiceEntries({
				_id: '525cf20451979dea2c000001',
				name: 'New Invoice entry'
			});

			// Mock Invoice entry in scope
			scope.invoiceEntry = sampleInvoiceEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/invoice-entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/invoice-entries/' + sampleInvoiceEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid invoiceEntryId and remove the Invoice entry from the scope', inject(function(InvoiceEntries) {
			// Create new Invoice entry object
			var sampleInvoiceEntry = new InvoiceEntries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Invoice entries array and include the Invoice entry
			scope.invoiceEntries = [sampleInvoiceEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/invoice-entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleInvoiceEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.invoiceEntries.length).toBe(0);
		}));
	});
}());