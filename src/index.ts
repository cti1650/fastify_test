import { Static, Type } from "@sinclair/typebox"
import fastify, { FastifyInstance } from "fastify"
import fastifySwagger from "fastify-swagger"
import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

const PORT = process.env.PORT || 9000;

const server:FastifyInstance  = fastify({ logger: true });

/**
 * swagger
 */
server.register(fastifySwagger, {
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
  },
  exposeRoute: true,
})

/**
 * test_post
 * https://www.fastify.io/docs/latest/TypeScript/#typebox
 */
const User = Type.Object({
  name: Type.String(),
  mail: Type.Optional(Type.String({ format: "email" })),
})
type UserType = Static<typeof User>

server.post<{ Body: UserType; Reply: UserType }>(
  "/test_post",
  {
    schema: {
      body: User,
      response: {
        200: User,
      },
    },
  },
  (req, rep) => {
    const { body: user } = req
    rep.status(200).send(user)
  }
)

/**
 * test get, querystring
 */
const ErrorResponse = Type.Object({
  msg: Type.String(),
})
type ErrorResponseType = Static<typeof ErrorResponse>

server.get<{ Querystring: UserType; Reply: UserType | ErrorResponseType }>(
  "/test_get",
  {
    schema: {
      querystring: User,
      response: {
        200: User,
        400: ErrorResponse,
      },
    },
  },
  (req, rep) => {
    const { query: user } = req
    if (user.name.length < 3) {
      rep.status(400).send({ msg: "name is too short" })
    } else {
      rep.status(200).send(user)
    }
  }
)

server.get<{ Querystring: UserType; Reply: UserType | ErrorResponseType }>(
  "/",
  {
    schema: {
      querystring: User,
      response: {
        200: User,
        400: ErrorResponse,
      },
    },
  },
  (req, rep) => {
    const { query: user } = req
    if (user.name.length < 3) {
      rep.status(400).send({ msg: "name is too short" })
    } else {
      rep.status(200).send(user)
    }
  }
)

if (process.env.NODE_ENV !== 'production') {
  server.listen(PORT);
}else{
  module.exports = server;
}

