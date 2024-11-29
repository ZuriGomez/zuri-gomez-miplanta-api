import express from "express";
import authenticateUser from "../middlewares/auth.js";
import {
  getAllListings,
  getListingById,
  createListing,
  getUserListings,
  getUserListingsDemo,
} from "../controllers/listings-controller.js";

const router = express.Router();

router.get("/", getAllListings);

router.get("/:id", getListingById);

router.post('/', authenticateUser, createListing);

router.get("/user-listings/:userId", getUserListings); // Dynamic user ID route
router.get("/user-listings-demo", getUserListingsDemo); // Hardcoded user ID route

export default router;