import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

// Get all listings
const getAllListings = async (req, res) => {
  try {
    const listings = await knex("listings").select("*");
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error getting listings" });
  }
};

//Get listings by user ID - dynamically
const getUserListings = async (req, res) => {
  try {
    const userId = req.user;
    console.log(userId);

    const listings = await knex("listings").where({ user_id: userId });

    if (!listings || listings.length === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error getting user listings:", error);
    res.status(500).json({ message: "Error getting user listings" });
  }
};

// Get listing by ID
const getListingById = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const listing = await knex("listings")
      .join("user", "listings.user_id", "=", "user.id")
      .select(
        "listings.*",
        "user.user_name as seller_name",
        knex.raw("COUNT(reviews.id) as review_count")
      )
      .leftJoin("reviews", "user.id", "=", "reviews.reviewed_user_id")
      .where("listings.id", id)
      .groupBy("listings.id", "user.id")
      .first();

    if (listing) {
      res.status(200).json(listing);
    } else {
      res.status(404).json({ message: "Listing not found" });
    }
  } catch (error) {
    console.error("Detailed Error: ", error);
    res.status(500).json({ message: "Error getting listing" });
  }
};

// Get the count of listings for the logged-in user
const getUserListingsCount = async (req, res) => {
  try {
    const userId = req.user; // Extract the logged-in user's ID from req.user
    console.log("Logged-in User ID:", userId);

    // Use knex to count the number of listings for the logged-in user
    const listingCount = await knex("listings")
      .count("id as count") // Count the number of listings
      .where({ user_id: userId }) // Filter by the logged-in user
      .first(); // Get the first row (result of the count)

    // Send the count in the response
    res.status(200).json({ count: listingCount.count });
  } catch (error) {
    console.error("Error getting user listings count:", error);
    res.status(500).json({ message: "Error getting user listings count" });
  }
};

//Create new Listing
const createListing = async (req, res) => {
  const {
    title,
    description,
    maintenance,
    pot_included,
    pot_description,
    sunlight,
    temperature,
    watering,
    delivery,
  } = req.body;

  // console.log(req.photo, req.file);
  const price = Number(req.body.price);
  const height = Number(req.body.height);
  const photo = req.file ? `uploads/${req.file.filename}` : "";

  const errors = [];

  // console.log("req.body", req.body)
  // console.log('req.file', req.file);
  // console.log('photo', photo);

  if (!photo || typeof photo !== "string" || !photo.trim()) {
    errors.push("Invalid photo");
  }
  if (!title || typeof title !== "string" || !title.trim()) {
    errors.push("Invalid title");
  }
  if (!description || typeof description !== "string" || !description.trim()) {
    errors.push("Invalid description");
  }
  if (!maintenance || !["low", "medium", "high"].includes(maintenance)) {
    errors.push("Invalid maintenance");
  }
  if (!pot_included || !["yes", "no"].includes(pot_included)) {
    errors.push("Invalid pot_included");
  }
  if (
    pot_included === "yes" &&
    (!pot_description ||
      typeof pot_description !== "string" ||
      !pot_description.trim())
  ) {
    errors.push("Invalid pot_description");
  }
  if (isNaN(height) || height <= 0) {
    errors.push("Invalid height");
  }
  if (
    !sunlight ||
    !["full sun", "partial sun", "partial shade", "full shade"].includes(
      sunlight
    )
  ) {
    errors.push("Invalid sunlight");
  }
  if (!temperature || typeof temperature !== "string" || !temperature.trim()) {
    errors.push("Invalid temperature");
  }
  if (
    !watering ||
    !["once per week", "every two weeks", "every month"].includes(watering)
  ) {
    errors.push("Invalid watering");
  }
  if (isNaN(price) || price <= 0) {
    errors.push("Invalid price");
  }
  if (!delivery || !["pickup", "delivery"].includes(delivery)) {
    errors.push("Invalid delivery");
  }
  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation errors", errors });
  }

  try {
    const user_id = req.user.id;

    const [newListingId] = await knex("listings").insert({
      user_id,
      photo,
      title,
      description,
      maintenance,
      pot_included,
      pot_description,
      height,
      sunlight,
      temperature,
      watering,
      price,
      delivery,
    });

    const newListing = await knex("listings")
      .where({ id: newListingId })
      .first();

    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Error creating listing", error });
  }
};

export {
  createListing,
  getAllListings,
  getListingById,
  getUserListings,
  getUserListingsCount,
};
