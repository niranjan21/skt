'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	YarnReturnEntry = mongoose.model('YarnReturnEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, yarnReturnEntry;

/**
 * Yarn return entry routes tests
 */
describe('Yarn return entry CRUD tests', function() {
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

		// Save a user to the test db and create new Yarn return entry
		user.save(function() {
			yarnReturnEntry = {
				name: 'Yarn return entry Name'
			};

			done();
		});
	});

	it('should be able to save Yarn return entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn return entry
				agent.post('/yarn-return-entries')
					.send(yarnReturnEntry)
					.expect(200)
					.end(function(yarnReturnEntrySaveErr, yarnReturnEntrySaveRes) {
						// Handle Yarn return entry save error
						if (yarnReturnEntrySaveErr) done(yarnReturnEntrySaveErr);

						// Get a list of Yarn return entries
						agent.get('/yarn-return-entries')
							.end(function(yarnReturnEntriesGetErr, yarnReturnEntriesGetRes) {
								// Handle Yarn return entry save error
								if (yarnReturnEntriesGetErr) done(yarnReturnEntriesGetErr);

								// Get Yarn return entries list
								var yarnReturnEntries = yarnReturnEntriesGetRes.body;

								// Set assertions
								(yarnReturnEntries[0].user._id).should.equal(userId);
								(yarnReturnEntries[0].name).should.match('Yarn return entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Yarn return entry instance if not logged in', function(done) {
		agent.post('/yarn-return-entries')
			.send(yarnReturnEntry)
			.expect(401)
			.end(function(yarnReturnEntrySaveErr, yarnReturnEntrySaveRes) {
				// Call the assertion callback
				done(yarnReturnEntrySaveErr);
			});
	});

	it('should not be able to save Yarn return entry instance if no name is provided', function(done) {
		// Invalidate name field
		yarnReturnEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn return entry
				agent.post('/yarn-return-entries')
					.send(yarnReturnEntry)
					.expect(400)
					.end(function(yarnReturnEntrySaveErr, yarnReturnEntrySaveRes) {
						// Set message assertion
						(yarnReturnEntrySaveRes.body.message).should.match('Please fill Yarn return entry name');
						
						// Handle Yarn return entry save error
						done(yarnReturnEntrySaveErr);
					});
			});
	});

	it('should be able to update Yarn return entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn return entry
				agent.post('/yarn-return-entries')
					.send(yarnReturnEntry)
					.expect(200)
					.end(function(yarnReturnEntrySaveErr, yarnReturnEntrySaveRes) {
						// Handle Yarn return entry save error
						if (yarnReturnEntrySaveErr) done(yarnReturnEntrySaveErr);

						// Update Yarn return entry name
						yarnReturnEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Yarn return entry
						agent.put('/yarn-return-entries/' + yarnReturnEntrySaveRes.body._id)
							.send(yarnReturnEntry)
							.expect(200)
							.end(function(yarnReturnEntryUpdateErr, yarnReturnEntryUpdateRes) {
								// Handle Yarn return entry update error
								if (yarnReturnEntryUpdateErr) done(yarnReturnEntryUpdateErr);

								// Set assertions
								(yarnReturnEntryUpdateRes.body._id).should.equal(yarnReturnEntrySaveRes.body._id);
								(yarnReturnEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Yarn return entries if not signed in', function(done) {
		// Create new Yarn return entry model instance
		var yarnReturnEntryObj = new YarnReturnEntry(yarnReturnEntry);

		// Save the Yarn return entry
		yarnReturnEntryObj.save(function() {
			// Request Yarn return entries
			request(app).get('/yarn-return-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Yarn return entry if not signed in', function(done) {
		// Create new Yarn return entry model instance
		var yarnReturnEntryObj = new YarnReturnEntry(yarnReturnEntry);

		// Save the Yarn return entry
		yarnReturnEntryObj.save(function() {
			request(app).get('/yarn-return-entries/' + yarnReturnEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', yarnReturnEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Yarn return entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn return entry
				agent.post('/yarn-return-entries')
					.send(yarnReturnEntry)
					.expect(200)
					.end(function(yarnReturnEntrySaveErr, yarnReturnEntrySaveRes) {
						// Handle Yarn return entry save error
						if (yarnReturnEntrySaveErr) done(yarnReturnEntrySaveErr);

						// Delete existing Yarn return entry
						agent.delete('/yarn-return-entries/' + yarnReturnEntrySaveRes.body._id)
							.send(yarnReturnEntry)
							.expect(200)
							.end(function(yarnReturnEntryDeleteErr, yarnReturnEntryDeleteRes) {
								// Handle Yarn return entry error error
								if (yarnReturnEntryDeleteErr) done(yarnReturnEntryDeleteErr);

								// Set assertions
								(yarnReturnEntryDeleteRes.body._id).should.equal(yarnReturnEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Yarn return entry instance if not signed in', function(done) {
		// Set Yarn return entry user 
		yarnReturnEntry.user = user;

		// Create new Yarn return entry model instance
		var yarnReturnEntryObj = new YarnReturnEntry(yarnReturnEntry);

		// Save the Yarn return entry
		yarnReturnEntryObj.save(function() {
			// Try deleting Yarn return entry
			request(app).delete('/yarn-return-entries/' + yarnReturnEntryObj._id)
			.expect(401)
			.end(function(yarnReturnEntryDeleteErr, yarnReturnEntryDeleteRes) {
				// Set message assertion
				(yarnReturnEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Yarn return entry error error
				done(yarnReturnEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		YarnReturnEntry.remove().exec();
		done();
	});
});