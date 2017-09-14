'use strict';

var xSharedFunctions = require('../xRes/shared/xSharedFunctions');
var xSnsEndpointManager = require('../xRes/xSnsEndpointManager');


const uuid      = require('uuid');
const component  = 'sns'

var xSharedFnc = new xSharedFunctions('sns');

module.exports.list = (event, context, callback) => {
  const uniqueId      = uuid.v1();
  var xSnsEndpointMgr = new xSnsEndpointManager(uniqueId,callback);

  xSharedFnc.logmsg(uniqueId,'info','Starting execution');
  xSharedFnc.logmsg(uniqueId,'info',`${JSON.stringify(event)}`);
 
  if ( !xSharedFnc.isDef(event.body) )
    { 
      xSharedFnc.logmsg(uniqueId,'error','Missing body information (EC.001)');

      let errorData = {
        code: "EC.001",
        data: {
          message: "Missing body"
        }
      }

      callback(null,xSharedFnc.generateErrorResponse(errorData)); 

    }

  var jsonBody = JSON.parse(event.body);
  
  
  
  xSharedFnc.logmsg(uniqueId,'info','All required parameters received');
  xSharedFnc.logmsg(uniqueId,'info','Calling createPlatformEndpoint...');


  xSnsEndpointMgr.createPlatformEndpoint(jsonBody.platformApplicationArn, jsonBody.deviceToken);          
  


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
            


        
          


