'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PaymentEntry = mongoose.model('PaymentEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, paymentEntry;

/**
 * Payment entry routes tests
 */
describe('Payment entry CRUD tests', function() {
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

		// Save a user to the test db and create new Payment entry
		user.save(function() {
			paymentEntry = {
				name: 'Payment entry Name'
			};

			done();
		});
	});

	it('should be able to save Payment entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Payment entry
				agent.post('/payment-entries')
					.send(paymentEntry)
					.expect(200)
					.end(function(paymentEntrySaveErr, paymentEntrySaveRes) {
						// Handle Payment entry save error
						if (paymentEntrySaveErr) done(paymentEntrySaveErr);

						// Get a list of Payment entries
						agent.get('/payment-entries')
							.end(function(paymentEntriesGetErr, paymentEntriesGetRes) {
								// Handle Payment entry save error
								if (paymentEntriesGetErr) done(paymentEntriesGetErr);

								// Get Payment entries list
								var paymentEntries = paymentEntriesGetRes.body;

								// Set assertions
								(paymentEntries[0].user._id).should.equal(userId);
								(paymentEntries[0].name).should.match('Payment entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Payment entry instance if not logged in', function(done) {
		agent.post('/payment-entries')
			.send(paymentEntry)
			.expect(401)
			.end(function(paymentEntrySaveErr, paymentEntrySaveRes) {
				// Call the assertion callback
				done(paymentEntrySaveErr);
			});
	});

	it('should not be able to save Payment entry instance if no name is provided', function(done) {
		// Invalidate name field
		paymentEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Payment entry
				agent.post('/payment-entries')
					.send(paymentEntry)
					.expect(400)
					.end(function(paymentEntrySaveErr, paymentEntrySaveRes) {
						// Set message assertion
						(paymentEntrySaveRes.body.message).should.match('Please fill Payment entry name');
						
						// Handle Payment entry save error
						done(paymentEntrySaveErr);
					});
			});
	});

	it('should be able to update Payment entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Payment entry
				agent.post('/payment-entries')
					.send(paymentEntry)
					.expect(200)
					.end(function(paymentEntrySaveErr, paymentEntrySaveRes) {
						// Handle Payment entry save error
						if (paymentEntrySaveErr) done(paymentEntrySaveErr);

						// Update Payment entry name
						paymentEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Payment entry
						agent.put('/payment-entries/' + paymentEntrySaveRes.body._id)
							.send(paymentEntry)
							.expect(200)
							.end(function(paymentEntryUpdateErr, paymentEntryUpdateRes) {
								// Handle Payment entry update error
								if (paymentEntryUpdateErr) done(paymentEntryUpdateErr);

								// Set assertions
								(paymentEntryUpdateRes.body._id).should.equal(paymentEntrySaveRes.body._id);
								(paymentEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Payment entries if not signed in', function(done) {
		// Create new Payment entry model instance
		var paymentEntryObj = new PaymentEntry(paymentEntry);

		// Save the Payment entry
		paymentEntryObj.save(function() {
			// Request Payment entries
			request(app).get('/payment-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Payment entry if not signed in', function(done) {
		// Create new Payment entry model instance
		var paymentEntryObj = new PaymentEntry(paymentEntry);

		// Save the Payment entry
		paymentEntryObj.save(function() {
			request(app).get('/payment-entries/' + paymentEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', paymentEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Payment entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Payment entry
				agent.post('/payment-entries')
					.send(paymentEntry)
					.expect(200)
					.end(function(paymentEntrySaveErr, paymentEntrySaveRes) {
						// Handle Payment entry save error
						if (paymentEntrySaveErr) done(paymentEntrySaveErr);

						// Delete existing Payment entry
						agent.delete('/payment-entries/' + paymentEntrySaveRes.body._id)
							.send(paymentEntry)
							.expect(200)
							.end(function(paymentEntryDeleteErr, paymentEntryDeleteRes) {
								// Handle Payment entry error error
								if (paymentEntryDeleteErr) done(paymentEntryDeleteErr);

								// Set assertions
								(paymentEntryDeleteRes.body._id).should.equal(paymentEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Payment entry instance if not signed in', function(done) {
		// Set Payment entry user 
		paymentEntry.user = user;

		// Create new Payment entry model instance
		var paymentEntryObj = new PaymentEntry(paymentEntry);

		// Save the Payment entry
		paymentEntryObj.save(function() {
			// Try deleting Payment entry
			request(app).delete('/payment-entries/' + paymentEntryObj._id)
			.expect(401)
			.end(function(paymentEntryDeleteErr, paymentEntryDeleteRes) {
				// Set message assertion
				(paymentEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Payment entry error error
				done(paymentEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		PaymentEntry.remove().exec();
		done();
	});
});