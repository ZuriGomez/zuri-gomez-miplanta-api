/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("id").primary();
    table
      .integer("reviewer_id") 
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .integer("reviewed_user_id") 
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.integer("rating").notNullable().checkBetween([1, 5]);
    table.text("review_text").notNullable(); 
    table.timestamp("created_at").defaultTo(knex.fn.now()); 
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("reviews");
}
