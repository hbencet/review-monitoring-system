const reviewService = require("../services/review.service");

async function reviewRoutes(fastify, options) {

  fastify.get("/reviews", async (request, reply) => {
    const { productId } = request.query;

    if (!productId) {
      return reply.status(400).send({ error: "productId is required" });
    }

    return await reviewService.getReviewsByProductId(productId);
  });

}

module.exports = reviewRoutes;
