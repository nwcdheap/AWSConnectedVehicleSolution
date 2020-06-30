'use strict';
console.log('Generate JWT Token function');
const jwt = require('jsonwebtoken');
exports.handler = async (event) => {

    var eventText = JSON.stringify(event, null, 2);
    console.log('Received event:', event);
    console.log('Received body:', event.body);
    const app_secret = process.env.jwtsecrectkey;
    var userid='';
    var password='';
    var responseCode = 200;
    var sec_token;
    var response={};
    var body = JSON.parse(event.body)
    console.log(body)

    if (body.password==app_secret)
    {
        console.log("password==app_secret")
        if(body.userid)
        {
            var payload = {
                sub: body.userid,
                _id: body.userid
            };
            console.log("payload"+payload);
            var i  = 'AWS Connected Vehicle';   
            var s  = 'demo@awsconnectedvehicle.com';   
            var a  = 'http://awsconnectedvehicle.com';
            
            
            var sec_signOptions = {
                issuer:  i,
                // subject:  s,
                audience:  a,
                expiresIn:  "1h",
                algorithm:  "HS256" 
            };
            
            sec_token=jwt.sign(payload,app_secret,sec_signOptions);
            console.log("sec_token :" + sec_token);
            response.headers = {
                'Access-Control-Allow-Origin' : '*'
            }
            response = {
                statusCode: 200,
                "headers": {
                    "jwttoken": "Lack of UserId"
                },
                body: JSON.stringify({
                    'jwttoken' : sec_token
                })
            };
            console.log("response: " + JSON.stringify(response))
        }
        else{
            response.headers = {
                'Access-Control-Allow-Origin' : '*'
            }
            response={
                statusCode: 400,
                "headers": {
                    "jwttoken": "Lack of UserId"
                },
                body:JSON.stringify({
                    'jwttoken' : 'Lack of UserId'
                })
                
            }
        }
    }
    else
    {
        response.headers = {
            'Access-Control-Allow-Origin' : '*'
        }
        response = {
            statusCode: 400,
            "headers": {
                "jwttoken": "Lack of UserId"
            },
            body:JSON.stringify({
                'jwttoken' : 'Lack of UserId'
            })
        };
    }

 

    // The output from a Lambda proxy integration must be 
    // in the following JSON object. The 'headers' property 
    // is for custom response headers in addition to standard 
    // ones. The 'body' property  must be a JSON string. For 
    // base64-encoded payload, you must also set the 'isBase64Encoded'
    // property to 'true'.

    return response;
};