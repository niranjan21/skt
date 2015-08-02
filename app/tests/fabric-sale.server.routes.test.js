'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricSale = mongoose.model('FabricSale'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fabricSale;

/**
 * Fabric sale routes tests
 */
describe('Fabric sale CRUD tests', function() {
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

		// Save a user to the test db and create new Fabric sale
		user.save(function() {
			fabricSale = {
				name: 'Fabric sale Name'
			};

			done();
		});
	});

	it('should be able to save Fabric sale instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric sale
				agent.post('/fabric-sales')
					.send(fabricSale)
					.expect(200)
					.end(function(fabricSaleSaveErr, fabricSaleSaveRes) {
						// Handle Fabric sale save error
						if (fabricSaleSaveErr) done(fabricSaleSaveErr);

						// Get a list of Fabric sales
						agent.get('/fabric-sales')
							.end(function(fabricSalesGetErr, fabricSalesGetRes) {
								// Handle Fabric sale save error
								if (fabricSalesGetErr) done(fabricSalesGetErr);

								// Get Fabric sales list
								var fabricSales = fabricSalesGetRes.body;

								// Set assertions
								(fabricSales[0].user._id).should.equal(userId);
								(fabricSales[0].name).should.match('Fabric sale Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fabric sale instance if not logged in', function(done) {
		agent.post('/fabric-sales')
			.send(fabricSale)
			.expect(401)
			.end(function(fabricSaleSaveErr, fabricSaleSaveRes) {
				// Call the assertion callback
				done(fabricSaleSaveErr);
			});
	});

	it('should not be able to save Fabric sale instance if no name is provided', function(done) {
		// Invalidate name field
		fabricSale.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric sale
				agent.post('/fabric-sales')
					.send(fabricSale)
					.expect(400)
					.end(function(fabricSaleSaveErr, fabricSaleSaveRes) {
						// Set message assertion
						(fabricSaleSaveRes.body.message).should.match('Please fill Fabric sale name');
						
						// Handle Fabric sale save error
						done(fabricSaleSaveErr);
					});
			});
	});

	it('should be able to update Fabric sale instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric sale
				agent.post('/fabric-sales')
					.send(fabricSale)
					.expect(200)
					.end(function(fabricSaleSaveErr, fabricSaleSaveRes) {
						// Handle Fabric sale save error
						if (fabricSaleSaveErr) done(fabricSaleSaveErr);

						// Update Fabric sale name
						fabricSale.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fabric sale
						agent.put('/fabric-sales/' + fabricSaleSaveRes.body._id)
							.send(fabricSale)
							.expect(200)
							.end(function(fabricSaleUpdateErr, fabricSaleUpdateRes) {
								// Handle Fabric sale update error
								if (fabricSaleUpdateErr) done(fabricSaleUpdateErr);

								// Set assertions
								(fabricSaleUpdateRes.body._id).should.equal(fabricSaleSaveRes.body._id);
								(fabricSaleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fabric sales if not signed in', function(done) {
		// Create new Fabric sale model instance
		var fabricSaleObj = new FabricSale(fabricSale);

		// Save the Fabric sale
		fabricSaleObj.save(function() {
			// Request Fabric sales
			request(app).get('/fabric-sales')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fabric sale if not signed in', function(done) {
		// Create new Fabric sale model instance
		var fabricSaleObj = new FabricSale(fabricSale);

		// Save the Fabric sale
		fabricSaleObj.save(function() {
			request(app).get('/fabric-sales/' + fabricSaleObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fabricSale.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fabric sale instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric sale
				agent.post('/fabric-sales')
					.send(fabricSale)
					.expect(200)
					.end(function(fabricSaleSaveErr, fabricSaleSaveRes) {
						// Handle Fabric sale save error
						if (fabricSaleSaveErr) done(fabricSaleSaveErr);

						// Delete existing Fabric sale
						agent.delete('/fabric-sales/' + fabricSaleSaveRes.body._id)
							.send(fabricSale)
							.expect(200)
							.end(function(fabricSaleDeleteErr, fabricSaleDeleteRes) {
								// Handle Fabric sale error error
								if (fabricSaleDeleteErr) done(fabricSaleDeleteErr);

								// Set assertions
								(fabricSaleDeleteRes.body._id).should.equal(fabricSaleSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fabric sale instance if not signed in', function(done) {
		// Set Fabric sale user 
		fabricSale.user = user;

		// Create new Fabric sale model instance
		var fabricSaleObj = new FabricSale(fabricSale);

		// Save the Fabric sale
		fabricSaleObj.save(function() {
			// Try deleting Fabric sale
			request(app).delete('/fabric-sales/' + fabricSaleObj._id)
			.expect(401)
			.end(function(fabricSaleDeleteErr, fabricSaleDeleteRes) {
				// Set message assertion
				(fabricSaleDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fabric sale error error
				done(fabricSaleDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FabricSale.remove().exec();
		done();
	});
});