import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const knex = initKnex(configuration);

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await knex("user").select("*");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await knex("user").where({ id }).first();
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting user" });
  }
};

//Create new user 
const createUser = async (req, res) => {
  const validateEmail = (email) => {
    const regEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEX.test(email);
  };
  const { user_name, email, password, confirm_password } = req.body;

  if (
    !user_name ||
    !email ||
    !password ||
    !confirm_password ||
    typeof user_name !== "string" ||
    !user_name.trim() ||
    user_name.trim().length === 0 ||
    typeof email !== "string" ||
    !email.trim() ||
    !validateEmail(email) ||
    typeof password !== "string" ||
    !password.trim() ||
    password.trim().length === 0 ||
    typeof confirm_password !== "string" ||
    !confirm_password.trim() ||
    confirm_password.trim().length === 0 ||
    password !== confirm_password
  ) {
    return res.status(400).json({
      message:
        "All fields must be filled out correctly. Passwords must match and should not contain spaces.",
    });
  }

  try {

    const existingUser = await knex("user").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    
    const [newUserId] = await knex("user").insert({
      user_name,
      email,
      password,
      confirm_password,
    });

    const newUser = await knex("user").where({ id: newUserId }).first();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

//User log in
const loginUser = async (req, res) => {
  const validateEmail = (email) => {
    const regEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEX.test(email);
    };
  
  const { email, password } = req.body;

  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    !email.trim() ||
    !validateEmail(email) ||
    typeof password !== "string" ||
    !password.trim() ||
    password.trim().length === 0
) {
    return res.status(400).json({
        message:
            "Both email and password must be filled out correctly. Email must be valid, and password should not contain spaces.",
    });
}

try {
  const user = await knex("user").where({ email, password }).first();

  if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
  }
  const { confirm_password, ...userData } = user;

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {expiresIn: '3h'});

  res.status(200).json({
      message: "Login successful",
      user: userData,
      token
  });
} catch (error) {
  res.status(500).json({ message: "Error logging in", error });
}
};

export { getAllUsers, getUserById, createUser,loginUser };
