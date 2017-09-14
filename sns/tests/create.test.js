import xSharedFunctions from '../xRes/shared/xSharedFunctions'
import xSnsEndpointManager from '../xRes/xSnsEndpointManager'

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

describe('xSharedFunctions', function() {

    describe('#generateErrorResponse()', function() {

            it('should return default error values', function(done){
                let x = xSharedFnc.generateErrorResponse('e','e');

                expect(x.statusCode).to.equal(400);
                expect(x.body).to.equal('{"component":"e","status":"error","error":"e"}');
                
                done();
            });
      });

      describe('#generateSuccessResponse()', function() {
        
                    it('should return default success values', function(done){
                        let x = xSharedFnc.generateSuccessResponse('e','e');
        
                        expect(x.statusCode).to.equal(200);
                        expect(x.body).to.equal('{"component":"e","status":"success","data":"e"}');
                        
                        done();
                    });
              });

});


// Response from create
// {"component":"sns","status":"success","data":{"ResponseMetadata":{"RequestId":"efdb1199-f10e-5b0b-bff9-43addbda438b"},"EndpointArn":"arn:aws:sns:eu-west-1:171435972641:endpoint/APNS_SANDBOX/Development-ninja.rafpe.pushtest01/c08d3ccd-3e07-328c-a77d-20b2a790122f"}}

describe('xSnsEndpointManager', function() {
    
        describe('#createPlatformEndpoint()', function() {
    
                before(function () {
                    
                    AWS.mock('SNS', 'createPlatformEndpoint', function (params, callback) {
                    callback(null, 'dummy-data')
                    })

                })

                it('should return default error values', function(){

                    var xSnsEndpointMgr = new xSnsEndpointManager('1234');

                    let res = xSnsEndpointMgr.createPlatformEndpoint('123','123');

                    console.log(res)

                    expect(res.statusCode).to.equal(500);
                    expect(res.body).to.equal('{"component":"e","status":"error","error":"e"}');
                });

                after(function () {
                    AWS.restore('SNS', 'createPlatformEndpoint')
                  })

          });
    
});