'use strict';

var xSharedFunctions = require('../xRes/shared/xSharedFunctions');
var xSnsEndpointManager = require('../xRes/xSnsEndpointManager');

var xSharedFnc = new xSharedFunctions()


const uuid      = require('uuid');
const component  = 'sns'
const logEnabled = true;

module.exports.create = (event, context, callback) => {
  const uniqueId   = uuid.v1();


  var xSnsEndpointMgr = new xSnsEndpointManager(uniqueId,logEnabled);

  xSharedFnc.logmsg(component,uniqueId,'info','Starting execution',logEnabled);
  xSharedFnc.logmsg(component,uniqueId,'info',`${JSON.stringify(event)}`,logEnabled);
 
  if ( !xSharedFnc.isDef(event.body) )
    { 
      xSharedFnc.logmsg(component,uniqueId,'error','Missing body information (EC.001)',logEnabled);

      let errorData = {
        code: "EC.001",
        data: {
          message: "Missing body"
        }
      }

      callback(null,xSharedFnc.generateErrorResponse(errorData,component)); 

    }


  var jsonBody = JSON.parse(event.body);



  xSharedFnc.logmsg(component,uniqueId,'info','All required parameters received',logEnabled);
  xSharedFnc.logmsg(component,uniqueId,'info','Calling createPlatformEndpoint...',logEnabled);

  callback(null, xSnsEndpointMgr.createPlatformEndpoint(jsonBody.platformApplicationArn, jsonBody.deviceToken) )
  
}

