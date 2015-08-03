'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Marketing = mongoose.model('Marketing'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, marketing;

/**
 * Marketing routes tests
 */
describe('Marketing CRUD tests', function() {
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

		// Save a user to the test db and create new Marketing
		user.save(function() {
			marketing = {
				name: 'Marketing Name'
			};

			done();
		});
	});

	it('should be able to save Marketing instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Marketing
				agent.post('/marketings')
					.send(marketing)
					.expect(200)
					.end(function(marketingSaveErr, marketingSaveRes) {
						// Handle Marketing save error
						if (marketingSaveErr) done(marketingSaveErr);

						// Get a list of Marketings
						agent.get('/marketings')
							.end(function(marketingsGetErr, marketingsGetRes) {
								// Handle Marketing save error
								if (marketingsGetErr) done(marketingsGetErr);

								// Get Marketings list
								var marketings = marketingsGetRes.body;

								// Set assertions
								(marketings[0].user._id).should.equal(userId);
								(marketings[0].name).should.match('Marketing Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Marketing instance if not logged in', function(done) {
		agent.post('/marketings')
			.send(marketing)
			.expect(401)
			.end(function(marketingSaveErr, marketingSaveRes) {
				// Call the assertion callback
				done(marketingSaveErr);
			});
	});

	it('should not be able to save Marketing instance if no name is provided', function(done) {
		// Invalidate name field
		marketing.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Marketing
				agent.post('/marketings')
					.send(marketing)
					.expect(400)
					.end(function(marketingSaveErr, marketingSaveRes) {
						// Set message assertion
						(marketingSaveRes.body.message).should.match('Please fill Marketing name');
						
						// Handle Marketing save error
						done(marketingSaveErr);
					});
			});
	});

	it('should be able to update Marketing instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Marketing
				agent.post('/marketings')
					.send(marketing)
					.expect(200)
					.end(function(marketingSaveErr, marketingSaveRes) {
						// Handle Marketing save error
						if (marketingSaveErr) done(marketingSaveErr);

						// Update Marketing name
						marketing.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Marketing
						agent.put('/marketings/' + marketingSaveRes.body._id)
							.send(marketing)
							.expect(200)
							.end(function(marketingUpdateErr, marketingUpdateRes) {
								// Handle Marketing update error
								if (marketingUpdateErr) done(marketingUpdateErr);

								// Set assertions
								(marketingUpdateRes.body._id).should.equal(marketingSaveRes.body._id);
								(marketingUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Marketings if not signed in', function(done) {
		// Create new Marketing model instance
		var marketingObj = new Marketing(marketing);

		// Save the Marketing
		marketingObj.save(function() {
			// Request Marketings
			request(app).get('/marketings')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Marketing if not signed in', function(done) {
		// Create new Marketing model instance
		var marketingObj = new Marketing(marketing);

		// Save the Marketing
		marketingObj.save(function() {
			request(app).get('/marketings/' + marketingObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', marketing.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Marketing instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Marketing
				agent.post('/marketings')
					.send(marketing)
					.expect(200)
					.end(function(marketingSaveErr, marketingSaveRes) {
						// Handle Marketing save error
						if (marketingSaveErr) done(marketingSaveErr);

						// Delete existing Marketing
						agent.delete('/marketings/' + marketingSaveRes.body._id)
							.send(marketing)
							.expect(200)
							.end(function(marketingDeleteErr, marketingDeleteRes) {
								// Handle Marketing error error
								if (marketingDeleteErr) done(marketingDeleteErr);

								// Set assertions
								(marketingDeleteRes.body._id).should.equal(marketingSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Marketing instance if not signed in', function(done) {
		// Set Marketing user 
		marketing.user = user;

		// Create new Marketing model instance
		var marketingObj = new Marketing(marketing);

		// Save the Marketing
		marketingObj.save(function() {
			// Try deleting Marketing
			request(app).delete('/marketings/' + marketingObj._id)
			.expect(401)
			.end(function(marketingDeleteErr, marketingDeleteRes) {
				// Set message assertion
				(marketingDeleteRes.body.message).should.match('User is not logged in');

				// Handle Marketing error error
				done(marketingDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Marketing.remove().exec();
		done();
	});
});