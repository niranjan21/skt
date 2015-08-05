'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	YarnDelivery = mongoose.model('YarnDelivery'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, yarnDelivery;

/**
 * Yarn delivery routes tests
 */
describe('Yarn delivery CRUD tests', function() {
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

		// Save a user to the test db and create new Yarn delivery
		user.save(function() {
			yarnDelivery = {
				name: 'Yarn delivery Name'
			};

			done();
		});
	});

	it('should be able to save Yarn delivery instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn delivery
				agent.post('/yarn-deliveries')
					.send(yarnDelivery)
					.expect(200)
					.end(function(yarnDeliverySaveErr, yarnDeliverySaveRes) {
						// Handle Yarn delivery save error
						if (yarnDeliverySaveErr) done(yarnDeliverySaveErr);

						// Get a list of Yarn deliveries
						agent.get('/yarn-deliveries')
							.end(function(yarnDeliveriesGetErr, yarnDeliveriesGetRes) {
								// Handle Yarn delivery save error
								if (yarnDeliveriesGetErr) done(yarnDeliveriesGetErr);

								// Get Yarn deliveries list
								var yarnDeliveries = yarnDeliveriesGetRes.body;

								// Set assertions
								(yarnDeliveries[0].user._id).should.equal(userId);
								(yarnDeliveries[0].name).should.match('Yarn delivery Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Yarn delivery instance if not logged in', function(done) {
		agent.post('/yarn-deliveries')
			.send(yarnDelivery)
			.expect(401)
			.end(function(yarnDeliverySaveErr, yarnDeliverySaveRes) {
				// Call the assertion callback
				done(yarnDeliverySaveErr);
			});
	});

	it('should not be able to save Yarn delivery instance if no name is provided', function(done) {
		// Invalidate name field
		yarnDelivery.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn delivery
				agent.post('/yarn-deliveries')
					.send(yarnDelivery)
					.expect(400)
					.end(function(yarnDeliverySaveErr, yarnDeliverySaveRes) {
						// Set message assertion
						(yarnDeliverySaveRes.body.message).should.match('Please fill Yarn delivery name');
						
						// Handle Yarn delivery save error
						done(yarnDeliverySaveErr);
					});
			});
	});

	it('should be able to update Yarn delivery instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn delivery
				agent.post('/yarn-deliveries')
					.send(yarnDelivery)
					.expect(200)
					.end(function(yarnDeliverySaveErr, yarnDeliverySaveRes) {
						// Handle Yarn delivery save error
						if (yarnDeliverySaveErr) done(yarnDeliverySaveErr);

						// Update Yarn delivery name
						yarnDelivery.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Yarn delivery
						agent.put('/yarn-deliveries/' + yarnDeliverySaveRes.body._id)
							.send(yarnDelivery)
							.expect(200)
							.end(function(yarnDeliveryUpdateErr, yarnDeliveryUpdateRes) {
								// Handle Yarn delivery update error
								if (yarnDeliveryUpdateErr) done(yarnDeliveryUpdateErr);

								// Set assertions
								(yarnDeliveryUpdateRes.body._id).should.equal(yarnDeliverySaveRes.body._id);
								(yarnDeliveryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Yarn deliveries if not signed in', function(done) {
		// Create new Yarn delivery model instance
		var yarnDeliveryObj = new YarnDelivery(yarnDelivery);

		// Save the Yarn delivery
		yarnDeliveryObj.save(function() {
			// Request Yarn deliveries
			request(app).get('/yarn-deliveries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Yarn delivery if not signed in', function(done) {
		// Create new Yarn delivery model instance
		var yarnDeliveryObj = new YarnDelivery(yarnDelivery);

		// Save the Yarn delivery
		yarnDeliveryObj.save(function() {
			request(app).get('/yarn-deliveries/' + yarnDeliveryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', yarnDelivery.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Yarn delivery instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn delivery
				agent.post('/yarn-deliveries')
					.send(yarnDelivery)
					.expect(200)
					.end(function(yarnDeliverySaveErr, yarnDeliverySaveRes) {
						// Handle Yarn delivery save error
						if (yarnDeliverySaveErr) done(yarnDeliverySaveErr);

						// Delete existing Yarn delivery
						agent.delete('/yarn-deliveries/' + yarnDeliverySaveRes.body._id)
							.send(yarnDelivery)
							.expect(200)
							.end(function(yarnDeliveryDeleteErr, yarnDeliveryDeleteRes) {
								// Handle Yarn delivery error error
								if (yarnDeliveryDeleteErr) done(yarnDeliveryDeleteErr);

								// Set assertions
								(yarnDeliveryDeleteRes.body._id).should.equal(yarnDeliverySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Yarn delivery instance if not signed in', function(done) {
		// Set Yarn delivery user 
		yarnDelivery.user = user;

		// Create new Yarn delivery model instance
		var yarnDeliveryObj = new YarnDelivery(yarnDelivery);

		// Save the Yarn delivery
		yarnDeliveryObj.save(function() {
			// Try deleting Yarn delivery
			request(app).delete('/yarn-deliveries/' + yarnDeliveryObj._id)
			.expect(401)
			.end(function(yarnDeliveryDeleteErr, yarnDeliveryDeleteRes) {
				// Set message assertion
				(yarnDeliveryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Yarn delivery error error
				done(yarnDeliveryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		YarnDelivery.remove().exec();
		done();
	});
});