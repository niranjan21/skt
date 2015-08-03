'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	InvoiceEntry = mongoose.model('InvoiceEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, invoiceEntry;

/**
 * Invoice entry routes tests
 */
describe('Invoice entry CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Invoice entry
		user.save(function() {
			invoiceEntry = {
				name: 'Invoice entry Name'
			};

			done();
		});
	});

	it('should be able to save Invoice entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoice entry
				agent.post('/invoice-entries')
					.send(invoiceEntry)
					.expect(200)
					.end(function(invoiceEntrySaveErr, invoiceEntrySaveRes) {
						// Handle Invoice entry save error
						if (invoiceEntrySaveErr) done(invoiceEntrySaveErr);

						// Get a list of Invoice entries
						agent.get('/invoice-entries')
							.end(function(invoiceEntriesGetErr, invoiceEntriesGetRes) {
								// Handle Invoice entry save error
								if (invoiceEntriesGetErr) done(invoiceEntriesGetErr);

								// Get Invoice entries list
								var invoiceEntries = invoiceEntriesGetRes.body;

								// Set assertions
								(invoiceEntries[0].user._id).should.equal(userId);
								(invoiceEntries[0].name).should.match('Invoice entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Invoice entry instance if not logged in', function(done) {
		agent.post('/invoice-entries')
			.send(invoiceEntry)
			.expect(401)
			.end(function(invoiceEntrySaveErr, invoiceEntrySaveRes) {
				// Call the assertion callback
				done(invoiceEntrySaveErr);
			});
	});

	it('should not be able to save Invoice entry instance if no name is provided', function(done) {
		// Invalidate name field
		invoiceEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoice entry
				agent.post('/invoice-entries')
					.send(invoiceEntry)
					.expect(400)
					.end(function(invoiceEntrySaveErr, invoiceEntrySaveRes) {
						// Set message assertion
						(invoiceEntrySaveRes.body.message).should.match('Please fill Invoice entry name');
						
						// Handle Invoice entry save error
						done(invoiceEntrySaveErr);
					});
			});
	});

	it('should be able to update Invoice entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoice entry
				agent.post('/invoice-entries')
					.send(invoiceEntry)
					.expect(200)
					.end(function(invoiceEntrySaveErr, invoiceEntrySaveRes) {
						// Handle Invoice entry save error
						if (invoiceEntrySaveErr) done(invoiceEntrySaveErr);

						// Update Invoice entry name
						invoiceEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Invoice entry
						agent.put('/invoice-entries/' + invoiceEntrySaveRes.body._id)
							.send(invoiceEntry)
							.expect(200)
							.end(function(invoiceEntryUpdateErr, invoiceEntryUpdateRes) {
								// Handle Invoice entry update error
								if (invoiceEntryUpdateErr) done(invoiceEntryUpdateErr);

								// Set assertions
								(invoiceEntryUpdateRes.body._id).should.equal(invoiceEntrySaveRes.body._id);
								(invoiceEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Invoice entries if not signed in', function(done) {
		// Create new Invoice entry model instance
		var invoiceEntryObj = new InvoiceEntry(invoiceEntry);

		// Save the Invoice entry
		invoiceEntryObj.save(function() {
			// Request Invoice entries
			request(app).get('/invoice-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Invoice entry if not signed in', function(done) {
		// Create new Invoice entry model instance
		var invoiceEntryObj = new InvoiceEntry(invoiceEntry);

		// Save the Invoice entry
		invoiceEntryObj.save(function() {
			request(app).get('/invoice-entries/' + invoiceEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', invoiceEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Invoice entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoice entry
				agent.post('/invoice-entries')
					.send(invoiceEntry)
					.expect(200)
					.end(function(invoiceEntrySaveErr, invoiceEntrySaveRes) {
						// Handle Invoice entry save error
						if (invoiceEntrySaveErr) done(invoiceEntrySaveErr);

						// Delete existing Invoice entry
						agent.delete('/invoice-entries/' + invoiceEntrySaveRes.body._id)
							.send(invoiceEntry)
							.expect(200)
							.end(function(invoiceEntryDeleteErr, invoiceEntryDeleteRes) {
								// Handle Invoice entry error error
								if (invoiceEntryDeleteErr) done(invoiceEntryDeleteErr);

								// Set assertions
								(invoiceEntryDeleteRes.body._id).should.equal(invoiceEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Invoice entry instance if not signed in', function(done) {
		// Set Invoice entry user 
		invoiceEntry.user = user;

		// Create new Invoice entry model instance
		var invoiceEntryObj = new InvoiceEntry(invoiceEntry);

		// Save the Invoice entry
		invoiceEntryObj.save(function() {
			// Try deleting Invoice entry
			request(app).delete('/invoice-entries/' + invoiceEntryObj._id)
			.expect(401)
			.end(function(invoiceEntryDeleteErr, invoiceEntryDeleteRes) {
				// Set message assertion
				(invoiceEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Invoice entry error error
				done(invoiceEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		InvoiceEntry.remove().exec();
		done();
	});
});