import express from "express";
const router = express.Router();
import {
  getAllListings,
  getListingById,
  createListing,
  getUserListings,
  getUserListingsDemo,
} from "../controllers/listings-controller.js";

router.get("/", getAllListings);

router.get("/:id", getListingById);

router.post('/', createListing);

router.get("/user-listings/:userId", getUserListings); // Dynamic user ID route
router.get("/user-listings-demo", getUserListingsDemo); // Hardcoded user ID route

export default router;