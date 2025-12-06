const reviewService = require("../services/review.service");

async function reviewRoutes(fastify, options) {

  fastify.get("/reviews", {
    schema: {
      description: "Egy termékhez tartozó review-k lekérése az adatbázisból.",
      tags: ["Reviews"],
      querystring: {
        type: "object",
        required: ["productId"],
        properties: {
          productId: { type: "string" }
        }
      },
      response: {
        200: {
          description: "Review lista",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              product_id: { type: "string" },
              reviewer_name: { type: "string", nullable: true },
              review_text: { type: "string" },
              rating: { type: "number", nullable: true },
              posted_at: { type: "string", nullable: true },
              analyzed_at: { type: "string" }
            }
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
    const { productId } = request.query;
    return await reviewService.getReviewsByProductId(productId);
  });

}

module.exports = reviewRoutes;
