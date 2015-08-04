'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PerHourProduction = mongoose.model('PerHourProduction'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, perHourProduction;

/**
 * Per hour production routes tests
 */
describe('Per hour production CRUD tests', function() {
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

		// Save a user to the test db and create new Per hour production
		user.save(function() {
			perHourProduction = {
				name: 'Per hour production Name'
			};

			done();
		});
	});

	it('should be able to save Per hour production instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Per hour production
				agent.post('/per-hour-productions')
					.send(perHourProduction)
					.expect(200)
					.end(function(perHourProductionSaveErr, perHourProductionSaveRes) {
						// Handle Per hour production save error
						if (perHourProductionSaveErr) done(perHourProductionSaveErr);

						// Get a list of Per hour productions
						agent.get('/per-hour-productions')
							.end(function(perHourProductionsGetErr, perHourProductionsGetRes) {
								// Handle Per hour production save error
								if (perHourProductionsGetErr) done(perHourProductionsGetErr);

								// Get Per hour productions list
								var perHourProductions = perHourProductionsGetRes.body;

								// Set assertions
								(perHourProductions[0].user._id).should.equal(userId);
								(perHourProductions[0].name).should.match('Per hour production Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Per hour production instance if not logged in', function(done) {
		agent.post('/per-hour-productions')
			.send(perHourProduction)
			.expect(401)
			.end(function(perHourProductionSaveErr, perHourProductionSaveRes) {
				// Call the assertion callback
				done(perHourProductionSaveErr);
			});
	});

	it('should not be able to save Per hour production instance if no name is provided', function(done) {
		// Invalidate name field
		perHourProduction.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Per hour production
				agent.post('/per-hour-productions')
					.send(perHourProduction)
					.expect(400)
					.end(function(perHourProductionSaveErr, perHourProductionSaveRes) {
						// Set message assertion
						(perHourProductionSaveRes.body.message).should.match('Please fill Per hour production name');
						
						// Handle Per hour production save error
						done(perHourProductionSaveErr);
					});
			});
	});

	it('should be able to update Per hour production instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Per hour production
				agent.post('/per-hour-productions')
					.send(perHourProduction)
					.expect(200)
					.end(function(perHourProductionSaveErr, perHourProductionSaveRes) {
						// Handle Per hour production save error
						if (perHourProductionSaveErr) done(perHourProductionSaveErr);

						// Update Per hour production name
						perHourProduction.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Per hour production
						agent.put('/per-hour-productions/' + perHourProductionSaveRes.body._id)
							.send(perHourProduction)
							.expect(200)
							.end(function(perHourProductionUpdateErr, perHourProductionUpdateRes) {
								// Handle Per hour production update error
								if (perHourProductionUpdateErr) done(perHourProductionUpdateErr);

								// Set assertions
								(perHourProductionUpdateRes.body._id).should.equal(perHourProductionSaveRes.body._id);
								(perHourProductionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Per hour productions if not signed in', function(done) {
		// Create new Per hour production model instance
		var perHourProductionObj = new PerHourProduction(perHourProduction);

		// Save the Per hour production
		perHourProductionObj.save(function() {
			// Request Per hour productions
			request(app).get('/per-hour-productions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Per hour production if not signed in', function(done) {
		// Create new Per hour production model instance
		var perHourProductionObj = new PerHourProduction(perHourProduction);

		// Save the Per hour production
		perHourProductionObj.save(function() {
			request(app).get('/per-hour-productions/' + perHourProductionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', perHourProduction.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Per hour production instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Per hour production
				agent.post('/per-hour-productions')
					.send(perHourProduction)
					.expect(200)
					.end(function(perHourProductionSaveErr, perHourProductionSaveRes) {
						// Handle Per hour production save error
						if (perHourProductionSaveErr) done(perHourProductionSaveErr);

						// Delete existing Per hour production
						agent.delete('/per-hour-productions/' + perHourProductionSaveRes.body._id)
							.send(perHourProduction)
							.expect(200)
							.end(function(perHourProductionDeleteErr, perHourProductionDeleteRes) {
								// Handle Per hour production error error
								if (perHourProductionDeleteErr) done(perHourProductionDeleteErr);

								// Set assertions
								(perHourProductionDeleteRes.body._id).should.equal(perHourProductionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Per hour production instance if not signed in', function(done) {
		// Set Per hour production user 
		perHourProduction.user = user;

		// Create new Per hour production model instance
		var perHourProductionObj = new PerHourProduction(perHourProduction);

		// Save the Per hour production
		perHourProductionObj.save(function() {
			// Try deleting Per hour production
			request(app).delete('/per-hour-productions/' + perHourProductionObj._id)
			.expect(401)
			.end(function(perHourProductionDeleteErr, perHourProductionDeleteRes) {
				// Set message assertion
				(perHourProductionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Per hour production error error
				done(perHourProductionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		PerHourProduction.remove().exec();
		done();
	});
});