import xSharedFunctions from '../xRes/shared/xSharedFunctions'

var xSharedFnc = new xSharedFunctions()

var assert = require('chai').assert;
var should = require('chai').should();
var expect = require('expect.js');


// var AWS = require('aws-sdk-mock');

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
                let x = xSharedFnc.generateErrorResponse(null,'e','e');

                expect(x.statusCode).to.equal(400);
                expect(x.body).to.equal('{"component":"e","status":"error","error":"e"}');
                
                done();
            });
      });

      describe('#generateSuccessResponse()', function() {
        
                    it('should return default success values', function(done){
                        let x = xSharedFnc.generateSuccessResponse(null,'e','e');
        
                        expect(x.statusCode).to.equal(200);
                        expect(x.body).to.equal('{"component":"e","status":"success","data":"e"}');
                        
                        done();
                    });
              });

});