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

module.exports.list = (event, context, callback) => {
  var timestamp = new Date().getTime();
  const uniqueId  = uuid.v1();

  console.log(`[ListPlatformEndpoints] [${timestamp}] [${uniqueId}][Info] Starting execution`);
  
      var responseCode = 400;
      var responseBody = "";
  
      var response = {
        statusCode: responseCode,
        body:       responseBody
      };

      if ( !isDef(event.body) )
        { 

          console.log(`[ListPlatformEndpoints] [${timestamp}] [${uniqueId}][Error] Missing body information (EC.001)`);

          let errorData = {
            code: "EC.001",
            data: {
              message: "Missing body"
            }
          }

          response.body = {
            action:  "ListPlatformEndpoints",
            status:  "error",
            error:   errorData,
          }

          response.body = JSON.stringify(response.body)

          callback(null,response); 

        }

      var jsonBody = JSON.parse(event.body);

      console.log(`[ListPlatformEndpoints] [${timestamp}] [${uniqueId}][Info] Parsed body from request`);

      if ( !isDef(jsonBody.platformApplicationArn) )
        {

          console.log(`[ListPlatformEndpoints] [${timestamp}] [${uniqueId}][Error] Missing required parameters in body (EC.002)`);
          
          let errorData = {
            code: "EC.002",
            data: {
              message: "Missing required parameters in body"
            }
          }

          response.body = {
            action:  "ListPlatformEndpoints",
            status:  "error",
            error:   errorData,
          }

          response.body = JSON.stringify(response.body)

          callback(null,response); 

        }

        console.log(`[ListPlatformEndpoints] [${timestamp}] [${uniqueId}][Info] All required parameters received`);
        console.log(`[ListPlatformEndpoints] [${timestamp}] [${uniqueId}][Info] Calling ListPlatformEndpoints...`);


        var params = {
            PlatformApplicationArn: jsonBody.platformApplicationArn, /* required */
            NextToken: ''
          };


        let allEndpoints = [];

        let paginationCompleted = false; 

          sns.listEndpointsByPlatformApplication(params).eachPage(function(err, data) {
                if(err) {
                    console.log(`[ListPlatformEndpoints] [${timestamp}] [${uniqueId}][Error] Failed to list platform endpoints (EC.005)`);
                    console.log(`[ListPlatformEndpoints] [${timestamp}] [${uniqueId}][Error] ${JSON.stringify(err)}`);

                    let errorData = {
                      code: "EC.005",
                      data: err
                    }
  
                    response.body = {
                      action:  "ListPlatformEndpoints",
                      status:  "error",
                      error:   errorData,
                    }
  
                    response.body = JSON.stringify(response.body)
            
                    callback(null,response); 
                }
                if(data) {
                    allEndpoints.push.apply(allEndpoints,data.Endpoints)
                }
                if(data === null){                    
                            console.log(`[ListPlatformEndpoints] [${timestamp}] [${uniqueId}][Info] Listed all platform endpoint`);
                    
                            response.body = {
                              action:  "DeletePlatformEndpoint",
                              status:  "success",
                              message: 'Endpoint deleted!',
                              data: allEndpoints
                            }
        
                            response.body = JSON.stringify(response.body)
                    
                            response.statusCode = 200;
                            callback(null,response); 

                }
            }
        )
    }
            


        
          


