'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FormJj = mongoose.model('FormJj'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, formJj;

/**
 * Form jj routes tests
 */
describe('Form jj CRUD tests', function() {
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

		// Save a user to the test db and create new Form jj
		user.save(function() {
			formJj = {
				name: 'Form jj Name'
			};

			done();
		});
	});

	it('should be able to save Form jj instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Form jj
				agent.post('/form-jjs')
					.send(formJj)
					.expect(200)
					.end(function(formJjSaveErr, formJjSaveRes) {
						// Handle Form jj save error
						if (formJjSaveErr) done(formJjSaveErr);

						// Get a list of Form jjs
						agent.get('/form-jjs')
							.end(function(formJjsGetErr, formJjsGetRes) {
								// Handle Form jj save error
								if (formJjsGetErr) done(formJjsGetErr);

								// Get Form jjs list
								var formJjs = formJjsGetRes.body;

								// Set assertions
								(formJjs[0].user._id).should.equal(userId);
								(formJjs[0].name).should.match('Form jj Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Form jj instance if not logged in', function(done) {
		agent.post('/form-jjs')
			.send(formJj)
			.expect(401)
			.end(function(formJjSaveErr, formJjSaveRes) {
				// Call the assertion callback
				done(formJjSaveErr);
			});
	});

	it('should not be able to save Form jj instance if no name is provided', function(done) {
		// Invalidate name field
		formJj.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Form jj
				agent.post('/form-jjs')
					.send(formJj)
					.expect(400)
					.end(function(formJjSaveErr, formJjSaveRes) {
						// Set message assertion
						(formJjSaveRes.body.message).should.match('Please fill Form jj name');
						
						// Handle Form jj save error
						done(formJjSaveErr);
					});
			});
	});

	it('should be able to update Form jj instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Form jj
				agent.post('/form-jjs')
					.send(formJj)
					.expect(200)
					.end(function(formJjSaveErr, formJjSaveRes) {
						// Handle Form jj save error
						if (formJjSaveErr) done(formJjSaveErr);

						// Update Form jj name
						formJj.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Form jj
						agent.put('/form-jjs/' + formJjSaveRes.body._id)
							.send(formJj)
							.expect(200)
							.end(function(formJjUpdateErr, formJjUpdateRes) {
								// Handle Form jj update error
								if (formJjUpdateErr) done(formJjUpdateErr);

								// Set assertions
								(formJjUpdateRes.body._id).should.equal(formJjSaveRes.body._id);
								(formJjUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Form jjs if not signed in', function(done) {
		// Create new Form jj model instance
		var formJjObj = new FormJj(formJj);

		// Save the Form jj
		formJjObj.save(function() {
			// Request Form jjs
			request(app).get('/form-jjs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Form jj if not signed in', function(done) {
		// Create new Form jj model instance
		var formJjObj = new FormJj(formJj);

		// Save the Form jj
		formJjObj.save(function() {
			request(app).get('/form-jjs/' + formJjObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', formJj.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Form jj instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Form jj
				agent.post('/form-jjs')
					.send(formJj)
					.expect(200)
					.end(function(formJjSaveErr, formJjSaveRes) {
						// Handle Form jj save error
						if (formJjSaveErr) done(formJjSaveErr);

						// Delete existing Form jj
						agent.delete('/form-jjs/' + formJjSaveRes.body._id)
							.send(formJj)
							.expect(200)
							.end(function(formJjDeleteErr, formJjDeleteRes) {
								// Handle Form jj error error
								if (formJjDeleteErr) done(formJjDeleteErr);

								// Set assertions
								(formJjDeleteRes.body._id).should.equal(formJjSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Form jj instance if not signed in', function(done) {
		// Set Form jj user 
		formJj.user = user;

		// Create new Form jj model instance
		var formJjObj = new FormJj(formJj);

		// Save the Form jj
		formJjObj.save(function() {
			// Try deleting Form jj
			request(app).delete('/form-jjs/' + formJjObj._id)
			.expect(401)
			.end(function(formJjDeleteErr, formJjDeleteRes) {
				// Set message assertion
				(formJjDeleteRes.body.message).should.match('User is not logged in');

				// Handle Form jj error error
				done(formJjDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FormJj.remove().exec();
		done();
	});
});