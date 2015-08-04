'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	B = mongoose.model('B'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, b;

/**
 * B routes tests
 */
describe('B CRUD tests', function() {
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

		// Save a user to the test db and create new B
		user.save(function() {
			b = {
				name: 'B Name'
			};

			done();
		});
	});

	it('should be able to save B instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new B
				agent.post('/bs')
					.send(b)
					.expect(200)
					.end(function(bSaveErr, bSaveRes) {
						// Handle B save error
						if (bSaveErr) done(bSaveErr);

						// Get a list of Bs
						agent.get('/bs')
							.end(function(bsGetErr, bsGetRes) {
								// Handle B save error
								if (bsGetErr) done(bsGetErr);

								// Get Bs list
								var bs = bsGetRes.body;

								// Set assertions
								(bs[0].user._id).should.equal(userId);
								(bs[0].name).should.match('B Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save B instance if not logged in', function(done) {
		agent.post('/bs')
			.send(b)
			.expect(401)
			.end(function(bSaveErr, bSaveRes) {
				// Call the assertion callback
				done(bSaveErr);
			});
	});

	it('should not be able to save B instance if no name is provided', function(done) {
		// Invalidate name field
		b.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new B
				agent.post('/bs')
					.send(b)
					.expect(400)
					.end(function(bSaveErr, bSaveRes) {
						// Set message assertion
						(bSaveRes.body.message).should.match('Please fill B name');
						
						// Handle B save error
						done(bSaveErr);
					});
			});
	});

	it('should be able to update B instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new B
				agent.post('/bs')
					.send(b)
					.expect(200)
					.end(function(bSaveErr, bSaveRes) {
						// Handle B save error
						if (bSaveErr) done(bSaveErr);

						// Update B name
						b.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing B
						agent.put('/bs/' + bSaveRes.body._id)
							.send(b)
							.expect(200)
							.end(function(bUpdateErr, bUpdateRes) {
								// Handle B update error
								if (bUpdateErr) done(bUpdateErr);

								// Set assertions
								(bUpdateRes.body._id).should.equal(bSaveRes.body._id);
								(bUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Bs if not signed in', function(done) {
		// Create new B model instance
		var bObj = new B(b);

		// Save the B
		bObj.save(function() {
			// Request Bs
			request(app).get('/bs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single B if not signed in', function(done) {
		// Create new B model instance
		var bObj = new B(b);

		// Save the B
		bObj.save(function() {
			request(app).get('/bs/' + bObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', b.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete B instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new B
				agent.post('/bs')
					.send(b)
					.expect(200)
					.end(function(bSaveErr, bSaveRes) {
						// Handle B save error
						if (bSaveErr) done(bSaveErr);

						// Delete existing B
						agent.delete('/bs/' + bSaveRes.body._id)
							.send(b)
							.expect(200)
							.end(function(bDeleteErr, bDeleteRes) {
								// Handle B error error
								if (bDeleteErr) done(bDeleteErr);

								// Set assertions
								(bDeleteRes.body._id).should.equal(bSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete B instance if not signed in', function(done) {
		// Set B user 
		b.user = user;

		// Create new B model instance
		var bObj = new B(b);

		// Save the B
		bObj.save(function() {
			// Try deleting B
			request(app).delete('/bs/' + bObj._id)
			.expect(401)
			.end(function(bDeleteErr, bDeleteRes) {
				// Set message assertion
				(bDeleteRes.body.message).should.match('User is not logged in');

				// Handle B error error
				done(bDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		B.remove().exec();
		done();
	});
});