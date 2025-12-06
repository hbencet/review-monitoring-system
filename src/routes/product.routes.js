const productService = require("../services/product.service");

async function productRoutes(fastify, options) {
  
  fastify.get("/products", async (request, reply) => {
    return await productService.getAllProducts();
  });

  fastify.get("/product", async (request, reply) => {
    const { productId } = request.query;

    if (!productId) {
      return reply.status(400).send({ error: "productId is required" });
    }

    return await productService.getProductById(productId);
  });

}

module.exports = productRoutes;
