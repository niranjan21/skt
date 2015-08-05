'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	RollQualityControlEntry = mongoose.model('RollQualityControlEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, rollQualityControlEntry;

/**
 * Roll quality control entry routes tests
 */
describe('Roll quality control entry CRUD tests', function() {
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

		// Save a user to the test db and create new Roll quality control entry
		user.save(function() {
			rollQualityControlEntry = {
				name: 'Roll quality control entry Name'
			};

			done();
		});
	});

	it('should be able to save Roll quality control entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Roll quality control entry
				agent.post('/roll-quality-control-entries')
					.send(rollQualityControlEntry)
					.expect(200)
					.end(function(rollQualityControlEntrySaveErr, rollQualityControlEntrySaveRes) {
						// Handle Roll quality control entry save error
						if (rollQualityControlEntrySaveErr) done(rollQualityControlEntrySaveErr);

						// Get a list of Roll quality control entries
						agent.get('/roll-quality-control-entries')
							.end(function(rollQualityControlEntriesGetErr, rollQualityControlEntriesGetRes) {
								// Handle Roll quality control entry save error
								if (rollQualityControlEntriesGetErr) done(rollQualityControlEntriesGetErr);

								// Get Roll quality control entries list
								var rollQualityControlEntries = rollQualityControlEntriesGetRes.body;

								// Set assertions
								(rollQualityControlEntries[0].user._id).should.equal(userId);
								(rollQualityControlEntries[0].name).should.match('Roll quality control entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Roll quality control entry instance if not logged in', function(done) {
		agent.post('/roll-quality-control-entries')
			.send(rollQualityControlEntry)
			.expect(401)
			.end(function(rollQualityControlEntrySaveErr, rollQualityControlEntrySaveRes) {
				// Call the assertion callback
				done(rollQualityControlEntrySaveErr);
			});
	});

	it('should not be able to save Roll quality control entry instance if no name is provided', function(done) {
		// Invalidate name field
		rollQualityControlEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Roll quality control entry
				agent.post('/roll-quality-control-entries')
					.send(rollQualityControlEntry)
					.expect(400)
					.end(function(rollQualityControlEntrySaveErr, rollQualityControlEntrySaveRes) {
						// Set message assertion
						(rollQualityControlEntrySaveRes.body.message).should.match('Please fill Roll quality control entry name');
						
						// Handle Roll quality control entry save error
						done(rollQualityControlEntrySaveErr);
					});
			});
	});

	it('should be able to update Roll quality control entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Roll quality control entry
				agent.post('/roll-quality-control-entries')
					.send(rollQualityControlEntry)
					.expect(200)
					.end(function(rollQualityControlEntrySaveErr, rollQualityControlEntrySaveRes) {
						// Handle Roll quality control entry save error
						if (rollQualityControlEntrySaveErr) done(rollQualityControlEntrySaveErr);

						// Update Roll quality control entry name
						rollQualityControlEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Roll quality control entry
						agent.put('/roll-quality-control-entries/' + rollQualityControlEntrySaveRes.body._id)
							.send(rollQualityControlEntry)
							.expect(200)
							.end(function(rollQualityControlEntryUpdateErr, rollQualityControlEntryUpdateRes) {
								// Handle Roll quality control entry update error
								if (rollQualityControlEntryUpdateErr) done(rollQualityControlEntryUpdateErr);

								// Set assertions
								(rollQualityControlEntryUpdateRes.body._id).should.equal(rollQualityControlEntrySaveRes.body._id);
								(rollQualityControlEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Roll quality control entries if not signed in', function(done) {
		// Create new Roll quality control entry model instance
		var rollQualityControlEntryObj = new RollQualityControlEntry(rollQualityControlEntry);

		// Save the Roll quality control entry
		rollQualityControlEntryObj.save(function() {
			// Request Roll quality control entries
			request(app).get('/roll-quality-control-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Roll quality control entry if not signed in', function(done) {
		// Create new Roll quality control entry model instance
		var rollQualityControlEntryObj = new RollQualityControlEntry(rollQualityControlEntry);

		// Save the Roll quality control entry
		rollQualityControlEntryObj.save(function() {
			request(app).get('/roll-quality-control-entries/' + rollQualityControlEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', rollQualityControlEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Roll quality control entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Roll quality control entry
				agent.post('/roll-quality-control-entries')
					.send(rollQualityControlEntry)
					.expect(200)
					.end(function(rollQualityControlEntrySaveErr, rollQualityControlEntrySaveRes) {
						// Handle Roll quality control entry save error
						if (rollQualityControlEntrySaveErr) done(rollQualityControlEntrySaveErr);

						// Delete existing Roll quality control entry
						agent.delete('/roll-quality-control-entries/' + rollQualityControlEntrySaveRes.body._id)
							.send(rollQualityControlEntry)
							.expect(200)
							.end(function(rollQualityControlEntryDeleteErr, rollQualityControlEntryDeleteRes) {
								// Handle Roll quality control entry error error
								if (rollQualityControlEntryDeleteErr) done(rollQualityControlEntryDeleteErr);

								// Set assertions
								(rollQualityControlEntryDeleteRes.body._id).should.equal(rollQualityControlEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Roll quality control entry instance if not signed in', function(done) {
		// Set Roll quality control entry user 
		rollQualityControlEntry.user = user;

		// Create new Roll quality control entry model instance
		var rollQualityControlEntryObj = new RollQualityControlEntry(rollQualityControlEntry);

		// Save the Roll quality control entry
		rollQualityControlEntryObj.save(function() {
			// Try deleting Roll quality control entry
			request(app).delete('/roll-quality-control-entries/' + rollQualityControlEntryObj._id)
			.expect(401)
			.end(function(rollQualityControlEntryDeleteErr, rollQualityControlEntryDeleteRes) {
				// Set message assertion
				(rollQualityControlEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Roll quality control entry error error
				done(rollQualityControlEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		RollQualityControlEntry.remove().exec();
		done();
	});
});