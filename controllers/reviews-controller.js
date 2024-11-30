import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

// Get reviews by seller id
const getReviewsBySellerId = async (req, res) => {
  const { sellerId } = req.params
  try {
    const reviews = await knex("reviews")
    .join("user", "reviews.reviewer_id", "user.id")
    .select(
      "reviews.id",
      "user.user_name as reviewer_name",
      "reviews.review_text",
      "reviews.created_at"
    )
    .where("reviews.reviewed_user_id", sellerId);

  if (reviews.length > 0 ) {
    res.status(200).json(reviews);
  } else {
    res.status(404).json({ message: "No reviews found for this seller"});
  }
  } catch (error) {
    res.status(500).json({ message: "Error getting reviews" });
  }
};

const getSellerInfo = async (req, res) => {
  const { sellerId } = req.params;  
  try {
    const seller = await knex("user")  
      .select("user_name")  
      .where({ id: sellerId })
      .first();  

    if (seller) {
      res.status(200).json(seller);  // Return seller info if found
    } else {
      res.status(404).json({ message: "Seller not found" });  // Return 404 if no seller is found
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting seller info" });  // Return 500 error if something goes wrong
  }
};

// Get review by ID
const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await knex("reviews").where({ id }).first();
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting review" });
  }
};

//Create Review
const createReview = async (req, res) => {
  const { reviewer_id, reviewed_user_id, rating, review_text } = req.body;
  if (
    !reviewer_id ||
    !reviewed_user_id ||
    !rating ||
    !review_text ||
    typeof reviewer_id !== "number" ||
    typeof reviewed_user_id !== "number" ||
    typeof rating !== "number" ||
    rating < 1 ||
    rating > 5 ||
    typeof review_text !== "string" ||
    !review_text.trim()
  ) {
    return res.status(400).json({
      message:
        "All fields must be filled out correctly. Rating must be between 1 and 5.",
    });
  }
  try {
    const [newReviewId] = await knex("reviews").insert({
      reviewer_id,
      reviewed_user_id,
      rating,
      review_text,
    });
    const newReview = await knex("reviews").where({ id: newReviewId }).first();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};

export { getReviewsBySellerId, getSellerInfo, getReviewById, createReview };
