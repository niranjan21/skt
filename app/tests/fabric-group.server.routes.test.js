'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricGroup = mongoose.model('FabricGroup'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fabricGroup;

/**
 * Fabric group routes tests
 */
describe('Fabric group CRUD tests', function() {
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

		// Save a user to the test db and create new Fabric group
		user.save(function() {
			fabricGroup = {
				name: 'Fabric group Name'
			};

			done();
		});
	});

	it('should be able to save Fabric group instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric group
				agent.post('/fabric-groups')
					.send(fabricGroup)
					.expect(200)
					.end(function(fabricGroupSaveErr, fabricGroupSaveRes) {
						// Handle Fabric group save error
						if (fabricGroupSaveErr) done(fabricGroupSaveErr);

						// Get a list of Fabric groups
						agent.get('/fabric-groups')
							.end(function(fabricGroupsGetErr, fabricGroupsGetRes) {
								// Handle Fabric group save error
								if (fabricGroupsGetErr) done(fabricGroupsGetErr);

								// Get Fabric groups list
								var fabricGroups = fabricGroupsGetRes.body;

								// Set assertions
								(fabricGroups[0].user._id).should.equal(userId);
								(fabricGroups[0].name).should.match('Fabric group Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fabric group instance if not logged in', function(done) {
		agent.post('/fabric-groups')
			.send(fabricGroup)
			.expect(401)
			.end(function(fabricGroupSaveErr, fabricGroupSaveRes) {
				// Call the assertion callback
				done(fabricGroupSaveErr);
			});
	});

	it('should not be able to save Fabric group instance if no name is provided', function(done) {
		// Invalidate name field
		fabricGroup.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric group
				agent.post('/fabric-groups')
					.send(fabricGroup)
					.expect(400)
					.end(function(fabricGroupSaveErr, fabricGroupSaveRes) {
						// Set message assertion
						(fabricGroupSaveRes.body.message).should.match('Please fill Fabric group name');
						
						// Handle Fabric group save error
						done(fabricGroupSaveErr);
					});
			});
	});

	it('should be able to update Fabric group instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric group
				agent.post('/fabric-groups')
					.send(fabricGroup)
					.expect(200)
					.end(function(fabricGroupSaveErr, fabricGroupSaveRes) {
						// Handle Fabric group save error
						if (fabricGroupSaveErr) done(fabricGroupSaveErr);

						// Update Fabric group name
						fabricGroup.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fabric group
						agent.put('/fabric-groups/' + fabricGroupSaveRes.body._id)
							.send(fabricGroup)
							.expect(200)
							.end(function(fabricGroupUpdateErr, fabricGroupUpdateRes) {
								// Handle Fabric group update error
								if (fabricGroupUpdateErr) done(fabricGroupUpdateErr);

								// Set assertions
								(fabricGroupUpdateRes.body._id).should.equal(fabricGroupSaveRes.body._id);
								(fabricGroupUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fabric groups if not signed in', function(done) {
		// Create new Fabric group model instance
		var fabricGroupObj = new FabricGroup(fabricGroup);

		// Save the Fabric group
		fabricGroupObj.save(function() {
			// Request Fabric groups
			request(app).get('/fabric-groups')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fabric group if not signed in', function(done) {
		// Create new Fabric group model instance
		var fabricGroupObj = new FabricGroup(fabricGroup);

		// Save the Fabric group
		fabricGroupObj.save(function() {
			request(app).get('/fabric-groups/' + fabricGroupObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fabricGroup.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fabric group instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric group
				agent.post('/fabric-groups')
					.send(fabricGroup)
					.expect(200)
					.end(function(fabricGroupSaveErr, fabricGroupSaveRes) {
						// Handle Fabric group save error
						if (fabricGroupSaveErr) done(fabricGroupSaveErr);

						// Delete existing Fabric group
						agent.delete('/fabric-groups/' + fabricGroupSaveRes.body._id)
							.send(fabricGroup)
							.expect(200)
							.end(function(fabricGroupDeleteErr, fabricGroupDeleteRes) {
								// Handle Fabric group error error
								if (fabricGroupDeleteErr) done(fabricGroupDeleteErr);

								// Set assertions
								(fabricGroupDeleteRes.body._id).should.equal(fabricGroupSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fabric group instance if not signed in', function(done) {
		// Set Fabric group user 
		fabricGroup.user = user;

		// Create new Fabric group model instance
		var fabricGroupObj = new FabricGroup(fabricGroup);

		// Save the Fabric group
		fabricGroupObj.save(function() {
			// Try deleting Fabric group
			request(app).delete('/fabric-groups/' + fabricGroupObj._id)
			.expect(401)
			.end(function(fabricGroupDeleteErr, fabricGroupDeleteRes) {
				// Set message assertion
				(fabricGroupDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fabric group error error
				done(fabricGroupDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FabricGroup.remove().exec();
		done();
	});
});