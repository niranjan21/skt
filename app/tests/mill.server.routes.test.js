'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mill = mongoose.model('Mill'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, mill;

/**
 * Mill routes tests
 */
describe('Mill CRUD tests', function() {
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

		// Save a user to the test db and create new Mill
		user.save(function() {
			mill = {
				name: 'Mill Name'
			};

			done();
		});
	});

	it('should be able to save Mill instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mill
				agent.post('/mills')
					.send(mill)
					.expect(200)
					.end(function(millSaveErr, millSaveRes) {
						// Handle Mill save error
						if (millSaveErr) done(millSaveErr);

						// Get a list of Mills
						agent.get('/mills')
							.end(function(millsGetErr, millsGetRes) {
								// Handle Mill save error
								if (millsGetErr) done(millsGetErr);

								// Get Mills list
								var mills = millsGetRes.body;

								// Set assertions
								(mills[0].user._id).should.equal(userId);
								(mills[0].name).should.match('Mill Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Mill instance if not logged in', function(done) {
		agent.post('/mills')
			.send(mill)
			.expect(401)
			.end(function(millSaveErr, millSaveRes) {
				// Call the assertion callback
				done(millSaveErr);
			});
	});

	it('should not be able to save Mill instance if no name is provided', function(done) {
		// Invalidate name field
		mill.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mill
				agent.post('/mills')
					.send(mill)
					.expect(400)
					.end(function(millSaveErr, millSaveRes) {
						// Set message assertion
						(millSaveRes.body.message).should.match('Please fill Mill name');
						
						// Handle Mill save error
						done(millSaveErr);
					});
			});
	});

	it('should be able to update Mill instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mill
				agent.post('/mills')
					.send(mill)
					.expect(200)
					.end(function(millSaveErr, millSaveRes) {
						// Handle Mill save error
						if (millSaveErr) done(millSaveErr);

						// Update Mill name
						mill.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Mill
						agent.put('/mills/' + millSaveRes.body._id)
							.send(mill)
							.expect(200)
							.end(function(millUpdateErr, millUpdateRes) {
								// Handle Mill update error
								if (millUpdateErr) done(millUpdateErr);

								// Set assertions
								(millUpdateRes.body._id).should.equal(millSaveRes.body._id);
								(millUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Mills if not signed in', function(done) {
		// Create new Mill model instance
		var millObj = new Mill(mill);

		// Save the Mill
		millObj.save(function() {
			// Request Mills
			request(app).get('/mills')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Mill if not signed in', function(done) {
		// Create new Mill model instance
		var millObj = new Mill(mill);

		// Save the Mill
		millObj.save(function() {
			request(app).get('/mills/' + millObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', mill.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Mill instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mill
				agent.post('/mills')
					.send(mill)
					.expect(200)
					.end(function(millSaveErr, millSaveRes) {
						// Handle Mill save error
						if (millSaveErr) done(millSaveErr);

						// Delete existing Mill
						agent.delete('/mills/' + millSaveRes.body._id)
							.send(mill)
							.expect(200)
							.end(function(millDeleteErr, millDeleteRes) {
								// Handle Mill error error
								if (millDeleteErr) done(millDeleteErr);

								// Set assertions
								(millDeleteRes.body._id).should.equal(millSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Mill instance if not signed in', function(done) {
		// Set Mill user 
		mill.user = user;

		// Create new Mill model instance
		var millObj = new Mill(mill);

		// Save the Mill
		millObj.save(function() {
			// Try deleting Mill
			request(app).delete('/mills/' + millObj._id)
			.expect(401)
			.end(function(millDeleteErr, millDeleteRes) {
				// Set message assertion
				(millDeleteRes.body.message).should.match('User is not logged in');

				// Handle Mill error error
				done(millDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Mill.remove().exec();
		done();
	});
});