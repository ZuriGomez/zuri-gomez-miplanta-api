import express from "express";
const router = express.Router();
import {
  getAllListings,
  getListingById,
  createListing,
} from "../controllers/listings-controller.js";

router.get("/", getAllListings);

router.get("/:id", getListingById);

router.post('/', createListing);

export default router;