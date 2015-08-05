'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderEnquiry = mongoose.model('OrderEnquiry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, orderEnquiry;

/**
 * Order enquiry routes tests
 */
describe('Order enquiry CRUD tests', function() {
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

		// Save a user to the test db and create new Order enquiry
		user.save(function() {
			orderEnquiry = {
				name: 'Order enquiry Name'
			};

			done();
		});
	});

	it('should be able to save Order enquiry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order enquiry
				agent.post('/order-enquiries')
					.send(orderEnquiry)
					.expect(200)
					.end(function(orderEnquirySaveErr, orderEnquirySaveRes) {
						// Handle Order enquiry save error
						if (orderEnquirySaveErr) done(orderEnquirySaveErr);

						// Get a list of Order enquiries
						agent.get('/order-enquiries')
							.end(function(orderEnquiriesGetErr, orderEnquiriesGetRes) {
								// Handle Order enquiry save error
								if (orderEnquiriesGetErr) done(orderEnquiriesGetErr);

								// Get Order enquiries list
								var orderEnquiries = orderEnquiriesGetRes.body;

								// Set assertions
								(orderEnquiries[0].user._id).should.equal(userId);
								(orderEnquiries[0].name).should.match('Order enquiry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Order enquiry instance if not logged in', function(done) {
		agent.post('/order-enquiries')
			.send(orderEnquiry)
			.expect(401)
			.end(function(orderEnquirySaveErr, orderEnquirySaveRes) {
				// Call the assertion callback
				done(orderEnquirySaveErr);
			});
	});

	it('should not be able to save Order enquiry instance if no name is provided', function(done) {
		// Invalidate name field
		orderEnquiry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order enquiry
				agent.post('/order-enquiries')
					.send(orderEnquiry)
					.expect(400)
					.end(function(orderEnquirySaveErr, orderEnquirySaveRes) {
						// Set message assertion
						(orderEnquirySaveRes.body.message).should.match('Please fill Order enquiry name');
						
						// Handle Order enquiry save error
						done(orderEnquirySaveErr);
					});
			});
	});

	it('should be able to update Order enquiry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order enquiry
				agent.post('/order-enquiries')
					.send(orderEnquiry)
					.expect(200)
					.end(function(orderEnquirySaveErr, orderEnquirySaveRes) {
						// Handle Order enquiry save error
						if (orderEnquirySaveErr) done(orderEnquirySaveErr);

						// Update Order enquiry name
						orderEnquiry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Order enquiry
						agent.put('/order-enquiries/' + orderEnquirySaveRes.body._id)
							.send(orderEnquiry)
							.expect(200)
							.end(function(orderEnquiryUpdateErr, orderEnquiryUpdateRes) {
								// Handle Order enquiry update error
								if (orderEnquiryUpdateErr) done(orderEnquiryUpdateErr);

								// Set assertions
								(orderEnquiryUpdateRes.body._id).should.equal(orderEnquirySaveRes.body._id);
								(orderEnquiryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Order enquiries if not signed in', function(done) {
		// Create new Order enquiry model instance
		var orderEnquiryObj = new OrderEnquiry(orderEnquiry);

		// Save the Order enquiry
		orderEnquiryObj.save(function() {
			// Request Order enquiries
			request(app).get('/order-enquiries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Order enquiry if not signed in', function(done) {
		// Create new Order enquiry model instance
		var orderEnquiryObj = new OrderEnquiry(orderEnquiry);

		// Save the Order enquiry
		orderEnquiryObj.save(function() {
			request(app).get('/order-enquiries/' + orderEnquiryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', orderEnquiry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Order enquiry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order enquiry
				agent.post('/order-enquiries')
					.send(orderEnquiry)
					.expect(200)
					.end(function(orderEnquirySaveErr, orderEnquirySaveRes) {
						// Handle Order enquiry save error
						if (orderEnquirySaveErr) done(orderEnquirySaveErr);

						// Delete existing Order enquiry
						agent.delete('/order-enquiries/' + orderEnquirySaveRes.body._id)
							.send(orderEnquiry)
							.expect(200)
							.end(function(orderEnquiryDeleteErr, orderEnquiryDeleteRes) {
								// Handle Order enquiry error error
								if (orderEnquiryDeleteErr) done(orderEnquiryDeleteErr);

								// Set assertions
								(orderEnquiryDeleteRes.body._id).should.equal(orderEnquirySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Order enquiry instance if not signed in', function(done) {
		// Set Order enquiry user 
		orderEnquiry.user = user;

		// Create new Order enquiry model instance
		var orderEnquiryObj = new OrderEnquiry(orderEnquiry);

		// Save the Order enquiry
		orderEnquiryObj.save(function() {
			// Try deleting Order enquiry
			request(app).delete('/order-enquiries/' + orderEnquiryObj._id)
			.expect(401)
			.end(function(orderEnquiryDeleteErr, orderEnquiryDeleteRes) {
				// Set message assertion
				(orderEnquiryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Order enquiry error error
				done(orderEnquiryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		OrderEnquiry.remove().exec();
		done();
	});
});