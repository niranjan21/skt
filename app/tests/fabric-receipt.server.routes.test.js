'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricReceipt = mongoose.model('FabricReceipt'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fabricReceipt;

/**
 * Fabric receipt routes tests
 */
describe('Fabric receipt CRUD tests', function() {
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

		// Save a user to the test db and create new Fabric receipt
		user.save(function() {
			fabricReceipt = {
				name: 'Fabric receipt Name'
			};

			done();
		});
	});

	it('should be able to save Fabric receipt instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric receipt
				agent.post('/fabric-receipts')
					.send(fabricReceipt)
					.expect(200)
					.end(function(fabricReceiptSaveErr, fabricReceiptSaveRes) {
						// Handle Fabric receipt save error
						if (fabricReceiptSaveErr) done(fabricReceiptSaveErr);

						// Get a list of Fabric receipts
						agent.get('/fabric-receipts')
							.end(function(fabricReceiptsGetErr, fabricReceiptsGetRes) {
								// Handle Fabric receipt save error
								if (fabricReceiptsGetErr) done(fabricReceiptsGetErr);

								// Get Fabric receipts list
								var fabricReceipts = fabricReceiptsGetRes.body;

								// Set assertions
								(fabricReceipts[0].user._id).should.equal(userId);
								(fabricReceipts[0].name).should.match('Fabric receipt Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fabric receipt instance if not logged in', function(done) {
		agent.post('/fabric-receipts')
			.send(fabricReceipt)
			.expect(401)
			.end(function(fabricReceiptSaveErr, fabricReceiptSaveRes) {
				// Call the assertion callback
				done(fabricReceiptSaveErr);
			});
	});

	it('should not be able to save Fabric receipt instance if no name is provided', function(done) {
		// Invalidate name field
		fabricReceipt.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric receipt
				agent.post('/fabric-receipts')
					.send(fabricReceipt)
					.expect(400)
					.end(function(fabricReceiptSaveErr, fabricReceiptSaveRes) {
						// Set message assertion
						(fabricReceiptSaveRes.body.message).should.match('Please fill Fabric receipt name');
						
						// Handle Fabric receipt save error
						done(fabricReceiptSaveErr);
					});
			});
	});

	it('should be able to update Fabric receipt instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric receipt
				agent.post('/fabric-receipts')
					.send(fabricReceipt)
					.expect(200)
					.end(function(fabricReceiptSaveErr, fabricReceiptSaveRes) {
						// Handle Fabric receipt save error
						if (fabricReceiptSaveErr) done(fabricReceiptSaveErr);

						// Update Fabric receipt name
						fabricReceipt.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fabric receipt
						agent.put('/fabric-receipts/' + fabricReceiptSaveRes.body._id)
							.send(fabricReceipt)
							.expect(200)
							.end(function(fabricReceiptUpdateErr, fabricReceiptUpdateRes) {
								// Handle Fabric receipt update error
								if (fabricReceiptUpdateErr) done(fabricReceiptUpdateErr);

								// Set assertions
								(fabricReceiptUpdateRes.body._id).should.equal(fabricReceiptSaveRes.body._id);
								(fabricReceiptUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fabric receipts if not signed in', function(done) {
		// Create new Fabric receipt model instance
		var fabricReceiptObj = new FabricReceipt(fabricReceipt);

		// Save the Fabric receipt
		fabricReceiptObj.save(function() {
			// Request Fabric receipts
			request(app).get('/fabric-receipts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fabric receipt if not signed in', function(done) {
		// Create new Fabric receipt model instance
		var fabricReceiptObj = new FabricReceipt(fabricReceipt);

		// Save the Fabric receipt
		fabricReceiptObj.save(function() {
			request(app).get('/fabric-receipts/' + fabricReceiptObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fabricReceipt.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fabric receipt instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric receipt
				agent.post('/fabric-receipts')
					.send(fabricReceipt)
					.expect(200)
					.end(function(fabricReceiptSaveErr, fabricReceiptSaveRes) {
						// Handle Fabric receipt save error
						if (fabricReceiptSaveErr) done(fabricReceiptSaveErr);

						// Delete existing Fabric receipt
						agent.delete('/fabric-receipts/' + fabricReceiptSaveRes.body._id)
							.send(fabricReceipt)
							.expect(200)
							.end(function(fabricReceiptDeleteErr, fabricReceiptDeleteRes) {
								// Handle Fabric receipt error error
								if (fabricReceiptDeleteErr) done(fabricReceiptDeleteErr);

								// Set assertions
								(fabricReceiptDeleteRes.body._id).should.equal(fabricReceiptSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fabric receipt instance if not signed in', function(done) {
		// Set Fabric receipt user 
		fabricReceipt.user = user;

		// Create new Fabric receipt model instance
		var fabricReceiptObj = new FabricReceipt(fabricReceipt);

		// Save the Fabric receipt
		fabricReceiptObj.save(function() {
			// Try deleting Fabric receipt
			request(app).delete('/fabric-receipts/' + fabricReceiptObj._id)
			.expect(401)
			.end(function(fabricReceiptDeleteErr, fabricReceiptDeleteRes) {
				// Set message assertion
				(fabricReceiptDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fabric receipt error error
				done(fabricReceiptDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FabricReceipt.remove().exec();
		done();
	});
});