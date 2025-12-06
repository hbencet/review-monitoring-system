const sentimentService = require("../services/sentiment.service");

async function sentimentRoutes(fastify, options) {

  fastify.post("/analyze-reviews", async (request, reply) => {
    const { productId, reviews } = request.body;

    if (!productId || !reviews) {
      return reply.status(400).send({ error: "productId and reviews are required" });
    }

    return await sentimentService.analyzeReviews(productId, reviews);
  });

}

module.exports = sentimentRoutes;
