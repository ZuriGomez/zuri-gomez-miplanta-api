import express from "express";

const router = express.Router();

// Route to get list of all users
router.get("/", getAllUsers);

// Route to get single user
router.get("/:id", getUserById);

// Route to create user
router.post("/", createListing);

export default router;
