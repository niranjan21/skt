'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EmployeeMaster = mongoose.model('EmployeeMaster'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, employeeMaster;

/**
 * Employee master routes tests
 */
describe('Employee master CRUD tests', function() {
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

		// Save a user to the test db and create new Employee master
		user.save(function() {
			employeeMaster = {
				name: 'Employee master Name'
			};

			done();
		});
	});

	it('should be able to save Employee master instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Employee master
				agent.post('/employee-masters')
					.send(employeeMaster)
					.expect(200)
					.end(function(employeeMasterSaveErr, employeeMasterSaveRes) {
						// Handle Employee master save error
						if (employeeMasterSaveErr) done(employeeMasterSaveErr);

						// Get a list of Employee masters
						agent.get('/employee-masters')
							.end(function(employeeMastersGetErr, employeeMastersGetRes) {
								// Handle Employee master save error
								if (employeeMastersGetErr) done(employeeMastersGetErr);

								// Get Employee masters list
								var employeeMasters = employeeMastersGetRes.body;

								// Set assertions
								(employeeMasters[0].user._id).should.equal(userId);
								(employeeMasters[0].name).should.match('Employee master Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Employee master instance if not logged in', function(done) {
		agent.post('/employee-masters')
			.send(employeeMaster)
			.expect(401)
			.end(function(employeeMasterSaveErr, employeeMasterSaveRes) {
				// Call the assertion callback
				done(employeeMasterSaveErr);
			});
	});

	it('should not be able to save Employee master instance if no name is provided', function(done) {
		// Invalidate name field
		employeeMaster.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Employee master
				agent.post('/employee-masters')
					.send(employeeMaster)
					.expect(400)
					.end(function(employeeMasterSaveErr, employeeMasterSaveRes) {
						// Set message assertion
						(employeeMasterSaveRes.body.message).should.match('Please fill Employee master name');
						
						// Handle Employee master save error
						done(employeeMasterSaveErr);
					});
			});
	});

	it('should be able to update Employee master instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Employee master
				agent.post('/employee-masters')
					.send(employeeMaster)
					.expect(200)
					.end(function(employeeMasterSaveErr, employeeMasterSaveRes) {
						// Handle Employee master save error
						if (employeeMasterSaveErr) done(employeeMasterSaveErr);

						// Update Employee master name
						employeeMaster.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Employee master
						agent.put('/employee-masters/' + employeeMasterSaveRes.body._id)
							.send(employeeMaster)
							.expect(200)
							.end(function(employeeMasterUpdateErr, employeeMasterUpdateRes) {
								// Handle Employee master update error
								if (employeeMasterUpdateErr) done(employeeMasterUpdateErr);

								// Set assertions
								(employeeMasterUpdateRes.body._id).should.equal(employeeMasterSaveRes.body._id);
								(employeeMasterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Employee masters if not signed in', function(done) {
		// Create new Employee master model instance
		var employeeMasterObj = new EmployeeMaster(employeeMaster);

		// Save the Employee master
		employeeMasterObj.save(function() {
			// Request Employee masters
			request(app).get('/employee-masters')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Employee master if not signed in', function(done) {
		// Create new Employee master model instance
		var employeeMasterObj = new EmployeeMaster(employeeMaster);

		// Save the Employee master
		employeeMasterObj.save(function() {
			request(app).get('/employee-masters/' + employeeMasterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', employeeMaster.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Employee master instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Employee master
				agent.post('/employee-masters')
					.send(employeeMaster)
					.expect(200)
					.end(function(employeeMasterSaveErr, employeeMasterSaveRes) {
						// Handle Employee master save error
						if (employeeMasterSaveErr) done(employeeMasterSaveErr);

						// Delete existing Employee master
						agent.delete('/employee-masters/' + employeeMasterSaveRes.body._id)
							.send(employeeMaster)
							.expect(200)
							.end(function(employeeMasterDeleteErr, employeeMasterDeleteRes) {
								// Handle Employee master error error
								if (employeeMasterDeleteErr) done(employeeMasterDeleteErr);

								// Set assertions
								(employeeMasterDeleteRes.body._id).should.equal(employeeMasterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Employee master instance if not signed in', function(done) {
		// Set Employee master user 
		employeeMaster.user = user;

		// Create new Employee master model instance
		var employeeMasterObj = new EmployeeMaster(employeeMaster);

		// Save the Employee master
		employeeMasterObj.save(function() {
			// Try deleting Employee master
			request(app).delete('/employee-masters/' + employeeMasterObj._id)
			.expect(401)
			.end(function(employeeMasterDeleteErr, employeeMasterDeleteRes) {
				// Set message assertion
				(employeeMasterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Employee master error error
				done(employeeMasterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		EmployeeMaster.remove().exec();
		done();
	});
});