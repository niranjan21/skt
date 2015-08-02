'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricTransferRegister = mongoose.model('FabricTransferRegister'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fabricTransferRegister;

/**
 * Fabric transfer register routes tests
 */
describe('Fabric transfer register CRUD tests', function() {
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

		// Save a user to the test db and create new Fabric transfer register
		user.save(function() {
			fabricTransferRegister = {
				name: 'Fabric transfer register Name'
			};

			done();
		});
	});

	it('should be able to save Fabric transfer register instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric transfer register
				agent.post('/fabric-transfer-registers')
					.send(fabricTransferRegister)
					.expect(200)
					.end(function(fabricTransferRegisterSaveErr, fabricTransferRegisterSaveRes) {
						// Handle Fabric transfer register save error
						if (fabricTransferRegisterSaveErr) done(fabricTransferRegisterSaveErr);

						// Get a list of Fabric transfer registers
						agent.get('/fabric-transfer-registers')
							.end(function(fabricTransferRegistersGetErr, fabricTransferRegistersGetRes) {
								// Handle Fabric transfer register save error
								if (fabricTransferRegistersGetErr) done(fabricTransferRegistersGetErr);

								// Get Fabric transfer registers list
								var fabricTransferRegisters = fabricTransferRegistersGetRes.body;

								// Set assertions
								(fabricTransferRegisters[0].user._id).should.equal(userId);
								(fabricTransferRegisters[0].name).should.match('Fabric transfer register Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fabric transfer register instance if not logged in', function(done) {
		agent.post('/fabric-transfer-registers')
			.send(fabricTransferRegister)
			.expect(401)
			.end(function(fabricTransferRegisterSaveErr, fabricTransferRegisterSaveRes) {
				// Call the assertion callback
				done(fabricTransferRegisterSaveErr);
			});
	});

	it('should not be able to save Fabric transfer register instance if no name is provided', function(done) {
		// Invalidate name field
		fabricTransferRegister.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric transfer register
				agent.post('/fabric-transfer-registers')
					.send(fabricTransferRegister)
					.expect(400)
					.end(function(fabricTransferRegisterSaveErr, fabricTransferRegisterSaveRes) {
						// Set message assertion
						(fabricTransferRegisterSaveRes.body.message).should.match('Please fill Fabric transfer register name');
						
						// Handle Fabric transfer register save error
						done(fabricTransferRegisterSaveErr);
					});
			});
	});

	it('should be able to update Fabric transfer register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric transfer register
				agent.post('/fabric-transfer-registers')
					.send(fabricTransferRegister)
					.expect(200)
					.end(function(fabricTransferRegisterSaveErr, fabricTransferRegisterSaveRes) {
						// Handle Fabric transfer register save error
						if (fabricTransferRegisterSaveErr) done(fabricTransferRegisterSaveErr);

						// Update Fabric transfer register name
						fabricTransferRegister.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fabric transfer register
						agent.put('/fabric-transfer-registers/' + fabricTransferRegisterSaveRes.body._id)
							.send(fabricTransferRegister)
							.expect(200)
							.end(function(fabricTransferRegisterUpdateErr, fabricTransferRegisterUpdateRes) {
								// Handle Fabric transfer register update error
								if (fabricTransferRegisterUpdateErr) done(fabricTransferRegisterUpdateErr);

								// Set assertions
								(fabricTransferRegisterUpdateRes.body._id).should.equal(fabricTransferRegisterSaveRes.body._id);
								(fabricTransferRegisterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fabric transfer registers if not signed in', function(done) {
		// Create new Fabric transfer register model instance
		var fabricTransferRegisterObj = new FabricTransferRegister(fabricTransferRegister);

		// Save the Fabric transfer register
		fabricTransferRegisterObj.save(function() {
			// Request Fabric transfer registers
			request(app).get('/fabric-transfer-registers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fabric transfer register if not signed in', function(done) {
		// Create new Fabric transfer register model instance
		var fabricTransferRegisterObj = new FabricTransferRegister(fabricTransferRegister);

		// Save the Fabric transfer register
		fabricTransferRegisterObj.save(function() {
			request(app).get('/fabric-transfer-registers/' + fabricTransferRegisterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fabricTransferRegister.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fabric transfer register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric transfer register
				agent.post('/fabric-transfer-registers')
					.send(fabricTransferRegister)
					.expect(200)
					.end(function(fabricTransferRegisterSaveErr, fabricTransferRegisterSaveRes) {
						// Handle Fabric transfer register save error
						if (fabricTransferRegisterSaveErr) done(fabricTransferRegisterSaveErr);

						// Delete existing Fabric transfer register
						agent.delete('/fabric-transfer-registers/' + fabricTransferRegisterSaveRes.body._id)
							.send(fabricTransferRegister)
							.expect(200)
							.end(function(fabricTransferRegisterDeleteErr, fabricTransferRegisterDeleteRes) {
								// Handle Fabric transfer register error error
								if (fabricTransferRegisterDeleteErr) done(fabricTransferRegisterDeleteErr);

								// Set assertions
								(fabricTransferRegisterDeleteRes.body._id).should.equal(fabricTransferRegisterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fabric transfer register instance if not signed in', function(done) {
		// Set Fabric transfer register user 
		fabricTransferRegister.user = user;

		// Create new Fabric transfer register model instance
		var fabricTransferRegisterObj = new FabricTransferRegister(fabricTransferRegister);

		// Save the Fabric transfer register
		fabricTransferRegisterObj.save(function() {
			// Try deleting Fabric transfer register
			request(app).delete('/fabric-transfer-registers/' + fabricTransferRegisterObj._id)
			.expect(401)
			.end(function(fabricTransferRegisterDeleteErr, fabricTransferRegisterDeleteRes) {
				// Set message assertion
				(fabricTransferRegisterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fabric transfer register error error
				done(fabricTransferRegisterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FabricTransferRegister.remove().exec();
		done();
	});
});