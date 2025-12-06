const sentimentService = require("../services/sentiment.service");

async function sentimentRoutes(fastify, options) {

  fastify.post("/analyze-reviews", {
    schema: {
      description: "Review-k elemzése AI segítségével (Python API).",
      tags: ["Sentiment"],
      body: {
        type: "object",
        required: ["productId", "reviews"],
        properties: {
          productId: { type: "string" },
          reviews: {
            type: "array",
            items: {
              type: "object",
              required: ["review_text"],
              properties: {
                review_text: { type: "string" },
                rating: { type: "number" },
                reviewer_name: { type: "string" }
              }
            }
          }
        }
      },
      response: {
        200: {
          description: "Elemzés sikeres",
          type: "object",
          properties: {
            status: { type: "string" },
            reviewsAnalyzed: { type: "number" }
          }
        },
        400: {
          description: "Hiányzó paraméter",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        }
      }
    }
  }, async (request, reply) => {

    const { productId, reviews } = request.body;

    return await sentimentService.analyzeReviews(productId, reviews);
  });

}

module.exports = sentimentRoutes;
