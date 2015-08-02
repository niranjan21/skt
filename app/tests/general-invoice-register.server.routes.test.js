'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GeneralInvoiceRegister = mongoose.model('GeneralInvoiceRegister'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, generalInvoiceRegister;

/**
 * General invoice register routes tests
 */
describe('General invoice register CRUD tests', function() {
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

		// Save a user to the test db and create new General invoice register
		user.save(function() {
			generalInvoiceRegister = {
				name: 'General invoice register Name'
			};

			done();
		});
	});

	it('should be able to save General invoice register instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General invoice register
				agent.post('/general-invoice-registers')
					.send(generalInvoiceRegister)
					.expect(200)
					.end(function(generalInvoiceRegisterSaveErr, generalInvoiceRegisterSaveRes) {
						// Handle General invoice register save error
						if (generalInvoiceRegisterSaveErr) done(generalInvoiceRegisterSaveErr);

						// Get a list of General invoice registers
						agent.get('/general-invoice-registers')
							.end(function(generalInvoiceRegistersGetErr, generalInvoiceRegistersGetRes) {
								// Handle General invoice register save error
								if (generalInvoiceRegistersGetErr) done(generalInvoiceRegistersGetErr);

								// Get General invoice registers list
								var generalInvoiceRegisters = generalInvoiceRegistersGetRes.body;

								// Set assertions
								(generalInvoiceRegisters[0].user._id).should.equal(userId);
								(generalInvoiceRegisters[0].name).should.match('General invoice register Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save General invoice register instance if not logged in', function(done) {
		agent.post('/general-invoice-registers')
			.send(generalInvoiceRegister)
			.expect(401)
			.end(function(generalInvoiceRegisterSaveErr, generalInvoiceRegisterSaveRes) {
				// Call the assertion callback
				done(generalInvoiceRegisterSaveErr);
			});
	});

	it('should not be able to save General invoice register instance if no name is provided', function(done) {
		// Invalidate name field
		generalInvoiceRegister.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General invoice register
				agent.post('/general-invoice-registers')
					.send(generalInvoiceRegister)
					.expect(400)
					.end(function(generalInvoiceRegisterSaveErr, generalInvoiceRegisterSaveRes) {
						// Set message assertion
						(generalInvoiceRegisterSaveRes.body.message).should.match('Please fill General invoice register name');
						
						// Handle General invoice register save error
						done(generalInvoiceRegisterSaveErr);
					});
			});
	});

	it('should be able to update General invoice register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General invoice register
				agent.post('/general-invoice-registers')
					.send(generalInvoiceRegister)
					.expect(200)
					.end(function(generalInvoiceRegisterSaveErr, generalInvoiceRegisterSaveRes) {
						// Handle General invoice register save error
						if (generalInvoiceRegisterSaveErr) done(generalInvoiceRegisterSaveErr);

						// Update General invoice register name
						generalInvoiceRegister.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing General invoice register
						agent.put('/general-invoice-registers/' + generalInvoiceRegisterSaveRes.body._id)
							.send(generalInvoiceRegister)
							.expect(200)
							.end(function(generalInvoiceRegisterUpdateErr, generalInvoiceRegisterUpdateRes) {
								// Handle General invoice register update error
								if (generalInvoiceRegisterUpdateErr) done(generalInvoiceRegisterUpdateErr);

								// Set assertions
								(generalInvoiceRegisterUpdateRes.body._id).should.equal(generalInvoiceRegisterSaveRes.body._id);
								(generalInvoiceRegisterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of General invoice registers if not signed in', function(done) {
		// Create new General invoice register model instance
		var generalInvoiceRegisterObj = new GeneralInvoiceRegister(generalInvoiceRegister);

		// Save the General invoice register
		generalInvoiceRegisterObj.save(function() {
			// Request General invoice registers
			request(app).get('/general-invoice-registers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single General invoice register if not signed in', function(done) {
		// Create new General invoice register model instance
		var generalInvoiceRegisterObj = new GeneralInvoiceRegister(generalInvoiceRegister);

		// Save the General invoice register
		generalInvoiceRegisterObj.save(function() {
			request(app).get('/general-invoice-registers/' + generalInvoiceRegisterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', generalInvoiceRegister.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete General invoice register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General invoice register
				agent.post('/general-invoice-registers')
					.send(generalInvoiceRegister)
					.expect(200)
					.end(function(generalInvoiceRegisterSaveErr, generalInvoiceRegisterSaveRes) {
						// Handle General invoice register save error
						if (generalInvoiceRegisterSaveErr) done(generalInvoiceRegisterSaveErr);

						// Delete existing General invoice register
						agent.delete('/general-invoice-registers/' + generalInvoiceRegisterSaveRes.body._id)
							.send(generalInvoiceRegister)
							.expect(200)
							.end(function(generalInvoiceRegisterDeleteErr, generalInvoiceRegisterDeleteRes) {
								// Handle General invoice register error error
								if (generalInvoiceRegisterDeleteErr) done(generalInvoiceRegisterDeleteErr);

								// Set assertions
								(generalInvoiceRegisterDeleteRes.body._id).should.equal(generalInvoiceRegisterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete General invoice register instance if not signed in', function(done) {
		// Set General invoice register user 
		generalInvoiceRegister.user = user;

		// Create new General invoice register model instance
		var generalInvoiceRegisterObj = new GeneralInvoiceRegister(generalInvoiceRegister);

		// Save the General invoice register
		generalInvoiceRegisterObj.save(function() {
			// Try deleting General invoice register
			request(app).delete('/general-invoice-registers/' + generalInvoiceRegisterObj._id)
			.expect(401)
			.end(function(generalInvoiceRegisterDeleteErr, generalInvoiceRegisterDeleteRes) {
				// Set message assertion
				(generalInvoiceRegisterDeleteRes.body.message).should.match('User is not logged in');

				// Handle General invoice register error error
				done(generalInvoiceRegisterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		GeneralInvoiceRegister.remove().exec();
		done();
	});
});