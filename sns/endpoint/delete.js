'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

var sns = new AWS.SNS({
	apiVersion: '2010-03-31',
	region: 'eu-west-1'
});

function isDef(v) {
  return v !== undefined && v !== null;
} 

module.exports.delete = (event, context, callback) => {
  var timestamp = new Date().getTime();
  const uniqueId  = uuid.v1();

  console.log(`[DeletePlatformEndpoint] [${timestamp}] [${uniqueId}][Info] Starting execution`);
  
      var responseCode = 400;
      var responseBody = "";
  
      var response = {
        statusCode: responseCode,
        body:       responseBody
      };

      if ( !isDef(event.body) )
        { 

          console.log(`[DeletePlatformEndpoint] [${timestamp}] [${uniqueId}][Error] Missing body information (EC.001)`);

          let errorData = {
            code: "EC.001",
            data: {
              message: "Missing body"
            }
          }

          response.body = {
            action:  "DeletePlatformEndpoint",
            status:  "error",
            error:   errorData,
          }

          response.body = JSON.stringify(response.body)

          callback(null,response); 

        }

      var jsonBody = JSON.parse(event.body);

      console.log(`[DeletePlatformEndpoint] [${timestamp}] [${uniqueId}][Info] Parsed body from request`);

      if ( !isDef(jsonBody.endpointArn) )
        {

          console.log(`[DeletePlatformEndpoint] [${timestamp}] [${uniqueId}][Error] Missing required parameters in body (EC.002)`);
          
          let errorData = {
            code: "EC.002",
            data: {
              message: "Missing required parameters in body"
            }
          }

          response.body = {
            action:  "DeletePlatformEndpoint",
            status:  "error",
            error:   errorData,
          }

          callback(null,response); 
        }

        console.log(`[DeletePlatformEndpoint] [${timestamp}] [${uniqueId}][Info] All required parameters received`);
        console.log(`[DeletePlatformEndpoint] [${timestamp}] [${uniqueId}][Info] Calling DeletePlatformEndpoint...`);


        var params = {
          endpointArn: jsonBody.endpointArn /* required */
        };


        sns.deleteEndpoint(params, function(err, data) {
                if (err) {
                  console.log(`[DeletePlatformEndpoint] [${timestamp}] [${uniqueId}][Error] Failed to delete platform endpoint (EC.004)`);
                  console.log(`[DeletePlatformEndpoint] [${timestamp}] [${uniqueId}][Error] ${JSON.stringify(err)}`);

                  let errorData = {
                    code: "EC.004",
                    data: err
                  }

                  response.body = {
                    action:  "DeletePlatformEndpoint",
                    status:  "error",
                    error:   errorData,
                  }

                  response.body = JSON.stringify(response.body)

                  callback(null,response); 
  
                  } else {

                    console.log(`[DeletePlatformEndpoint] [${timestamp}] [${uniqueId}][Info] Deleted platform endpoint`);
                    console.log(`[DeletePlatformEndpoint] [${timestamp}] [${uniqueId}][Info] ${JSON.stringify(data)}`);

                    response.body = {
                      action:  "DeletePlatformEndpoint",
                      status:  "success",
                      message: 'Endpoint deleted!',
                      data: data
                    }

                    response.body = JSON.stringify(response.body)

                    response.statusCode = 200;
                    callback(null,response); 
                  }              
                }
        );
}

