'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	JobPartialCompletion = mongoose.model('JobPartialCompletion'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, jobPartialCompletion;

/**
 * Job partial completion routes tests
 */
describe('Job partial completion CRUD tests', function() {
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

		// Save a user to the test db and create new Job partial completion
		user.save(function() {
			jobPartialCompletion = {
				name: 'Job partial completion Name'
			};

			done();
		});
	});

	it('should be able to save Job partial completion instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Job partial completion
				agent.post('/job-partial-completions')
					.send(jobPartialCompletion)
					.expect(200)
					.end(function(jobPartialCompletionSaveErr, jobPartialCompletionSaveRes) {
						// Handle Job partial completion save error
						if (jobPartialCompletionSaveErr) done(jobPartialCompletionSaveErr);

						// Get a list of Job partial completions
						agent.get('/job-partial-completions')
							.end(function(jobPartialCompletionsGetErr, jobPartialCompletionsGetRes) {
								// Handle Job partial completion save error
								if (jobPartialCompletionsGetErr) done(jobPartialCompletionsGetErr);

								// Get Job partial completions list
								var jobPartialCompletions = jobPartialCompletionsGetRes.body;

								// Set assertions
								(jobPartialCompletions[0].user._id).should.equal(userId);
								(jobPartialCompletions[0].name).should.match('Job partial completion Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Job partial completion instance if not logged in', function(done) {
		agent.post('/job-partial-completions')
			.send(jobPartialCompletion)
			.expect(401)
			.end(function(jobPartialCompletionSaveErr, jobPartialCompletionSaveRes) {
				// Call the assertion callback
				done(jobPartialCompletionSaveErr);
			});
	});

	it('should not be able to save Job partial completion instance if no name is provided', function(done) {
		// Invalidate name field
		jobPartialCompletion.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Job partial completion
				agent.post('/job-partial-completions')
					.send(jobPartialCompletion)
					.expect(400)
					.end(function(jobPartialCompletionSaveErr, jobPartialCompletionSaveRes) {
						// Set message assertion
						(jobPartialCompletionSaveRes.body.message).should.match('Please fill Job partial completion name');
						
						// Handle Job partial completion save error
						done(jobPartialCompletionSaveErr);
					});
			});
	});

	it('should be able to update Job partial completion instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Job partial completion
				agent.post('/job-partial-completions')
					.send(jobPartialCompletion)
					.expect(200)
					.end(function(jobPartialCompletionSaveErr, jobPartialCompletionSaveRes) {
						// Handle Job partial completion save error
						if (jobPartialCompletionSaveErr) done(jobPartialCompletionSaveErr);

						// Update Job partial completion name
						jobPartialCompletion.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Job partial completion
						agent.put('/job-partial-completions/' + jobPartialCompletionSaveRes.body._id)
							.send(jobPartialCompletion)
							.expect(200)
							.end(function(jobPartialCompletionUpdateErr, jobPartialCompletionUpdateRes) {
								// Handle Job partial completion update error
								if (jobPartialCompletionUpdateErr) done(jobPartialCompletionUpdateErr);

								// Set assertions
								(jobPartialCompletionUpdateRes.body._id).should.equal(jobPartialCompletionSaveRes.body._id);
								(jobPartialCompletionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Job partial completions if not signed in', function(done) {
		// Create new Job partial completion model instance
		var jobPartialCompletionObj = new JobPartialCompletion(jobPartialCompletion);

		// Save the Job partial completion
		jobPartialCompletionObj.save(function() {
			// Request Job partial completions
			request(app).get('/job-partial-completions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Job partial completion if not signed in', function(done) {
		// Create new Job partial completion model instance
		var jobPartialCompletionObj = new JobPartialCompletion(jobPartialCompletion);

		// Save the Job partial completion
		jobPartialCompletionObj.save(function() {
			request(app).get('/job-partial-completions/' + jobPartialCompletionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', jobPartialCompletion.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Job partial completion instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Job partial completion
				agent.post('/job-partial-completions')
					.send(jobPartialCompletion)
					.expect(200)
					.end(function(jobPartialCompletionSaveErr, jobPartialCompletionSaveRes) {
						// Handle Job partial completion save error
						if (jobPartialCompletionSaveErr) done(jobPartialCompletionSaveErr);

						// Delete existing Job partial completion
						agent.delete('/job-partial-completions/' + jobPartialCompletionSaveRes.body._id)
							.send(jobPartialCompletion)
							.expect(200)
							.end(function(jobPartialCompletionDeleteErr, jobPartialCompletionDeleteRes) {
								// Handle Job partial completion error error
								if (jobPartialCompletionDeleteErr) done(jobPartialCompletionDeleteErr);

								// Set assertions
								(jobPartialCompletionDeleteRes.body._id).should.equal(jobPartialCompletionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Job partial completion instance if not signed in', function(done) {
		// Set Job partial completion user 
		jobPartialCompletion.user = user;

		// Create new Job partial completion model instance
		var jobPartialCompletionObj = new JobPartialCompletion(jobPartialCompletion);

		// Save the Job partial completion
		jobPartialCompletionObj.save(function() {
			// Try deleting Job partial completion
			request(app).delete('/job-partial-completions/' + jobPartialCompletionObj._id)
			.expect(401)
			.end(function(jobPartialCompletionDeleteErr, jobPartialCompletionDeleteRes) {
				// Set message assertion
				(jobPartialCompletionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Job partial completion error error
				done(jobPartialCompletionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		JobPartialCompletion.remove().exec();
		done();
	});
});