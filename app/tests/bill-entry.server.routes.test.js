'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	BillEntry = mongoose.model('BillEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, billEntry;

/**
 * Bill entry routes tests
 */
describe('Bill entry CRUD tests', function() {
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

		// Save a user to the test db and create new Bill entry
		user.save(function() {
			billEntry = {
				name: 'Bill entry Name'
			};

			done();
		});
	});

	it('should be able to save Bill entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bill entry
				agent.post('/bill-entries')
					.send(billEntry)
					.expect(200)
					.end(function(billEntrySaveErr, billEntrySaveRes) {
						// Handle Bill entry save error
						if (billEntrySaveErr) done(billEntrySaveErr);

						// Get a list of Bill entries
						agent.get('/bill-entries')
							.end(function(billEntriesGetErr, billEntriesGetRes) {
								// Handle Bill entry save error
								if (billEntriesGetErr) done(billEntriesGetErr);

								// Get Bill entries list
								var billEntries = billEntriesGetRes.body;

								// Set assertions
								(billEntries[0].user._id).should.equal(userId);
								(billEntries[0].name).should.match('Bill entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Bill entry instance if not logged in', function(done) {
		agent.post('/bill-entries')
			.send(billEntry)
			.expect(401)
			.end(function(billEntrySaveErr, billEntrySaveRes) {
				// Call the assertion callback
				done(billEntrySaveErr);
			});
	});

	it('should not be able to save Bill entry instance if no name is provided', function(done) {
		// Invalidate name field
		billEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bill entry
				agent.post('/bill-entries')
					.send(billEntry)
					.expect(400)
					.end(function(billEntrySaveErr, billEntrySaveRes) {
						// Set message assertion
						(billEntrySaveRes.body.message).should.match('Please fill Bill entry name');
						
						// Handle Bill entry save error
						done(billEntrySaveErr);
					});
			});
	});

	it('should be able to update Bill entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bill entry
				agent.post('/bill-entries')
					.send(billEntry)
					.expect(200)
					.end(function(billEntrySaveErr, billEntrySaveRes) {
						// Handle Bill entry save error
						if (billEntrySaveErr) done(billEntrySaveErr);

						// Update Bill entry name
						billEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Bill entry
						agent.put('/bill-entries/' + billEntrySaveRes.body._id)
							.send(billEntry)
							.expect(200)
							.end(function(billEntryUpdateErr, billEntryUpdateRes) {
								// Handle Bill entry update error
								if (billEntryUpdateErr) done(billEntryUpdateErr);

								// Set assertions
								(billEntryUpdateRes.body._id).should.equal(billEntrySaveRes.body._id);
								(billEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Bill entries if not signed in', function(done) {
		// Create new Bill entry model instance
		var billEntryObj = new BillEntry(billEntry);

		// Save the Bill entry
		billEntryObj.save(function() {
			// Request Bill entries
			request(app).get('/bill-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Bill entry if not signed in', function(done) {
		// Create new Bill entry model instance
		var billEntryObj = new BillEntry(billEntry);

		// Save the Bill entry
		billEntryObj.save(function() {
			request(app).get('/bill-entries/' + billEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', billEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Bill entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bill entry
				agent.post('/bill-entries')
					.send(billEntry)
					.expect(200)
					.end(function(billEntrySaveErr, billEntrySaveRes) {
						// Handle Bill entry save error
						if (billEntrySaveErr) done(billEntrySaveErr);

						// Delete existing Bill entry
						agent.delete('/bill-entries/' + billEntrySaveRes.body._id)
							.send(billEntry)
							.expect(200)
							.end(function(billEntryDeleteErr, billEntryDeleteRes) {
								// Handle Bill entry error error
								if (billEntryDeleteErr) done(billEntryDeleteErr);

								// Set assertions
								(billEntryDeleteRes.body._id).should.equal(billEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Bill entry instance if not signed in', function(done) {
		// Set Bill entry user 
		billEntry.user = user;

		// Create new Bill entry model instance
		var billEntryObj = new BillEntry(billEntry);

		// Save the Bill entry
		billEntryObj.save(function() {
			// Try deleting Bill entry
			request(app).delete('/bill-entries/' + billEntryObj._id)
			.expect(401)
			.end(function(billEntryDeleteErr, billEntryDeleteRes) {
				// Set message assertion
				(billEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Bill entry error error
				done(billEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		BillEntry.remove().exec();
		done();
	});
});