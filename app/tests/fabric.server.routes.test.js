'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Fabric = mongoose.model('Fabric'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fabric;

/**
 * Fabric routes tests
 */
describe('Fabric CRUD tests', function() {
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

		// Save a user to the test db and create new Fabric
		user.save(function() {
			fabric = {
				name: 'Fabric Name'
			};

			done();
		});
	});

	it('should be able to save Fabric instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric
				agent.post('/fabrics')
					.send(fabric)
					.expect(200)
					.end(function(fabricSaveErr, fabricSaveRes) {
						// Handle Fabric save error
						if (fabricSaveErr) done(fabricSaveErr);

						// Get a list of Fabrics
						agent.get('/fabrics')
							.end(function(fabricsGetErr, fabricsGetRes) {
								// Handle Fabric save error
								if (fabricsGetErr) done(fabricsGetErr);

								// Get Fabrics list
								var fabrics = fabricsGetRes.body;

								// Set assertions
								(fabrics[0].user._id).should.equal(userId);
								(fabrics[0].name).should.match('Fabric Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fabric instance if not logged in', function(done) {
		agent.post('/fabrics')
			.send(fabric)
			.expect(401)
			.end(function(fabricSaveErr, fabricSaveRes) {
				// Call the assertion callback
				done(fabricSaveErr);
			});
	});

	it('should not be able to save Fabric instance if no name is provided', function(done) {
		// Invalidate name field
		fabric.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric
				agent.post('/fabrics')
					.send(fabric)
					.expect(400)
					.end(function(fabricSaveErr, fabricSaveRes) {
						// Set message assertion
						(fabricSaveRes.body.message).should.match('Please fill Fabric name');
						
						// Handle Fabric save error
						done(fabricSaveErr);
					});
			});
	});

	it('should be able to update Fabric instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric
				agent.post('/fabrics')
					.send(fabric)
					.expect(200)
					.end(function(fabricSaveErr, fabricSaveRes) {
						// Handle Fabric save error
						if (fabricSaveErr) done(fabricSaveErr);

						// Update Fabric name
						fabric.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fabric
						agent.put('/fabrics/' + fabricSaveRes.body._id)
							.send(fabric)
							.expect(200)
							.end(function(fabricUpdateErr, fabricUpdateRes) {
								// Handle Fabric update error
								if (fabricUpdateErr) done(fabricUpdateErr);

								// Set assertions
								(fabricUpdateRes.body._id).should.equal(fabricSaveRes.body._id);
								(fabricUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fabrics if not signed in', function(done) {
		// Create new Fabric model instance
		var fabricObj = new Fabric(fabric);

		// Save the Fabric
		fabricObj.save(function() {
			// Request Fabrics
			request(app).get('/fabrics')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fabric if not signed in', function(done) {
		// Create new Fabric model instance
		var fabricObj = new Fabric(fabric);

		// Save the Fabric
		fabricObj.save(function() {
			request(app).get('/fabrics/' + fabricObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fabric.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fabric instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric
				agent.post('/fabrics')
					.send(fabric)
					.expect(200)
					.end(function(fabricSaveErr, fabricSaveRes) {
						// Handle Fabric save error
						if (fabricSaveErr) done(fabricSaveErr);

						// Delete existing Fabric
						agent.delete('/fabrics/' + fabricSaveRes.body._id)
							.send(fabric)
							.expect(200)
							.end(function(fabricDeleteErr, fabricDeleteRes) {
								// Handle Fabric error error
								if (fabricDeleteErr) done(fabricDeleteErr);

								// Set assertions
								(fabricDeleteRes.body._id).should.equal(fabricSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fabric instance if not signed in', function(done) {
		// Set Fabric user 
		fabric.user = user;

		// Create new Fabric model instance
		var fabricObj = new Fabric(fabric);

		// Save the Fabric
		fabricObj.save(function() {
			// Try deleting Fabric
			request(app).delete('/fabrics/' + fabricObj._id)
			.expect(401)
			.end(function(fabricDeleteErr, fabricDeleteRes) {
				// Set message assertion
				(fabricDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fabric error error
				done(fabricDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Fabric.remove().exec();
		done();
	});
});