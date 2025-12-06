const { knex } = require("../db/database");
const http = require("../utils/httpClient");
const productService = require("./product.service");
const reviewService = require("./review.service");

module.exports = {

  async analyzeReviews(productId, reviews) {

    const response = await http.post("/analyze", {
      reviews: reviews.map(r => r.review_text)
    });

    const sentiments = response.data.results;

    const existing = await productService.getProductById(productId);
    
    if (!existing) {
      await productService.insertProduct({
        product_id: productId,
        name: "Unknown Product",
        brand: null,
        category: null
      });
    }

    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      const sentimentLabel = sentiments[i].label;
      const confidence = sentiments[i].confidence;

      const reviewId = await reviewService.insertReview(productId, review);


      await knex("sentiments").insert({
        review_id: reviewId,
        sentiment_label: sentimentLabel,
        confidence: confidence
      });
    }

    return { status: "ok", reviewsAnalyzed: reviews.length };
  }

};
