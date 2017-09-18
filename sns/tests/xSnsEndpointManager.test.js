import xSharedFunctions from '../xRes/shared/xSharedFunctions'
import xSnsEndpointManager from '../xRes/xSnsEndpointManager'

var dotenv = require('dotenv');
dotenv.config({path: '/Users/rpieniazek/SBP/projects/RafPe/serverless-api-sns/sns/tests/.env'});

var xSharedFnc = new xSharedFunctions()

var assert = require('chai').assert;
var should = require('chai').should();
var expect = require('chai').expect;

var AWS = require('aws-sdk-mock');

// AWS.mock('Cognito', 'putItem', function (params, callback){
//   callback(null, "successfully put item in database");
// });

// AWS.mock('SNS', 'publish', 'test-message');

/**
    TESTS
**/

// AWS.restore();


// Response from create
// 

describe('xSnsEndpointManager', function() {
    
        describe('#createPlatformEndpoint()', function() {
    
                before(function () {
                    


                    AWS.mock('SNS', 'createPlatformEndpoint', function (params, callback) {
                    callback(null, '{"ResponseMetadata":{"RequestId":"efdb1199-f10e-5b0b-bff9-43addbda438b"},"EndpointArn":"arn:aws:sns:eu-west-1:12345:endpoint/APNS_SANDBOX/blah-app/c08d3ccd-3e07-328c-a77d-20b2a790122f"}')
                    })

                })


                it('should create endpoint if token provided', function(){

                    var xSnsEndpointMgr = new xSnsEndpointManager('1234',function(dummy,responseCallback){
                        expect(responseCallback.statusCode).to.equal(201);

                        let result = JSON.parse(responseCallback.body);
                        expect(result.component).to.equal('sns');
                        expect(result.status).to.equal('success');

                        let resultData = JSON.parse(result.data);
                        expect(resultData.EndpointArn).not.to.equal(null);
                       
                    },true);

                    let res = xSnsEndpointMgr.createPlatformEndpoint('eee','eee');
                    
                });

                after(function () {
                    AWS.restore('SNS', 'createPlatformEndpoint')
                  })

          });
    
});

describe('xSnsEndpointManager', function() {
    
        describe('#createPlatformEndpoint()', function() {
    
                before(function () {
                    


                    AWS.mock('SNS', 'createPlatformEndpoint', function (params, callback) {
                    callback(null, '{"ResponseMetadata":{"RequestId":"efdb1199-f10e-5b0b-bff9-43addbda438b"},"EndpointArn":"arn:aws:sns:eu-west-1:12345:endpoint/APNS_SANDBOX/blah-app/c08d3ccd-3e07-328c-a77d-20b2a790122f"}')
                    })

                })


                it('should create endpoint if token provided', function(){

                    var xSnsEndpointMgr = new xSnsEndpointManager('1234',function(dummy,responseCallback){
                        expect(responseCallback.statusCode).to.equal(201);

                        let result = JSON.parse(responseCallback.body);
                        expect(result.component).to.equal('sns');
                        expect(result.status).to.equal('success');

                        let resultData = JSON.parse(result.data);
                        expect(resultData.EndpointArn).not.to.equal(null);
                       
                    },true);

                    let res = xSnsEndpointMgr.createPlatformEndpoint('eee','eee');
                    
                });

                after(function () {
                    AWS.restore('SNS', 'createPlatformEndpoint')
                  })

          });
    
});


// 
// RESPONSE FROM LIST ENDPOINTS

// {
//     "component": "sns",
//     "status": "success",
//     "data": [
//         {
//             "EndpointArn": "arn:aws:sns:eu-west-1:12345:endpoint/APNS_SANDBOX/blah-app/c08d3ccd-3e07-328c-a77d-20b2a7901222",
//             "Attributes": {
//                 "Enabled": "true",
//                 "Token": "f1370d83bf664beda45361afcf9db1d0"
//             }
//         },
//         {
//             "EndpointArn": "arn:aws:sns:eu-west-1:12345:endpoint/APNS_SANDBOX/blah-app/c08d3ccd-3e07-328c-a77d-20b2a7901223",
//             "Attributes": {
//                 "Enabled": "true",
//                 "Token": "53ad250af9ef4afbb877388c476a3d14"
//             }
//         }
//     ]
// }
