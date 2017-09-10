# serverless-api-sns
This is first of multi component API projects which can be used to quickly create REST API for custom interaction with AWS Services.

# Deploying 

## Credentials 
Follow guide on serverless to set up credentials used for deployment on AWS.

## Variables 
Within serverless.yml specify the following attributes 
* name 
* region 
* stage 

## Auth 
At the moment resources will be automatically protected with api key defined in `serverless.yml` which will be presented after deployment.

## Required resources
At the moment application does not create `application platform` - this you have to create on your own. 

## Deploy 
```
serverless deploy 
```

# Use
After deployments you will just need to make appropiate HTTP requests to endpoints. 
## Endpoint 
Methods and properties required for endpoint management 
### Create 
Creates new endpoint in specificed `application platform`
|  Path | sns/endpoint/create  |
|---|---|---|---|---|
|  Method | POST  | 

```json
{
    "deviceMeta":"meta-data-comes-here",    
    "deviceToken":"c2682e3f32dd435fb4e3f425ac0c3e5b",    
    "platformApplicationArn":"arn:aws:sns:<region>:<id>:whatever/wha"    
}
``` 

### Delete
Deletes specific endpoint
|  Path | sns/endpoint/delete  |
|---|---|---|---|---|
|  Method | DELETE  | 

```json
{
    "endpointArn":"arn:aws:sns:<region>:<id>:whatever/wha"    
}
``` 

### List
Lists all endpoints in specified `application platform`
|  Path | sns/endpoint/list  |
|---|---|
|  Method | POST  | 

```json
{
    "platformApplicationArn":"arn:aws:sns:<region>:<id>:whatever/wha"    
}
``` 

## Error codes 
### Error table
|  Code | Description  |
|---|---|
|  EC.001 | Missing body  | 
|  EC.002 | Missing required parameters in body  | 
|  EC.003 | Failed to create platform endpoint   | 
|  EC.004 | Failed to delete platform endpoint   | 
|  EC.005 | Failed to list platform endpoints   | 
### Example of error response 
```json
{
    "action": "CreatePlatformEndpoint",
    "status": "error",
    "error": {
        "code": "EC.002",
        "data": {
            "message": "Missing required parameters in body"
        }
    }
}
```


## TODOs 
* endpoint.metadata
* attributes.*
* topics.* 
* subscriptions.*
* messages.*


