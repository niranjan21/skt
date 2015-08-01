'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricReturnEntry = mongoose.model('FabricReturnEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fabricReturnEntry;

/**
 * Fabric return entry routes tests
 */
describe('Fabric return entry CRUD tests', function() {
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

		// Save a user to the test db and create new Fabric return entry
		user.save(function() {
			fabricReturnEntry = {
				name: 'Fabric return entry Name'
			};

			done();
		});
	});

	it('should be able to save Fabric return entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric return entry
				agent.post('/fabric-return-entries')
					.send(fabricReturnEntry)
					.expect(200)
					.end(function(fabricReturnEntrySaveErr, fabricReturnEntrySaveRes) {
						// Handle Fabric return entry save error
						if (fabricReturnEntrySaveErr) done(fabricReturnEntrySaveErr);

						// Get a list of Fabric return entries
						agent.get('/fabric-return-entries')
							.end(function(fabricReturnEntriesGetErr, fabricReturnEntriesGetRes) {
								// Handle Fabric return entry save error
								if (fabricReturnEntriesGetErr) done(fabricReturnEntriesGetErr);

								// Get Fabric return entries list
								var fabricReturnEntries = fabricReturnEntriesGetRes.body;

								// Set assertions
								(fabricReturnEntries[0].user._id).should.equal(userId);
								(fabricReturnEntries[0].name).should.match('Fabric return entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fabric return entry instance if not logged in', function(done) {
		agent.post('/fabric-return-entries')
			.send(fabricReturnEntry)
			.expect(401)
			.end(function(fabricReturnEntrySaveErr, fabricReturnEntrySaveRes) {
				// Call the assertion callback
				done(fabricReturnEntrySaveErr);
			});
	});

	it('should not be able to save Fabric return entry instance if no name is provided', function(done) {
		// Invalidate name field
		fabricReturnEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric return entry
				agent.post('/fabric-return-entries')
					.send(fabricReturnEntry)
					.expect(400)
					.end(function(fabricReturnEntrySaveErr, fabricReturnEntrySaveRes) {
						// Set message assertion
						(fabricReturnEntrySaveRes.body.message).should.match('Please fill Fabric return entry name');
						
						// Handle Fabric return entry save error
						done(fabricReturnEntrySaveErr);
					});
			});
	});

	it('should be able to update Fabric return entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric return entry
				agent.post('/fabric-return-entries')
					.send(fabricReturnEntry)
					.expect(200)
					.end(function(fabricReturnEntrySaveErr, fabricReturnEntrySaveRes) {
						// Handle Fabric return entry save error
						if (fabricReturnEntrySaveErr) done(fabricReturnEntrySaveErr);

						// Update Fabric return entry name
						fabricReturnEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fabric return entry
						agent.put('/fabric-return-entries/' + fabricReturnEntrySaveRes.body._id)
							.send(fabricReturnEntry)
							.expect(200)
							.end(function(fabricReturnEntryUpdateErr, fabricReturnEntryUpdateRes) {
								// Handle Fabric return entry update error
								if (fabricReturnEntryUpdateErr) done(fabricReturnEntryUpdateErr);

								// Set assertions
								(fabricReturnEntryUpdateRes.body._id).should.equal(fabricReturnEntrySaveRes.body._id);
								(fabricReturnEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fabric return entries if not signed in', function(done) {
		// Create new Fabric return entry model instance
		var fabricReturnEntryObj = new FabricReturnEntry(fabricReturnEntry);

		// Save the Fabric return entry
		fabricReturnEntryObj.save(function() {
			// Request Fabric return entries
			request(app).get('/fabric-return-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fabric return entry if not signed in', function(done) {
		// Create new Fabric return entry model instance
		var fabricReturnEntryObj = new FabricReturnEntry(fabricReturnEntry);

		// Save the Fabric return entry
		fabricReturnEntryObj.save(function() {
			request(app).get('/fabric-return-entries/' + fabricReturnEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fabricReturnEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fabric return entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric return entry
				agent.post('/fabric-return-entries')
					.send(fabricReturnEntry)
					.expect(200)
					.end(function(fabricReturnEntrySaveErr, fabricReturnEntrySaveRes) {
						// Handle Fabric return entry save error
						if (fabricReturnEntrySaveErr) done(fabricReturnEntrySaveErr);

						// Delete existing Fabric return entry
						agent.delete('/fabric-return-entries/' + fabricReturnEntrySaveRes.body._id)
							.send(fabricReturnEntry)
							.expect(200)
							.end(function(fabricReturnEntryDeleteErr, fabricReturnEntryDeleteRes) {
								// Handle Fabric return entry error error
								if (fabricReturnEntryDeleteErr) done(fabricReturnEntryDeleteErr);

								// Set assertions
								(fabricReturnEntryDeleteRes.body._id).should.equal(fabricReturnEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fabric return entry instance if not signed in', function(done) {
		// Set Fabric return entry user 
		fabricReturnEntry.user = user;

		// Create new Fabric return entry model instance
		var fabricReturnEntryObj = new FabricReturnEntry(fabricReturnEntry);

		// Save the Fabric return entry
		fabricReturnEntryObj.save(function() {
			// Try deleting Fabric return entry
			request(app).delete('/fabric-return-entries/' + fabricReturnEntryObj._id)
			.expect(401)
			.end(function(fabricReturnEntryDeleteErr, fabricReturnEntryDeleteRes) {
				// Set message assertion
				(fabricReturnEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fabric return entry error error
				done(fabricReturnEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FabricReturnEntry.remove().exec();
		done();
	});
});