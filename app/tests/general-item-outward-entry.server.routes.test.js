'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GeneralItemOutwardEntry = mongoose.model('GeneralItemOutwardEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, generalItemOutwardEntry;

/**
 * General item outward entry routes tests
 */
describe('General item outward entry CRUD tests', function() {
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

		// Save a user to the test db and create new General item outward entry
		user.save(function() {
			generalItemOutwardEntry = {
				name: 'General item outward entry Name'
			};

			done();
		});
	});

	it('should be able to save General item outward entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item outward entry
				agent.post('/general-item-outward-entries')
					.send(generalItemOutwardEntry)
					.expect(200)
					.end(function(generalItemOutwardEntrySaveErr, generalItemOutwardEntrySaveRes) {
						// Handle General item outward entry save error
						if (generalItemOutwardEntrySaveErr) done(generalItemOutwardEntrySaveErr);

						// Get a list of General item outward entries
						agent.get('/general-item-outward-entries')
							.end(function(generalItemOutwardEntriesGetErr, generalItemOutwardEntriesGetRes) {
								// Handle General item outward entry save error
								if (generalItemOutwardEntriesGetErr) done(generalItemOutwardEntriesGetErr);

								// Get General item outward entries list
								var generalItemOutwardEntries = generalItemOutwardEntriesGetRes.body;

								// Set assertions
								(generalItemOutwardEntries[0].user._id).should.equal(userId);
								(generalItemOutwardEntries[0].name).should.match('General item outward entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save General item outward entry instance if not logged in', function(done) {
		agent.post('/general-item-outward-entries')
			.send(generalItemOutwardEntry)
			.expect(401)
			.end(function(generalItemOutwardEntrySaveErr, generalItemOutwardEntrySaveRes) {
				// Call the assertion callback
				done(generalItemOutwardEntrySaveErr);
			});
	});

	it('should not be able to save General item outward entry instance if no name is provided', function(done) {
		// Invalidate name field
		generalItemOutwardEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item outward entry
				agent.post('/general-item-outward-entries')
					.send(generalItemOutwardEntry)
					.expect(400)
					.end(function(generalItemOutwardEntrySaveErr, generalItemOutwardEntrySaveRes) {
						// Set message assertion
						(generalItemOutwardEntrySaveRes.body.message).should.match('Please fill General item outward entry name');
						
						// Handle General item outward entry save error
						done(generalItemOutwardEntrySaveErr);
					});
			});
	});

	it('should be able to update General item outward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item outward entry
				agent.post('/general-item-outward-entries')
					.send(generalItemOutwardEntry)
					.expect(200)
					.end(function(generalItemOutwardEntrySaveErr, generalItemOutwardEntrySaveRes) {
						// Handle General item outward entry save error
						if (generalItemOutwardEntrySaveErr) done(generalItemOutwardEntrySaveErr);

						// Update General item outward entry name
						generalItemOutwardEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing General item outward entry
						agent.put('/general-item-outward-entries/' + generalItemOutwardEntrySaveRes.body._id)
							.send(generalItemOutwardEntry)
							.expect(200)
							.end(function(generalItemOutwardEntryUpdateErr, generalItemOutwardEntryUpdateRes) {
								// Handle General item outward entry update error
								if (generalItemOutwardEntryUpdateErr) done(generalItemOutwardEntryUpdateErr);

								// Set assertions
								(generalItemOutwardEntryUpdateRes.body._id).should.equal(generalItemOutwardEntrySaveRes.body._id);
								(generalItemOutwardEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of General item outward entries if not signed in', function(done) {
		// Create new General item outward entry model instance
		var generalItemOutwardEntryObj = new GeneralItemOutwardEntry(generalItemOutwardEntry);

		// Save the General item outward entry
		generalItemOutwardEntryObj.save(function() {
			// Request General item outward entries
			request(app).get('/general-item-outward-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single General item outward entry if not signed in', function(done) {
		// Create new General item outward entry model instance
		var generalItemOutwardEntryObj = new GeneralItemOutwardEntry(generalItemOutwardEntry);

		// Save the General item outward entry
		generalItemOutwardEntryObj.save(function() {
			request(app).get('/general-item-outward-entries/' + generalItemOutwardEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', generalItemOutwardEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete General item outward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item outward entry
				agent.post('/general-item-outward-entries')
					.send(generalItemOutwardEntry)
					.expect(200)
					.end(function(generalItemOutwardEntrySaveErr, generalItemOutwardEntrySaveRes) {
						// Handle General item outward entry save error
						if (generalItemOutwardEntrySaveErr) done(generalItemOutwardEntrySaveErr);

						// Delete existing General item outward entry
						agent.delete('/general-item-outward-entries/' + generalItemOutwardEntrySaveRes.body._id)
							.send(generalItemOutwardEntry)
							.expect(200)
							.end(function(generalItemOutwardEntryDeleteErr, generalItemOutwardEntryDeleteRes) {
								// Handle General item outward entry error error
								if (generalItemOutwardEntryDeleteErr) done(generalItemOutwardEntryDeleteErr);

								// Set assertions
								(generalItemOutwardEntryDeleteRes.body._id).should.equal(generalItemOutwardEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete General item outward entry instance if not signed in', function(done) {
		// Set General item outward entry user 
		generalItemOutwardEntry.user = user;

		// Create new General item outward entry model instance
		var generalItemOutwardEntryObj = new GeneralItemOutwardEntry(generalItemOutwardEntry);

		// Save the General item outward entry
		generalItemOutwardEntryObj.save(function() {
			// Try deleting General item outward entry
			request(app).delete('/general-item-outward-entries/' + generalItemOutwardEntryObj._id)
			.expect(401)
			.end(function(generalItemOutwardEntryDeleteErr, generalItemOutwardEntryDeleteRes) {
				// Set message assertion
				(generalItemOutwardEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle General item outward entry error error
				done(generalItemOutwardEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		GeneralItemOutwardEntry.remove().exec();
		done();
	});
});