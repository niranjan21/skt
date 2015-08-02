'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricSaleRegister = mongoose.model('FabricSaleRegister'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fabricSaleRegister;

/**
 * Fabric sale register routes tests
 */
describe('Fabric sale register CRUD tests', function() {
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

		// Save a user to the test db and create new Fabric sale register
		user.save(function() {
			fabricSaleRegister = {
				name: 'Fabric sale register Name'
			};

			done();
		});
	});

	it('should be able to save Fabric sale register instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric sale register
				agent.post('/fabric-sale-registers')
					.send(fabricSaleRegister)
					.expect(200)
					.end(function(fabricSaleRegisterSaveErr, fabricSaleRegisterSaveRes) {
						// Handle Fabric sale register save error
						if (fabricSaleRegisterSaveErr) done(fabricSaleRegisterSaveErr);

						// Get a list of Fabric sale registers
						agent.get('/fabric-sale-registers')
							.end(function(fabricSaleRegistersGetErr, fabricSaleRegistersGetRes) {
								// Handle Fabric sale register save error
								if (fabricSaleRegistersGetErr) done(fabricSaleRegistersGetErr);

								// Get Fabric sale registers list
								var fabricSaleRegisters = fabricSaleRegistersGetRes.body;

								// Set assertions
								(fabricSaleRegisters[0].user._id).should.equal(userId);
								(fabricSaleRegisters[0].name).should.match('Fabric sale register Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fabric sale register instance if not logged in', function(done) {
		agent.post('/fabric-sale-registers')
			.send(fabricSaleRegister)
			.expect(401)
			.end(function(fabricSaleRegisterSaveErr, fabricSaleRegisterSaveRes) {
				// Call the assertion callback
				done(fabricSaleRegisterSaveErr);
			});
	});

	it('should not be able to save Fabric sale register instance if no name is provided', function(done) {
		// Invalidate name field
		fabricSaleRegister.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric sale register
				agent.post('/fabric-sale-registers')
					.send(fabricSaleRegister)
					.expect(400)
					.end(function(fabricSaleRegisterSaveErr, fabricSaleRegisterSaveRes) {
						// Set message assertion
						(fabricSaleRegisterSaveRes.body.message).should.match('Please fill Fabric sale register name');
						
						// Handle Fabric sale register save error
						done(fabricSaleRegisterSaveErr);
					});
			});
	});

	it('should be able to update Fabric sale register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric sale register
				agent.post('/fabric-sale-registers')
					.send(fabricSaleRegister)
					.expect(200)
					.end(function(fabricSaleRegisterSaveErr, fabricSaleRegisterSaveRes) {
						// Handle Fabric sale register save error
						if (fabricSaleRegisterSaveErr) done(fabricSaleRegisterSaveErr);

						// Update Fabric sale register name
						fabricSaleRegister.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fabric sale register
						agent.put('/fabric-sale-registers/' + fabricSaleRegisterSaveRes.body._id)
							.send(fabricSaleRegister)
							.expect(200)
							.end(function(fabricSaleRegisterUpdateErr, fabricSaleRegisterUpdateRes) {
								// Handle Fabric sale register update error
								if (fabricSaleRegisterUpdateErr) done(fabricSaleRegisterUpdateErr);

								// Set assertions
								(fabricSaleRegisterUpdateRes.body._id).should.equal(fabricSaleRegisterSaveRes.body._id);
								(fabricSaleRegisterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fabric sale registers if not signed in', function(done) {
		// Create new Fabric sale register model instance
		var fabricSaleRegisterObj = new FabricSaleRegister(fabricSaleRegister);

		// Save the Fabric sale register
		fabricSaleRegisterObj.save(function() {
			// Request Fabric sale registers
			request(app).get('/fabric-sale-registers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fabric sale register if not signed in', function(done) {
		// Create new Fabric sale register model instance
		var fabricSaleRegisterObj = new FabricSaleRegister(fabricSaleRegister);

		// Save the Fabric sale register
		fabricSaleRegisterObj.save(function() {
			request(app).get('/fabric-sale-registers/' + fabricSaleRegisterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fabricSaleRegister.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fabric sale register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric sale register
				agent.post('/fabric-sale-registers')
					.send(fabricSaleRegister)
					.expect(200)
					.end(function(fabricSaleRegisterSaveErr, fabricSaleRegisterSaveRes) {
						// Handle Fabric sale register save error
						if (fabricSaleRegisterSaveErr) done(fabricSaleRegisterSaveErr);

						// Delete existing Fabric sale register
						agent.delete('/fabric-sale-registers/' + fabricSaleRegisterSaveRes.body._id)
							.send(fabricSaleRegister)
							.expect(200)
							.end(function(fabricSaleRegisterDeleteErr, fabricSaleRegisterDeleteRes) {
								// Handle Fabric sale register error error
								if (fabricSaleRegisterDeleteErr) done(fabricSaleRegisterDeleteErr);

								// Set assertions
								(fabricSaleRegisterDeleteRes.body._id).should.equal(fabricSaleRegisterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fabric sale register instance if not signed in', function(done) {
		// Set Fabric sale register user 
		fabricSaleRegister.user = user;

		// Create new Fabric sale register model instance
		var fabricSaleRegisterObj = new FabricSaleRegister(fabricSaleRegister);

		// Save the Fabric sale register
		fabricSaleRegisterObj.save(function() {
			// Try deleting Fabric sale register
			request(app).delete('/fabric-sale-registers/' + fabricSaleRegisterObj._id)
			.expect(401)
			.end(function(fabricSaleRegisterDeleteErr, fabricSaleRegisterDeleteRes) {
				// Set message assertion
				(fabricSaleRegisterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fabric sale register error error
				done(fabricSaleRegisterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FabricSaleRegister.remove().exec();
		done();
	});
});