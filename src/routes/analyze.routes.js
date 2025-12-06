const analyzeService = require("../services/analyze.service");

async function analyzeRoutes(fastify, options) {

  fastify.get("/analyze-product", {
    schema: {
      description: "Termék URL alapján automatikusan lekéri a review-kat a DummyJSON API-ból, majd elemzi őket a Python AI segítségével.",
      tags: ["Analyze"],
      querystring: {
        type: "object",
        required: ["url"],
        properties: {
          url: {
            type: "string",
            description: "A termék URL-je",
          }
        }
      },
      response: {
        200: {
          description: "Sikeres elemzés eredménye",
          type: "object",
          properties: {
            status: { type: "string" },
            productId: { type: "string" },
            productName: { type: "string" },
            reviewsAnalyzed: { type: "number" }
          },
          examples: [{
            status: "ok",
            productId: "4",
            productName: "iPhone 9",
            reviewsAnalyzed: 5
          }]
        },
        400: {
          description: "Hibás kérés",
          type: "object",
          properties: { error: { type: "string" } }
        },
        500: {
          description: "Elemzés közben hiba történt",
          type: "object",
          properties: { error: { type: "string" } }
        }
      }
    }
  }, async (request, reply) => {

    const { url } = request.query;

    if (!url) {
      return reply.status(400).send({ error: "url is required" });
    }

    try {
      const result = await analyzeService.analyzeProduct(url);
      return result;
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: "Failed to analyze product" });
    }
  });
}

module.exports = analyzeRoutes;
