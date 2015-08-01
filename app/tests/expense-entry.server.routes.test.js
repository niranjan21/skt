'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ExpenseEntry = mongoose.model('ExpenseEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, expenseEntry;

/**
 * Expense entry routes tests
 */
describe('Expense entry CRUD tests', function() {
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

		// Save a user to the test db and create new Expense entry
		user.save(function() {
			expenseEntry = {
				name: 'Expense entry Name'
			};

			done();
		});
	});

	it('should be able to save Expense entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Expense entry
				agent.post('/expense-entries')
					.send(expenseEntry)
					.expect(200)
					.end(function(expenseEntrySaveErr, expenseEntrySaveRes) {
						// Handle Expense entry save error
						if (expenseEntrySaveErr) done(expenseEntrySaveErr);

						// Get a list of Expense entries
						agent.get('/expense-entries')
							.end(function(expenseEntriesGetErr, expenseEntriesGetRes) {
								// Handle Expense entry save error
								if (expenseEntriesGetErr) done(expenseEntriesGetErr);

								// Get Expense entries list
								var expenseEntries = expenseEntriesGetRes.body;

								// Set assertions
								(expenseEntries[0].user._id).should.equal(userId);
								(expenseEntries[0].name).should.match('Expense entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Expense entry instance if not logged in', function(done) {
		agent.post('/expense-entries')
			.send(expenseEntry)
			.expect(401)
			.end(function(expenseEntrySaveErr, expenseEntrySaveRes) {
				// Call the assertion callback
				done(expenseEntrySaveErr);
			});
	});

	it('should not be able to save Expense entry instance if no name is provided', function(done) {
		// Invalidate name field
		expenseEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Expense entry
				agent.post('/expense-entries')
					.send(expenseEntry)
					.expect(400)
					.end(function(expenseEntrySaveErr, expenseEntrySaveRes) {
						// Set message assertion
						(expenseEntrySaveRes.body.message).should.match('Please fill Expense entry name');
						
						// Handle Expense entry save error
						done(expenseEntrySaveErr);
					});
			});
	});

	it('should be able to update Expense entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Expense entry
				agent.post('/expense-entries')
					.send(expenseEntry)
					.expect(200)
					.end(function(expenseEntrySaveErr, expenseEntrySaveRes) {
						// Handle Expense entry save error
						if (expenseEntrySaveErr) done(expenseEntrySaveErr);

						// Update Expense entry name
						expenseEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Expense entry
						agent.put('/expense-entries/' + expenseEntrySaveRes.body._id)
							.send(expenseEntry)
							.expect(200)
							.end(function(expenseEntryUpdateErr, expenseEntryUpdateRes) {
								// Handle Expense entry update error
								if (expenseEntryUpdateErr) done(expenseEntryUpdateErr);

								// Set assertions
								(expenseEntryUpdateRes.body._id).should.equal(expenseEntrySaveRes.body._id);
								(expenseEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Expense entries if not signed in', function(done) {
		// Create new Expense entry model instance
		var expenseEntryObj = new ExpenseEntry(expenseEntry);

		// Save the Expense entry
		expenseEntryObj.save(function() {
			// Request Expense entries
			request(app).get('/expense-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Expense entry if not signed in', function(done) {
		// Create new Expense entry model instance
		var expenseEntryObj = new ExpenseEntry(expenseEntry);

		// Save the Expense entry
		expenseEntryObj.save(function() {
			request(app).get('/expense-entries/' + expenseEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', expenseEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Expense entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Expense entry
				agent.post('/expense-entries')
					.send(expenseEntry)
					.expect(200)
					.end(function(expenseEntrySaveErr, expenseEntrySaveRes) {
						// Handle Expense entry save error
						if (expenseEntrySaveErr) done(expenseEntrySaveErr);

						// Delete existing Expense entry
						agent.delete('/expense-entries/' + expenseEntrySaveRes.body._id)
							.send(expenseEntry)
							.expect(200)
							.end(function(expenseEntryDeleteErr, expenseEntryDeleteRes) {
								// Handle Expense entry error error
								if (expenseEntryDeleteErr) done(expenseEntryDeleteErr);

								// Set assertions
								(expenseEntryDeleteRes.body._id).should.equal(expenseEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Expense entry instance if not signed in', function(done) {
		// Set Expense entry user 
		expenseEntry.user = user;

		// Create new Expense entry model instance
		var expenseEntryObj = new ExpenseEntry(expenseEntry);

		// Save the Expense entry
		expenseEntryObj.save(function() {
			// Try deleting Expense entry
			request(app).delete('/expense-entries/' + expenseEntryObj._id)
			.expect(401)
			.end(function(expenseEntryDeleteErr, expenseEntryDeleteRes) {
				// Set message assertion
				(expenseEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Expense entry error error
				done(expenseEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ExpenseEntry.remove().exec();
		done();
	});
});