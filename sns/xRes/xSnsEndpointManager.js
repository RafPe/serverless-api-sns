var xSharedFunctions = require('./shared/xSharedFunctions');


const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies


class xSnsEndpointManager {  
    
    constructor(uuid,callback,disableLog){
              
        this.callback   = callback;
        this.component  = 'sns';
        this.disableLog = (disableLog != true ) ? null : disableLog ;
        this.xSharedFnc = new xSharedFunctions(this.component,this.disableLog);  
        this.uuid       = uuid;


        this.sns = new AWS.SNS({
            apiVersion: '2010-03-31',
            region: process.env.REGION
        });

    }
    
  createPlatformEndpoint(applicationArn, deviceToken, deviceMetadata){
    var that = this; 

    let res        = null;

    let params = {
        PlatformApplicationArn: applicationArn,
        Token:                  deviceToken
        } 

    that.sns.createPlatformEndpoint(params,function(err, data) {
            if (err) {

                that.xSharedFnc.logmsg(that.uuid,'error','Failed to create platform endpoint (EC.003)');
                that.xSharedFnc.logmsg(that.uuid,'error',`${JSON.stringify(err)}`);

                let errorData = {
                    code: "EC.003",
                    data: err
                }

                res = that.xSharedFnc.generateErrorResponse(errorData);

                that.callback(null,res);

                return;

            } else {

                that.xSharedFnc.logmsg(that.uuid,'info','Created platform endpoint');
                that.xSharedFnc.logmsg(that.uuid,'info',`${JSON.stringify(data)}`);


                res = that.xSharedFnc.generateSuccessResponse(data,201);

                that.xSharedFnc.logmsg(that.uuid,'info',`${JSON.stringify(res)}`);

                that.callback(null,res);
                
                return;
                
            }              
        }
    );



  }


}
  
module.exports = xSnsEndpointManager;