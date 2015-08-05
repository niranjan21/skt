'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ProductionRemarksEntry = mongoose.model('ProductionRemarksEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, productionRemarksEntry;

/**
 * Production remarks entry routes tests
 */
describe('Production remarks entry CRUD tests', function() {
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

		// Save a user to the test db and create new Production remarks entry
		user.save(function() {
			productionRemarksEntry = {
				name: 'Production remarks entry Name'
			};

			done();
		});
	});

	it('should be able to save Production remarks entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production remarks entry
				agent.post('/production-remarks-entries')
					.send(productionRemarksEntry)
					.expect(200)
					.end(function(productionRemarksEntrySaveErr, productionRemarksEntrySaveRes) {
						// Handle Production remarks entry save error
						if (productionRemarksEntrySaveErr) done(productionRemarksEntrySaveErr);

						// Get a list of Production remarks entries
						agent.get('/production-remarks-entries')
							.end(function(productionRemarksEntriesGetErr, productionRemarksEntriesGetRes) {
								// Handle Production remarks entry save error
								if (productionRemarksEntriesGetErr) done(productionRemarksEntriesGetErr);

								// Get Production remarks entries list
								var productionRemarksEntries = productionRemarksEntriesGetRes.body;

								// Set assertions
								(productionRemarksEntries[0].user._id).should.equal(userId);
								(productionRemarksEntries[0].name).should.match('Production remarks entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Production remarks entry instance if not logged in', function(done) {
		agent.post('/production-remarks-entries')
			.send(productionRemarksEntry)
			.expect(401)
			.end(function(productionRemarksEntrySaveErr, productionRemarksEntrySaveRes) {
				// Call the assertion callback
				done(productionRemarksEntrySaveErr);
			});
	});

	it('should not be able to save Production remarks entry instance if no name is provided', function(done) {
		// Invalidate name field
		productionRemarksEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production remarks entry
				agent.post('/production-remarks-entries')
					.send(productionRemarksEntry)
					.expect(400)
					.end(function(productionRemarksEntrySaveErr, productionRemarksEntrySaveRes) {
						// Set message assertion
						(productionRemarksEntrySaveRes.body.message).should.match('Please fill Production remarks entry name');
						
						// Handle Production remarks entry save error
						done(productionRemarksEntrySaveErr);
					});
			});
	});

	it('should be able to update Production remarks entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production remarks entry
				agent.post('/production-remarks-entries')
					.send(productionRemarksEntry)
					.expect(200)
					.end(function(productionRemarksEntrySaveErr, productionRemarksEntrySaveRes) {
						// Handle Production remarks entry save error
						if (productionRemarksEntrySaveErr) done(productionRemarksEntrySaveErr);

						// Update Production remarks entry name
						productionRemarksEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Production remarks entry
						agent.put('/production-remarks-entries/' + productionRemarksEntrySaveRes.body._id)
							.send(productionRemarksEntry)
							.expect(200)
							.end(function(productionRemarksEntryUpdateErr, productionRemarksEntryUpdateRes) {
								// Handle Production remarks entry update error
								if (productionRemarksEntryUpdateErr) done(productionRemarksEntryUpdateErr);

								// Set assertions
								(productionRemarksEntryUpdateRes.body._id).should.equal(productionRemarksEntrySaveRes.body._id);
								(productionRemarksEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Production remarks entries if not signed in', function(done) {
		// Create new Production remarks entry model instance
		var productionRemarksEntryObj = new ProductionRemarksEntry(productionRemarksEntry);

		// Save the Production remarks entry
		productionRemarksEntryObj.save(function() {
			// Request Production remarks entries
			request(app).get('/production-remarks-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Production remarks entry if not signed in', function(done) {
		// Create new Production remarks entry model instance
		var productionRemarksEntryObj = new ProductionRemarksEntry(productionRemarksEntry);

		// Save the Production remarks entry
		productionRemarksEntryObj.save(function() {
			request(app).get('/production-remarks-entries/' + productionRemarksEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', productionRemarksEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Production remarks entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production remarks entry
				agent.post('/production-remarks-entries')
					.send(productionRemarksEntry)
					.expect(200)
					.end(function(productionRemarksEntrySaveErr, productionRemarksEntrySaveRes) {
						// Handle Production remarks entry save error
						if (productionRemarksEntrySaveErr) done(productionRemarksEntrySaveErr);

						// Delete existing Production remarks entry
						agent.delete('/production-remarks-entries/' + productionRemarksEntrySaveRes.body._id)
							.send(productionRemarksEntry)
							.expect(200)
							.end(function(productionRemarksEntryDeleteErr, productionRemarksEntryDeleteRes) {
								// Handle Production remarks entry error error
								if (productionRemarksEntryDeleteErr) done(productionRemarksEntryDeleteErr);

								// Set assertions
								(productionRemarksEntryDeleteRes.body._id).should.equal(productionRemarksEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Production remarks entry instance if not signed in', function(done) {
		// Set Production remarks entry user 
		productionRemarksEntry.user = user;

		// Create new Production remarks entry model instance
		var productionRemarksEntryObj = new ProductionRemarksEntry(productionRemarksEntry);

		// Save the Production remarks entry
		productionRemarksEntryObj.save(function() {
			// Try deleting Production remarks entry
			request(app).delete('/production-remarks-entries/' + productionRemarksEntryObj._id)
			.expect(401)
			.end(function(productionRemarksEntryDeleteErr, productionRemarksEntryDeleteRes) {
				// Set message assertion
				(productionRemarksEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Production remarks entry error error
				done(productionRemarksEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ProductionRemarksEntry.remove().exec();
		done();
	});
});