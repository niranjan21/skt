'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Needle = mongoose.model('Needle'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, needle;

/**
 * Needle routes tests
 */
describe('Needle CRUD tests', function() {
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

		// Save a user to the test db and create new Needle
		user.save(function() {
			needle = {
				name: 'Needle Name'
			};

			done();
		});
	});

	it('should be able to save Needle instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needle
				agent.post('/needles')
					.send(needle)
					.expect(200)
					.end(function(needleSaveErr, needleSaveRes) {
						// Handle Needle save error
						if (needleSaveErr) done(needleSaveErr);

						// Get a list of Needles
						agent.get('/needles')
							.end(function(needlesGetErr, needlesGetRes) {
								// Handle Needle save error
								if (needlesGetErr) done(needlesGetErr);

								// Get Needles list
								var needles = needlesGetRes.body;

								// Set assertions
								(needles[0].user._id).should.equal(userId);
								(needles[0].name).should.match('Needle Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Needle instance if not logged in', function(done) {
		agent.post('/needles')
			.send(needle)
			.expect(401)
			.end(function(needleSaveErr, needleSaveRes) {
				// Call the assertion callback
				done(needleSaveErr);
			});
	});

	it('should not be able to save Needle instance if no name is provided', function(done) {
		// Invalidate name field
		needle.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needle
				agent.post('/needles')
					.send(needle)
					.expect(400)
					.end(function(needleSaveErr, needleSaveRes) {
						// Set message assertion
						(needleSaveRes.body.message).should.match('Please fill Needle name');
						
						// Handle Needle save error
						done(needleSaveErr);
					});
			});
	});

	it('should be able to update Needle instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needle
				agent.post('/needles')
					.send(needle)
					.expect(200)
					.end(function(needleSaveErr, needleSaveRes) {
						// Handle Needle save error
						if (needleSaveErr) done(needleSaveErr);

						// Update Needle name
						needle.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Needle
						agent.put('/needles/' + needleSaveRes.body._id)
							.send(needle)
							.expect(200)
							.end(function(needleUpdateErr, needleUpdateRes) {
								// Handle Needle update error
								if (needleUpdateErr) done(needleUpdateErr);

								// Set assertions
								(needleUpdateRes.body._id).should.equal(needleSaveRes.body._id);
								(needleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Needles if not signed in', function(done) {
		// Create new Needle model instance
		var needleObj = new Needle(needle);

		// Save the Needle
		needleObj.save(function() {
			// Request Needles
			request(app).get('/needles')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Needle if not signed in', function(done) {
		// Create new Needle model instance
		var needleObj = new Needle(needle);

		// Save the Needle
		needleObj.save(function() {
			request(app).get('/needles/' + needleObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', needle.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Needle instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needle
				agent.post('/needles')
					.send(needle)
					.expect(200)
					.end(function(needleSaveErr, needleSaveRes) {
						// Handle Needle save error
						if (needleSaveErr) done(needleSaveErr);

						// Delete existing Needle
						agent.delete('/needles/' + needleSaveRes.body._id)
							.send(needle)
							.expect(200)
							.end(function(needleDeleteErr, needleDeleteRes) {
								// Handle Needle error error
								if (needleDeleteErr) done(needleDeleteErr);

								// Set assertions
								(needleDeleteRes.body._id).should.equal(needleSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Needle instance if not signed in', function(done) {
		// Set Needle user 
		needle.user = user;

		// Create new Needle model instance
		var needleObj = new Needle(needle);

		// Save the Needle
		needleObj.save(function() {
			// Try deleting Needle
			request(app).delete('/needles/' + needleObj._id)
			.expect(401)
			.end(function(needleDeleteErr, needleDeleteRes) {
				// Set message assertion
				(needleDeleteRes.body.message).should.match('User is not logged in');

				// Handle Needle error error
				done(needleDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Needle.remove().exec();
		done();
	});
});