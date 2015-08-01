'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	YarnReceiptEntry = mongoose.model('YarnReceiptEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, yarnReceiptEntry;

/**
 * Yarn receipt entry routes tests
 */
describe('Yarn receipt entry CRUD tests', function() {
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

		// Save a user to the test db and create new Yarn receipt entry
		user.save(function() {
			yarnReceiptEntry = {
				name: 'Yarn receipt entry Name'
			};

			done();
		});
	});

	it('should be able to save Yarn receipt entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn receipt entry
				agent.post('/yarn-receipt-entries')
					.send(yarnReceiptEntry)
					.expect(200)
					.end(function(yarnReceiptEntrySaveErr, yarnReceiptEntrySaveRes) {
						// Handle Yarn receipt entry save error
						if (yarnReceiptEntrySaveErr) done(yarnReceiptEntrySaveErr);

						// Get a list of Yarn receipt entries
						agent.get('/yarn-receipt-entries')
							.end(function(yarnReceiptEntriesGetErr, yarnReceiptEntriesGetRes) {
								// Handle Yarn receipt entry save error
								if (yarnReceiptEntriesGetErr) done(yarnReceiptEntriesGetErr);

								// Get Yarn receipt entries list
								var yarnReceiptEntries = yarnReceiptEntriesGetRes.body;

								// Set assertions
								(yarnReceiptEntries[0].user._id).should.equal(userId);
								(yarnReceiptEntries[0].name).should.match('Yarn receipt entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Yarn receipt entry instance if not logged in', function(done) {
		agent.post('/yarn-receipt-entries')
			.send(yarnReceiptEntry)
			.expect(401)
			.end(function(yarnReceiptEntrySaveErr, yarnReceiptEntrySaveRes) {
				// Call the assertion callback
				done(yarnReceiptEntrySaveErr);
			});
	});

	it('should not be able to save Yarn receipt entry instance if no name is provided', function(done) {
		// Invalidate name field
		yarnReceiptEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn receipt entry
				agent.post('/yarn-receipt-entries')
					.send(yarnReceiptEntry)
					.expect(400)
					.end(function(yarnReceiptEntrySaveErr, yarnReceiptEntrySaveRes) {
						// Set message assertion
						(yarnReceiptEntrySaveRes.body.message).should.match('Please fill Yarn receipt entry name');
						
						// Handle Yarn receipt entry save error
						done(yarnReceiptEntrySaveErr);
					});
			});
	});

	it('should be able to update Yarn receipt entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn receipt entry
				agent.post('/yarn-receipt-entries')
					.send(yarnReceiptEntry)
					.expect(200)
					.end(function(yarnReceiptEntrySaveErr, yarnReceiptEntrySaveRes) {
						// Handle Yarn receipt entry save error
						if (yarnReceiptEntrySaveErr) done(yarnReceiptEntrySaveErr);

						// Update Yarn receipt entry name
						yarnReceiptEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Yarn receipt entry
						agent.put('/yarn-receipt-entries/' + yarnReceiptEntrySaveRes.body._id)
							.send(yarnReceiptEntry)
							.expect(200)
							.end(function(yarnReceiptEntryUpdateErr, yarnReceiptEntryUpdateRes) {
								// Handle Yarn receipt entry update error
								if (yarnReceiptEntryUpdateErr) done(yarnReceiptEntryUpdateErr);

								// Set assertions
								(yarnReceiptEntryUpdateRes.body._id).should.equal(yarnReceiptEntrySaveRes.body._id);
								(yarnReceiptEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Yarn receipt entries if not signed in', function(done) {
		// Create new Yarn receipt entry model instance
		var yarnReceiptEntryObj = new YarnReceiptEntry(yarnReceiptEntry);

		// Save the Yarn receipt entry
		yarnReceiptEntryObj.save(function() {
			// Request Yarn receipt entries
			request(app).get('/yarn-receipt-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Yarn receipt entry if not signed in', function(done) {
		// Create new Yarn receipt entry model instance
		var yarnReceiptEntryObj = new YarnReceiptEntry(yarnReceiptEntry);

		// Save the Yarn receipt entry
		yarnReceiptEntryObj.save(function() {
			request(app).get('/yarn-receipt-entries/' + yarnReceiptEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', yarnReceiptEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Yarn receipt entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn receipt entry
				agent.post('/yarn-receipt-entries')
					.send(yarnReceiptEntry)
					.expect(200)
					.end(function(yarnReceiptEntrySaveErr, yarnReceiptEntrySaveRes) {
						// Handle Yarn receipt entry save error
						if (yarnReceiptEntrySaveErr) done(yarnReceiptEntrySaveErr);

						// Delete existing Yarn receipt entry
						agent.delete('/yarn-receipt-entries/' + yarnReceiptEntrySaveRes.body._id)
							.send(yarnReceiptEntry)
							.expect(200)
							.end(function(yarnReceiptEntryDeleteErr, yarnReceiptEntryDeleteRes) {
								// Handle Yarn receipt entry error error
								if (yarnReceiptEntryDeleteErr) done(yarnReceiptEntryDeleteErr);

								// Set assertions
								(yarnReceiptEntryDeleteRes.body._id).should.equal(yarnReceiptEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Yarn receipt entry instance if not signed in', function(done) {
		// Set Yarn receipt entry user 
		yarnReceiptEntry.user = user;

		// Create new Yarn receipt entry model instance
		var yarnReceiptEntryObj = new YarnReceiptEntry(yarnReceiptEntry);

		// Save the Yarn receipt entry
		yarnReceiptEntryObj.save(function() {
			// Try deleting Yarn receipt entry
			request(app).delete('/yarn-receipt-entries/' + yarnReceiptEntryObj._id)
			.expect(401)
			.end(function(yarnReceiptEntryDeleteErr, yarnReceiptEntryDeleteRes) {
				// Set message assertion
				(yarnReceiptEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Yarn receipt entry error error
				done(yarnReceiptEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		YarnReceiptEntry.remove().exec();
		done();
	});
});