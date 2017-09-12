var AWS = require('aws-sdk-mock');
var sns = AWS.SNS();

AWS.mock('SNS', 'publish', 'test-message');
console.log(AWS); 

sns.publish({}, function(err, data) {
  if (err) console.log(err, err.stack);
  console.log(data);
});
