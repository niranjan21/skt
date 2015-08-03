'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	LeaveMaster = mongoose.model('LeaveMaster'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, leaveMaster;

/**
 * Leave master routes tests
 */
describe('Leave master CRUD tests', function() {
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

		// Save a user to the test db and create new Leave master
		user.save(function() {
			leaveMaster = {
				name: 'Leave master Name'
			};

			done();
		});
	});

	it('should be able to save Leave master instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Leave master
				agent.post('/leave-masters')
					.send(leaveMaster)
					.expect(200)
					.end(function(leaveMasterSaveErr, leaveMasterSaveRes) {
						// Handle Leave master save error
						if (leaveMasterSaveErr) done(leaveMasterSaveErr);

						// Get a list of Leave masters
						agent.get('/leave-masters')
							.end(function(leaveMastersGetErr, leaveMastersGetRes) {
								// Handle Leave master save error
								if (leaveMastersGetErr) done(leaveMastersGetErr);

								// Get Leave masters list
								var leaveMasters = leaveMastersGetRes.body;

								// Set assertions
								(leaveMasters[0].user._id).should.equal(userId);
								(leaveMasters[0].name).should.match('Leave master Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Leave master instance if not logged in', function(done) {
		agent.post('/leave-masters')
			.send(leaveMaster)
			.expect(401)
			.end(function(leaveMasterSaveErr, leaveMasterSaveRes) {
				// Call the assertion callback
				done(leaveMasterSaveErr);
			});
	});

	it('should not be able to save Leave master instance if no name is provided', function(done) {
		// Invalidate name field
		leaveMaster.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Leave master
				agent.post('/leave-masters')
					.send(leaveMaster)
					.expect(400)
					.end(function(leaveMasterSaveErr, leaveMasterSaveRes) {
						// Set message assertion
						(leaveMasterSaveRes.body.message).should.match('Please fill Leave master name');
						
						// Handle Leave master save error
						done(leaveMasterSaveErr);
					});
			});
	});

	it('should be able to update Leave master instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Leave master
				agent.post('/leave-masters')
					.send(leaveMaster)
					.expect(200)
					.end(function(leaveMasterSaveErr, leaveMasterSaveRes) {
						// Handle Leave master save error
						if (leaveMasterSaveErr) done(leaveMasterSaveErr);

						// Update Leave master name
						leaveMaster.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Leave master
						agent.put('/leave-masters/' + leaveMasterSaveRes.body._id)
							.send(leaveMaster)
							.expect(200)
							.end(function(leaveMasterUpdateErr, leaveMasterUpdateRes) {
								// Handle Leave master update error
								if (leaveMasterUpdateErr) done(leaveMasterUpdateErr);

								// Set assertions
								(leaveMasterUpdateRes.body._id).should.equal(leaveMasterSaveRes.body._id);
								(leaveMasterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Leave masters if not signed in', function(done) {
		// Create new Leave master model instance
		var leaveMasterObj = new LeaveMaster(leaveMaster);

		// Save the Leave master
		leaveMasterObj.save(function() {
			// Request Leave masters
			request(app).get('/leave-masters')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Leave master if not signed in', function(done) {
		// Create new Leave master model instance
		var leaveMasterObj = new LeaveMaster(leaveMaster);

		// Save the Leave master
		leaveMasterObj.save(function() {
			request(app).get('/leave-masters/' + leaveMasterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', leaveMaster.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Leave master instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Leave master
				agent.post('/leave-masters')
					.send(leaveMaster)
					.expect(200)
					.end(function(leaveMasterSaveErr, leaveMasterSaveRes) {
						// Handle Leave master save error
						if (leaveMasterSaveErr) done(leaveMasterSaveErr);

						// Delete existing Leave master
						agent.delete('/leave-masters/' + leaveMasterSaveRes.body._id)
							.send(leaveMaster)
							.expect(200)
							.end(function(leaveMasterDeleteErr, leaveMasterDeleteRes) {
								// Handle Leave master error error
								if (leaveMasterDeleteErr) done(leaveMasterDeleteErr);

								// Set assertions
								(leaveMasterDeleteRes.body._id).should.equal(leaveMasterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Leave master instance if not signed in', function(done) {
		// Set Leave master user 
		leaveMaster.user = user;

		// Create new Leave master model instance
		var leaveMasterObj = new LeaveMaster(leaveMaster);

		// Save the Leave master
		leaveMasterObj.save(function() {
			// Try deleting Leave master
			request(app).delete('/leave-masters/' + leaveMasterObj._id)
			.expect(401)
			.end(function(leaveMasterDeleteErr, leaveMasterDeleteRes) {
				// Set message assertion
				(leaveMasterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Leave master error error
				done(leaveMasterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		LeaveMaster.remove().exec();
		done();
	});
});