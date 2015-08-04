'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	YarnDescription = mongoose.model('YarnDescription'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, yarnDescription;

/**
 * Yarn description routes tests
 */
describe('Yarn description CRUD tests', function() {
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

		// Save a user to the test db and create new Yarn description
		user.save(function() {
			yarnDescription = {
				name: 'Yarn description Name'
			};

			done();
		});
	});

	it('should be able to save Yarn description instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn description
				agent.post('/yarn-descriptions')
					.send(yarnDescription)
					.expect(200)
					.end(function(yarnDescriptionSaveErr, yarnDescriptionSaveRes) {
						// Handle Yarn description save error
						if (yarnDescriptionSaveErr) done(yarnDescriptionSaveErr);

						// Get a list of Yarn descriptions
						agent.get('/yarn-descriptions')
							.end(function(yarnDescriptionsGetErr, yarnDescriptionsGetRes) {
								// Handle Yarn description save error
								if (yarnDescriptionsGetErr) done(yarnDescriptionsGetErr);

								// Get Yarn descriptions list
								var yarnDescriptions = yarnDescriptionsGetRes.body;

								// Set assertions
								(yarnDescriptions[0].user._id).should.equal(userId);
								(yarnDescriptions[0].name).should.match('Yarn description Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Yarn description instance if not logged in', function(done) {
		agent.post('/yarn-descriptions')
			.send(yarnDescription)
			.expect(401)
			.end(function(yarnDescriptionSaveErr, yarnDescriptionSaveRes) {
				// Call the assertion callback
				done(yarnDescriptionSaveErr);
			});
	});

	it('should not be able to save Yarn description instance if no name is provided', function(done) {
		// Invalidate name field
		yarnDescription.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn description
				agent.post('/yarn-descriptions')
					.send(yarnDescription)
					.expect(400)
					.end(function(yarnDescriptionSaveErr, yarnDescriptionSaveRes) {
						// Set message assertion
						(yarnDescriptionSaveRes.body.message).should.match('Please fill Yarn description name');
						
						// Handle Yarn description save error
						done(yarnDescriptionSaveErr);
					});
			});
	});

	it('should be able to update Yarn description instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn description
				agent.post('/yarn-descriptions')
					.send(yarnDescription)
					.expect(200)
					.end(function(yarnDescriptionSaveErr, yarnDescriptionSaveRes) {
						// Handle Yarn description save error
						if (yarnDescriptionSaveErr) done(yarnDescriptionSaveErr);

						// Update Yarn description name
						yarnDescription.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Yarn description
						agent.put('/yarn-descriptions/' + yarnDescriptionSaveRes.body._id)
							.send(yarnDescription)
							.expect(200)
							.end(function(yarnDescriptionUpdateErr, yarnDescriptionUpdateRes) {
								// Handle Yarn description update error
								if (yarnDescriptionUpdateErr) done(yarnDescriptionUpdateErr);

								// Set assertions
								(yarnDescriptionUpdateRes.body._id).should.equal(yarnDescriptionSaveRes.body._id);
								(yarnDescriptionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Yarn descriptions if not signed in', function(done) {
		// Create new Yarn description model instance
		var yarnDescriptionObj = new YarnDescription(yarnDescription);

		// Save the Yarn description
		yarnDescriptionObj.save(function() {
			// Request Yarn descriptions
			request(app).get('/yarn-descriptions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Yarn description if not signed in', function(done) {
		// Create new Yarn description model instance
		var yarnDescriptionObj = new YarnDescription(yarnDescription);

		// Save the Yarn description
		yarnDescriptionObj.save(function() {
			request(app).get('/yarn-descriptions/' + yarnDescriptionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', yarnDescription.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Yarn description instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn description
				agent.post('/yarn-descriptions')
					.send(yarnDescription)
					.expect(200)
					.end(function(yarnDescriptionSaveErr, yarnDescriptionSaveRes) {
						// Handle Yarn description save error
						if (yarnDescriptionSaveErr) done(yarnDescriptionSaveErr);

						// Delete existing Yarn description
						agent.delete('/yarn-descriptions/' + yarnDescriptionSaveRes.body._id)
							.send(yarnDescription)
							.expect(200)
							.end(function(yarnDescriptionDeleteErr, yarnDescriptionDeleteRes) {
								// Handle Yarn description error error
								if (yarnDescriptionDeleteErr) done(yarnDescriptionDeleteErr);

								// Set assertions
								(yarnDescriptionDeleteRes.body._id).should.equal(yarnDescriptionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Yarn description instance if not signed in', function(done) {
		// Set Yarn description user 
		yarnDescription.user = user;

		// Create new Yarn description model instance
		var yarnDescriptionObj = new YarnDescription(yarnDescription);

		// Save the Yarn description
		yarnDescriptionObj.save(function() {
			// Try deleting Yarn description
			request(app).delete('/yarn-descriptions/' + yarnDescriptionObj._id)
			.expect(401)
			.end(function(yarnDescriptionDeleteErr, yarnDescriptionDeleteRes) {
				// Set message assertion
				(yarnDescriptionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Yarn description error error
				done(yarnDescriptionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		YarnDescription.remove().exec();
		done();
	});
});