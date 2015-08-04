'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PartyAllot = mongoose.model('PartyAllot'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, partyAllot;

/**
 * Party allot routes tests
 */
describe('Party allot CRUD tests', function() {
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

		// Save a user to the test db and create new Party allot
		user.save(function() {
			partyAllot = {
				name: 'Party allot Name'
			};

			done();
		});
	});

	it('should be able to save Party allot instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Party allot
				agent.post('/party-allots')
					.send(partyAllot)
					.expect(200)
					.end(function(partyAllotSaveErr, partyAllotSaveRes) {
						// Handle Party allot save error
						if (partyAllotSaveErr) done(partyAllotSaveErr);

						// Get a list of Party allots
						agent.get('/party-allots')
							.end(function(partyAllotsGetErr, partyAllotsGetRes) {
								// Handle Party allot save error
								if (partyAllotsGetErr) done(partyAllotsGetErr);

								// Get Party allots list
								var partyAllots = partyAllotsGetRes.body;

								// Set assertions
								(partyAllots[0].user._id).should.equal(userId);
								(partyAllots[0].name).should.match('Party allot Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Party allot instance if not logged in', function(done) {
		agent.post('/party-allots')
			.send(partyAllot)
			.expect(401)
			.end(function(partyAllotSaveErr, partyAllotSaveRes) {
				// Call the assertion callback
				done(partyAllotSaveErr);
			});
	});

	it('should not be able to save Party allot instance if no name is provided', function(done) {
		// Invalidate name field
		partyAllot.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Party allot
				agent.post('/party-allots')
					.send(partyAllot)
					.expect(400)
					.end(function(partyAllotSaveErr, partyAllotSaveRes) {
						// Set message assertion
						(partyAllotSaveRes.body.message).should.match('Please fill Party allot name');
						
						// Handle Party allot save error
						done(partyAllotSaveErr);
					});
			});
	});

	it('should be able to update Party allot instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Party allot
				agent.post('/party-allots')
					.send(partyAllot)
					.expect(200)
					.end(function(partyAllotSaveErr, partyAllotSaveRes) {
						// Handle Party allot save error
						if (partyAllotSaveErr) done(partyAllotSaveErr);

						// Update Party allot name
						partyAllot.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Party allot
						agent.put('/party-allots/' + partyAllotSaveRes.body._id)
							.send(partyAllot)
							.expect(200)
							.end(function(partyAllotUpdateErr, partyAllotUpdateRes) {
								// Handle Party allot update error
								if (partyAllotUpdateErr) done(partyAllotUpdateErr);

								// Set assertions
								(partyAllotUpdateRes.body._id).should.equal(partyAllotSaveRes.body._id);
								(partyAllotUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Party allots if not signed in', function(done) {
		// Create new Party allot model instance
		var partyAllotObj = new PartyAllot(partyAllot);

		// Save the Party allot
		partyAllotObj.save(function() {
			// Request Party allots
			request(app).get('/party-allots')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Party allot if not signed in', function(done) {
		// Create new Party allot model instance
		var partyAllotObj = new PartyAllot(partyAllot);

		// Save the Party allot
		partyAllotObj.save(function() {
			request(app).get('/party-allots/' + partyAllotObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', partyAllot.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Party allot instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Party allot
				agent.post('/party-allots')
					.send(partyAllot)
					.expect(200)
					.end(function(partyAllotSaveErr, partyAllotSaveRes) {
						// Handle Party allot save error
						if (partyAllotSaveErr) done(partyAllotSaveErr);

						// Delete existing Party allot
						agent.delete('/party-allots/' + partyAllotSaveRes.body._id)
							.send(partyAllot)
							.expect(200)
							.end(function(partyAllotDeleteErr, partyAllotDeleteRes) {
								// Handle Party allot error error
								if (partyAllotDeleteErr) done(partyAllotDeleteErr);

								// Set assertions
								(partyAllotDeleteRes.body._id).should.equal(partyAllotSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Party allot instance if not signed in', function(done) {
		// Set Party allot user 
		partyAllot.user = user;

		// Create new Party allot model instance
		var partyAllotObj = new PartyAllot(partyAllot);

		// Save the Party allot
		partyAllotObj.save(function() {
			// Try deleting Party allot
			request(app).delete('/party-allots/' + partyAllotObj._id)
			.expect(401)
			.end(function(partyAllotDeleteErr, partyAllotDeleteRes) {
				// Set message assertion
				(partyAllotDeleteRes.body.message).should.match('User is not logged in');

				// Handle Party allot error error
				done(partyAllotDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		PartyAllot.remove().exec();
		done();
	});
});