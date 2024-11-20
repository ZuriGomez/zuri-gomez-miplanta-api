/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("listings", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.string("photo").notNullable();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.enu("maintenance", ["low", "medium", "high"]).notNullable();
    table.enu("pot_included", ["yes", "no"]).notNullable();
    table.string("pot_description");
    table.decimal("height", 5, 2).notNullable();
    table
      .enu("sunlight", [
        "full sun",
        "partial sun",
        "partial shade",
        "full shade",
      ])
      .notNullable();
    table.string("temperature").notNullable();
    table
      .enu("watering", ["once per week", "every two weeks", "every month"])
      .notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.enu("delivery", ["pickup", "delivery"]).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("listings");
}
