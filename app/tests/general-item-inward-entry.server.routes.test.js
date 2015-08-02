'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GeneralItemInwardEntry = mongoose.model('GeneralItemInwardEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, generalItemInwardEntry;

/**
 * General item inward entry routes tests
 */
describe('General item inward entry CRUD tests', function() {
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

		// Save a user to the test db and create new General item inward entry
		user.save(function() {
			generalItemInwardEntry = {
				name: 'General item inward entry Name'
			};

			done();
		});
	});

	it('should be able to save General item inward entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item inward entry
				agent.post('/general-item-inward-entries')
					.send(generalItemInwardEntry)
					.expect(200)
					.end(function(generalItemInwardEntrySaveErr, generalItemInwardEntrySaveRes) {
						// Handle General item inward entry save error
						if (generalItemInwardEntrySaveErr) done(generalItemInwardEntrySaveErr);

						// Get a list of General item inward entries
						agent.get('/general-item-inward-entries')
							.end(function(generalItemInwardEntriesGetErr, generalItemInwardEntriesGetRes) {
								// Handle General item inward entry save error
								if (generalItemInwardEntriesGetErr) done(generalItemInwardEntriesGetErr);

								// Get General item inward entries list
								var generalItemInwardEntries = generalItemInwardEntriesGetRes.body;

								// Set assertions
								(generalItemInwardEntries[0].user._id).should.equal(userId);
								(generalItemInwardEntries[0].name).should.match('General item inward entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save General item inward entry instance if not logged in', function(done) {
		agent.post('/general-item-inward-entries')
			.send(generalItemInwardEntry)
			.expect(401)
			.end(function(generalItemInwardEntrySaveErr, generalItemInwardEntrySaveRes) {
				// Call the assertion callback
				done(generalItemInwardEntrySaveErr);
			});
	});

	it('should not be able to save General item inward entry instance if no name is provided', function(done) {
		// Invalidate name field
		generalItemInwardEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item inward entry
				agent.post('/general-item-inward-entries')
					.send(generalItemInwardEntry)
					.expect(400)
					.end(function(generalItemInwardEntrySaveErr, generalItemInwardEntrySaveRes) {
						// Set message assertion
						(generalItemInwardEntrySaveRes.body.message).should.match('Please fill General item inward entry name');
						
						// Handle General item inward entry save error
						done(generalItemInwardEntrySaveErr);
					});
			});
	});

	it('should be able to update General item inward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item inward entry
				agent.post('/general-item-inward-entries')
					.send(generalItemInwardEntry)
					.expect(200)
					.end(function(generalItemInwardEntrySaveErr, generalItemInwardEntrySaveRes) {
						// Handle General item inward entry save error
						if (generalItemInwardEntrySaveErr) done(generalItemInwardEntrySaveErr);

						// Update General item inward entry name
						generalItemInwardEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing General item inward entry
						agent.put('/general-item-inward-entries/' + generalItemInwardEntrySaveRes.body._id)
							.send(generalItemInwardEntry)
							.expect(200)
							.end(function(generalItemInwardEntryUpdateErr, generalItemInwardEntryUpdateRes) {
								// Handle General item inward entry update error
								if (generalItemInwardEntryUpdateErr) done(generalItemInwardEntryUpdateErr);

								// Set assertions
								(generalItemInwardEntryUpdateRes.body._id).should.equal(generalItemInwardEntrySaveRes.body._id);
								(generalItemInwardEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of General item inward entries if not signed in', function(done) {
		// Create new General item inward entry model instance
		var generalItemInwardEntryObj = new GeneralItemInwardEntry(generalItemInwardEntry);

		// Save the General item inward entry
		generalItemInwardEntryObj.save(function() {
			// Request General item inward entries
			request(app).get('/general-item-inward-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single General item inward entry if not signed in', function(done) {
		// Create new General item inward entry model instance
		var generalItemInwardEntryObj = new GeneralItemInwardEntry(generalItemInwardEntry);

		// Save the General item inward entry
		generalItemInwardEntryObj.save(function() {
			request(app).get('/general-item-inward-entries/' + generalItemInwardEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', generalItemInwardEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete General item inward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item inward entry
				agent.post('/general-item-inward-entries')
					.send(generalItemInwardEntry)
					.expect(200)
					.end(function(generalItemInwardEntrySaveErr, generalItemInwardEntrySaveRes) {
						// Handle General item inward entry save error
						if (generalItemInwardEntrySaveErr) done(generalItemInwardEntrySaveErr);

						// Delete existing General item inward entry
						agent.delete('/general-item-inward-entries/' + generalItemInwardEntrySaveRes.body._id)
							.send(generalItemInwardEntry)
							.expect(200)
							.end(function(generalItemInwardEntryDeleteErr, generalItemInwardEntryDeleteRes) {
								// Handle General item inward entry error error
								if (generalItemInwardEntryDeleteErr) done(generalItemInwardEntryDeleteErr);

								// Set assertions
								(generalItemInwardEntryDeleteRes.body._id).should.equal(generalItemInwardEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete General item inward entry instance if not signed in', function(done) {
		// Set General item inward entry user 
		generalItemInwardEntry.user = user;

		// Create new General item inward entry model instance
		var generalItemInwardEntryObj = new GeneralItemInwardEntry(generalItemInwardEntry);

		// Save the General item inward entry
		generalItemInwardEntryObj.save(function() {
			// Try deleting General item inward entry
			request(app).delete('/general-item-inward-entries/' + generalItemInwardEntryObj._id)
			.expect(401)
			.end(function(generalItemInwardEntryDeleteErr, generalItemInwardEntryDeleteRes) {
				// Set message assertion
				(generalItemInwardEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle General item inward entry error error
				done(generalItemInwardEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		GeneralItemInwardEntry.remove().exec();
		done();
	});
});