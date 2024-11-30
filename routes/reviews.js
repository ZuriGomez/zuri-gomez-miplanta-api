import express from "express";
const router = express.Router();
import {
  getReviewsBySellerId,
  getReviewById,
  createReview,
  getSellerInfo,
} from "../controllers//reviews-controller.js";


router.get("/:sellerId", getReviewsBySellerId);

router.get("/seller/:sellerId", getSellerInfo);

router.get("/reviews/:id", getReviewById);

router.post("/", createReview); // Add this route for creating reviews 

export default router;
