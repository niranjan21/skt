'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * FabricRequirementInwardEntry Schema
 */
var FabricRequirementInwardEntrySchema = new Schema({
	
  
  jobNo: {
		type: String,
		required: 'Please fill jobNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  expectedDeliveryDate: {
		type: Date,
		required: 'Please fill expectedDeliveryDate name'
	},
  
  order: {
		type: String,
		required: 'Please fill order name'
	},
  
  sample: {
		type: String,
		required: 'Please fill sample name'
	},
  
  orderNo: {
		type: Number,
		required: 'Please fill orderNo name'
	},
  
  marketingBy: {
		type: String,
		required: 'Please fill marketingBy name'
	},
  
  knitter: {
		type: String,
		required: 'Please fill knitter name'
	},
  
  design: {
		type: String,
		required: 'Please fill design name'
	},
  
  colour: {
		type: String,
		required: 'Please fill colour name'
	},
  
  rate: {
		type: Number,
		required: 'Please fill rate name'
	},
  
  gsm: {
		type: Number,
		required: 'Please fill gsm name'
	},
  
  lineLength: {
		type: Number,
		required: 'Please fill lineLength name'
	},
  
  gg: {
		type: Number,
		required: 'Please fill gg name'
	},
  
  mill: {
		type: String,
		required: 'Please fill mill name'
	},
  
  count: {
		type: Number,
		required: 'Please fill count name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  dia: {
		type: Number,
		required: 'Please fill dia name'
	},
  
  requiredQuantity: {
		type: Number,
		required: 'Please fill requiredQuantity name'
	},
  
  machineNo: {
		type: Number,
		required: 'Please fill machineNo name'
	},
  
  
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('FabricRequirementInwardEntry', FabricRequirementInwardEntrySchema);