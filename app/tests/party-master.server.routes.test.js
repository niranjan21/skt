'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PartyMaster = mongoose.model('PartyMaster'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, partyMaster;

/**
 * Party master routes tests
 */
describe('Party master CRUD tests', function() {
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

		// Save a user to the test db and create new Party master
		user.save(function() {
			partyMaster = {
				name: 'Party master Name'
			};

			done();
		});
	});

	it('should be able to save Party master instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Party master
				agent.post('/party-masters')
					.send(partyMaster)
					.expect(200)
					.end(function(partyMasterSaveErr, partyMasterSaveRes) {
						// Handle Party master save error
						if (partyMasterSaveErr) done(partyMasterSaveErr);

						// Get a list of Party masters
						agent.get('/party-masters')
							.end(function(partyMastersGetErr, partyMastersGetRes) {
								// Handle Party master save error
								if (partyMastersGetErr) done(partyMastersGetErr);

								// Get Party masters list
								var partyMasters = partyMastersGetRes.body;

								// Set assertions
								(partyMasters[0].user._id).should.equal(userId);
								(partyMasters[0].name).should.match('Party master Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Party master instance if not logged in', function(done) {
		agent.post('/party-masters')
			.send(partyMaster)
			.expect(401)
			.end(function(partyMasterSaveErr, partyMasterSaveRes) {
				// Call the assertion callback
				done(partyMasterSaveErr);
			});
	});

	it('should not be able to save Party master instance if no name is provided', function(done) {
		// Invalidate name field
		partyMaster.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Party master
				agent.post('/party-masters')
					.send(partyMaster)
					.expect(400)
					.end(function(partyMasterSaveErr, partyMasterSaveRes) {
						// Set message assertion
						(partyMasterSaveRes.body.message).should.match('Please fill Party master name');
						
						// Handle Party master save error
						done(partyMasterSaveErr);
					});
			});
	});

	it('should be able to update Party master instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Party master
				agent.post('/party-masters')
					.send(partyMaster)
					.expect(200)
					.end(function(partyMasterSaveErr, partyMasterSaveRes) {
						// Handle Party master save error
						if (partyMasterSaveErr) done(partyMasterSaveErr);

						// Update Party master name
						partyMaster.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Party master
						agent.put('/party-masters/' + partyMasterSaveRes.body._id)
							.send(partyMaster)
							.expect(200)
							.end(function(partyMasterUpdateErr, partyMasterUpdateRes) {
								// Handle Party master update error
								if (partyMasterUpdateErr) done(partyMasterUpdateErr);

								// Set assertions
								(partyMasterUpdateRes.body._id).should.equal(partyMasterSaveRes.body._id);
								(partyMasterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Party masters if not signed in', function(done) {
		// Create new Party master model instance
		var partyMasterObj = new PartyMaster(partyMaster);

		// Save the Party master
		partyMasterObj.save(function() {
			// Request Party masters
			request(app).get('/party-masters')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Party master if not signed in', function(done) {
		// Create new Party master model instance
		var partyMasterObj = new PartyMaster(partyMaster);

		// Save the Party master
		partyMasterObj.save(function() {
			request(app).get('/party-masters/' + partyMasterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', partyMaster.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Party master instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Party master
				agent.post('/party-masters')
					.send(partyMaster)
					.expect(200)
					.end(function(partyMasterSaveErr, partyMasterSaveRes) {
						// Handle Party master save error
						if (partyMasterSaveErr) done(partyMasterSaveErr);

						// Delete existing Party master
						agent.delete('/party-masters/' + partyMasterSaveRes.body._id)
							.send(partyMaster)
							.expect(200)
							.end(function(partyMasterDeleteErr, partyMasterDeleteRes) {
								// Handle Party master error error
								if (partyMasterDeleteErr) done(partyMasterDeleteErr);

								// Set assertions
								(partyMasterDeleteRes.body._id).should.equal(partyMasterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Party master instance if not signed in', function(done) {
		// Set Party master user 
		partyMaster.user = user;

		// Create new Party master model instance
		var partyMasterObj = new PartyMaster(partyMaster);

		// Save the Party master
		partyMasterObj.save(function() {
			// Try deleting Party master
			request(app).delete('/party-masters/' + partyMasterObj._id)
			.expect(401)
			.end(function(partyMasterDeleteErr, partyMasterDeleteRes) {
				// Set message assertion
				(partyMasterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Party master error error
				done(partyMasterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		PartyMaster.remove().exec();
		done();
	});
});