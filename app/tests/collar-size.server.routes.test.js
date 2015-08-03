'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	CollarSize = mongoose.model('CollarSize'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, collarSize;

/**
 * Collar size routes tests
 */
describe('Collar size CRUD tests', function() {
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

		// Save a user to the test db and create new Collar size
		user.save(function() {
			collarSize = {
				name: 'Collar size Name'
			};

			done();
		});
	});

	it('should be able to save Collar size instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Collar size
				agent.post('/collar-sizes')
					.send(collarSize)
					.expect(200)
					.end(function(collarSizeSaveErr, collarSizeSaveRes) {
						// Handle Collar size save error
						if (collarSizeSaveErr) done(collarSizeSaveErr);

						// Get a list of Collar sizes
						agent.get('/collar-sizes')
							.end(function(collarSizesGetErr, collarSizesGetRes) {
								// Handle Collar size save error
								if (collarSizesGetErr) done(collarSizesGetErr);

								// Get Collar sizes list
								var collarSizes = collarSizesGetRes.body;

								// Set assertions
								(collarSizes[0].user._id).should.equal(userId);
								(collarSizes[0].name).should.match('Collar size Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Collar size instance if not logged in', function(done) {
		agent.post('/collar-sizes')
			.send(collarSize)
			.expect(401)
			.end(function(collarSizeSaveErr, collarSizeSaveRes) {
				// Call the assertion callback
				done(collarSizeSaveErr);
			});
	});

	it('should not be able to save Collar size instance if no name is provided', function(done) {
		// Invalidate name field
		collarSize.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Collar size
				agent.post('/collar-sizes')
					.send(collarSize)
					.expect(400)
					.end(function(collarSizeSaveErr, collarSizeSaveRes) {
						// Set message assertion
						(collarSizeSaveRes.body.message).should.match('Please fill Collar size name');
						
						// Handle Collar size save error
						done(collarSizeSaveErr);
					});
			});
	});

	it('should be able to update Collar size instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Collar size
				agent.post('/collar-sizes')
					.send(collarSize)
					.expect(200)
					.end(function(collarSizeSaveErr, collarSizeSaveRes) {
						// Handle Collar size save error
						if (collarSizeSaveErr) done(collarSizeSaveErr);

						// Update Collar size name
						collarSize.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Collar size
						agent.put('/collar-sizes/' + collarSizeSaveRes.body._id)
							.send(collarSize)
							.expect(200)
							.end(function(collarSizeUpdateErr, collarSizeUpdateRes) {
								// Handle Collar size update error
								if (collarSizeUpdateErr) done(collarSizeUpdateErr);

								// Set assertions
								(collarSizeUpdateRes.body._id).should.equal(collarSizeSaveRes.body._id);
								(collarSizeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Collar sizes if not signed in', function(done) {
		// Create new Collar size model instance
		var collarSizeObj = new CollarSize(collarSize);

		// Save the Collar size
		collarSizeObj.save(function() {
			// Request Collar sizes
			request(app).get('/collar-sizes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Collar size if not signed in', function(done) {
		// Create new Collar size model instance
		var collarSizeObj = new CollarSize(collarSize);

		// Save the Collar size
		collarSizeObj.save(function() {
			request(app).get('/collar-sizes/' + collarSizeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', collarSize.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Collar size instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Collar size
				agent.post('/collar-sizes')
					.send(collarSize)
					.expect(200)
					.end(function(collarSizeSaveErr, collarSizeSaveRes) {
						// Handle Collar size save error
						if (collarSizeSaveErr) done(collarSizeSaveErr);

						// Delete existing Collar size
						agent.delete('/collar-sizes/' + collarSizeSaveRes.body._id)
							.send(collarSize)
							.expect(200)
							.end(function(collarSizeDeleteErr, collarSizeDeleteRes) {
								// Handle Collar size error error
								if (collarSizeDeleteErr) done(collarSizeDeleteErr);

								// Set assertions
								(collarSizeDeleteRes.body._id).should.equal(collarSizeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Collar size instance if not signed in', function(done) {
		// Set Collar size user 
		collarSize.user = user;

		// Create new Collar size model instance
		var collarSizeObj = new CollarSize(collarSize);

		// Save the Collar size
		collarSizeObj.save(function() {
			// Try deleting Collar size
			request(app).delete('/collar-sizes/' + collarSizeObj._id)
			.expect(401)
			.end(function(collarSizeDeleteErr, collarSizeDeleteRes) {
				// Set message assertion
				(collarSizeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Collar size error error
				done(collarSizeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		CollarSize.remove().exec();
		done();
	});
});