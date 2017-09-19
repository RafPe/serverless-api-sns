var xSharedFunctions = require('./shared/xSharedFunctions');


const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies


class xSnsEndpointManager {  
    
    constructor(uuid,callback,disableLog){
              
        this.callback   = callback;
        this.component  = 'sns';

        this.xSharedFnc = new xSharedFunctions(this.component,null,(disableLog === null || disableLog === undefined ) ? null : disableLog);  
        this.uuid       = uuid;


        this.sns = new AWS.SNS({
            apiVersion: '2010-03-31',
            region: process.env.REGION
        });

        this.pAppArn = process.env.PLATFORM_APP_ARN;

    }
    
  createPlatformEndpoint(deviceToken, deviceMetadata,funcCallback){
    var that = this; 

    let res        = null;

    let params = {
        PlatformApplicationArn: that.pAppArn,
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

                res = that.xSharedFnc.generateErrorResponse(errorData,errorData.data.statusCode);

                that.callback(null,res);

                return res;

            } else {

                that.xSharedFnc.logmsg(that.uuid,'info','Created platform endpoint');
                that.xSharedFnc.logmsg(that.uuid,'info',`${JSON.stringify(data)}`);


                res = that.xSharedFnc.generateSuccessResponse(data,201);

                that.xSharedFnc.logmsg(that.uuid,'info',`${JSON.stringify(res)}`);

                that.callback(null,res);            

                return res;
                
            }              
        }
    );



  }

  listPlatformEndpoints(){
    var that = this; 
    let res  = null;

    var params = {
        PlatformApplicationArn: that.pAppArn, /* required */
        NextToken: ''
      };

    let allEndpoints = [];

    that.sns.listEndpointsByPlatformApplication(params).eachPage(function(err, data) {
            if(err) {
                that.xSharedFnc.logmsg(that.uuid,'error','Failed to list platform endpoints (EC.005)');
                that.xSharedFnc.logmsg(that.uuid,'error',`${JSON.stringify(err)}`);

                let errorData = {
                    code: "EC.005",
                    data: err
                }

                res = that.xSharedFnc.generateErrorResponse(errorData,errorData.data.statusCode);

                that.callback(null,res);

                return;
            }
            if(data) {
                allEndpoints.push.apply(allEndpoints,data.Endpoints)
            }
            if(data === null){                    

                that.xSharedFnc.logmsg(that.uuid,'info','Listed platform endpoints');

                res = that.xSharedFnc.generateSuccessResponse(allEndpoints);

                that.xSharedFnc.logmsg(that.uuid,'info',`${JSON.stringify(res)}`);

                that.callback(null,res);

            }
        }
    )
  }

  deletePlatformEndpoint(endpointArn){
    var that = this; 
    let res  = null;

    var params = {
        EndpointArn: endpointArn /* required */
      };

    that.sns.deleteEndpoint(params, function(err, data) {
        if (err) {
           
            that.xSharedFnc.logmsg(that.uuid,'error','Failed to delete platform endpoint (EC.004)');
            that.xSharedFnc.logmsg(that.uuid,'error',`${JSON.stringify(err)}`);


            let errorData = {
                code: "EC.004",
                data: err
            }

            res = that.xSharedFnc.generateErrorResponse(errorData,errorData.data.statusCode);
            
            that.callback(null,res);

            return;

          } else {

            that.xSharedFnc.logmsg(that.uuid,'info','Deleted platform endpoint');
            that.xSharedFnc.logmsg(that.uuid,'info',`${JSON.stringify(data)}`);


            res = that.xSharedFnc.generateSuccessResponse(data,200);

            that.xSharedFnc.logmsg(that.uuid,'info',`${JSON.stringify(res)}`);

            that.callback(null,res);
            
            return;

          }              
        }
);
  }
}
  
module.exports = xSnsEndpointManager;