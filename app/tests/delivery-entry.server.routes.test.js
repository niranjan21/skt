'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	DeliveryEntry = mongoose.model('DeliveryEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, deliveryEntry;

/**
 * Delivery entry routes tests
 */
describe('Delivery entry CRUD tests', function() {
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

		// Save a user to the test db and create new Delivery entry
		user.save(function() {
			deliveryEntry = {
				name: 'Delivery entry Name'
			};

			done();
		});
	});

	it('should be able to save Delivery entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Delivery entry
				agent.post('/delivery-entries')
					.send(deliveryEntry)
					.expect(200)
					.end(function(deliveryEntrySaveErr, deliveryEntrySaveRes) {
						// Handle Delivery entry save error
						if (deliveryEntrySaveErr) done(deliveryEntrySaveErr);

						// Get a list of Delivery entries
						agent.get('/delivery-entries')
							.end(function(deliveryEntriesGetErr, deliveryEntriesGetRes) {
								// Handle Delivery entry save error
								if (deliveryEntriesGetErr) done(deliveryEntriesGetErr);

								// Get Delivery entries list
								var deliveryEntries = deliveryEntriesGetRes.body;

								// Set assertions
								(deliveryEntries[0].user._id).should.equal(userId);
								(deliveryEntries[0].name).should.match('Delivery entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Delivery entry instance if not logged in', function(done) {
		agent.post('/delivery-entries')
			.send(deliveryEntry)
			.expect(401)
			.end(function(deliveryEntrySaveErr, deliveryEntrySaveRes) {
				// Call the assertion callback
				done(deliveryEntrySaveErr);
			});
	});

	it('should not be able to save Delivery entry instance if no name is provided', function(done) {
		// Invalidate name field
		deliveryEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Delivery entry
				agent.post('/delivery-entries')
					.send(deliveryEntry)
					.expect(400)
					.end(function(deliveryEntrySaveErr, deliveryEntrySaveRes) {
						// Set message assertion
						(deliveryEntrySaveRes.body.message).should.match('Please fill Delivery entry name');
						
						// Handle Delivery entry save error
						done(deliveryEntrySaveErr);
					});
			});
	});

	it('should be able to update Delivery entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Delivery entry
				agent.post('/delivery-entries')
					.send(deliveryEntry)
					.expect(200)
					.end(function(deliveryEntrySaveErr, deliveryEntrySaveRes) {
						// Handle Delivery entry save error
						if (deliveryEntrySaveErr) done(deliveryEntrySaveErr);

						// Update Delivery entry name
						deliveryEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Delivery entry
						agent.put('/delivery-entries/' + deliveryEntrySaveRes.body._id)
							.send(deliveryEntry)
							.expect(200)
							.end(function(deliveryEntryUpdateErr, deliveryEntryUpdateRes) {
								// Handle Delivery entry update error
								if (deliveryEntryUpdateErr) done(deliveryEntryUpdateErr);

								// Set assertions
								(deliveryEntryUpdateRes.body._id).should.equal(deliveryEntrySaveRes.body._id);
								(deliveryEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Delivery entries if not signed in', function(done) {
		// Create new Delivery entry model instance
		var deliveryEntryObj = new DeliveryEntry(deliveryEntry);

		// Save the Delivery entry
		deliveryEntryObj.save(function() {
			// Request Delivery entries
			request(app).get('/delivery-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Delivery entry if not signed in', function(done) {
		// Create new Delivery entry model instance
		var deliveryEntryObj = new DeliveryEntry(deliveryEntry);

		// Save the Delivery entry
		deliveryEntryObj.save(function() {
			request(app).get('/delivery-entries/' + deliveryEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', deliveryEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Delivery entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Delivery entry
				agent.post('/delivery-entries')
					.send(deliveryEntry)
					.expect(200)
					.end(function(deliveryEntrySaveErr, deliveryEntrySaveRes) {
						// Handle Delivery entry save error
						if (deliveryEntrySaveErr) done(deliveryEntrySaveErr);

						// Delete existing Delivery entry
						agent.delete('/delivery-entries/' + deliveryEntrySaveRes.body._id)
							.send(deliveryEntry)
							.expect(200)
							.end(function(deliveryEntryDeleteErr, deliveryEntryDeleteRes) {
								// Handle Delivery entry error error
								if (deliveryEntryDeleteErr) done(deliveryEntryDeleteErr);

								// Set assertions
								(deliveryEntryDeleteRes.body._id).should.equal(deliveryEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Delivery entry instance if not signed in', function(done) {
		// Set Delivery entry user 
		deliveryEntry.user = user;

		// Create new Delivery entry model instance
		var deliveryEntryObj = new DeliveryEntry(deliveryEntry);

		// Save the Delivery entry
		deliveryEntryObj.save(function() {
			// Try deleting Delivery entry
			request(app).delete('/delivery-entries/' + deliveryEntryObj._id)
			.expect(401)
			.end(function(deliveryEntryDeleteErr, deliveryEntryDeleteRes) {
				// Set message assertion
				(deliveryEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Delivery entry error error
				done(deliveryEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		DeliveryEntry.remove().exec();
		done();
	});
});