'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ItemMaster = mongoose.model('ItemMaster'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, itemMaster;

/**
 * Item master routes tests
 */
describe('Item master CRUD tests', function() {
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

		// Save a user to the test db and create new Item master
		user.save(function() {
			itemMaster = {
				name: 'Item master Name'
			};

			done();
		});
	});

	it('should be able to save Item master instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Item master
				agent.post('/item-masters')
					.send(itemMaster)
					.expect(200)
					.end(function(itemMasterSaveErr, itemMasterSaveRes) {
						// Handle Item master save error
						if (itemMasterSaveErr) done(itemMasterSaveErr);

						// Get a list of Item masters
						agent.get('/item-masters')
							.end(function(itemMastersGetErr, itemMastersGetRes) {
								// Handle Item master save error
								if (itemMastersGetErr) done(itemMastersGetErr);

								// Get Item masters list
								var itemMasters = itemMastersGetRes.body;

								// Set assertions
								(itemMasters[0].user._id).should.equal(userId);
								(itemMasters[0].name).should.match('Item master Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Item master instance if not logged in', function(done) {
		agent.post('/item-masters')
			.send(itemMaster)
			.expect(401)
			.end(function(itemMasterSaveErr, itemMasterSaveRes) {
				// Call the assertion callback
				done(itemMasterSaveErr);
			});
	});

	it('should not be able to save Item master instance if no name is provided', function(done) {
		// Invalidate name field
		itemMaster.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Item master
				agent.post('/item-masters')
					.send(itemMaster)
					.expect(400)
					.end(function(itemMasterSaveErr, itemMasterSaveRes) {
						// Set message assertion
						(itemMasterSaveRes.body.message).should.match('Please fill Item master name');
						
						// Handle Item master save error
						done(itemMasterSaveErr);
					});
			});
	});

	it('should be able to update Item master instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Item master
				agent.post('/item-masters')
					.send(itemMaster)
					.expect(200)
					.end(function(itemMasterSaveErr, itemMasterSaveRes) {
						// Handle Item master save error
						if (itemMasterSaveErr) done(itemMasterSaveErr);

						// Update Item master name
						itemMaster.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Item master
						agent.put('/item-masters/' + itemMasterSaveRes.body._id)
							.send(itemMaster)
							.expect(200)
							.end(function(itemMasterUpdateErr, itemMasterUpdateRes) {
								// Handle Item master update error
								if (itemMasterUpdateErr) done(itemMasterUpdateErr);

								// Set assertions
								(itemMasterUpdateRes.body._id).should.equal(itemMasterSaveRes.body._id);
								(itemMasterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Item masters if not signed in', function(done) {
		// Create new Item master model instance
		var itemMasterObj = new ItemMaster(itemMaster);

		// Save the Item master
		itemMasterObj.save(function() {
			// Request Item masters
			request(app).get('/item-masters')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Item master if not signed in', function(done) {
		// Create new Item master model instance
		var itemMasterObj = new ItemMaster(itemMaster);

		// Save the Item master
		itemMasterObj.save(function() {
			request(app).get('/item-masters/' + itemMasterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', itemMaster.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Item master instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Item master
				agent.post('/item-masters')
					.send(itemMaster)
					.expect(200)
					.end(function(itemMasterSaveErr, itemMasterSaveRes) {
						// Handle Item master save error
						if (itemMasterSaveErr) done(itemMasterSaveErr);

						// Delete existing Item master
						agent.delete('/item-masters/' + itemMasterSaveRes.body._id)
							.send(itemMaster)
							.expect(200)
							.end(function(itemMasterDeleteErr, itemMasterDeleteRes) {
								// Handle Item master error error
								if (itemMasterDeleteErr) done(itemMasterDeleteErr);

								// Set assertions
								(itemMasterDeleteRes.body._id).should.equal(itemMasterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Item master instance if not signed in', function(done) {
		// Set Item master user 
		itemMaster.user = user;

		// Create new Item master model instance
		var itemMasterObj = new ItemMaster(itemMaster);

		// Save the Item master
		itemMasterObj.save(function() {
			// Try deleting Item master
			request(app).delete('/item-masters/' + itemMasterObj._id)
			.expect(401)
			.end(function(itemMasterDeleteErr, itemMasterDeleteRes) {
				// Set message assertion
				(itemMasterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Item master error error
				done(itemMasterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ItemMaster.remove().exec();
		done();
	});
});