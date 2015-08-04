'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	NeedlesBreakage = mongoose.model('NeedlesBreakage'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, needlesBreakage;

/**
 * Needles breakage routes tests
 */
describe('Needles breakage CRUD tests', function() {
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

		// Save a user to the test db and create new Needles breakage
		user.save(function() {
			needlesBreakage = {
				name: 'Needles breakage Name'
			};

			done();
		});
	});

	it('should be able to save Needles breakage instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needles breakage
				agent.post('/needles-breakages')
					.send(needlesBreakage)
					.expect(200)
					.end(function(needlesBreakageSaveErr, needlesBreakageSaveRes) {
						// Handle Needles breakage save error
						if (needlesBreakageSaveErr) done(needlesBreakageSaveErr);

						// Get a list of Needles breakages
						agent.get('/needles-breakages')
							.end(function(needlesBreakagesGetErr, needlesBreakagesGetRes) {
								// Handle Needles breakage save error
								if (needlesBreakagesGetErr) done(needlesBreakagesGetErr);

								// Get Needles breakages list
								var needlesBreakages = needlesBreakagesGetRes.body;

								// Set assertions
								(needlesBreakages[0].user._id).should.equal(userId);
								(needlesBreakages[0].name).should.match('Needles breakage Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Needles breakage instance if not logged in', function(done) {
		agent.post('/needles-breakages')
			.send(needlesBreakage)
			.expect(401)
			.end(function(needlesBreakageSaveErr, needlesBreakageSaveRes) {
				// Call the assertion callback
				done(needlesBreakageSaveErr);
			});
	});

	it('should not be able to save Needles breakage instance if no name is provided', function(done) {
		// Invalidate name field
		needlesBreakage.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needles breakage
				agent.post('/needles-breakages')
					.send(needlesBreakage)
					.expect(400)
					.end(function(needlesBreakageSaveErr, needlesBreakageSaveRes) {
						// Set message assertion
						(needlesBreakageSaveRes.body.message).should.match('Please fill Needles breakage name');
						
						// Handle Needles breakage save error
						done(needlesBreakageSaveErr);
					});
			});
	});

	it('should be able to update Needles breakage instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needles breakage
				agent.post('/needles-breakages')
					.send(needlesBreakage)
					.expect(200)
					.end(function(needlesBreakageSaveErr, needlesBreakageSaveRes) {
						// Handle Needles breakage save error
						if (needlesBreakageSaveErr) done(needlesBreakageSaveErr);

						// Update Needles breakage name
						needlesBreakage.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Needles breakage
						agent.put('/needles-breakages/' + needlesBreakageSaveRes.body._id)
							.send(needlesBreakage)
							.expect(200)
							.end(function(needlesBreakageUpdateErr, needlesBreakageUpdateRes) {
								// Handle Needles breakage update error
								if (needlesBreakageUpdateErr) done(needlesBreakageUpdateErr);

								// Set assertions
								(needlesBreakageUpdateRes.body._id).should.equal(needlesBreakageSaveRes.body._id);
								(needlesBreakageUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Needles breakages if not signed in', function(done) {
		// Create new Needles breakage model instance
		var needlesBreakageObj = new NeedlesBreakage(needlesBreakage);

		// Save the Needles breakage
		needlesBreakageObj.save(function() {
			// Request Needles breakages
			request(app).get('/needles-breakages')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Needles breakage if not signed in', function(done) {
		// Create new Needles breakage model instance
		var needlesBreakageObj = new NeedlesBreakage(needlesBreakage);

		// Save the Needles breakage
		needlesBreakageObj.save(function() {
			request(app).get('/needles-breakages/' + needlesBreakageObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', needlesBreakage.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Needles breakage instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needles breakage
				agent.post('/needles-breakages')
					.send(needlesBreakage)
					.expect(200)
					.end(function(needlesBreakageSaveErr, needlesBreakageSaveRes) {
						// Handle Needles breakage save error
						if (needlesBreakageSaveErr) done(needlesBreakageSaveErr);

						// Delete existing Needles breakage
						agent.delete('/needles-breakages/' + needlesBreakageSaveRes.body._id)
							.send(needlesBreakage)
							.expect(200)
							.end(function(needlesBreakageDeleteErr, needlesBreakageDeleteRes) {
								// Handle Needles breakage error error
								if (needlesBreakageDeleteErr) done(needlesBreakageDeleteErr);

								// Set assertions
								(needlesBreakageDeleteRes.body._id).should.equal(needlesBreakageSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Needles breakage instance if not signed in', function(done) {
		// Set Needles breakage user 
		needlesBreakage.user = user;

		// Create new Needles breakage model instance
		var needlesBreakageObj = new NeedlesBreakage(needlesBreakage);

		// Save the Needles breakage
		needlesBreakageObj.save(function() {
			// Try deleting Needles breakage
			request(app).delete('/needles-breakages/' + needlesBreakageObj._id)
			.expect(401)
			.end(function(needlesBreakageDeleteErr, needlesBreakageDeleteRes) {
				// Set message assertion
				(needlesBreakageDeleteRes.body.message).should.match('User is not logged in');

				// Handle Needles breakage error error
				done(needlesBreakageDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		NeedlesBreakage.remove().exec();
		done();
	});
});