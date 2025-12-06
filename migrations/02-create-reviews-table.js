exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("id").primary();

    table.string("product_id", 50).notNullable();
    table.foreign("product_id").references("products.product_id");

    table.string("reviewer_name", 150);
    table.text("review_text").notNullable();
    table.integer("rating");
    table.timestamp("posted_at");
    table.timestamp("analyzed_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("reviews");
};
