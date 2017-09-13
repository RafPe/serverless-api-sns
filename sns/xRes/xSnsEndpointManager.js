var xSharedFunctions = require('./shared/xSharedFunctions');


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
    var that = this; 

    // let component  = this.component;
    // let uuid       = this.uuid;
    // let sns        = this.sns;
    // let logEnabled = this.logEnabled
    let res        = null;

    return that.sns.createPlatformEndpoint({
        PlatformApplicationArn: applicationArn,
        Token: deviceToken
        }, function(err, data) {
            if (err) {
  
                xSharedFnc.logmsg(that.component,that.uuid,'error','Failed to create platform endpoint (EC.003)',that.logEnabled);
                xSharedFnc.logmsg(that.component,that.uuid,'error',`${JSON.stringify(err)}`,that.logEnabled);

                let errorData = {
                    code: "EC.003",
                    data: err
                }

                res = xSharedFnc.generateErrorResponse(errorData,that.component);

            } else {

                xSharedFnc.logmsg(that.component,that.uuid,'info','Created platform endpoint',that.logEnabled);
                xSharedFnc.logmsg(that.component,that.uuid,'info',`${JSON.stringify(data)}`,that.logEnabled);


                res = xSharedFnc.generateSuccessResponse(data,that.component,201);

                xSharedFnc.logmsg(that.component,that.uuid,'info',`${JSON.stringify(res)}`,that.logEnabled);

                
            }              
        }
    ).promise();



  }


}
  
module.exports = xSnsEndpointManager;