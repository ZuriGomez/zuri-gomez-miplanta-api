/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("reviews").del();
  // Inserts seed entries
  await knex("reviews").insert([
    {
      reviewer_id: 1,
      reviewed_user_id: 2,
      rating: 5,
      review_text:
        "Amazing seller! The monstera plant was healthy and well-packaged. Highly recommend!",
    },
    {
      reviewer_id: 2,
      reviewed_user_id: 3,
      rating: 4,
      review_text:
        "Got a beautiful peace lily. The delivery was a bit late, but the plant was in great condition.",
    },
    {
      reviewer_id: 3,
      reviewed_user_id: 1,
      rating: 5,
      review_text:
        "Bought a rare orchid, and it was stunning! The seller was very helpful with care tips.",
    },
    {
      reviewer_id: 1,
      reviewed_user_id: 3,
      rating: 3,
      review_text:
        "The succulent was okay, but it had a few damaged leaves. Seller should pack better.",
    },
    {
      reviewer_id: 2,
      reviewed_user_id: 1,
      rating: 4,
      review_text:
        "Purchased a fiddle leaf fig, and it arrived healthy and vibrant. Great seller overall.",
    },
    {
      reviewer_id: 3,
      reviewed_user_id: 2,
      rating: 5,
      review_text:
        "Received a beautiful spider plant. Excellent communication and fast shipping.",
    },
  ]);
}
