/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("reviews").del();
  await knex("reviews").insert([
    {
      reviewer_id: 2,
      reviewed_user_id: 1,
      rating: 4,
      review_text:
        "The pothos plant arrived healthy, but the packaging could have been a bit sturdier. Overall, happy with my purchase!",
    },
    {
      reviewer_id: 3,
      reviewed_user_id: 1,
      rating: 5,
      review_text:
        "John was very professional! The fern I bought was lush and green. Would definitely buy again.",
    },
    {
      reviewer_id: 1,
      reviewed_user_id: 2,
      rating: 5,
      review_text:
        "Amazing seller! The monstera plant was healthy and well-packaged. Highly recommend!",
    },
    {
      reviewer_id: 3,
      reviewed_user_id: 2,
      rating: 5,
      review_text:
        "Received a beautiful spider plant. Excellent communication and fast shipping.",
    },
    {
      reviewer_id: 5,
      reviewed_user_id: 2,
      rating: 4,
      review_text:
        "Bought a snake plant, and it was very vibrant. Packaging could improve, but the plant was in great condition.",
    },
    {
      reviewer_id: 2,
      reviewed_user_id: 3,
      rating: 4,
      review_text:
        "Got a beautiful peace lily. The delivery was a bit late, but the plant was in great condition.",
    },
    {
      reviewer_id: 1,
      reviewed_user_id: 3,
      rating: 3,
      review_text:
        "The succulent was okay, but it had a few damaged leaves. Seller should pack better.",
    },
    {
      reviewer_id: 4,
      reviewed_user_id: 3,
      rating: 5,
      review_text:
        "Ordered a rare bonsai, and it was exactly as described. Alice gave great advice on care tips too!",
    },
    {
      reviewer_id: 6,
      reviewed_user_id: 4,
      rating: 4,
      review_text:
        "Bob was great to deal with! The cactus I purchased was well-rooted and healthy. Will shop again!",
    },
    {
      reviewer_id: 3,
      reviewed_user_id: 4,
      rating: 5,
      review_text:
        "Fantastic experience! The fiddle leaf fig was stunning, and Bob answered all my questions.",
    },
    {
      reviewer_id: 7,
      reviewed_user_id: 5,
      rating: 4,
      review_text:
        "Charlie delivered a gorgeous aloe vera plant. It had a bit of soil spillage, but the plant itself was fine.",
    },
    {
      reviewer_id: 1,
      reviewed_user_id: 5,
      rating: 5,
      review_text:
        "Purchased a rubber tree, and it was perfect! Charlie provided great communication throughout.",
    },
    {
      reviewer_id: 2,
      reviewed_user_id: 5,
      rating: 4,
      review_text:
        "Great seller! The ivy plant arrived in great shape. Took a bit longer to ship than expected, but it was worth it.",
    },
    {
      reviewer_id: 3,
      reviewed_user_id: 6,
      rating: 5,
      review_text:
        "Absolutely love my new orchid! Lily was very kind and included helpful tips for care.",
    },
    {
      reviewer_id: 5,
      reviewed_user_id: 6,
      rating: 5,
      review_text:
        "Lily was very professional! The bamboo plant I purchased arrived quickly and looked amazing.",
    },
    {
      reviewer_id: 6,
      reviewed_user_id: 7,
      rating: 5,
      review_text:
        "Diana is a fantastic seller! The philodendron I received was healthy and thriving. Will shop again soon!",
    },
    {
      reviewer_id: 2,
      reviewed_user_id: 7,
      rating: 4,
      review_text:
        "Bought a lavender plant. It smelled wonderful and was packaged nicely. Took a little longer to arrive, though.",
    },
    {
      reviewer_id: 4,
      reviewed_user_id: 7,
      rating: 5,
      review_text:
        "The palm plant was stunning and exceeded my expectations. Diana was very helpful throughout the process.",
    },
  ]);
}
