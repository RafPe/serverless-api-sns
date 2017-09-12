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

describe('xSnsEndpointManager', function() {
    
        describe('#createPlatformEndpoint()', function() {
    
                before(function () {
                    
                    AWS.mock('SNS', 'createPlatformEndpoint', function (params, callback) {
                    callback(null, 'dummy-data')
                    })

                })

                it('should return default error values', function(done){

                    var xSnsEndpointMgr = new xSnsEndpointManager('1234');

                    let res = xSnsEndpointMgr.createPlatformEndpoint('123','123');
                    done();
                    console.log(res)

                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.equal('{"component":"e","status":"error","error":"e"}');
                    
                });

                after(function () {
                    AWS.restore('SNS', 'createPlatformEndpoint')
                  })

          });
    
});