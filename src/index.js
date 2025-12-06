require("dotenv").config();
const fastify = require("fastify")({ logger: true });

const productRoutes = require("./routes/product.routes");
const reviewRoutes = require("./routes/review.routes");
const sentimentRoutes = require("./routes/sentiment.routes");
const analyzeRoutes = require("./routes/analyze.routes");
const statsRoutes = require("./routes/stats.routes");
const chartRoutes = require("./routes/chart.routes.js");


const { knex } = require("./db/database");

fastify.register(require("@fastify/swagger"), {
  openapi: {
    info: {
      title: "Review Monitoring System API",
      description: "Automatikus review elemzés AI segítségével",
      version: "1.0.0",
    },
  },
});

fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/docs",
  exposeRoute: true,
});


const start = async () => {

  for (;;) {
    try {
      await knex.raw("SELECT 1+1");
      fastify.log.info("Connected to PostgreSQL successfully.");
      break;
    } catch (err) {
      fastify.log.error("Unable to connect to PostgreSQL, retrying...");
      fastify.log.error(err);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  try {
    await knex.migrate.latest({ directory: "migrations" });
    fastify.log.info("Database migrations completed.");
  } catch (err) {
    fastify.log.error("Migration failure:");
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.register(productRoutes);
  fastify.register(reviewRoutes);
  fastify.register(sentimentRoutes);
  fastify.register(analyzeRoutes);
  fastify.register(statsRoutes);
  fastify.register(chartRoutes);

  fastify.listen({ port: 5000 }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`Server listening at ${address}`);
  });
};

start();

module.exports = fastify;
