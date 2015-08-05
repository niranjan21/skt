'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ProductionParameter = mongoose.model('ProductionParameter'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, productionParameter;

/**
 * Production parameter routes tests
 */
describe('Production parameter CRUD tests', function() {
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

		// Save a user to the test db and create new Production parameter
		user.save(function() {
			productionParameter = {
				name: 'Production parameter Name'
			};

			done();
		});
	});

	it('should be able to save Production parameter instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production parameter
				agent.post('/production-parameters')
					.send(productionParameter)
					.expect(200)
					.end(function(productionParameterSaveErr, productionParameterSaveRes) {
						// Handle Production parameter save error
						if (productionParameterSaveErr) done(productionParameterSaveErr);

						// Get a list of Production parameters
						agent.get('/production-parameters')
							.end(function(productionParametersGetErr, productionParametersGetRes) {
								// Handle Production parameter save error
								if (productionParametersGetErr) done(productionParametersGetErr);

								// Get Production parameters list
								var productionParameters = productionParametersGetRes.body;

								// Set assertions
								(productionParameters[0].user._id).should.equal(userId);
								(productionParameters[0].name).should.match('Production parameter Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Production parameter instance if not logged in', function(done) {
		agent.post('/production-parameters')
			.send(productionParameter)
			.expect(401)
			.end(function(productionParameterSaveErr, productionParameterSaveRes) {
				// Call the assertion callback
				done(productionParameterSaveErr);
			});
	});

	it('should not be able to save Production parameter instance if no name is provided', function(done) {
		// Invalidate name field
		productionParameter.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production parameter
				agent.post('/production-parameters')
					.send(productionParameter)
					.expect(400)
					.end(function(productionParameterSaveErr, productionParameterSaveRes) {
						// Set message assertion
						(productionParameterSaveRes.body.message).should.match('Please fill Production parameter name');
						
						// Handle Production parameter save error
						done(productionParameterSaveErr);
					});
			});
	});

	it('should be able to update Production parameter instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production parameter
				agent.post('/production-parameters')
					.send(productionParameter)
					.expect(200)
					.end(function(productionParameterSaveErr, productionParameterSaveRes) {
						// Handle Production parameter save error
						if (productionParameterSaveErr) done(productionParameterSaveErr);

						// Update Production parameter name
						productionParameter.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Production parameter
						agent.put('/production-parameters/' + productionParameterSaveRes.body._id)
							.send(productionParameter)
							.expect(200)
							.end(function(productionParameterUpdateErr, productionParameterUpdateRes) {
								// Handle Production parameter update error
								if (productionParameterUpdateErr) done(productionParameterUpdateErr);

								// Set assertions
								(productionParameterUpdateRes.body._id).should.equal(productionParameterSaveRes.body._id);
								(productionParameterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Production parameters if not signed in', function(done) {
		// Create new Production parameter model instance
		var productionParameterObj = new ProductionParameter(productionParameter);

		// Save the Production parameter
		productionParameterObj.save(function() {
			// Request Production parameters
			request(app).get('/production-parameters')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Production parameter if not signed in', function(done) {
		// Create new Production parameter model instance
		var productionParameterObj = new ProductionParameter(productionParameter);

		// Save the Production parameter
		productionParameterObj.save(function() {
			request(app).get('/production-parameters/' + productionParameterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', productionParameter.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Production parameter instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production parameter
				agent.post('/production-parameters')
					.send(productionParameter)
					.expect(200)
					.end(function(productionParameterSaveErr, productionParameterSaveRes) {
						// Handle Production parameter save error
						if (productionParameterSaveErr) done(productionParameterSaveErr);

						// Delete existing Production parameter
						agent.delete('/production-parameters/' + productionParameterSaveRes.body._id)
							.send(productionParameter)
							.expect(200)
							.end(function(productionParameterDeleteErr, productionParameterDeleteRes) {
								// Handle Production parameter error error
								if (productionParameterDeleteErr) done(productionParameterDeleteErr);

								// Set assertions
								(productionParameterDeleteRes.body._id).should.equal(productionParameterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Production parameter instance if not signed in', function(done) {
		// Set Production parameter user 
		productionParameter.user = user;

		// Create new Production parameter model instance
		var productionParameterObj = new ProductionParameter(productionParameter);

		// Save the Production parameter
		productionParameterObj.save(function() {
			// Try deleting Production parameter
			request(app).delete('/production-parameters/' + productionParameterObj._id)
			.expect(401)
			.end(function(productionParameterDeleteErr, productionParameterDeleteRes) {
				// Set message assertion
				(productionParameterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Production parameter error error
				done(productionParameterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ProductionParameter.remove().exec();
		done();
	});
});