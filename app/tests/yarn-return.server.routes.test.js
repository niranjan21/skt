'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	YarnReturn = mongoose.model('YarnReturn'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, yarnReturn;

/**
 * Yarn return routes tests
 */
describe('Yarn return CRUD tests', function() {
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

		// Save a user to the test db and create new Yarn return
		user.save(function() {
			yarnReturn = {
				name: 'Yarn return Name'
			};

			done();
		});
	});

	it('should be able to save Yarn return instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn return
				agent.post('/yarn-returns')
					.send(yarnReturn)
					.expect(200)
					.end(function(yarnReturnSaveErr, yarnReturnSaveRes) {
						// Handle Yarn return save error
						if (yarnReturnSaveErr) done(yarnReturnSaveErr);

						// Get a list of Yarn returns
						agent.get('/yarn-returns')
							.end(function(yarnReturnsGetErr, yarnReturnsGetRes) {
								// Handle Yarn return save error
								if (yarnReturnsGetErr) done(yarnReturnsGetErr);

								// Get Yarn returns list
								var yarnReturns = yarnReturnsGetRes.body;

								// Set assertions
								(yarnReturns[0].user._id).should.equal(userId);
								(yarnReturns[0].name).should.match('Yarn return Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Yarn return instance if not logged in', function(done) {
		agent.post('/yarn-returns')
			.send(yarnReturn)
			.expect(401)
			.end(function(yarnReturnSaveErr, yarnReturnSaveRes) {
				// Call the assertion callback
				done(yarnReturnSaveErr);
			});
	});

	it('should not be able to save Yarn return instance if no name is provided', function(done) {
		// Invalidate name field
		yarnReturn.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn return
				agent.post('/yarn-returns')
					.send(yarnReturn)
					.expect(400)
					.end(function(yarnReturnSaveErr, yarnReturnSaveRes) {
						// Set message assertion
						(yarnReturnSaveRes.body.message).should.match('Please fill Yarn return name');
						
						// Handle Yarn return save error
						done(yarnReturnSaveErr);
					});
			});
	});

	it('should be able to update Yarn return instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn return
				agent.post('/yarn-returns')
					.send(yarnReturn)
					.expect(200)
					.end(function(yarnReturnSaveErr, yarnReturnSaveRes) {
						// Handle Yarn return save error
						if (yarnReturnSaveErr) done(yarnReturnSaveErr);

						// Update Yarn return name
						yarnReturn.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Yarn return
						agent.put('/yarn-returns/' + yarnReturnSaveRes.body._id)
							.send(yarnReturn)
							.expect(200)
							.end(function(yarnReturnUpdateErr, yarnReturnUpdateRes) {
								// Handle Yarn return update error
								if (yarnReturnUpdateErr) done(yarnReturnUpdateErr);

								// Set assertions
								(yarnReturnUpdateRes.body._id).should.equal(yarnReturnSaveRes.body._id);
								(yarnReturnUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Yarn returns if not signed in', function(done) {
		// Create new Yarn return model instance
		var yarnReturnObj = new YarnReturn(yarnReturn);

		// Save the Yarn return
		yarnReturnObj.save(function() {
			// Request Yarn returns
			request(app).get('/yarn-returns')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Yarn return if not signed in', function(done) {
		// Create new Yarn return model instance
		var yarnReturnObj = new YarnReturn(yarnReturn);

		// Save the Yarn return
		yarnReturnObj.save(function() {
			request(app).get('/yarn-returns/' + yarnReturnObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', yarnReturn.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Yarn return instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn return
				agent.post('/yarn-returns')
					.send(yarnReturn)
					.expect(200)
					.end(function(yarnReturnSaveErr, yarnReturnSaveRes) {
						// Handle Yarn return save error
						if (yarnReturnSaveErr) done(yarnReturnSaveErr);

						// Delete existing Yarn return
						agent.delete('/yarn-returns/' + yarnReturnSaveRes.body._id)
							.send(yarnReturn)
							.expect(200)
							.end(function(yarnReturnDeleteErr, yarnReturnDeleteRes) {
								// Handle Yarn return error error
								if (yarnReturnDeleteErr) done(yarnReturnDeleteErr);

								// Set assertions
								(yarnReturnDeleteRes.body._id).should.equal(yarnReturnSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Yarn return instance if not signed in', function(done) {
		// Set Yarn return user 
		yarnReturn.user = user;

		// Create new Yarn return model instance
		var yarnReturnObj = new YarnReturn(yarnReturn);

		// Save the Yarn return
		yarnReturnObj.save(function() {
			// Try deleting Yarn return
			request(app).delete('/yarn-returns/' + yarnReturnObj._id)
			.expect(401)
			.end(function(yarnReturnDeleteErr, yarnReturnDeleteRes) {
				// Set message assertion
				(yarnReturnDeleteRes.body.message).should.match('User is not logged in');

				// Handle Yarn return error error
				done(yarnReturnDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		YarnReturn.remove().exec();
		done();
	});
});