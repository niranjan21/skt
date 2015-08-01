'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricRequirementInwardEntry = mongoose.model('FabricRequirementInwardEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fabricRequirementInwardEntry;

/**
 * Fabric requirement inward entry routes tests
 */
describe('Fabric requirement inward entry CRUD tests', function() {
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

		// Save a user to the test db and create new Fabric requirement inward entry
		user.save(function() {
			fabricRequirementInwardEntry = {
				name: 'Fabric requirement inward entry Name'
			};

			done();
		});
	});

	it('should be able to save Fabric requirement inward entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric requirement inward entry
				agent.post('/fabric-requirement-inward-entries')
					.send(fabricRequirementInwardEntry)
					.expect(200)
					.end(function(fabricRequirementInwardEntrySaveErr, fabricRequirementInwardEntrySaveRes) {
						// Handle Fabric requirement inward entry save error
						if (fabricRequirementInwardEntrySaveErr) done(fabricRequirementInwardEntrySaveErr);

						// Get a list of Fabric requirement inward entries
						agent.get('/fabric-requirement-inward-entries')
							.end(function(fabricRequirementInwardEntriesGetErr, fabricRequirementInwardEntriesGetRes) {
								// Handle Fabric requirement inward entry save error
								if (fabricRequirementInwardEntriesGetErr) done(fabricRequirementInwardEntriesGetErr);

								// Get Fabric requirement inward entries list
								var fabricRequirementInwardEntries = fabricRequirementInwardEntriesGetRes.body;

								// Set assertions
								(fabricRequirementInwardEntries[0].user._id).should.equal(userId);
								(fabricRequirementInwardEntries[0].name).should.match('Fabric requirement inward entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fabric requirement inward entry instance if not logged in', function(done) {
		agent.post('/fabric-requirement-inward-entries')
			.send(fabricRequirementInwardEntry)
			.expect(401)
			.end(function(fabricRequirementInwardEntrySaveErr, fabricRequirementInwardEntrySaveRes) {
				// Call the assertion callback
				done(fabricRequirementInwardEntrySaveErr);
			});
	});

	it('should not be able to save Fabric requirement inward entry instance if no name is provided', function(done) {
		// Invalidate name field
		fabricRequirementInwardEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric requirement inward entry
				agent.post('/fabric-requirement-inward-entries')
					.send(fabricRequirementInwardEntry)
					.expect(400)
					.end(function(fabricRequirementInwardEntrySaveErr, fabricRequirementInwardEntrySaveRes) {
						// Set message assertion
						(fabricRequirementInwardEntrySaveRes.body.message).should.match('Please fill Fabric requirement inward entry name');
						
						// Handle Fabric requirement inward entry save error
						done(fabricRequirementInwardEntrySaveErr);
					});
			});
	});

	it('should be able to update Fabric requirement inward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric requirement inward entry
				agent.post('/fabric-requirement-inward-entries')
					.send(fabricRequirementInwardEntry)
					.expect(200)
					.end(function(fabricRequirementInwardEntrySaveErr, fabricRequirementInwardEntrySaveRes) {
						// Handle Fabric requirement inward entry save error
						if (fabricRequirementInwardEntrySaveErr) done(fabricRequirementInwardEntrySaveErr);

						// Update Fabric requirement inward entry name
						fabricRequirementInwardEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fabric requirement inward entry
						agent.put('/fabric-requirement-inward-entries/' + fabricRequirementInwardEntrySaveRes.body._id)
							.send(fabricRequirementInwardEntry)
							.expect(200)
							.end(function(fabricRequirementInwardEntryUpdateErr, fabricRequirementInwardEntryUpdateRes) {
								// Handle Fabric requirement inward entry update error
								if (fabricRequirementInwardEntryUpdateErr) done(fabricRequirementInwardEntryUpdateErr);

								// Set assertions
								(fabricRequirementInwardEntryUpdateRes.body._id).should.equal(fabricRequirementInwardEntrySaveRes.body._id);
								(fabricRequirementInwardEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fabric requirement inward entries if not signed in', function(done) {
		// Create new Fabric requirement inward entry model instance
		var fabricRequirementInwardEntryObj = new FabricRequirementInwardEntry(fabricRequirementInwardEntry);

		// Save the Fabric requirement inward entry
		fabricRequirementInwardEntryObj.save(function() {
			// Request Fabric requirement inward entries
			request(app).get('/fabric-requirement-inward-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fabric requirement inward entry if not signed in', function(done) {
		// Create new Fabric requirement inward entry model instance
		var fabricRequirementInwardEntryObj = new FabricRequirementInwardEntry(fabricRequirementInwardEntry);

		// Save the Fabric requirement inward entry
		fabricRequirementInwardEntryObj.save(function() {
			request(app).get('/fabric-requirement-inward-entries/' + fabricRequirementInwardEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fabricRequirementInwardEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fabric requirement inward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric requirement inward entry
				agent.post('/fabric-requirement-inward-entries')
					.send(fabricRequirementInwardEntry)
					.expect(200)
					.end(function(fabricRequirementInwardEntrySaveErr, fabricRequirementInwardEntrySaveRes) {
						// Handle Fabric requirement inward entry save error
						if (fabricRequirementInwardEntrySaveErr) done(fabricRequirementInwardEntrySaveErr);

						// Delete existing Fabric requirement inward entry
						agent.delete('/fabric-requirement-inward-entries/' + fabricRequirementInwardEntrySaveRes.body._id)
							.send(fabricRequirementInwardEntry)
							.expect(200)
							.end(function(fabricRequirementInwardEntryDeleteErr, fabricRequirementInwardEntryDeleteRes) {
								// Handle Fabric requirement inward entry error error
								if (fabricRequirementInwardEntryDeleteErr) done(fabricRequirementInwardEntryDeleteErr);

								// Set assertions
								(fabricRequirementInwardEntryDeleteRes.body._id).should.equal(fabricRequirementInwardEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fabric requirement inward entry instance if not signed in', function(done) {
		// Set Fabric requirement inward entry user 
		fabricRequirementInwardEntry.user = user;

		// Create new Fabric requirement inward entry model instance
		var fabricRequirementInwardEntryObj = new FabricRequirementInwardEntry(fabricRequirementInwardEntry);

		// Save the Fabric requirement inward entry
		fabricRequirementInwardEntryObj.save(function() {
			// Try deleting Fabric requirement inward entry
			request(app).delete('/fabric-requirement-inward-entries/' + fabricRequirementInwardEntryObj._id)
			.expect(401)
			.end(function(fabricRequirementInwardEntryDeleteErr, fabricRequirementInwardEntryDeleteRes) {
				// Set message assertion
				(fabricRequirementInwardEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fabric requirement inward entry error error
				done(fabricRequirementInwardEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FabricRequirementInwardEntry.remove().exec();
		done();
	});
});