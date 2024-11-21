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
      confirm_password: "examplepassword"
    },
    {
      id: 2,
      user_name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "easypassword",
      confirm_password: "easypassword"
    },
    {
      id: 3,
      user_name: "Alice Wonderland",
      email: "alice@example.com",
      password: "password1323",
      confirm_password: "password1323"
    },
  ]);
}
