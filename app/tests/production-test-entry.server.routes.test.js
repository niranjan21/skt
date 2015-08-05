'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ProductionTestEntry = mongoose.model('ProductionTestEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, productionTestEntry;

/**
 * Production test entry routes tests
 */
describe('Production test entry CRUD tests', function() {
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

		// Save a user to the test db and create new Production test entry
		user.save(function() {
			productionTestEntry = {
				name: 'Production test entry Name'
			};

			done();
		});
	});

	it('should be able to save Production test entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production test entry
				agent.post('/production-test-entries')
					.send(productionTestEntry)
					.expect(200)
					.end(function(productionTestEntrySaveErr, productionTestEntrySaveRes) {
						// Handle Production test entry save error
						if (productionTestEntrySaveErr) done(productionTestEntrySaveErr);

						// Get a list of Production test entries
						agent.get('/production-test-entries')
							.end(function(productionTestEntriesGetErr, productionTestEntriesGetRes) {
								// Handle Production test entry save error
								if (productionTestEntriesGetErr) done(productionTestEntriesGetErr);

								// Get Production test entries list
								var productionTestEntries = productionTestEntriesGetRes.body;

								// Set assertions
								(productionTestEntries[0].user._id).should.equal(userId);
								(productionTestEntries[0].name).should.match('Production test entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Production test entry instance if not logged in', function(done) {
		agent.post('/production-test-entries')
			.send(productionTestEntry)
			.expect(401)
			.end(function(productionTestEntrySaveErr, productionTestEntrySaveRes) {
				// Call the assertion callback
				done(productionTestEntrySaveErr);
			});
	});

	it('should not be able to save Production test entry instance if no name is provided', function(done) {
		// Invalidate name field
		productionTestEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production test entry
				agent.post('/production-test-entries')
					.send(productionTestEntry)
					.expect(400)
					.end(function(productionTestEntrySaveErr, productionTestEntrySaveRes) {
						// Set message assertion
						(productionTestEntrySaveRes.body.message).should.match('Please fill Production test entry name');
						
						// Handle Production test entry save error
						done(productionTestEntrySaveErr);
					});
			});
	});

	it('should be able to update Production test entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production test entry
				agent.post('/production-test-entries')
					.send(productionTestEntry)
					.expect(200)
					.end(function(productionTestEntrySaveErr, productionTestEntrySaveRes) {
						// Handle Production test entry save error
						if (productionTestEntrySaveErr) done(productionTestEntrySaveErr);

						// Update Production test entry name
						productionTestEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Production test entry
						agent.put('/production-test-entries/' + productionTestEntrySaveRes.body._id)
							.send(productionTestEntry)
							.expect(200)
							.end(function(productionTestEntryUpdateErr, productionTestEntryUpdateRes) {
								// Handle Production test entry update error
								if (productionTestEntryUpdateErr) done(productionTestEntryUpdateErr);

								// Set assertions
								(productionTestEntryUpdateRes.body._id).should.equal(productionTestEntrySaveRes.body._id);
								(productionTestEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Production test entries if not signed in', function(done) {
		// Create new Production test entry model instance
		var productionTestEntryObj = new ProductionTestEntry(productionTestEntry);

		// Save the Production test entry
		productionTestEntryObj.save(function() {
			// Request Production test entries
			request(app).get('/production-test-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Production test entry if not signed in', function(done) {
		// Create new Production test entry model instance
		var productionTestEntryObj = new ProductionTestEntry(productionTestEntry);

		// Save the Production test entry
		productionTestEntryObj.save(function() {
			request(app).get('/production-test-entries/' + productionTestEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', productionTestEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Production test entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production test entry
				agent.post('/production-test-entries')
					.send(productionTestEntry)
					.expect(200)
					.end(function(productionTestEntrySaveErr, productionTestEntrySaveRes) {
						// Handle Production test entry save error
						if (productionTestEntrySaveErr) done(productionTestEntrySaveErr);

						// Delete existing Production test entry
						agent.delete('/production-test-entries/' + productionTestEntrySaveRes.body._id)
							.send(productionTestEntry)
							.expect(200)
							.end(function(productionTestEntryDeleteErr, productionTestEntryDeleteRes) {
								// Handle Production test entry error error
								if (productionTestEntryDeleteErr) done(productionTestEntryDeleteErr);

								// Set assertions
								(productionTestEntryDeleteRes.body._id).should.equal(productionTestEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Production test entry instance if not signed in', function(done) {
		// Set Production test entry user 
		productionTestEntry.user = user;

		// Create new Production test entry model instance
		var productionTestEntryObj = new ProductionTestEntry(productionTestEntry);

		// Save the Production test entry
		productionTestEntryObj.save(function() {
			// Try deleting Production test entry
			request(app).delete('/production-test-entries/' + productionTestEntryObj._id)
			.expect(401)
			.end(function(productionTestEntryDeleteErr, productionTestEntryDeleteRes) {
				// Set message assertion
				(productionTestEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Production test entry error error
				done(productionTestEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ProductionTestEntry.remove().exec();
		done();
	});
});