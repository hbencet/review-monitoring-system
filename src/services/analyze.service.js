const axios = require("axios");
const sentimentService = require("./sentiment.service");
const productService = require("./product.service");
const reviewService = require("./review.service");

module.exports = {

  async analyzeProduct(url) {

    const match = url.match(/products\/(\d+)/);

    if (!match) {
      throw new Error("Invalid product URL");
    }

    const productId = match[1];


    const productRes = await axios.get(`https://dummyjson.com/products/${productId}`);

    const productData = productRes.data;

    const name = productData.title;
    const brand = productData.brand || null;
    const category = productData.category || null;

    const reviews = productData.reviews || [];


    const existing = await productService.getProductById(productId);

    if (!existing) {
      await productService.insertProduct({
        product_id: productId,
        name,
        brand,
        category
      });
    }


    const formattedReviews = reviews.map(r => ({
      review_text: r.comment,
      rating: r.rating,
      reviewer_name: r.reviewerName
    }));


    const result = await sentimentService.analyzeReviews(productId, formattedReviews);

    return {
      status: "ok",
      productId,
      productName: name,
      reviewsAnalyzed: formattedReviews.length
    };
  }

};
