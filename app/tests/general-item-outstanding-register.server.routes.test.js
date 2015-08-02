'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GeneralItemOutstandingRegister = mongoose.model('GeneralItemOutstandingRegister'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, generalItemOutstandingRegister;

/**
 * General item outstanding register routes tests
 */
describe('General item outstanding register CRUD tests', function() {
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

		// Save a user to the test db and create new General item outstanding register
		user.save(function() {
			generalItemOutstandingRegister = {
				name: 'General item outstanding register Name'
			};

			done();
		});
	});

	it('should be able to save General item outstanding register instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item outstanding register
				agent.post('/general-item-outstanding-registers')
					.send(generalItemOutstandingRegister)
					.expect(200)
					.end(function(generalItemOutstandingRegisterSaveErr, generalItemOutstandingRegisterSaveRes) {
						// Handle General item outstanding register save error
						if (generalItemOutstandingRegisterSaveErr) done(generalItemOutstandingRegisterSaveErr);

						// Get a list of General item outstanding registers
						agent.get('/general-item-outstanding-registers')
							.end(function(generalItemOutstandingRegistersGetErr, generalItemOutstandingRegistersGetRes) {
								// Handle General item outstanding register save error
								if (generalItemOutstandingRegistersGetErr) done(generalItemOutstandingRegistersGetErr);

								// Get General item outstanding registers list
								var generalItemOutstandingRegisters = generalItemOutstandingRegistersGetRes.body;

								// Set assertions
								(generalItemOutstandingRegisters[0].user._id).should.equal(userId);
								(generalItemOutstandingRegisters[0].name).should.match('General item outstanding register Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save General item outstanding register instance if not logged in', function(done) {
		agent.post('/general-item-outstanding-registers')
			.send(generalItemOutstandingRegister)
			.expect(401)
			.end(function(generalItemOutstandingRegisterSaveErr, generalItemOutstandingRegisterSaveRes) {
				// Call the assertion callback
				done(generalItemOutstandingRegisterSaveErr);
			});
	});

	it('should not be able to save General item outstanding register instance if no name is provided', function(done) {
		// Invalidate name field
		generalItemOutstandingRegister.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item outstanding register
				agent.post('/general-item-outstanding-registers')
					.send(generalItemOutstandingRegister)
					.expect(400)
					.end(function(generalItemOutstandingRegisterSaveErr, generalItemOutstandingRegisterSaveRes) {
						// Set message assertion
						(generalItemOutstandingRegisterSaveRes.body.message).should.match('Please fill General item outstanding register name');
						
						// Handle General item outstanding register save error
						done(generalItemOutstandingRegisterSaveErr);
					});
			});
	});

	it('should be able to update General item outstanding register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item outstanding register
				agent.post('/general-item-outstanding-registers')
					.send(generalItemOutstandingRegister)
					.expect(200)
					.end(function(generalItemOutstandingRegisterSaveErr, generalItemOutstandingRegisterSaveRes) {
						// Handle General item outstanding register save error
						if (generalItemOutstandingRegisterSaveErr) done(generalItemOutstandingRegisterSaveErr);

						// Update General item outstanding register name
						generalItemOutstandingRegister.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing General item outstanding register
						agent.put('/general-item-outstanding-registers/' + generalItemOutstandingRegisterSaveRes.body._id)
							.send(generalItemOutstandingRegister)
							.expect(200)
							.end(function(generalItemOutstandingRegisterUpdateErr, generalItemOutstandingRegisterUpdateRes) {
								// Handle General item outstanding register update error
								if (generalItemOutstandingRegisterUpdateErr) done(generalItemOutstandingRegisterUpdateErr);

								// Set assertions
								(generalItemOutstandingRegisterUpdateRes.body._id).should.equal(generalItemOutstandingRegisterSaveRes.body._id);
								(generalItemOutstandingRegisterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of General item outstanding registers if not signed in', function(done) {
		// Create new General item outstanding register model instance
		var generalItemOutstandingRegisterObj = new GeneralItemOutstandingRegister(generalItemOutstandingRegister);

		// Save the General item outstanding register
		generalItemOutstandingRegisterObj.save(function() {
			// Request General item outstanding registers
			request(app).get('/general-item-outstanding-registers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single General item outstanding register if not signed in', function(done) {
		// Create new General item outstanding register model instance
		var generalItemOutstandingRegisterObj = new GeneralItemOutstandingRegister(generalItemOutstandingRegister);

		// Save the General item outstanding register
		generalItemOutstandingRegisterObj.save(function() {
			request(app).get('/general-item-outstanding-registers/' + generalItemOutstandingRegisterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', generalItemOutstandingRegister.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete General item outstanding register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General item outstanding register
				agent.post('/general-item-outstanding-registers')
					.send(generalItemOutstandingRegister)
					.expect(200)
					.end(function(generalItemOutstandingRegisterSaveErr, generalItemOutstandingRegisterSaveRes) {
						// Handle General item outstanding register save error
						if (generalItemOutstandingRegisterSaveErr) done(generalItemOutstandingRegisterSaveErr);

						// Delete existing General item outstanding register
						agent.delete('/general-item-outstanding-registers/' + generalItemOutstandingRegisterSaveRes.body._id)
							.send(generalItemOutstandingRegister)
							.expect(200)
							.end(function(generalItemOutstandingRegisterDeleteErr, generalItemOutstandingRegisterDeleteRes) {
								// Handle General item outstanding register error error
								if (generalItemOutstandingRegisterDeleteErr) done(generalItemOutstandingRegisterDeleteErr);

								// Set assertions
								(generalItemOutstandingRegisterDeleteRes.body._id).should.equal(generalItemOutstandingRegisterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete General item outstanding register instance if not signed in', function(done) {
		// Set General item outstanding register user 
		generalItemOutstandingRegister.user = user;

		// Create new General item outstanding register model instance
		var generalItemOutstandingRegisterObj = new GeneralItemOutstandingRegister(generalItemOutstandingRegister);

		// Save the General item outstanding register
		generalItemOutstandingRegisterObj.save(function() {
			// Try deleting General item outstanding register
			request(app).delete('/general-item-outstanding-registers/' + generalItemOutstandingRegisterObj._id)
			.expect(401)
			.end(function(generalItemOutstandingRegisterDeleteErr, generalItemOutstandingRegisterDeleteRes) {
				// Set message assertion
				(generalItemOutstandingRegisterDeleteRes.body.message).should.match('User is not logged in');

				// Handle General item outstanding register error error
				done(generalItemOutstandingRegisterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		GeneralItemOutstandingRegister.remove().exec();
		done();
	});
});