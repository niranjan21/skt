'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FixedRate = mongoose.model('FixedRate'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fixedRate;

/**
 * Fixed rate routes tests
 */
describe('Fixed rate CRUD tests', function() {
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

		// Save a user to the test db and create new Fixed rate
		user.save(function() {
			fixedRate = {
				name: 'Fixed rate Name'
			};

			done();
		});
	});

	it('should be able to save Fixed rate instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fixed rate
				agent.post('/fixed-rates')
					.send(fixedRate)
					.expect(200)
					.end(function(fixedRateSaveErr, fixedRateSaveRes) {
						// Handle Fixed rate save error
						if (fixedRateSaveErr) done(fixedRateSaveErr);

						// Get a list of Fixed rates
						agent.get('/fixed-rates')
							.end(function(fixedRatesGetErr, fixedRatesGetRes) {
								// Handle Fixed rate save error
								if (fixedRatesGetErr) done(fixedRatesGetErr);

								// Get Fixed rates list
								var fixedRates = fixedRatesGetRes.body;

								// Set assertions
								(fixedRates[0].user._id).should.equal(userId);
								(fixedRates[0].name).should.match('Fixed rate Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fixed rate instance if not logged in', function(done) {
		agent.post('/fixed-rates')
			.send(fixedRate)
			.expect(401)
			.end(function(fixedRateSaveErr, fixedRateSaveRes) {
				// Call the assertion callback
				done(fixedRateSaveErr);
			});
	});

	it('should not be able to save Fixed rate instance if no name is provided', function(done) {
		// Invalidate name field
		fixedRate.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fixed rate
				agent.post('/fixed-rates')
					.send(fixedRate)
					.expect(400)
					.end(function(fixedRateSaveErr, fixedRateSaveRes) {
						// Set message assertion
						(fixedRateSaveRes.body.message).should.match('Please fill Fixed rate name');
						
						// Handle Fixed rate save error
						done(fixedRateSaveErr);
					});
			});
	});

	it('should be able to update Fixed rate instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fixed rate
				agent.post('/fixed-rates')
					.send(fixedRate)
					.expect(200)
					.end(function(fixedRateSaveErr, fixedRateSaveRes) {
						// Handle Fixed rate save error
						if (fixedRateSaveErr) done(fixedRateSaveErr);

						// Update Fixed rate name
						fixedRate.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fixed rate
						agent.put('/fixed-rates/' + fixedRateSaveRes.body._id)
							.send(fixedRate)
							.expect(200)
							.end(function(fixedRateUpdateErr, fixedRateUpdateRes) {
								// Handle Fixed rate update error
								if (fixedRateUpdateErr) done(fixedRateUpdateErr);

								// Set assertions
								(fixedRateUpdateRes.body._id).should.equal(fixedRateSaveRes.body._id);
								(fixedRateUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fixed rates if not signed in', function(done) {
		// Create new Fixed rate model instance
		var fixedRateObj = new FixedRate(fixedRate);

		// Save the Fixed rate
		fixedRateObj.save(function() {
			// Request Fixed rates
			request(app).get('/fixed-rates')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fixed rate if not signed in', function(done) {
		// Create new Fixed rate model instance
		var fixedRateObj = new FixedRate(fixedRate);

		// Save the Fixed rate
		fixedRateObj.save(function() {
			request(app).get('/fixed-rates/' + fixedRateObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fixedRate.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fixed rate instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fixed rate
				agent.post('/fixed-rates')
					.send(fixedRate)
					.expect(200)
					.end(function(fixedRateSaveErr, fixedRateSaveRes) {
						// Handle Fixed rate save error
						if (fixedRateSaveErr) done(fixedRateSaveErr);

						// Delete existing Fixed rate
						agent.delete('/fixed-rates/' + fixedRateSaveRes.body._id)
							.send(fixedRate)
							.expect(200)
							.end(function(fixedRateDeleteErr, fixedRateDeleteRes) {
								// Handle Fixed rate error error
								if (fixedRateDeleteErr) done(fixedRateDeleteErr);

								// Set assertions
								(fixedRateDeleteRes.body._id).should.equal(fixedRateSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fixed rate instance if not signed in', function(done) {
		// Set Fixed rate user 
		fixedRate.user = user;

		// Create new Fixed rate model instance
		var fixedRateObj = new FixedRate(fixedRate);

		// Save the Fixed rate
		fixedRateObj.save(function() {
			// Try deleting Fixed rate
			request(app).delete('/fixed-rates/' + fixedRateObj._id)
			.expect(401)
			.end(function(fixedRateDeleteErr, fixedRateDeleteRes) {
				// Set message assertion
				(fixedRateDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fixed rate error error
				done(fixedRateDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FixedRate.remove().exec();
		done();
	});
});