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
      confirm_password: "examplepassword",
    },
    {
      id: 2,
      user_name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "easypassword",
      confirm_password: "easypassword",
    },
    {
      id: 3,
      user_name: "Alice Wonderland",
      email: "alice@example.com",
      password: "password1323",
      confirm_password: "password1323",
    },
    {
      id: 4,
      user_name: "Bob Builder",
      email: "bob.builder@example.com",
      password: "password2468",
      confirm_password: "password2468",
    },
    {
      id: 5,
      user_name: "Charlie Brown",
      email: "charlie.brown@example.com",
      password: "password1357",
      confirm_password: "password1357",
    },
    {
      id: 6,
      user_name: "Lily Goodwill",
      email: "lily.goodwill@example.com",
      password: "password2024",
      confirm_password: "password2024",
    },
    {
      id: 7,
      user_name: "Diana Prince",
      email: "diana.prince@example.com",
      password: "password91011",
      confirm_password: "password91011",
    },
  ]);
}
