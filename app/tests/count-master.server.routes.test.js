'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	CountMaster = mongoose.model('CountMaster'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, countMaster;

/**
 * Count master routes tests
 */
describe('Count master CRUD tests', function() {
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

		// Save a user to the test db and create new Count master
		user.save(function() {
			countMaster = {
				name: 'Count master Name'
			};

			done();
		});
	});

	it('should be able to save Count master instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Count master
				agent.post('/count-masters')
					.send(countMaster)
					.expect(200)
					.end(function(countMasterSaveErr, countMasterSaveRes) {
						// Handle Count master save error
						if (countMasterSaveErr) done(countMasterSaveErr);

						// Get a list of Count masters
						agent.get('/count-masters')
							.end(function(countMastersGetErr, countMastersGetRes) {
								// Handle Count master save error
								if (countMastersGetErr) done(countMastersGetErr);

								// Get Count masters list
								var countMasters = countMastersGetRes.body;

								// Set assertions
								(countMasters[0].user._id).should.equal(userId);
								(countMasters[0].name).should.match('Count master Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Count master instance if not logged in', function(done) {
		agent.post('/count-masters')
			.send(countMaster)
			.expect(401)
			.end(function(countMasterSaveErr, countMasterSaveRes) {
				// Call the assertion callback
				done(countMasterSaveErr);
			});
	});

	it('should not be able to save Count master instance if no name is provided', function(done) {
		// Invalidate name field
		countMaster.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Count master
				agent.post('/count-masters')
					.send(countMaster)
					.expect(400)
					.end(function(countMasterSaveErr, countMasterSaveRes) {
						// Set message assertion
						(countMasterSaveRes.body.message).should.match('Please fill Count master name');
						
						// Handle Count master save error
						done(countMasterSaveErr);
					});
			});
	});

	it('should be able to update Count master instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Count master
				agent.post('/count-masters')
					.send(countMaster)
					.expect(200)
					.end(function(countMasterSaveErr, countMasterSaveRes) {
						// Handle Count master save error
						if (countMasterSaveErr) done(countMasterSaveErr);

						// Update Count master name
						countMaster.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Count master
						agent.put('/count-masters/' + countMasterSaveRes.body._id)
							.send(countMaster)
							.expect(200)
							.end(function(countMasterUpdateErr, countMasterUpdateRes) {
								// Handle Count master update error
								if (countMasterUpdateErr) done(countMasterUpdateErr);

								// Set assertions
								(countMasterUpdateRes.body._id).should.equal(countMasterSaveRes.body._id);
								(countMasterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Count masters if not signed in', function(done) {
		// Create new Count master model instance
		var countMasterObj = new CountMaster(countMaster);

		// Save the Count master
		countMasterObj.save(function() {
			// Request Count masters
			request(app).get('/count-masters')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Count master if not signed in', function(done) {
		// Create new Count master model instance
		var countMasterObj = new CountMaster(countMaster);

		// Save the Count master
		countMasterObj.save(function() {
			request(app).get('/count-masters/' + countMasterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', countMaster.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Count master instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Count master
				agent.post('/count-masters')
					.send(countMaster)
					.expect(200)
					.end(function(countMasterSaveErr, countMasterSaveRes) {
						// Handle Count master save error
						if (countMasterSaveErr) done(countMasterSaveErr);

						// Delete existing Count master
						agent.delete('/count-masters/' + countMasterSaveRes.body._id)
							.send(countMaster)
							.expect(200)
							.end(function(countMasterDeleteErr, countMasterDeleteRes) {
								// Handle Count master error error
								if (countMasterDeleteErr) done(countMasterDeleteErr);

								// Set assertions
								(countMasterDeleteRes.body._id).should.equal(countMasterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Count master instance if not signed in', function(done) {
		// Set Count master user 
		countMaster.user = user;

		// Create new Count master model instance
		var countMasterObj = new CountMaster(countMaster);

		// Save the Count master
		countMasterObj.save(function() {
			// Try deleting Count master
			request(app).delete('/count-masters/' + countMasterObj._id)
			.expect(401)
			.end(function(countMasterDeleteErr, countMasterDeleteRes) {
				// Set message assertion
				(countMasterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Count master error error
				done(countMasterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		CountMaster.remove().exec();
		done();
	});
});