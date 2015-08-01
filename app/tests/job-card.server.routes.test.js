'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	JobCard = mongoose.model('JobCard'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, jobCard;

/**
 * Job card routes tests
 */
describe('Job card CRUD tests', function() {
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

		// Save a user to the test db and create new Job card
		user.save(function() {
			jobCard = {
				name: 'Job card Name'
			};

			done();
		});
	});

	it('should be able to save Job card instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Job card
				agent.post('/job-cards')
					.send(jobCard)
					.expect(200)
					.end(function(jobCardSaveErr, jobCardSaveRes) {
						// Handle Job card save error
						if (jobCardSaveErr) done(jobCardSaveErr);

						// Get a list of Job cards
						agent.get('/job-cards')
							.end(function(jobCardsGetErr, jobCardsGetRes) {
								// Handle Job card save error
								if (jobCardsGetErr) done(jobCardsGetErr);

								// Get Job cards list
								var jobCards = jobCardsGetRes.body;

								// Set assertions
								(jobCards[0].user._id).should.equal(userId);
								(jobCards[0].name).should.match('Job card Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Job card instance if not logged in', function(done) {
		agent.post('/job-cards')
			.send(jobCard)
			.expect(401)
			.end(function(jobCardSaveErr, jobCardSaveRes) {
				// Call the assertion callback
				done(jobCardSaveErr);
			});
	});

	it('should not be able to save Job card instance if no name is provided', function(done) {
		// Invalidate name field
		jobCard.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Job card
				agent.post('/job-cards')
					.send(jobCard)
					.expect(400)
					.end(function(jobCardSaveErr, jobCardSaveRes) {
						// Set message assertion
						(jobCardSaveRes.body.message).should.match('Please fill Job card name');
						
						// Handle Job card save error
						done(jobCardSaveErr);
					});
			});
	});

	it('should be able to update Job card instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Job card
				agent.post('/job-cards')
					.send(jobCard)
					.expect(200)
					.end(function(jobCardSaveErr, jobCardSaveRes) {
						// Handle Job card save error
						if (jobCardSaveErr) done(jobCardSaveErr);

						// Update Job card name
						jobCard.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Job card
						agent.put('/job-cards/' + jobCardSaveRes.body._id)
							.send(jobCard)
							.expect(200)
							.end(function(jobCardUpdateErr, jobCardUpdateRes) {
								// Handle Job card update error
								if (jobCardUpdateErr) done(jobCardUpdateErr);

								// Set assertions
								(jobCardUpdateRes.body._id).should.equal(jobCardSaveRes.body._id);
								(jobCardUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Job cards if not signed in', function(done) {
		// Create new Job card model instance
		var jobCardObj = new JobCard(jobCard);

		// Save the Job card
		jobCardObj.save(function() {
			// Request Job cards
			request(app).get('/job-cards')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Job card if not signed in', function(done) {
		// Create new Job card model instance
		var jobCardObj = new JobCard(jobCard);

		// Save the Job card
		jobCardObj.save(function() {
			request(app).get('/job-cards/' + jobCardObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', jobCard.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Job card instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Job card
				agent.post('/job-cards')
					.send(jobCard)
					.expect(200)
					.end(function(jobCardSaveErr, jobCardSaveRes) {
						// Handle Job card save error
						if (jobCardSaveErr) done(jobCardSaveErr);

						// Delete existing Job card
						agent.delete('/job-cards/' + jobCardSaveRes.body._id)
							.send(jobCard)
							.expect(200)
							.end(function(jobCardDeleteErr, jobCardDeleteRes) {
								// Handle Job card error error
								if (jobCardDeleteErr) done(jobCardDeleteErr);

								// Set assertions
								(jobCardDeleteRes.body._id).should.equal(jobCardSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Job card instance if not signed in', function(done) {
		// Set Job card user 
		jobCard.user = user;

		// Create new Job card model instance
		var jobCardObj = new JobCard(jobCard);

		// Save the Job card
		jobCardObj.save(function() {
			// Try deleting Job card
			request(app).delete('/job-cards/' + jobCardObj._id)
			.expect(401)
			.end(function(jobCardDeleteErr, jobCardDeleteRes) {
				// Set message assertion
				(jobCardDeleteRes.body.message).should.match('User is not logged in');

				// Handle Job card error error
				done(jobCardDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		JobCard.remove().exec();
		done();
	});
});