'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	MachineKnitting = mongoose.model('MachineKnitting'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, machineKnitting;

/**
 * Machine knitting routes tests
 */
describe('Machine knitting CRUD tests', function() {
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

		// Save a user to the test db and create new Machine knitting
		user.save(function() {
			machineKnitting = {
				name: 'Machine knitting Name'
			};

			done();
		});
	});

	it('should be able to save Machine knitting instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Machine knitting
				agent.post('/machine-knittings')
					.send(machineKnitting)
					.expect(200)
					.end(function(machineKnittingSaveErr, machineKnittingSaveRes) {
						// Handle Machine knitting save error
						if (machineKnittingSaveErr) done(machineKnittingSaveErr);

						// Get a list of Machine knittings
						agent.get('/machine-knittings')
							.end(function(machineKnittingsGetErr, machineKnittingsGetRes) {
								// Handle Machine knitting save error
								if (machineKnittingsGetErr) done(machineKnittingsGetErr);

								// Get Machine knittings list
								var machineKnittings = machineKnittingsGetRes.body;

								// Set assertions
								(machineKnittings[0].user._id).should.equal(userId);
								(machineKnittings[0].name).should.match('Machine knitting Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Machine knitting instance if not logged in', function(done) {
		agent.post('/machine-knittings')
			.send(machineKnitting)
			.expect(401)
			.end(function(machineKnittingSaveErr, machineKnittingSaveRes) {
				// Call the assertion callback
				done(machineKnittingSaveErr);
			});
	});

	it('should not be able to save Machine knitting instance if no name is provided', function(done) {
		// Invalidate name field
		machineKnitting.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Machine knitting
				agent.post('/machine-knittings')
					.send(machineKnitting)
					.expect(400)
					.end(function(machineKnittingSaveErr, machineKnittingSaveRes) {
						// Set message assertion
						(machineKnittingSaveRes.body.message).should.match('Please fill Machine knitting name');
						
						// Handle Machine knitting save error
						done(machineKnittingSaveErr);
					});
			});
	});

	it('should be able to update Machine knitting instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Machine knitting
				agent.post('/machine-knittings')
					.send(machineKnitting)
					.expect(200)
					.end(function(machineKnittingSaveErr, machineKnittingSaveRes) {
						// Handle Machine knitting save error
						if (machineKnittingSaveErr) done(machineKnittingSaveErr);

						// Update Machine knitting name
						machineKnitting.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Machine knitting
						agent.put('/machine-knittings/' + machineKnittingSaveRes.body._id)
							.send(machineKnitting)
							.expect(200)
							.end(function(machineKnittingUpdateErr, machineKnittingUpdateRes) {
								// Handle Machine knitting update error
								if (machineKnittingUpdateErr) done(machineKnittingUpdateErr);

								// Set assertions
								(machineKnittingUpdateRes.body._id).should.equal(machineKnittingSaveRes.body._id);
								(machineKnittingUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Machine knittings if not signed in', function(done) {
		// Create new Machine knitting model instance
		var machineKnittingObj = new MachineKnitting(machineKnitting);

		// Save the Machine knitting
		machineKnittingObj.save(function() {
			// Request Machine knittings
			request(app).get('/machine-knittings')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Machine knitting if not signed in', function(done) {
		// Create new Machine knitting model instance
		var machineKnittingObj = new MachineKnitting(machineKnitting);

		// Save the Machine knitting
		machineKnittingObj.save(function() {
			request(app).get('/machine-knittings/' + machineKnittingObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', machineKnitting.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Machine knitting instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Machine knitting
				agent.post('/machine-knittings')
					.send(machineKnitting)
					.expect(200)
					.end(function(machineKnittingSaveErr, machineKnittingSaveRes) {
						// Handle Machine knitting save error
						if (machineKnittingSaveErr) done(machineKnittingSaveErr);

						// Delete existing Machine knitting
						agent.delete('/machine-knittings/' + machineKnittingSaveRes.body._id)
							.send(machineKnitting)
							.expect(200)
							.end(function(machineKnittingDeleteErr, machineKnittingDeleteRes) {
								// Handle Machine knitting error error
								if (machineKnittingDeleteErr) done(machineKnittingDeleteErr);

								// Set assertions
								(machineKnittingDeleteRes.body._id).should.equal(machineKnittingSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Machine knitting instance if not signed in', function(done) {
		// Set Machine knitting user 
		machineKnitting.user = user;

		// Create new Machine knitting model instance
		var machineKnittingObj = new MachineKnitting(machineKnitting);

		// Save the Machine knitting
		machineKnittingObj.save(function() {
			// Try deleting Machine knitting
			request(app).delete('/machine-knittings/' + machineKnittingObj._id)
			.expect(401)
			.end(function(machineKnittingDeleteErr, machineKnittingDeleteRes) {
				// Set message assertion
				(machineKnittingDeleteRes.body.message).should.match('User is not logged in');

				// Handle Machine knitting error error
				done(machineKnittingDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		MachineKnitting.remove().exec();
		done();
	});
});