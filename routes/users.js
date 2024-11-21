import express from "express";
import { getAllUsers, getUserById, createUser } from "../controllers/users-controller.js";

const router = express.Router();

//Route to get all users
router.get('/', getAllUsers);

// Route to get single user
router.get("/:id", getUserById);

// Route to create user
router.post("/", createUser);

export default router;
