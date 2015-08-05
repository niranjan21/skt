'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ItemInclusion = mongoose.model('ItemInclusion'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, itemInclusion;

/**
 * Item inclusion routes tests
 */
describe('Item inclusion CRUD tests', function() {
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

		// Save a user to the test db and create new Item inclusion
		user.save(function() {
			itemInclusion = {
				name: 'Item inclusion Name'
			};

			done();
		});
	});

	it('should be able to save Item inclusion instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Item inclusion
				agent.post('/item-inclusions')
					.send(itemInclusion)
					.expect(200)
					.end(function(itemInclusionSaveErr, itemInclusionSaveRes) {
						// Handle Item inclusion save error
						if (itemInclusionSaveErr) done(itemInclusionSaveErr);

						// Get a list of Item inclusions
						agent.get('/item-inclusions')
							.end(function(itemInclusionsGetErr, itemInclusionsGetRes) {
								// Handle Item inclusion save error
								if (itemInclusionsGetErr) done(itemInclusionsGetErr);

								// Get Item inclusions list
								var itemInclusions = itemInclusionsGetRes.body;

								// Set assertions
								(itemInclusions[0].user._id).should.equal(userId);
								(itemInclusions[0].name).should.match('Item inclusion Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Item inclusion instance if not logged in', function(done) {
		agent.post('/item-inclusions')
			.send(itemInclusion)
			.expect(401)
			.end(function(itemInclusionSaveErr, itemInclusionSaveRes) {
				// Call the assertion callback
				done(itemInclusionSaveErr);
			});
	});

	it('should not be able to save Item inclusion instance if no name is provided', function(done) {
		// Invalidate name field
		itemInclusion.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Item inclusion
				agent.post('/item-inclusions')
					.send(itemInclusion)
					.expect(400)
					.end(function(itemInclusionSaveErr, itemInclusionSaveRes) {
						// Set message assertion
						(itemInclusionSaveRes.body.message).should.match('Please fill Item inclusion name');
						
						// Handle Item inclusion save error
						done(itemInclusionSaveErr);
					});
			});
	});

	it('should be able to update Item inclusion instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Item inclusion
				agent.post('/item-inclusions')
					.send(itemInclusion)
					.expect(200)
					.end(function(itemInclusionSaveErr, itemInclusionSaveRes) {
						// Handle Item inclusion save error
						if (itemInclusionSaveErr) done(itemInclusionSaveErr);

						// Update Item inclusion name
						itemInclusion.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Item inclusion
						agent.put('/item-inclusions/' + itemInclusionSaveRes.body._id)
							.send(itemInclusion)
							.expect(200)
							.end(function(itemInclusionUpdateErr, itemInclusionUpdateRes) {
								// Handle Item inclusion update error
								if (itemInclusionUpdateErr) done(itemInclusionUpdateErr);

								// Set assertions
								(itemInclusionUpdateRes.body._id).should.equal(itemInclusionSaveRes.body._id);
								(itemInclusionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Item inclusions if not signed in', function(done) {
		// Create new Item inclusion model instance
		var itemInclusionObj = new ItemInclusion(itemInclusion);

		// Save the Item inclusion
		itemInclusionObj.save(function() {
			// Request Item inclusions
			request(app).get('/item-inclusions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Item inclusion if not signed in', function(done) {
		// Create new Item inclusion model instance
		var itemInclusionObj = new ItemInclusion(itemInclusion);

		// Save the Item inclusion
		itemInclusionObj.save(function() {
			request(app).get('/item-inclusions/' + itemInclusionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', itemInclusion.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Item inclusion instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Item inclusion
				agent.post('/item-inclusions')
					.send(itemInclusion)
					.expect(200)
					.end(function(itemInclusionSaveErr, itemInclusionSaveRes) {
						// Handle Item inclusion save error
						if (itemInclusionSaveErr) done(itemInclusionSaveErr);

						// Delete existing Item inclusion
						agent.delete('/item-inclusions/' + itemInclusionSaveRes.body._id)
							.send(itemInclusion)
							.expect(200)
							.end(function(itemInclusionDeleteErr, itemInclusionDeleteRes) {
								// Handle Item inclusion error error
								if (itemInclusionDeleteErr) done(itemInclusionDeleteErr);

								// Set assertions
								(itemInclusionDeleteRes.body._id).should.equal(itemInclusionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Item inclusion instance if not signed in', function(done) {
		// Set Item inclusion user 
		itemInclusion.user = user;

		// Create new Item inclusion model instance
		var itemInclusionObj = new ItemInclusion(itemInclusion);

		// Save the Item inclusion
		itemInclusionObj.save(function() {
			// Try deleting Item inclusion
			request(app).delete('/item-inclusions/' + itemInclusionObj._id)
			.expect(401)
			.end(function(itemInclusionDeleteErr, itemInclusionDeleteRes) {
				// Set message assertion
				(itemInclusionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Item inclusion error error
				done(itemInclusionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ItemInclusion.remove().exec();
		done();
	});
});