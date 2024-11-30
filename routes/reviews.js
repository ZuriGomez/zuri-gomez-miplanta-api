import express from "express";
const router = express.Router();
import {
  getReviewsBySellerId,
  getReviewById,
  createReview,
} from "../controllers//reviews-controller.js";


router.get("/:sellerId", getReviewsBySellerId);

router.get("/reviews/:id", getReviewById);

router.post("/", createReview); // Add this route for creating reviews 

export default router;
