import express from "express";
const router = express.Router();
import {
  getAllReviews,
  getReviewById,
  createReview,
} from "../controllers//reviews-controller.js";


router.get("/reviews", getAllReviews);

router.get("/reviews/:id", getReviewById);

router.post("/reviews", createReview); // Add this route for creating reviews 

export default router;
