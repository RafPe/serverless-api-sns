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

  xSharedFnc.logmsg(uniqueId,'info','Calling listPlatformEndpoints...');

  xSnsEndpointMgr.listPlatformEndpoints();
          
}
            


        
          


