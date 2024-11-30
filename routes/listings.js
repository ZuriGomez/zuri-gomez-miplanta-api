import express from "express";
import authenticateUser from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
import {
  getAllListings,
  getListingById,
  getUserListings,
  createListing,
  getUserInfo,
  getUserListingsCount,
} from "../controllers/listings-controller.js";

const router = express.Router();

router.get("/", getAllListings);

router.get("/user-listings/:id", getListingById);

// router.post('/', authenticateUser, createListing);
router.post('/', upload.single('photo'), authenticateUser, createListing);

router.get("/user-listings", authenticateUser, getUserListings);

router.get("/info", authenticateUser, getUserInfo);

router.get("/user-listings", authenticateUser, getUserListingsCount);

export default router;