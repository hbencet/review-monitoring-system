const { knex } = require("../db/database");

module.exports = {
  async getAllProducts() {
    return await knex("products").select("*");
  },

  async getProductById(productId) {
    return await knex("products")
      .where({ product_id: productId })
      .first();
  },

  async insertProduct(productData) {
    return await knex("products").insert(productData);
  }
};
