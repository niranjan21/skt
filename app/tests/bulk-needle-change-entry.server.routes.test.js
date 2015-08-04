'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	BulkNeedleChangeEntry = mongoose.model('BulkNeedleChangeEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, bulkNeedleChangeEntry;

/**
 * Bulk needle change entry routes tests
 */
describe('Bulk needle change entry CRUD tests', function() {
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

		// Save a user to the test db and create new Bulk needle change entry
		user.save(function() {
			bulkNeedleChangeEntry = {
				name: 'Bulk needle change entry Name'
			};

			done();
		});
	});

	it('should be able to save Bulk needle change entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bulk needle change entry
				agent.post('/bulk-needle-change-entries')
					.send(bulkNeedleChangeEntry)
					.expect(200)
					.end(function(bulkNeedleChangeEntrySaveErr, bulkNeedleChangeEntrySaveRes) {
						// Handle Bulk needle change entry save error
						if (bulkNeedleChangeEntrySaveErr) done(bulkNeedleChangeEntrySaveErr);

						// Get a list of Bulk needle change entries
						agent.get('/bulk-needle-change-entries')
							.end(function(bulkNeedleChangeEntriesGetErr, bulkNeedleChangeEntriesGetRes) {
								// Handle Bulk needle change entry save error
								if (bulkNeedleChangeEntriesGetErr) done(bulkNeedleChangeEntriesGetErr);

								// Get Bulk needle change entries list
								var bulkNeedleChangeEntries = bulkNeedleChangeEntriesGetRes.body;

								// Set assertions
								(bulkNeedleChangeEntries[0].user._id).should.equal(userId);
								(bulkNeedleChangeEntries[0].name).should.match('Bulk needle change entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Bulk needle change entry instance if not logged in', function(done) {
		agent.post('/bulk-needle-change-entries')
			.send(bulkNeedleChangeEntry)
			.expect(401)
			.end(function(bulkNeedleChangeEntrySaveErr, bulkNeedleChangeEntrySaveRes) {
				// Call the assertion callback
				done(bulkNeedleChangeEntrySaveErr);
			});
	});

	it('should not be able to save Bulk needle change entry instance if no name is provided', function(done) {
		// Invalidate name field
		bulkNeedleChangeEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bulk needle change entry
				agent.post('/bulk-needle-change-entries')
					.send(bulkNeedleChangeEntry)
					.expect(400)
					.end(function(bulkNeedleChangeEntrySaveErr, bulkNeedleChangeEntrySaveRes) {
						// Set message assertion
						(bulkNeedleChangeEntrySaveRes.body.message).should.match('Please fill Bulk needle change entry name');
						
						// Handle Bulk needle change entry save error
						done(bulkNeedleChangeEntrySaveErr);
					});
			});
	});

	it('should be able to update Bulk needle change entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bulk needle change entry
				agent.post('/bulk-needle-change-entries')
					.send(bulkNeedleChangeEntry)
					.expect(200)
					.end(function(bulkNeedleChangeEntrySaveErr, bulkNeedleChangeEntrySaveRes) {
						// Handle Bulk needle change entry save error
						if (bulkNeedleChangeEntrySaveErr) done(bulkNeedleChangeEntrySaveErr);

						// Update Bulk needle change entry name
						bulkNeedleChangeEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Bulk needle change entry
						agent.put('/bulk-needle-change-entries/' + bulkNeedleChangeEntrySaveRes.body._id)
							.send(bulkNeedleChangeEntry)
							.expect(200)
							.end(function(bulkNeedleChangeEntryUpdateErr, bulkNeedleChangeEntryUpdateRes) {
								// Handle Bulk needle change entry update error
								if (bulkNeedleChangeEntryUpdateErr) done(bulkNeedleChangeEntryUpdateErr);

								// Set assertions
								(bulkNeedleChangeEntryUpdateRes.body._id).should.equal(bulkNeedleChangeEntrySaveRes.body._id);
								(bulkNeedleChangeEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Bulk needle change entries if not signed in', function(done) {
		// Create new Bulk needle change entry model instance
		var bulkNeedleChangeEntryObj = new BulkNeedleChangeEntry(bulkNeedleChangeEntry);

		// Save the Bulk needle change entry
		bulkNeedleChangeEntryObj.save(function() {
			// Request Bulk needle change entries
			request(app).get('/bulk-needle-change-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Bulk needle change entry if not signed in', function(done) {
		// Create new Bulk needle change entry model instance
		var bulkNeedleChangeEntryObj = new BulkNeedleChangeEntry(bulkNeedleChangeEntry);

		// Save the Bulk needle change entry
		bulkNeedleChangeEntryObj.save(function() {
			request(app).get('/bulk-needle-change-entries/' + bulkNeedleChangeEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', bulkNeedleChangeEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Bulk needle change entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bulk needle change entry
				agent.post('/bulk-needle-change-entries')
					.send(bulkNeedleChangeEntry)
					.expect(200)
					.end(function(bulkNeedleChangeEntrySaveErr, bulkNeedleChangeEntrySaveRes) {
						// Handle Bulk needle change entry save error
						if (bulkNeedleChangeEntrySaveErr) done(bulkNeedleChangeEntrySaveErr);

						// Delete existing Bulk needle change entry
						agent.delete('/bulk-needle-change-entries/' + bulkNeedleChangeEntrySaveRes.body._id)
							.send(bulkNeedleChangeEntry)
							.expect(200)
							.end(function(bulkNeedleChangeEntryDeleteErr, bulkNeedleChangeEntryDeleteRes) {
								// Handle Bulk needle change entry error error
								if (bulkNeedleChangeEntryDeleteErr) done(bulkNeedleChangeEntryDeleteErr);

								// Set assertions
								(bulkNeedleChangeEntryDeleteRes.body._id).should.equal(bulkNeedleChangeEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Bulk needle change entry instance if not signed in', function(done) {
		// Set Bulk needle change entry user 
		bulkNeedleChangeEntry.user = user;

		// Create new Bulk needle change entry model instance
		var bulkNeedleChangeEntryObj = new BulkNeedleChangeEntry(bulkNeedleChangeEntry);

		// Save the Bulk needle change entry
		bulkNeedleChangeEntryObj.save(function() {
			// Try deleting Bulk needle change entry
			request(app).delete('/bulk-needle-change-entries/' + bulkNeedleChangeEntryObj._id)
			.expect(401)
			.end(function(bulkNeedleChangeEntryDeleteErr, bulkNeedleChangeEntryDeleteRes) {
				// Set message assertion
				(bulkNeedleChangeEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Bulk needle change entry error error
				done(bulkNeedleChangeEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		BulkNeedleChangeEntry.remove().exec();
		done();
	});
});