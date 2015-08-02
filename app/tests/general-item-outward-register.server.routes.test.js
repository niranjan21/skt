'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GeneralItemOutwardRegister = mongoose.model('GeneralItemOutwardRegister'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, generalItemOutwardRegister;

/**
 * General item outward register routes tests
 */
describe('General item outward register CRUD tests', function() {
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

		// Save a user to the test db and create new General item outward register
		user.save(function() {
			generalItemOutwardRegister = {
				name: 'General item outward register Name'
			};

			done();
		});
	});

	it('should be able to save General item outward register instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item outward register
				agent.post('/general-item-outward-registers')
					.send(generalItemOutwardRegister)
					.expect(200)
					.end(function(generalItemOutwardRegisterSaveErr, generalItemOutwardRegisterSaveRes) {
						// Handle General item outward register save error
						if (generalItemOutwardRegisterSaveErr) done(generalItemOutwardRegisterSaveErr);

						// Get a list of General item outward registers
						agent.get('/general-item-outward-registers')
							.end(function(generalItemOutwardRegistersGetErr, generalItemOutwardRegistersGetRes) {
								// Handle General item outward register save error
								if (generalItemOutwardRegistersGetErr) done(generalItemOutwardRegistersGetErr);

								// Get General item outward registers list
								var generalItemOutwardRegisters = generalItemOutwardRegistersGetRes.body;

								// Set assertions
								(generalItemOutwardRegisters[0].user._id).should.equal(userId);
								(generalItemOutwardRegisters[0].name).should.match('General item outward register Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save General item outward register instance if not logged in', function(done) {
		agent.post('/general-item-outward-registers')
			.send(generalItemOutwardRegister)
			.expect(401)
			.end(function(generalItemOutwardRegisterSaveErr, generalItemOutwardRegisterSaveRes) {
				// Call the assertion callback
				done(generalItemOutwardRegisterSaveErr);
			});
	});

	it('should not be able to save General item outward register instance if no name is provided', function(done) {
		// Invalidate name field
		generalItemOutwardRegister.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item outward register
				agent.post('/general-item-outward-registers')
					.send(generalItemOutwardRegister)
					.expect(400)
					.end(function(generalItemOutwardRegisterSaveErr, generalItemOutwardRegisterSaveRes) {
						// Set message assertion
						(generalItemOutwardRegisterSaveRes.body.message).should.match('Please fill General item outward register name');
						
						// Handle General item outward register save error
						done(generalItemOutwardRegisterSaveErr);
					});
			});
	});

	it('should be able to update General item outward register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item outward register
				agent.post('/general-item-outward-registers')
					.send(generalItemOutwardRegister)
					.expect(200)
					.end(function(generalItemOutwardRegisterSaveErr, generalItemOutwardRegisterSaveRes) {
						// Handle General item outward register save error
						if (generalItemOutwardRegisterSaveErr) done(generalItemOutwardRegisterSaveErr);

						// Update General item outward register name
						generalItemOutwardRegister.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing General item outward register
						agent.put('/general-item-outward-registers/' + generalItemOutwardRegisterSaveRes.body._id)
							.send(generalItemOutwardRegister)
							.expect(200)
							.end(function(generalItemOutwardRegisterUpdateErr, generalItemOutwardRegisterUpdateRes) {
								// Handle General item outward register update error
								if (generalItemOutwardRegisterUpdateErr) done(generalItemOutwardRegisterUpdateErr);

								// Set assertions
								(generalItemOutwardRegisterUpdateRes.body._id).should.equal(generalItemOutwardRegisterSaveRes.body._id);
								(generalItemOutwardRegisterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of General item outward registers if not signed in', function(done) {
		// Create new General item outward register model instance
		var generalItemOutwardRegisterObj = new GeneralItemOutwardRegister(generalItemOutwardRegister);

		// Save the General item outward register
		generalItemOutwardRegisterObj.save(function() {
			// Request General item outward registers
			request(app).get('/general-item-outward-registers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single General item outward register if not signed in', function(done) {
		// Create new General item outward register model instance
		var generalItemOutwardRegisterObj = new GeneralItemOutwardRegister(generalItemOutwardRegister);

		// Save the General item outward register
		generalItemOutwardRegisterObj.save(function() {
			request(app).get('/general-item-outward-registers/' + generalItemOutwardRegisterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', generalItemOutwardRegister.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete General item outward register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item outward register
				agent.post('/general-item-outward-registers')
					.send(generalItemOutwardRegister)
					.expect(200)
					.end(function(generalItemOutwardRegisterSaveErr, generalItemOutwardRegisterSaveRes) {
						// Handle General item outward register save error
						if (generalItemOutwardRegisterSaveErr) done(generalItemOutwardRegisterSaveErr);

						// Delete existing General item outward register
						agent.delete('/general-item-outward-registers/' + generalItemOutwardRegisterSaveRes.body._id)
							.send(generalItemOutwardRegister)
							.expect(200)
							.end(function(generalItemOutwardRegisterDeleteErr, generalItemOutwardRegisterDeleteRes) {
								// Handle General item outward register error error
								if (generalItemOutwardRegisterDeleteErr) done(generalItemOutwardRegisterDeleteErr);

								// Set assertions
								(generalItemOutwardRegisterDeleteRes.body._id).should.equal(generalItemOutwardRegisterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete General item outward register instance if not signed in', function(done) {
		// Set General item outward register user 
		generalItemOutwardRegister.user = user;

		// Create new General item outward register model instance
		var generalItemOutwardRegisterObj = new GeneralItemOutwardRegister(generalItemOutwardRegister);

		// Save the General item outward register
		generalItemOutwardRegisterObj.save(function() {
			// Try deleting General item outward register
			request(app).delete('/general-item-outward-registers/' + generalItemOutwardRegisterObj._id)
			.expect(401)
			.end(function(generalItemOutwardRegisterDeleteErr, generalItemOutwardRegisterDeleteRes) {
				// Set message assertion
				(generalItemOutwardRegisterDeleteRes.body.message).should.match('User is not logged in');

				// Handle General item outward register error error
				done(generalItemOutwardRegisterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		GeneralItemOutwardRegister.remove().exec();
		done();
	});
});