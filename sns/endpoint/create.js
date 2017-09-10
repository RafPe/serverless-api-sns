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


module.exports.create = (event, context, callback) => {
  var timestamp = new Date().getTime();
  const uniqueId  = uuid.v1();

  console.log(`[CreatePlatformEndpoint] [${timestamp}] [${uniqueId}][Info] Starting execution`);
  
      var responseCode = 400;
      var responseBody = "";
  
      var response = {
        statusCode: responseCode,
        body:       responseBody
      };

      if ( !isDef(event.body) )
        { 

          console.log(`[CreatePlatformEndpoint] [${timestamp}] [${uniqueId}][Error] Missing body information (EC.001)`);

          let errorData = {
            code: "EC.001",
            data: {
              message: "Missing body"
            }
          }

          response.body = {
            action:  "CreatePlatformEndpoint",
            status:  "error",
            error:   errorData,
          }

          response.body = JSON.stringify(response.body)

          callback(null,response); 

        }

      var jsonBody = JSON.parse(event.body);

      console.log(`[CreatePlatformEndpoint] [${timestamp}] [${uniqueId}][Info] Parsed body from request`);

      if ( !isDef(jsonBody.deviceToken) || !isDef(jsonBody.platformApplicationArn))
        {

          console.log(`[CreatePlatformEndpoint] [${timestamp}] [${uniqueId}][Error] Missing required parameters in body (EC.002)`);
          
          let errorData = {
            code: "EC.002",
            data: {
              message: "Missing required parameters in body"
            }
          }

          response.body = {
            action:  "CreatePlatformEndpoint",
            status:  "error",
            error:   errorData,
          }

          response.body = JSON.stringify(response.body)

          callback(null,response); 

        }

        console.log(`[CreatePlatformEndpoint] [${timestamp}] [${uniqueId}][Info] All required parameters received`);
        console.log(`[CreatePlatformEndpoint] [${timestamp}] [${uniqueId}][Info] Calling createPlatformEndpoint...`);

    sns.createPlatformEndpoint({
                PlatformApplicationArn: jsonBody.platformApplicationArn,
                Token: jsonBody.deviceToken
            }, function(err, data) {
                if (err) {
                  console.log(`[CreatePlatformEndpoint] [${timestamp}] [${uniqueId}][Error] Failed to create platform endpoint (EC.003)`);
                  console.log(`[CreatePlatformEndpoint] [${timestamp}] [${uniqueId}][Error] ${JSON.stringify(err)}`);

                  let errorData = {
                    code: "EC.003",
                    data: err
                  }

                  response.body = {
                    action:  "CreatePlatformEndpoint",
                    status:  "error",
                    error:   errorData,
                  }

                  response.body = JSON.stringify(response.body)

                  callback(null,response); 

  
                  } else {

                    console.log(`[CreatePlatformEndpoint] [${timestamp}] [${uniqueId}][Info] Created platform endpoint`);
                    console.log(`[CreatePlatformEndpoint] [${timestamp}] [${uniqueId}][Info] ${JSON.stringify(data)}`);

                    response.body = {
                      action:  "CreatePlatformEndpoint",
                      status:  "success",
                      message: 'Endpoint created!',
                      data: data
                    }

                    response.body = JSON.stringify(response.body)



                    response.statusCode = 201;
                    callback(null,response); 
                  }              
                }
        );
}

