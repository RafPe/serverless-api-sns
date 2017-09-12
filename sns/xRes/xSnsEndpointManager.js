import xSharedFunctions from './shared/xSharedFunctions'

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

var xSharedFnc = new xSharedFunctions()

class xSnsEndpointManager {  
    constructor(uuid){

        this.component = 'sns';
        this.uuid      = uuid;

        this.sns = new AWS.SNS({
            apiVersion: '2010-03-31',
            region: process.env.REGION
        });

    }
    
  createPlatformEndpoint(applicationArn, deviceToken, deviceMetadata){

    let component = this.component;
    let uuid      = this.uuid;
    let sns       = this.sns;

    sns.createPlatformEndpoint({
        PlatformApplicationArn: applicationArn,
        Token: deviceToken
        }, function(err, data) {
            if (err) {


                
                
                xSharedFnc.logmsg(component,uuid,'error','Failed to create platform endpoint (EC.003)');
                xSharedFnc.logmsg(component,uuid,'error',JSON.stringify(err));

                let errorData = {
                    code: "EC.003",
                    data: err
                }

                let resp = xSharedFnc.generateErrorResponse(errorData,component);

                return resp;


            } else {

                xSharedFnc.logmsg(component,uuid,'info','Created platform endpoint');
                xSharedFnc.logmsg(component,uuid,'info',JSON.stringify(data));


                let resp = xSharedFnc.generateSuccessResponse(data,component,201);

                console.log(resp)

                return resp;
            }              
        }
    );

  }


}
  
module.exports = xSnsEndpointManager;