'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricItemMaster = mongoose.model('FabricItemMaster'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fabricItemMaster;

/**
 * Fabric item master routes tests
 */
describe('Fabric item master CRUD tests', function() {
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

		// Save a user to the test db and create new Fabric item master
		user.save(function() {
			fabricItemMaster = {
				name: 'Fabric item master Name'
			};

			done();
		});
	});

	it('should be able to save Fabric item master instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric item master
				agent.post('/fabric-item-masters')
					.send(fabricItemMaster)
					.expect(200)
					.end(function(fabricItemMasterSaveErr, fabricItemMasterSaveRes) {
						// Handle Fabric item master save error
						if (fabricItemMasterSaveErr) done(fabricItemMasterSaveErr);

						// Get a list of Fabric item masters
						agent.get('/fabric-item-masters')
							.end(function(fabricItemMastersGetErr, fabricItemMastersGetRes) {
								// Handle Fabric item master save error
								if (fabricItemMastersGetErr) done(fabricItemMastersGetErr);

								// Get Fabric item masters list
								var fabricItemMasters = fabricItemMastersGetRes.body;

								// Set assertions
								(fabricItemMasters[0].user._id).should.equal(userId);
								(fabricItemMasters[0].name).should.match('Fabric item master Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fabric item master instance if not logged in', function(done) {
		agent.post('/fabric-item-masters')
			.send(fabricItemMaster)
			.expect(401)
			.end(function(fabricItemMasterSaveErr, fabricItemMasterSaveRes) {
				// Call the assertion callback
				done(fabricItemMasterSaveErr);
			});
	});

	it('should not be able to save Fabric item master instance if no name is provided', function(done) {
		// Invalidate name field
		fabricItemMaster.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric item master
				agent.post('/fabric-item-masters')
					.send(fabricItemMaster)
					.expect(400)
					.end(function(fabricItemMasterSaveErr, fabricItemMasterSaveRes) {
						// Set message assertion
						(fabricItemMasterSaveRes.body.message).should.match('Please fill Fabric item master name');
						
						// Handle Fabric item master save error
						done(fabricItemMasterSaveErr);
					});
			});
	});

	it('should be able to update Fabric item master instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric item master
				agent.post('/fabric-item-masters')
					.send(fabricItemMaster)
					.expect(200)
					.end(function(fabricItemMasterSaveErr, fabricItemMasterSaveRes) {
						// Handle Fabric item master save error
						if (fabricItemMasterSaveErr) done(fabricItemMasterSaveErr);

						// Update Fabric item master name
						fabricItemMaster.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fabric item master
						agent.put('/fabric-item-masters/' + fabricItemMasterSaveRes.body._id)
							.send(fabricItemMaster)
							.expect(200)
							.end(function(fabricItemMasterUpdateErr, fabricItemMasterUpdateRes) {
								// Handle Fabric item master update error
								if (fabricItemMasterUpdateErr) done(fabricItemMasterUpdateErr);

								// Set assertions
								(fabricItemMasterUpdateRes.body._id).should.equal(fabricItemMasterSaveRes.body._id);
								(fabricItemMasterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fabric item masters if not signed in', function(done) {
		// Create new Fabric item master model instance
		var fabricItemMasterObj = new FabricItemMaster(fabricItemMaster);

		// Save the Fabric item master
		fabricItemMasterObj.save(function() {
			// Request Fabric item masters
			request(app).get('/fabric-item-masters')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fabric item master if not signed in', function(done) {
		// Create new Fabric item master model instance
		var fabricItemMasterObj = new FabricItemMaster(fabricItemMaster);

		// Save the Fabric item master
		fabricItemMasterObj.save(function() {
			request(app).get('/fabric-item-masters/' + fabricItemMasterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fabricItemMaster.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fabric item master instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric item master
				agent.post('/fabric-item-masters')
					.send(fabricItemMaster)
					.expect(200)
					.end(function(fabricItemMasterSaveErr, fabricItemMasterSaveRes) {
						// Handle Fabric item master save error
						if (fabricItemMasterSaveErr) done(fabricItemMasterSaveErr);

						// Delete existing Fabric item master
						agent.delete('/fabric-item-masters/' + fabricItemMasterSaveRes.body._id)
							.send(fabricItemMaster)
							.expect(200)
							.end(function(fabricItemMasterDeleteErr, fabricItemMasterDeleteRes) {
								// Handle Fabric item master error error
								if (fabricItemMasterDeleteErr) done(fabricItemMasterDeleteErr);

								// Set assertions
								(fabricItemMasterDeleteRes.body._id).should.equal(fabricItemMasterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fabric item master instance if not signed in', function(done) {
		// Set Fabric item master user 
		fabricItemMaster.user = user;

		// Create new Fabric item master model instance
		var fabricItemMasterObj = new FabricItemMaster(fabricItemMaster);

		// Save the Fabric item master
		fabricItemMasterObj.save(function() {
			// Try deleting Fabric item master
			request(app).delete('/fabric-item-masters/' + fabricItemMasterObj._id)
			.expect(401)
			.end(function(fabricItemMasterDeleteErr, fabricItemMasterDeleteRes) {
				// Set message assertion
				(fabricItemMasterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fabric item master error error
				done(fabricItemMasterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FabricItemMaster.remove().exec();
		done();
	});
});