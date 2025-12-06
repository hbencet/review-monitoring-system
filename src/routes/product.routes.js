const productService = require("../services/product.service");

async function productRoutes(fastify, options) {
  
  fastify.get("/products", {
    schema: {
      description: "Összes adatbázisba mentett termék lekérése.",
      tags: ["Products"],
      response: {
        200: {
          description: "A termékek listája",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              product_id: { type: "string" },
              name: { type: "string" },
              brand: { type: "string", nullable: true },
              category: { type: "string", nullable: true },
              created_at: { type: "string" }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    return await productService.getAllProducts();
  });


  fastify.get("/product", {
    schema: {
      description: "Egy adott termék lekérése productId alapján.",
      tags: ["Products"],
      querystring: {
        type: "object",
        required: ["productId"],
        properties: {
          productId: { type: "string" }
        }
      },
      response: {
        200: {
          description: "A termék adatai",
          type: "object",
          properties: {
            id: { type: "number" },
            product_id: { type: "string" },
            name: { type: "string" },
            brand: { type: "string", nullable: true },
            category: { type: "string", nullable: true },
            created_at: { type: "string" }
          }
        },
        400: {
          description: "Hibás kérés",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { productId } = request.query;
    return await productService.getProductById(productId);
  });

}

module.exports = productRoutes;
