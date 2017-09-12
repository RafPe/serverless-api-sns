import xSharedFunctions from './shared/xSharedFunctions'

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

var sns = new AWS.SNS({
	apiVersion: '2010-03-31',
	region: process.env.REGION
});

var xSharedFnc = new xSharedFunctions()

class xSnsEndpoint {  
    constructor(uuid){
        this.component = 'sns';
        this.uuid = uuid;
    }
    
  createPlatformEndpoint(applicationArn, deviceToken, deviceMetadata){

            sns.createPlatformEndpoint({
                PlatformApplicationArn: applicationArn,
                Token: deviceToken
            }, function(err, data) {
                if (err) {


                    xSharedFnc.logmsg(this.component,this.uuid,'error','Failed to create platform endpoint (EC.003)');
                    xSharedFnc.logmsg(this.component,this.uuid,'error',JSON.stringify(err));

                    let errorData = {
                        code: "EC.003",
                        data: err
                    }

                    let resp = xSharedFnc.generateErrorResponse(errorData,this.component);

                    callback(null,resp); 


                } else {

                    xSharedFnc.logmsg(this.component,this.uuid,'info','Created platform endpoint');
                    xSharedFnc.logmsg(this.component,this.uuid,'info',JSON.stringify(data));


                    let resp = xSharedFnc.generateSuccessResponse(data,this.component,201);

                    callback(null,resp); 
                }              
                }
            );

  }


}
  
module.exports = xSnsEndpoint;