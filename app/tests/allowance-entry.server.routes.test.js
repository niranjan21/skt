'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	AllowanceEntry = mongoose.model('AllowanceEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, allowanceEntry;

/**
 * Allowance entry routes tests
 */
describe('Allowance entry CRUD tests', function() {
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

		// Save a user to the test db and create new Allowance entry
		user.save(function() {
			allowanceEntry = {
				name: 'Allowance entry Name'
			};

			done();
		});
	});

	it('should be able to save Allowance entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Allowance entry
				agent.post('/allowance-entries')
					.send(allowanceEntry)
					.expect(200)
					.end(function(allowanceEntrySaveErr, allowanceEntrySaveRes) {
						// Handle Allowance entry save error
						if (allowanceEntrySaveErr) done(allowanceEntrySaveErr);

						// Get a list of Allowance entries
						agent.get('/allowance-entries')
							.end(function(allowanceEntriesGetErr, allowanceEntriesGetRes) {
								// Handle Allowance entry save error
								if (allowanceEntriesGetErr) done(allowanceEntriesGetErr);

								// Get Allowance entries list
								var allowanceEntries = allowanceEntriesGetRes.body;

								// Set assertions
								(allowanceEntries[0].user._id).should.equal(userId);
								(allowanceEntries[0].name).should.match('Allowance entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Allowance entry instance if not logged in', function(done) {
		agent.post('/allowance-entries')
			.send(allowanceEntry)
			.expect(401)
			.end(function(allowanceEntrySaveErr, allowanceEntrySaveRes) {
				// Call the assertion callback
				done(allowanceEntrySaveErr);
			});
	});

	it('should not be able to save Allowance entry instance if no name is provided', function(done) {
		// Invalidate name field
		allowanceEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Allowance entry
				agent.post('/allowance-entries')
					.send(allowanceEntry)
					.expect(400)
					.end(function(allowanceEntrySaveErr, allowanceEntrySaveRes) {
						// Set message assertion
						(allowanceEntrySaveRes.body.message).should.match('Please fill Allowance entry name');
						
						// Handle Allowance entry save error
						done(allowanceEntrySaveErr);
					});
			});
	});

	it('should be able to update Allowance entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Allowance entry
				agent.post('/allowance-entries')
					.send(allowanceEntry)
					.expect(200)
					.end(function(allowanceEntrySaveErr, allowanceEntrySaveRes) {
						// Handle Allowance entry save error
						if (allowanceEntrySaveErr) done(allowanceEntrySaveErr);

						// Update Allowance entry name
						allowanceEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Allowance entry
						agent.put('/allowance-entries/' + allowanceEntrySaveRes.body._id)
							.send(allowanceEntry)
							.expect(200)
							.end(function(allowanceEntryUpdateErr, allowanceEntryUpdateRes) {
								// Handle Allowance entry update error
								if (allowanceEntryUpdateErr) done(allowanceEntryUpdateErr);

								// Set assertions
								(allowanceEntryUpdateRes.body._id).should.equal(allowanceEntrySaveRes.body._id);
								(allowanceEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Allowance entries if not signed in', function(done) {
		// Create new Allowance entry model instance
		var allowanceEntryObj = new AllowanceEntry(allowanceEntry);

		// Save the Allowance entry
		allowanceEntryObj.save(function() {
			// Request Allowance entries
			request(app).get('/allowance-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Allowance entry if not signed in', function(done) {
		// Create new Allowance entry model instance
		var allowanceEntryObj = new AllowanceEntry(allowanceEntry);

		// Save the Allowance entry
		allowanceEntryObj.save(function() {
			request(app).get('/allowance-entries/' + allowanceEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', allowanceEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Allowance entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Allowance entry
				agent.post('/allowance-entries')
					.send(allowanceEntry)
					.expect(200)
					.end(function(allowanceEntrySaveErr, allowanceEntrySaveRes) {
						// Handle Allowance entry save error
						if (allowanceEntrySaveErr) done(allowanceEntrySaveErr);

						// Delete existing Allowance entry
						agent.delete('/allowance-entries/' + allowanceEntrySaveRes.body._id)
							.send(allowanceEntry)
							.expect(200)
							.end(function(allowanceEntryDeleteErr, allowanceEntryDeleteRes) {
								// Handle Allowance entry error error
								if (allowanceEntryDeleteErr) done(allowanceEntryDeleteErr);

								// Set assertions
								(allowanceEntryDeleteRes.body._id).should.equal(allowanceEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Allowance entry instance if not signed in', function(done) {
		// Set Allowance entry user 
		allowanceEntry.user = user;

		// Create new Allowance entry model instance
		var allowanceEntryObj = new AllowanceEntry(allowanceEntry);

		// Save the Allowance entry
		allowanceEntryObj.save(function() {
			// Try deleting Allowance entry
			request(app).delete('/allowance-entries/' + allowanceEntryObj._id)
			.expect(401)
			.end(function(allowanceEntryDeleteErr, allowanceEntryDeleteRes) {
				// Set message assertion
				(allowanceEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Allowance entry error error
				done(allowanceEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		AllowanceEntry.remove().exec();
		done();
	});
});