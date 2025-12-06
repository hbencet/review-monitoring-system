exports.up = function (knex) {
  return knex.schema.createTable("sentiments", (table) => {
    table.increments("id").primary();

    table.integer("review_id").unsigned().notNullable();
    table.foreign("review_id").references("reviews.id");

    table.string("sentiment_label", 20).notNullable();
    table.float("confidence");
    table.string("aspect_category", 100);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sentiments");
};
