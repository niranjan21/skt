'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	NeedlesInwardEntry = mongoose.model('NeedlesInwardEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, needlesInwardEntry;

/**
 * Needles inward entry routes tests
 */
describe('Needles inward entry CRUD tests', function() {
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

		// Save a user to the test db and create new Needles inward entry
		user.save(function() {
			needlesInwardEntry = {
				name: 'Needles inward entry Name'
			};

			done();
		});
	});

	it('should be able to save Needles inward entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needles inward entry
				agent.post('/needles-inward-entries')
					.send(needlesInwardEntry)
					.expect(200)
					.end(function(needlesInwardEntrySaveErr, needlesInwardEntrySaveRes) {
						// Handle Needles inward entry save error
						if (needlesInwardEntrySaveErr) done(needlesInwardEntrySaveErr);

						// Get a list of Needles inward entries
						agent.get('/needles-inward-entries')
							.end(function(needlesInwardEntriesGetErr, needlesInwardEntriesGetRes) {
								// Handle Needles inward entry save error
								if (needlesInwardEntriesGetErr) done(needlesInwardEntriesGetErr);

								// Get Needles inward entries list
								var needlesInwardEntries = needlesInwardEntriesGetRes.body;

								// Set assertions
								(needlesInwardEntries[0].user._id).should.equal(userId);
								(needlesInwardEntries[0].name).should.match('Needles inward entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Needles inward entry instance if not logged in', function(done) {
		agent.post('/needles-inward-entries')
			.send(needlesInwardEntry)
			.expect(401)
			.end(function(needlesInwardEntrySaveErr, needlesInwardEntrySaveRes) {
				// Call the assertion callback
				done(needlesInwardEntrySaveErr);
			});
	});

	it('should not be able to save Needles inward entry instance if no name is provided', function(done) {
		// Invalidate name field
		needlesInwardEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needles inward entry
				agent.post('/needles-inward-entries')
					.send(needlesInwardEntry)
					.expect(400)
					.end(function(needlesInwardEntrySaveErr, needlesInwardEntrySaveRes) {
						// Set message assertion
						(needlesInwardEntrySaveRes.body.message).should.match('Please fill Needles inward entry name');
						
						// Handle Needles inward entry save error
						done(needlesInwardEntrySaveErr);
					});
			});
	});

	it('should be able to update Needles inward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needles inward entry
				agent.post('/needles-inward-entries')
					.send(needlesInwardEntry)
					.expect(200)
					.end(function(needlesInwardEntrySaveErr, needlesInwardEntrySaveRes) {
						// Handle Needles inward entry save error
						if (needlesInwardEntrySaveErr) done(needlesInwardEntrySaveErr);

						// Update Needles inward entry name
						needlesInwardEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Needles inward entry
						agent.put('/needles-inward-entries/' + needlesInwardEntrySaveRes.body._id)
							.send(needlesInwardEntry)
							.expect(200)
							.end(function(needlesInwardEntryUpdateErr, needlesInwardEntryUpdateRes) {
								// Handle Needles inward entry update error
								if (needlesInwardEntryUpdateErr) done(needlesInwardEntryUpdateErr);

								// Set assertions
								(needlesInwardEntryUpdateRes.body._id).should.equal(needlesInwardEntrySaveRes.body._id);
								(needlesInwardEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Needles inward entries if not signed in', function(done) {
		// Create new Needles inward entry model instance
		var needlesInwardEntryObj = new NeedlesInwardEntry(needlesInwardEntry);

		// Save the Needles inward entry
		needlesInwardEntryObj.save(function() {
			// Request Needles inward entries
			request(app).get('/needles-inward-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Needles inward entry if not signed in', function(done) {
		// Create new Needles inward entry model instance
		var needlesInwardEntryObj = new NeedlesInwardEntry(needlesInwardEntry);

		// Save the Needles inward entry
		needlesInwardEntryObj.save(function() {
			request(app).get('/needles-inward-entries/' + needlesInwardEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', needlesInwardEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Needles inward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needles inward entry
				agent.post('/needles-inward-entries')
					.send(needlesInwardEntry)
					.expect(200)
					.end(function(needlesInwardEntrySaveErr, needlesInwardEntrySaveRes) {
						// Handle Needles inward entry save error
						if (needlesInwardEntrySaveErr) done(needlesInwardEntrySaveErr);

						// Delete existing Needles inward entry
						agent.delete('/needles-inward-entries/' + needlesInwardEntrySaveRes.body._id)
							.send(needlesInwardEntry)
							.expect(200)
							.end(function(needlesInwardEntryDeleteErr, needlesInwardEntryDeleteRes) {
								// Handle Needles inward entry error error
								if (needlesInwardEntryDeleteErr) done(needlesInwardEntryDeleteErr);

								// Set assertions
								(needlesInwardEntryDeleteRes.body._id).should.equal(needlesInwardEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Needles inward entry instance if not signed in', function(done) {
		// Set Needles inward entry user 
		needlesInwardEntry.user = user;

		// Create new Needles inward entry model instance
		var needlesInwardEntryObj = new NeedlesInwardEntry(needlesInwardEntry);

		// Save the Needles inward entry
		needlesInwardEntryObj.save(function() {
			// Try deleting Needles inward entry
			request(app).delete('/needles-inward-entries/' + needlesInwardEntryObj._id)
			.expect(401)
			.end(function(needlesInwardEntryDeleteErr, needlesInwardEntryDeleteRes) {
				// Set message assertion
				(needlesInwardEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Needles inward entry error error
				done(needlesInwardEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		NeedlesInwardEntry.remove().exec();
		done();
	});
});