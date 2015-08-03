'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	DiaList = mongoose.model('DiaList'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, diaList;

/**
 * Dia list routes tests
 */
describe('Dia list CRUD tests', function() {
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

		// Save a user to the test db and create new Dia list
		user.save(function() {
			diaList = {
				name: 'Dia list Name'
			};

			done();
		});
	});

	it('should be able to save Dia list instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Dia list
				agent.post('/dia-lists')
					.send(diaList)
					.expect(200)
					.end(function(diaListSaveErr, diaListSaveRes) {
						// Handle Dia list save error
						if (diaListSaveErr) done(diaListSaveErr);

						// Get a list of Dia lists
						agent.get('/dia-lists')
							.end(function(diaListsGetErr, diaListsGetRes) {
								// Handle Dia list save error
								if (diaListsGetErr) done(diaListsGetErr);

								// Get Dia lists list
								var diaLists = diaListsGetRes.body;

								// Set assertions
								(diaLists[0].user._id).should.equal(userId);
								(diaLists[0].name).should.match('Dia list Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Dia list instance if not logged in', function(done) {
		agent.post('/dia-lists')
			.send(diaList)
			.expect(401)
			.end(function(diaListSaveErr, diaListSaveRes) {
				// Call the assertion callback
				done(diaListSaveErr);
			});
	});

	it('should not be able to save Dia list instance if no name is provided', function(done) {
		// Invalidate name field
		diaList.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Dia list
				agent.post('/dia-lists')
					.send(diaList)
					.expect(400)
					.end(function(diaListSaveErr, diaListSaveRes) {
						// Set message assertion
						(diaListSaveRes.body.message).should.match('Please fill Dia list name');
						
						// Handle Dia list save error
						done(diaListSaveErr);
					});
			});
	});

	it('should be able to update Dia list instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Dia list
				agent.post('/dia-lists')
					.send(diaList)
					.expect(200)
					.end(function(diaListSaveErr, diaListSaveRes) {
						// Handle Dia list save error
						if (diaListSaveErr) done(diaListSaveErr);

						// Update Dia list name
						diaList.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Dia list
						agent.put('/dia-lists/' + diaListSaveRes.body._id)
							.send(diaList)
							.expect(200)
							.end(function(diaListUpdateErr, diaListUpdateRes) {
								// Handle Dia list update error
								if (diaListUpdateErr) done(diaListUpdateErr);

								// Set assertions
								(diaListUpdateRes.body._id).should.equal(diaListSaveRes.body._id);
								(diaListUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Dia lists if not signed in', function(done) {
		// Create new Dia list model instance
		var diaListObj = new DiaList(diaList);

		// Save the Dia list
		diaListObj.save(function() {
			// Request Dia lists
			request(app).get('/dia-lists')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Dia list if not signed in', function(done) {
		// Create new Dia list model instance
		var diaListObj = new DiaList(diaList);

		// Save the Dia list
		diaListObj.save(function() {
			request(app).get('/dia-lists/' + diaListObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', diaList.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Dia list instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Dia list
				agent.post('/dia-lists')
					.send(diaList)
					.expect(200)
					.end(function(diaListSaveErr, diaListSaveRes) {
						// Handle Dia list save error
						if (diaListSaveErr) done(diaListSaveErr);

						// Delete existing Dia list
						agent.delete('/dia-lists/' + diaListSaveRes.body._id)
							.send(diaList)
							.expect(200)
							.end(function(diaListDeleteErr, diaListDeleteRes) {
								// Handle Dia list error error
								if (diaListDeleteErr) done(diaListDeleteErr);

								// Set assertions
								(diaListDeleteRes.body._id).should.equal(diaListSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Dia list instance if not signed in', function(done) {
		// Set Dia list user 
		diaList.user = user;

		// Create new Dia list model instance
		var diaListObj = new DiaList(diaList);

		// Save the Dia list
		diaListObj.save(function() {
			// Try deleting Dia list
			request(app).delete('/dia-lists/' + diaListObj._id)
			.expect(401)
			.end(function(diaListDeleteErr, diaListDeleteRes) {
				// Set message assertion
				(diaListDeleteRes.body.message).should.match('User is not logged in');

				// Handle Dia list error error
				done(diaListDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		DiaList.remove().exec();
		done();
	});
});