const statsService = require("../services/stats.service");
const chartService = require("../services/chart.service");

async function chartRoutes(fastify, options) {

  fastify.get("/product-stats-chart", {
    schema: {
      tags: ["Charts"],
      operationId: "getProductStatsChart",
      querystring: {
        type: "object",
        required: ["productId"],
        properties: {
          productId: { type: "string" }
        }
      },
      response: {
        200: {
          type: "object",
          required: ["base64"],
          properties: {
            base64: { type: "string" }
          }
        }
      }
    }
  }, async (request, reply) => {

    const { productId } = request.query;

    const stats = await statsService.getProductStats(productId);
    if (stats.error) return reply.status(400).send(stats);

    const imageBuffer = await chartService.generateSentimentPieChart(stats);

  reply
    .header("Content-Type", "image/png")
    .send(imageBuffer);
  });
}

module.exports = chartRoutes;
