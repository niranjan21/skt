'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Stoppage = mongoose.model('Stoppage'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, stoppage;

/**
 * Stoppage routes tests
 */
describe('Stoppage CRUD tests', function() {
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

		// Save a user to the test db and create new Stoppage
		user.save(function() {
			stoppage = {
				name: 'Stoppage Name'
			};

			done();
		});
	});

	it('should be able to save Stoppage instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Stoppage
				agent.post('/stoppages')
					.send(stoppage)
					.expect(200)
					.end(function(stoppageSaveErr, stoppageSaveRes) {
						// Handle Stoppage save error
						if (stoppageSaveErr) done(stoppageSaveErr);

						// Get a list of Stoppages
						agent.get('/stoppages')
							.end(function(stoppagesGetErr, stoppagesGetRes) {
								// Handle Stoppage save error
								if (stoppagesGetErr) done(stoppagesGetErr);

								// Get Stoppages list
								var stoppages = stoppagesGetRes.body;

								// Set assertions
								(stoppages[0].user._id).should.equal(userId);
								(stoppages[0].name).should.match('Stoppage Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Stoppage instance if not logged in', function(done) {
		agent.post('/stoppages')
			.send(stoppage)
			.expect(401)
			.end(function(stoppageSaveErr, stoppageSaveRes) {
				// Call the assertion callback
				done(stoppageSaveErr);
			});
	});

	it('should not be able to save Stoppage instance if no name is provided', function(done) {
		// Invalidate name field
		stoppage.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Stoppage
				agent.post('/stoppages')
					.send(stoppage)
					.expect(400)
					.end(function(stoppageSaveErr, stoppageSaveRes) {
						// Set message assertion
						(stoppageSaveRes.body.message).should.match('Please fill Stoppage name');
						
						// Handle Stoppage save error
						done(stoppageSaveErr);
					});
			});
	});

	it('should be able to update Stoppage instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Stoppage
				agent.post('/stoppages')
					.send(stoppage)
					.expect(200)
					.end(function(stoppageSaveErr, stoppageSaveRes) {
						// Handle Stoppage save error
						if (stoppageSaveErr) done(stoppageSaveErr);

						// Update Stoppage name
						stoppage.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Stoppage
						agent.put('/stoppages/' + stoppageSaveRes.body._id)
							.send(stoppage)
							.expect(200)
							.end(function(stoppageUpdateErr, stoppageUpdateRes) {
								// Handle Stoppage update error
								if (stoppageUpdateErr) done(stoppageUpdateErr);

								// Set assertions
								(stoppageUpdateRes.body._id).should.equal(stoppageSaveRes.body._id);
								(stoppageUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Stoppages if not signed in', function(done) {
		// Create new Stoppage model instance
		var stoppageObj = new Stoppage(stoppage);

		// Save the Stoppage
		stoppageObj.save(function() {
			// Request Stoppages
			request(app).get('/stoppages')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Stoppage if not signed in', function(done) {
		// Create new Stoppage model instance
		var stoppageObj = new Stoppage(stoppage);

		// Save the Stoppage
		stoppageObj.save(function() {
			request(app).get('/stoppages/' + stoppageObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', stoppage.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Stoppage instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Stoppage
				agent.post('/stoppages')
					.send(stoppage)
					.expect(200)
					.end(function(stoppageSaveErr, stoppageSaveRes) {
						// Handle Stoppage save error
						if (stoppageSaveErr) done(stoppageSaveErr);

						// Delete existing Stoppage
						agent.delete('/stoppages/' + stoppageSaveRes.body._id)
							.send(stoppage)
							.expect(200)
							.end(function(stoppageDeleteErr, stoppageDeleteRes) {
								// Handle Stoppage error error
								if (stoppageDeleteErr) done(stoppageDeleteErr);

								// Set assertions
								(stoppageDeleteRes.body._id).should.equal(stoppageSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Stoppage instance if not signed in', function(done) {
		// Set Stoppage user 
		stoppage.user = user;

		// Create new Stoppage model instance
		var stoppageObj = new Stoppage(stoppage);

		// Save the Stoppage
		stoppageObj.save(function() {
			// Try deleting Stoppage
			request(app).delete('/stoppages/' + stoppageObj._id)
			.expect(401)
			.end(function(stoppageDeleteErr, stoppageDeleteRes) {
				// Set message assertion
				(stoppageDeleteRes.body.message).should.match('User is not logged in');

				// Handle Stoppage error error
				done(stoppageDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Stoppage.remove().exec();
		done();
	});
});