require("dotenv").config();
const fastify = require("fastify")({ logger: true });


const { knex } = require("./db/database");

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
