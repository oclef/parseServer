// SNSAdapter
//
// Uses SNS for push notification

var AWS = require('aws-sdk');
var path = require('path');

var DEFAULT_REGION = "us-east-1";

// Publish to an SNS endpoint
// Providing AWS access and secret keys is mandatory
// Region will use sane defaults if omitted
function SNSAdapter(accessKey, secretKey, options) {
  options = options || {};

  this.region = options.region || DEFAULT_REGION;

  AWS.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: options.region || DEFAULT_REGION
  });
  
  this.sns = new AWS.SNS();
}

// For a given config object, endpoint and payload, publish via SNS
// Returns a promise containing the SNS object publish response
SNSAdapter.prototype.publish = function(config, endpoint, payload) {

  var params = {
    Message: payload,
    MessageStructure: 'json',
    TargetArn: endpoint
  };
  return new Promise((resolve, reject) => {
    this.sns.publish(params, (err, data) => {
      if (err !== null) return reject(err);
      resolve(data);
    });
  });
}

module.exports = SNSAdapter;