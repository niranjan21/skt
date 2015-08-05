'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	DeductionEntry = mongoose.model('DeductionEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, deductionEntry;

/**
 * Deduction entry routes tests
 */
describe('Deduction entry CRUD tests', function() {
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

		// Save a user to the test db and create new Deduction entry
		user.save(function() {
			deductionEntry = {
				name: 'Deduction entry Name'
			};

			done();
		});
	});

	it('should be able to save Deduction entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Deduction entry
				agent.post('/deduction-entries')
					.send(deductionEntry)
					.expect(200)
					.end(function(deductionEntrySaveErr, deductionEntrySaveRes) {
						// Handle Deduction entry save error
						if (deductionEntrySaveErr) done(deductionEntrySaveErr);

						// Get a list of Deduction entries
						agent.get('/deduction-entries')
							.end(function(deductionEntriesGetErr, deductionEntriesGetRes) {
								// Handle Deduction entry save error
								if (deductionEntriesGetErr) done(deductionEntriesGetErr);

								// Get Deduction entries list
								var deductionEntries = deductionEntriesGetRes.body;

								// Set assertions
								(deductionEntries[0].user._id).should.equal(userId);
								(deductionEntries[0].name).should.match('Deduction entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Deduction entry instance if not logged in', function(done) {
		agent.post('/deduction-entries')
			.send(deductionEntry)
			.expect(401)
			.end(function(deductionEntrySaveErr, deductionEntrySaveRes) {
				// Call the assertion callback
				done(deductionEntrySaveErr);
			});
	});

	it('should not be able to save Deduction entry instance if no name is provided', function(done) {
		// Invalidate name field
		deductionEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Deduction entry
				agent.post('/deduction-entries')
					.send(deductionEntry)
					.expect(400)
					.end(function(deductionEntrySaveErr, deductionEntrySaveRes) {
						// Set message assertion
						(deductionEntrySaveRes.body.message).should.match('Please fill Deduction entry name');
						
						// Handle Deduction entry save error
						done(deductionEntrySaveErr);
					});
			});
	});

	it('should be able to update Deduction entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Deduction entry
				agent.post('/deduction-entries')
					.send(deductionEntry)
					.expect(200)
					.end(function(deductionEntrySaveErr, deductionEntrySaveRes) {
						// Handle Deduction entry save error
						if (deductionEntrySaveErr) done(deductionEntrySaveErr);

						// Update Deduction entry name
						deductionEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Deduction entry
						agent.put('/deduction-entries/' + deductionEntrySaveRes.body._id)
							.send(deductionEntry)
							.expect(200)
							.end(function(deductionEntryUpdateErr, deductionEntryUpdateRes) {
								// Handle Deduction entry update error
								if (deductionEntryUpdateErr) done(deductionEntryUpdateErr);

								// Set assertions
								(deductionEntryUpdateRes.body._id).should.equal(deductionEntrySaveRes.body._id);
								(deductionEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Deduction entries if not signed in', function(done) {
		// Create new Deduction entry model instance
		var deductionEntryObj = new DeductionEntry(deductionEntry);

		// Save the Deduction entry
		deductionEntryObj.save(function() {
			// Request Deduction entries
			request(app).get('/deduction-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Deduction entry if not signed in', function(done) {
		// Create new Deduction entry model instance
		var deductionEntryObj = new DeductionEntry(deductionEntry);

		// Save the Deduction entry
		deductionEntryObj.save(function() {
			request(app).get('/deduction-entries/' + deductionEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', deductionEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Deduction entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Deduction entry
				agent.post('/deduction-entries')
					.send(deductionEntry)
					.expect(200)
					.end(function(deductionEntrySaveErr, deductionEntrySaveRes) {
						// Handle Deduction entry save error
						if (deductionEntrySaveErr) done(deductionEntrySaveErr);

						// Delete existing Deduction entry
						agent.delete('/deduction-entries/' + deductionEntrySaveRes.body._id)
							.send(deductionEntry)
							.expect(200)
							.end(function(deductionEntryDeleteErr, deductionEntryDeleteRes) {
								// Handle Deduction entry error error
								if (deductionEntryDeleteErr) done(deductionEntryDeleteErr);

								// Set assertions
								(deductionEntryDeleteRes.body._id).should.equal(deductionEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Deduction entry instance if not signed in', function(done) {
		// Set Deduction entry user 
		deductionEntry.user = user;

		// Create new Deduction entry model instance
		var deductionEntryObj = new DeductionEntry(deductionEntry);

		// Save the Deduction entry
		deductionEntryObj.save(function() {
			// Try deleting Deduction entry
			request(app).delete('/deduction-entries/' + deductionEntryObj._id)
			.expect(401)
			.end(function(deductionEntryDeleteErr, deductionEntryDeleteRes) {
				// Set message assertion
				(deductionEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Deduction entry error error
				done(deductionEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		DeductionEntry.remove().exec();
		done();
	});
});