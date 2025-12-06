const { knex } = require("../db/database");

module.exports = {
  async getProductStats(productId) {
    const sentiments = await knex("sentiments")
      .join("reviews", "sentiments.review_id", "reviews.id")
      .where("reviews.product_id", productId)
      .select("sentiment_label");

    if (sentiments.length === 0) {
      return { error: "No reviews found for this product" };
    }

    const counts = {
      positive: sentiments.filter(s => s.sentiment_label === "pozitív").length,
      neutral: sentiments.filter(s => s.sentiment_label === "semleges").length,
      negative: sentiments.filter(s => s.sentiment_label === "negatív").length
    };

    const total = sentiments.length;

    const avgRatingRow = await knex("reviews")
      .where("product_id", productId)
      .avg("rating as avg_rating")
      .first();

    return {
      productId,
      totalReviews: total,
      sentiments: counts,
      averageRating: Number(avgRatingRow.avg_rating || 0).toFixed(2)
    };
  }
};
