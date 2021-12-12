"use strict";
exports.__esModule = true;
var typebox_1 = require("@sinclair/typebox");
var fastify_1 = require("fastify");
var fastify_swagger_1 = require("fastify-swagger");
var dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== 'production') {
    (0, dotenv_1.config)();
}
console.log('server start');
var HOST = process.env.DATABASE_URL || '127.0.0.1';
var PORT = process.env.PORT || 3000;
console.log("NODE_ENV = ".concat(process.env.NODE_ENV));
console.log("HOST = ".concat(HOST));
console.log("PORT = ".concat(PORT));
var server = (0, fastify_1["default"])({ logger: true });
/**
 * swagger
 */
server.register(fastify_swagger_1["default"], {
    routePrefix: "/docs",
    swagger: {
        info: {
            title: "Test swagger",
            description: "Testing the Fastify swagger API",
            version: "0.1.0"
        }
    },
    exposeRoute: true
});
/**
 * test_post
 * https://www.fastify.io/docs/latest/TypeScript/#typebox
 */
var User = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    mail: typebox_1.Type.Optional(typebox_1.Type.String({ format: "email" }))
});
server.post("/test_post", {
    schema: {
        body: User,
        response: {
            200: User
        }
    }
}, function (req, rep) {
    var user = req.body;
    rep.status(200).send(user);
});
/**
 * test get, querystring
 */
var ErrorResponse = typebox_1.Type.Object({
    msg: typebox_1.Type.String()
});
server.get("/test_get", {
    schema: {
        querystring: User,
        response: {
            200: User,
            400: ErrorResponse
        }
    }
}, function (req, rep) {
    var user = req.query;
    if (user.name.length < 3) {
        rep.status(400).send({ msg: "name is too short" });
    }
    else {
        rep.status(200).send(user);
    }
});
server.get("/", {
    schema: {
        querystring: User,
        response: {
            200: User,
            400: ErrorResponse
        }
    }
}, function (req, rep) {
    var user = req.query;
    if (user.name.length < 3) {
        rep.status(400).send({ msg: "name is too short" });
    }
    else {
        rep.status(200).send(user);
    }
});
server.listen(PORT, HOST)
    .then(function (address) { return console.log("server listening on ".concat(address)); })["catch"](function (err) {
    console.log('Error starting server:', err);
    process.exit(1);
});
