const statsService = require("../services/stats.service");

async function statsRoutes(fastify, options) {

  fastify.get("/product-stats", {
    schema: {
      description: "Egy termékhez tartozó statisztikák: pozitív/semleges/negatív review-k és átlagos rating.",
      tags: ["Statistics"],
      querystring: {
        type: "object",
        required: ["productId"],
        properties: {
          productId: { 
            type: "string",
            description: "A termék azonosítója",
          }
        }
      },
      response: {
  200: {
    description: "A termék elemzett statisztikái",
    type: "object",
    required: ["productId", "totalReviews", "sentiments", "averageRating"],
    properties: {
      productId: { type: "string" },
      totalReviews: { type: "number" },
      sentiments: {
        type: "object",
        required: ["positive", "neutral", "negative"],
        properties: {
          positive: { type: "number" },
          neutral: { type: "number" },
          negative: { type: "number" }
        }
      },
      averageRating: { type: "string" }
    }
  }
}

    }
  }, async (request, reply) => {

    const { productId } = request.query;

    if (!productId) {
      return reply.status(400).send({ error: "productId is required" });
    }

    const stats = await statsService.getProductStats(productId);
    return stats;
  });
}

module.exports = statsRoutes;
