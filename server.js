var hapi = require('hapi');
var fs = require('fs');
var Joi = require('joi');
var users = [];
const bcrypt = require('bcrypt');
// var password=[];
var count = 0
const server = new hapi.Server();
server.connection({ port: 3000, host: 'localhost' });
server.route({
    method: 'POST',
    path: '/signUp',
    config: {
        handler: function (req, res) {
            data = req.payload;
            for(i=0;i<users.length;i++)
            {
                if(data.email===user[i].email)
                {
                    var response = { "message": "error", 'statusCode': "400" };
                    res(response);
                }

            }
            let hash = bcrypt.hashSync(data.password, 10);
            data.password = hash;
            users.push(data);
            var response = { "message": "Sucess", 'statusCode': "200" };
            res(response);
            // payload: {
            //     maxBytes: 209715200,
            //     output: 'file',
            //             parse: true,
            //                 allow: 'multipart/form-data'
            // }

        },
        validate: {
            payload: {
                email: Joi.string().email().required(),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
                name: Joi.string().optional()
            }
        }
    }

});


server.route({
    method: 'POST',
    path: "/logIN",
    handler: function (req, res) {
        data = req.payload;

        for (i = 0; i < users.length; i++) {
            console.log(bcrypt.compareSync(data.password, users[i].password));
           // console.log(bcrypt.hashSync(data.password, 10));
            if (data.email == users[i].email && bcrypt.compareSync(data.password,users[i].password)){
                console.log("c d");
                flag = true;
                break;
            }
            else {
                console.log("vxsdvhds");
                flag = false;
                // var response={"message":"error",'statusCode':"400"};
                // res(response);
            }
        }
        if (flag) {
            var response = { "message": "Sucess", 'statusCode': "200" };
            response.data = users[i]
            res(response);
        }
        else {
            var response = { "message": "error", 'statusCode': "400" };
            res(response);
        }

    }

});

server.start(function () {
    console.log('info', 'Server running at: ' + server.info.uri);
})