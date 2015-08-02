'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricTransfer = mongoose.model('FabricTransfer'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fabricTransfer;

/**
 * Fabric transfer routes tests
 */
describe('Fabric transfer CRUD tests', function() {
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

		// Save a user to the test db and create new Fabric transfer
		user.save(function() {
			fabricTransfer = {
				name: 'Fabric transfer Name'
			};

			done();
		});
	});

	it('should be able to save Fabric transfer instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric transfer
				agent.post('/fabric-transfers')
					.send(fabricTransfer)
					.expect(200)
					.end(function(fabricTransferSaveErr, fabricTransferSaveRes) {
						// Handle Fabric transfer save error
						if (fabricTransferSaveErr) done(fabricTransferSaveErr);

						// Get a list of Fabric transfers
						agent.get('/fabric-transfers')
							.end(function(fabricTransfersGetErr, fabricTransfersGetRes) {
								// Handle Fabric transfer save error
								if (fabricTransfersGetErr) done(fabricTransfersGetErr);

								// Get Fabric transfers list
								var fabricTransfers = fabricTransfersGetRes.body;

								// Set assertions
								(fabricTransfers[0].user._id).should.equal(userId);
								(fabricTransfers[0].name).should.match('Fabric transfer Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fabric transfer instance if not logged in', function(done) {
		agent.post('/fabric-transfers')
			.send(fabricTransfer)
			.expect(401)
			.end(function(fabricTransferSaveErr, fabricTransferSaveRes) {
				// Call the assertion callback
				done(fabricTransferSaveErr);
			});
	});

	it('should not be able to save Fabric transfer instance if no name is provided', function(done) {
		// Invalidate name field
		fabricTransfer.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric transfer
				agent.post('/fabric-transfers')
					.send(fabricTransfer)
					.expect(400)
					.end(function(fabricTransferSaveErr, fabricTransferSaveRes) {
						// Set message assertion
						(fabricTransferSaveRes.body.message).should.match('Please fill Fabric transfer name');
						
						// Handle Fabric transfer save error
						done(fabricTransferSaveErr);
					});
			});
	});

	it('should be able to update Fabric transfer instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric transfer
				agent.post('/fabric-transfers')
					.send(fabricTransfer)
					.expect(200)
					.end(function(fabricTransferSaveErr, fabricTransferSaveRes) {
						// Handle Fabric transfer save error
						if (fabricTransferSaveErr) done(fabricTransferSaveErr);

						// Update Fabric transfer name
						fabricTransfer.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fabric transfer
						agent.put('/fabric-transfers/' + fabricTransferSaveRes.body._id)
							.send(fabricTransfer)
							.expect(200)
							.end(function(fabricTransferUpdateErr, fabricTransferUpdateRes) {
								// Handle Fabric transfer update error
								if (fabricTransferUpdateErr) done(fabricTransferUpdateErr);

								// Set assertions
								(fabricTransferUpdateRes.body._id).should.equal(fabricTransferSaveRes.body._id);
								(fabricTransferUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fabric transfers if not signed in', function(done) {
		// Create new Fabric transfer model instance
		var fabricTransferObj = new FabricTransfer(fabricTransfer);

		// Save the Fabric transfer
		fabricTransferObj.save(function() {
			// Request Fabric transfers
			request(app).get('/fabric-transfers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fabric transfer if not signed in', function(done) {
		// Create new Fabric transfer model instance
		var fabricTransferObj = new FabricTransfer(fabricTransfer);

		// Save the Fabric transfer
		fabricTransferObj.save(function() {
			request(app).get('/fabric-transfers/' + fabricTransferObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fabricTransfer.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fabric transfer instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric transfer
				agent.post('/fabric-transfers')
					.send(fabricTransfer)
					.expect(200)
					.end(function(fabricTransferSaveErr, fabricTransferSaveRes) {
						// Handle Fabric transfer save error
						if (fabricTransferSaveErr) done(fabricTransferSaveErr);

						// Delete existing Fabric transfer
						agent.delete('/fabric-transfers/' + fabricTransferSaveRes.body._id)
							.send(fabricTransfer)
							.expect(200)
							.end(function(fabricTransferDeleteErr, fabricTransferDeleteRes) {
								// Handle Fabric transfer error error
								if (fabricTransferDeleteErr) done(fabricTransferDeleteErr);

								// Set assertions
								(fabricTransferDeleteRes.body._id).should.equal(fabricTransferSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fabric transfer instance if not signed in', function(done) {
		// Set Fabric transfer user 
		fabricTransfer.user = user;

		// Create new Fabric transfer model instance
		var fabricTransferObj = new FabricTransfer(fabricTransfer);

		// Save the Fabric transfer
		fabricTransferObj.save(function() {
			// Try deleting Fabric transfer
			request(app).delete('/fabric-transfers/' + fabricTransferObj._id)
			.expect(401)
			.end(function(fabricTransferDeleteErr, fabricTransferDeleteRes) {
				// Set message assertion
				(fabricTransferDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fabric transfer error error
				done(fabricTransferDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FabricTransfer.remove().exec();
		done();
	});
});