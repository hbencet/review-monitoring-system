exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("product_id", 50).unique().notNullable();
    table.string("name", 255).notNullable();
    table.string("brand", 150);
    table.string("category", 150);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");
};
