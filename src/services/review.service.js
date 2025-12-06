const { knex } = require("../db/database");

module.exports = {

  async getReviewsByProductId(productId) {
    return await knex("reviews")
      .where({ product_id: productId })
      .select("*");
  },

  async insertReview(productId, review) {
  const rows = await knex("reviews")
    .insert({
      product_id: productId,
      reviewer_name: review.reviewer_name || null,
      review_text: review.review_text,
      rating: review.rating || null,
      posted_at: review.posted_at || null,
      analyzed_at: new Date()
    })
    .returning("id"); 

  return rows[0].id;
}


};
