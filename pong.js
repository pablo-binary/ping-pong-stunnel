"use strict";

require("make-promises-safe");

const Hapi = require("@hapi/hapi");

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
      if (request.query.message === "ping") return "pong\n";
      return `"${request.query.message}" unsupported\n`;
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
