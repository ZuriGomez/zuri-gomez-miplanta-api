import initKnex from "knex";
import configuration from "../knexfile.js";
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
    const [newUserId] = await knex("user").insert({
      user_name,
      email,
      password,
      confirm_password,
    });

    const newUser = await knex("user").where({ id: newUserId }).first();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export { getAllUsers, getUserById, createUser };
