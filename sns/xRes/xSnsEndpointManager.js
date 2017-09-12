import xSharedFunctions from './shared/xSharedFunctions'

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

var xSharedFnc = new xSharedFunctions()

class xSnsEndpointManager {  
    constructor(uuid,logEnabled){

        this.component = 'sns';
        this.uuid      = uuid;
        this.logEnabled = logEnabled

        this.sns = new AWS.SNS({
            apiVersion: '2010-03-31',
            region: process.env.REGION
        });

    }
    
  createPlatformEndpoint(applicationArn, deviceToken, deviceMetadata){

    let component  = this.component;
    let uuid       = this.uuid;
    let sns        = this.sns;
    let logEnabled = this.logEnabled
    let res        = null;

    sns.createPlatformEndpoint({
        PlatformApplicationArn: applicationArn,
        Token: deviceToken
        }, function(err, data) {
            if (err) {
                            
                xSharedFnc.logmsg(component,uuid,'error','Failed to create platform endpoint (EC.003)',logEnabled);
                xSharedFnc.logmsg(component,uuid,'error',JSON.stringify(err),logEnabled);

                let errorData = {
                    code: "EC.003",
                    data: err
                }

                res = xSharedFnc.generateErrorResponse(errorData,component);

            } else {

                xSharedFnc.logmsg(component,uuid,'info','Created platform endpoint',logEnabled);
                xSharedFnc.logmsg(component,uuid,'info',JSON.stringify(data),logEnabled);


                res = xSharedFnc.generateSuccessResponse(data,component,201);

                xSharedFnc.logmsg(component,uuid,'info',JSON.stringify(res),logEnabled);

                
            }              
        }
    );

    return res;

  }


}
  
module.exports = xSnsEndpointManager;