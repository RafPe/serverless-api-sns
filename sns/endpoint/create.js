'use strict';

var xSharedFunctions = require('../xRes/shared/xSharedFunctions');
var xSnsEndpointManager = require('../xRes/xSnsEndpointManager');


const uuid      = require('uuid');
const component  = 'sns'

var xSharedFnc = new xSharedFunctions('sns');

module.exports.create = (event, context, callback) => {
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

  if ( !xSharedFnc.isDef(jsonBody.deviceToken) )
  {
    xSharedFnc.logmsg(uniqueId,'error','Missing required parameters in body (EC.002)');
    
    let errorData = {
      code: "EC.002",
      data: {
        message: "Missing required parameters in body"
      }
    }

    callback(null,xSharedFnc.generateErrorResponse(errorData)); 
  }

  xSharedFnc.logmsg(uniqueId,'info','All required parameters received');
  xSharedFnc.logmsg(uniqueId,'info','Calling createPlatformEndpoint...');


  xSnsEndpointMgr.createPlatformEndpoint(jsonBody.deviceToken);          
  
}

