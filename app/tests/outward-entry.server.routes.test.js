'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OutwardEntry = mongoose.model('OutwardEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, outwardEntry;

/**
 * Outward entry routes tests
 */
describe('Outward entry CRUD tests', function() {
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

		// Save a user to the test db and create new Outward entry
		user.save(function() {
			outwardEntry = {
				name: 'Outward entry Name'
			};

			done();
		});
	});

	it('should be able to save Outward entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Outward entry
				agent.post('/outward-entries')
					.send(outwardEntry)
					.expect(200)
					.end(function(outwardEntrySaveErr, outwardEntrySaveRes) {
						// Handle Outward entry save error
						if (outwardEntrySaveErr) done(outwardEntrySaveErr);

						// Get a list of Outward entries
						agent.get('/outward-entries')
							.end(function(outwardEntriesGetErr, outwardEntriesGetRes) {
								// Handle Outward entry save error
								if (outwardEntriesGetErr) done(outwardEntriesGetErr);

								// Get Outward entries list
								var outwardEntries = outwardEntriesGetRes.body;

								// Set assertions
								(outwardEntries[0].user._id).should.equal(userId);
								(outwardEntries[0].name).should.match('Outward entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Outward entry instance if not logged in', function(done) {
		agent.post('/outward-entries')
			.send(outwardEntry)
			.expect(401)
			.end(function(outwardEntrySaveErr, outwardEntrySaveRes) {
				// Call the assertion callback
				done(outwardEntrySaveErr);
			});
	});

	it('should not be able to save Outward entry instance if no name is provided', function(done) {
		// Invalidate name field
		outwardEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Outward entry
				agent.post('/outward-entries')
					.send(outwardEntry)
					.expect(400)
					.end(function(outwardEntrySaveErr, outwardEntrySaveRes) {
						// Set message assertion
						(outwardEntrySaveRes.body.message).should.match('Please fill Outward entry name');
						
						// Handle Outward entry save error
						done(outwardEntrySaveErr);
					});
			});
	});

	it('should be able to update Outward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Outward entry
				agent.post('/outward-entries')
					.send(outwardEntry)
					.expect(200)
					.end(function(outwardEntrySaveErr, outwardEntrySaveRes) {
						// Handle Outward entry save error
						if (outwardEntrySaveErr) done(outwardEntrySaveErr);

						// Update Outward entry name
						outwardEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Outward entry
						agent.put('/outward-entries/' + outwardEntrySaveRes.body._id)
							.send(outwardEntry)
							.expect(200)
							.end(function(outwardEntryUpdateErr, outwardEntryUpdateRes) {
								// Handle Outward entry update error
								if (outwardEntryUpdateErr) done(outwardEntryUpdateErr);

								// Set assertions
								(outwardEntryUpdateRes.body._id).should.equal(outwardEntrySaveRes.body._id);
								(outwardEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Outward entries if not signed in', function(done) {
		// Create new Outward entry model instance
		var outwardEntryObj = new OutwardEntry(outwardEntry);

		// Save the Outward entry
		outwardEntryObj.save(function() {
			// Request Outward entries
			request(app).get('/outward-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Outward entry if not signed in', function(done) {
		// Create new Outward entry model instance
		var outwardEntryObj = new OutwardEntry(outwardEntry);

		// Save the Outward entry
		outwardEntryObj.save(function() {
			request(app).get('/outward-entries/' + outwardEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', outwardEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Outward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Outward entry
				agent.post('/outward-entries')
					.send(outwardEntry)
					.expect(200)
					.end(function(outwardEntrySaveErr, outwardEntrySaveRes) {
						// Handle Outward entry save error
						if (outwardEntrySaveErr) done(outwardEntrySaveErr);

						// Delete existing Outward entry
						agent.delete('/outward-entries/' + outwardEntrySaveRes.body._id)
							.send(outwardEntry)
							.expect(200)
							.end(function(outwardEntryDeleteErr, outwardEntryDeleteRes) {
								// Handle Outward entry error error
								if (outwardEntryDeleteErr) done(outwardEntryDeleteErr);

								// Set assertions
								(outwardEntryDeleteRes.body._id).should.equal(outwardEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Outward entry instance if not signed in', function(done) {
		// Set Outward entry user 
		outwardEntry.user = user;

		// Create new Outward entry model instance
		var outwardEntryObj = new OutwardEntry(outwardEntry);

		// Save the Outward entry
		outwardEntryObj.save(function() {
			// Try deleting Outward entry
			request(app).delete('/outward-entries/' + outwardEntryObj._id)
			.expect(401)
			.end(function(outwardEntryDeleteErr, outwardEntryDeleteRes) {
				// Set message assertion
				(outwardEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Outward entry error error
				done(outwardEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		OutwardEntry.remove().exec();
		done();
	});
});