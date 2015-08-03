'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Concern = mongoose.model('Concern'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, concern;

/**
 * Concern routes tests
 */
describe('Concern CRUD tests', function() {
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

		// Save a user to the test db and create new Concern
		user.save(function() {
			concern = {
				name: 'Concern Name'
			};

			done();
		});
	});

	it('should be able to save Concern instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Concern
				agent.post('/concerns')
					.send(concern)
					.expect(200)
					.end(function(concernSaveErr, concernSaveRes) {
						// Handle Concern save error
						if (concernSaveErr) done(concernSaveErr);

						// Get a list of Concerns
						agent.get('/concerns')
							.end(function(concernsGetErr, concernsGetRes) {
								// Handle Concern save error
								if (concernsGetErr) done(concernsGetErr);

								// Get Concerns list
								var concerns = concernsGetRes.body;

								// Set assertions
								(concerns[0].user._id).should.equal(userId);
								(concerns[0].name).should.match('Concern Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Concern instance if not logged in', function(done) {
		agent.post('/concerns')
			.send(concern)
			.expect(401)
			.end(function(concernSaveErr, concernSaveRes) {
				// Call the assertion callback
				done(concernSaveErr);
			});
	});

	it('should not be able to save Concern instance if no name is provided', function(done) {
		// Invalidate name field
		concern.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Concern
				agent.post('/concerns')
					.send(concern)
					.expect(400)
					.end(function(concernSaveErr, concernSaveRes) {
						// Set message assertion
						(concernSaveRes.body.message).should.match('Please fill Concern name');
						
						// Handle Concern save error
						done(concernSaveErr);
					});
			});
	});

	it('should be able to update Concern instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Concern
				agent.post('/concerns')
					.send(concern)
					.expect(200)
					.end(function(concernSaveErr, concernSaveRes) {
						// Handle Concern save error
						if (concernSaveErr) done(concernSaveErr);

						// Update Concern name
						concern.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Concern
						agent.put('/concerns/' + concernSaveRes.body._id)
							.send(concern)
							.expect(200)
							.end(function(concernUpdateErr, concernUpdateRes) {
								// Handle Concern update error
								if (concernUpdateErr) done(concernUpdateErr);

								// Set assertions
								(concernUpdateRes.body._id).should.equal(concernSaveRes.body._id);
								(concernUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Concerns if not signed in', function(done) {
		// Create new Concern model instance
		var concernObj = new Concern(concern);

		// Save the Concern
		concernObj.save(function() {
			// Request Concerns
			request(app).get('/concerns')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Concern if not signed in', function(done) {
		// Create new Concern model instance
		var concernObj = new Concern(concern);

		// Save the Concern
		concernObj.save(function() {
			request(app).get('/concerns/' + concernObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', concern.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Concern instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Concern
				agent.post('/concerns')
					.send(concern)
					.expect(200)
					.end(function(concernSaveErr, concernSaveRes) {
						// Handle Concern save error
						if (concernSaveErr) done(concernSaveErr);

						// Delete existing Concern
						agent.delete('/concerns/' + concernSaveRes.body._id)
							.send(concern)
							.expect(200)
							.end(function(concernDeleteErr, concernDeleteRes) {
								// Handle Concern error error
								if (concernDeleteErr) done(concernDeleteErr);

								// Set assertions
								(concernDeleteRes.body._id).should.equal(concernSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Concern instance if not signed in', function(done) {
		// Set Concern user 
		concern.user = user;

		// Create new Concern model instance
		var concernObj = new Concern(concern);

		// Save the Concern
		concernObj.save(function() {
			// Try deleting Concern
			request(app).delete('/concerns/' + concernObj._id)
			.expect(401)
			.end(function(concernDeleteErr, concernDeleteRes) {
				// Set message assertion
				(concernDeleteRes.body.message).should.match('User is not logged in');

				// Handle Concern error error
				done(concernDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Concern.remove().exec();
		done();
	});
});