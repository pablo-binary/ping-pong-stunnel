"use strict";

require("make-promises-safe");

const Hapi = require("@hapi/hapi");
const Wreck = require("@hapi/wreck");

(async function () {
  const server = Hapi.server({
    port: 80,
    host: "0.0.0.0",
  });

  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
      logRequestStart: true,
      logRequestComplete: true,
      level: "trace",
    },
  });

  server.route({
    method: "GET",
    path: "/",
    handler: async (request) => {
      try {
        const { message } = request.query;
        const response = await Wreck.get(
          `http://mitmtls:50126?message=${message}`
        );
        return response.payload;
      } catch (e) {
        console.log(JSON.stringify(e));
      }

      return "nope";
    },
  });

  server.events.on("start", function () {
    server
      .table()
      .forEach((route) =>
        console.log(`\t${route.method.toUpperCase()}\t${route.path}`)
      );
  });

  await server.start();
})();
