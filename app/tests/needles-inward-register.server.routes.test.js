'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	NeedlesInwardRegister = mongoose.model('NeedlesInwardRegister'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, needlesInwardRegister;

/**
 * Needles inward register routes tests
 */
describe('Needles inward register CRUD tests', function() {
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

		// Save a user to the test db and create new Needles inward register
		user.save(function() {
			needlesInwardRegister = {
				name: 'Needles inward register Name'
			};

			done();
		});
	});

	it('should be able to save Needles inward register instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needles inward register
				agent.post('/needles-inward-registers')
					.send(needlesInwardRegister)
					.expect(200)
					.end(function(needlesInwardRegisterSaveErr, needlesInwardRegisterSaveRes) {
						// Handle Needles inward register save error
						if (needlesInwardRegisterSaveErr) done(needlesInwardRegisterSaveErr);

						// Get a list of Needles inward registers
						agent.get('/needles-inward-registers')
							.end(function(needlesInwardRegistersGetErr, needlesInwardRegistersGetRes) {
								// Handle Needles inward register save error
								if (needlesInwardRegistersGetErr) done(needlesInwardRegistersGetErr);

								// Get Needles inward registers list
								var needlesInwardRegisters = needlesInwardRegistersGetRes.body;

								// Set assertions
								(needlesInwardRegisters[0].user._id).should.equal(userId);
								(needlesInwardRegisters[0].name).should.match('Needles inward register Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Needles inward register instance if not logged in', function(done) {
		agent.post('/needles-inward-registers')
			.send(needlesInwardRegister)
			.expect(401)
			.end(function(needlesInwardRegisterSaveErr, needlesInwardRegisterSaveRes) {
				// Call the assertion callback
				done(needlesInwardRegisterSaveErr);
			});
	});

	it('should not be able to save Needles inward register instance if no name is provided', function(done) {
		// Invalidate name field
		needlesInwardRegister.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needles inward register
				agent.post('/needles-inward-registers')
					.send(needlesInwardRegister)
					.expect(400)
					.end(function(needlesInwardRegisterSaveErr, needlesInwardRegisterSaveRes) {
						// Set message assertion
						(needlesInwardRegisterSaveRes.body.message).should.match('Please fill Needles inward register name');
						
						// Handle Needles inward register save error
						done(needlesInwardRegisterSaveErr);
					});
			});
	});

	it('should be able to update Needles inward register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needles inward register
				agent.post('/needles-inward-registers')
					.send(needlesInwardRegister)
					.expect(200)
					.end(function(needlesInwardRegisterSaveErr, needlesInwardRegisterSaveRes) {
						// Handle Needles inward register save error
						if (needlesInwardRegisterSaveErr) done(needlesInwardRegisterSaveErr);

						// Update Needles inward register name
						needlesInwardRegister.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Needles inward register
						agent.put('/needles-inward-registers/' + needlesInwardRegisterSaveRes.body._id)
							.send(needlesInwardRegister)
							.expect(200)
							.end(function(needlesInwardRegisterUpdateErr, needlesInwardRegisterUpdateRes) {
								// Handle Needles inward register update error
								if (needlesInwardRegisterUpdateErr) done(needlesInwardRegisterUpdateErr);

								// Set assertions
								(needlesInwardRegisterUpdateRes.body._id).should.equal(needlesInwardRegisterSaveRes.body._id);
								(needlesInwardRegisterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Needles inward registers if not signed in', function(done) {
		// Create new Needles inward register model instance
		var needlesInwardRegisterObj = new NeedlesInwardRegister(needlesInwardRegister);

		// Save the Needles inward register
		needlesInwardRegisterObj.save(function() {
			// Request Needles inward registers
			request(app).get('/needles-inward-registers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Needles inward register if not signed in', function(done) {
		// Create new Needles inward register model instance
		var needlesInwardRegisterObj = new NeedlesInwardRegister(needlesInwardRegister);

		// Save the Needles inward register
		needlesInwardRegisterObj.save(function() {
			request(app).get('/needles-inward-registers/' + needlesInwardRegisterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', needlesInwardRegister.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Needles inward register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Needles inward register
				agent.post('/needles-inward-registers')
					.send(needlesInwardRegister)
					.expect(200)
					.end(function(needlesInwardRegisterSaveErr, needlesInwardRegisterSaveRes) {
						// Handle Needles inward register save error
						if (needlesInwardRegisterSaveErr) done(needlesInwardRegisterSaveErr);

						// Delete existing Needles inward register
						agent.delete('/needles-inward-registers/' + needlesInwardRegisterSaveRes.body._id)
							.send(needlesInwardRegister)
							.expect(200)
							.end(function(needlesInwardRegisterDeleteErr, needlesInwardRegisterDeleteRes) {
								// Handle Needles inward register error error
								if (needlesInwardRegisterDeleteErr) done(needlesInwardRegisterDeleteErr);

								// Set assertions
								(needlesInwardRegisterDeleteRes.body._id).should.equal(needlesInwardRegisterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Needles inward register instance if not signed in', function(done) {
		// Set Needles inward register user 
		needlesInwardRegister.user = user;

		// Create new Needles inward register model instance
		var needlesInwardRegisterObj = new NeedlesInwardRegister(needlesInwardRegister);

		// Save the Needles inward register
		needlesInwardRegisterObj.save(function() {
			// Try deleting Needles inward register
			request(app).delete('/needles-inward-registers/' + needlesInwardRegisterObj._id)
			.expect(401)
			.end(function(needlesInwardRegisterDeleteErr, needlesInwardRegisterDeleteRes) {
				// Set message assertion
				(needlesInwardRegisterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Needles inward register error error
				done(needlesInwardRegisterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		NeedlesInwardRegister.remove().exec();
		done();
	});
});