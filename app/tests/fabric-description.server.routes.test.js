'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricDescription = mongoose.model('FabricDescription'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fabricDescription;

/**
 * Fabric description routes tests
 */
describe('Fabric description CRUD tests', function() {
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

		// Save a user to the test db and create new Fabric description
		user.save(function() {
			fabricDescription = {
				name: 'Fabric description Name'
			};

			done();
		});
	});

	it('should be able to save Fabric description instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric description
				agent.post('/fabric-descriptions')
					.send(fabricDescription)
					.expect(200)
					.end(function(fabricDescriptionSaveErr, fabricDescriptionSaveRes) {
						// Handle Fabric description save error
						if (fabricDescriptionSaveErr) done(fabricDescriptionSaveErr);

						// Get a list of Fabric descriptions
						agent.get('/fabric-descriptions')
							.end(function(fabricDescriptionsGetErr, fabricDescriptionsGetRes) {
								// Handle Fabric description save error
								if (fabricDescriptionsGetErr) done(fabricDescriptionsGetErr);

								// Get Fabric descriptions list
								var fabricDescriptions = fabricDescriptionsGetRes.body;

								// Set assertions
								(fabricDescriptions[0].user._id).should.equal(userId);
								(fabricDescriptions[0].name).should.match('Fabric description Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fabric description instance if not logged in', function(done) {
		agent.post('/fabric-descriptions')
			.send(fabricDescription)
			.expect(401)
			.end(function(fabricDescriptionSaveErr, fabricDescriptionSaveRes) {
				// Call the assertion callback
				done(fabricDescriptionSaveErr);
			});
	});

	it('should not be able to save Fabric description instance if no name is provided', function(done) {
		// Invalidate name field
		fabricDescription.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric description
				agent.post('/fabric-descriptions')
					.send(fabricDescription)
					.expect(400)
					.end(function(fabricDescriptionSaveErr, fabricDescriptionSaveRes) {
						// Set message assertion
						(fabricDescriptionSaveRes.body.message).should.match('Please fill Fabric description name');
						
						// Handle Fabric description save error
						done(fabricDescriptionSaveErr);
					});
			});
	});

	it('should be able to update Fabric description instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric description
				agent.post('/fabric-descriptions')
					.send(fabricDescription)
					.expect(200)
					.end(function(fabricDescriptionSaveErr, fabricDescriptionSaveRes) {
						// Handle Fabric description save error
						if (fabricDescriptionSaveErr) done(fabricDescriptionSaveErr);

						// Update Fabric description name
						fabricDescription.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fabric description
						agent.put('/fabric-descriptions/' + fabricDescriptionSaveRes.body._id)
							.send(fabricDescription)
							.expect(200)
							.end(function(fabricDescriptionUpdateErr, fabricDescriptionUpdateRes) {
								// Handle Fabric description update error
								if (fabricDescriptionUpdateErr) done(fabricDescriptionUpdateErr);

								// Set assertions
								(fabricDescriptionUpdateRes.body._id).should.equal(fabricDescriptionSaveRes.body._id);
								(fabricDescriptionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fabric descriptions if not signed in', function(done) {
		// Create new Fabric description model instance
		var fabricDescriptionObj = new FabricDescription(fabricDescription);

		// Save the Fabric description
		fabricDescriptionObj.save(function() {
			// Request Fabric descriptions
			request(app).get('/fabric-descriptions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fabric description if not signed in', function(done) {
		// Create new Fabric description model instance
		var fabricDescriptionObj = new FabricDescription(fabricDescription);

		// Save the Fabric description
		fabricDescriptionObj.save(function() {
			request(app).get('/fabric-descriptions/' + fabricDescriptionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fabricDescription.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fabric description instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric description
				agent.post('/fabric-descriptions')
					.send(fabricDescription)
					.expect(200)
					.end(function(fabricDescriptionSaveErr, fabricDescriptionSaveRes) {
						// Handle Fabric description save error
						if (fabricDescriptionSaveErr) done(fabricDescriptionSaveErr);

						// Delete existing Fabric description
						agent.delete('/fabric-descriptions/' + fabricDescriptionSaveRes.body._id)
							.send(fabricDescription)
							.expect(200)
							.end(function(fabricDescriptionDeleteErr, fabricDescriptionDeleteRes) {
								// Handle Fabric description error error
								if (fabricDescriptionDeleteErr) done(fabricDescriptionDeleteErr);

								// Set assertions
								(fabricDescriptionDeleteRes.body._id).should.equal(fabricDescriptionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fabric description instance if not signed in', function(done) {
		// Set Fabric description user 
		fabricDescription.user = user;

		// Create new Fabric description model instance
		var fabricDescriptionObj = new FabricDescription(fabricDescription);

		// Save the Fabric description
		fabricDescriptionObj.save(function() {
			// Try deleting Fabric description
			request(app).delete('/fabric-descriptions/' + fabricDescriptionObj._id)
			.expect(401)
			.end(function(fabricDescriptionDeleteErr, fabricDescriptionDeleteRes) {
				// Set message assertion
				(fabricDescriptionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fabric description error error
				done(fabricDescriptionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FabricDescription.remove().exec();
		done();
	});
});