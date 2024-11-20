/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  // Inserts seed entries
  await knex("user").insert([
    {
      id: 1,
      user_name: "John Doe",
      email: "john.doe@example.com",
      password: "examplepassword",
      created_at: "2024-11-20T12:00:00.000Z",
      updated_at: "2024-11-20T12:00:00.000Z",
    },
    {
      id: 2,
      user_name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "easypassword",
      created_at: "2024-11-20T12:05:00.000Z",
      updated_at: "2024-11-20T12:05:00.000Z",
    },
    {
      id: 3,
      user_name: "Alice Wonderland",
      email: "alice@example.com",
      password: "password1323",
      created_at: "2024-11-20T12:10:00.000Z",
      updated_at: "2024-11-20T12:10:00.000Z",
    },
  ]);
}
