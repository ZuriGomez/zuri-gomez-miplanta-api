import initKnex from "knex";
import configuration from "../knexfile.js";
import multer from "multer";
import path from "path";

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
  const { userId } = req.params;
  try {
    const listings = await knex("listings")
      .where("user_id", userId)
      .select("*");
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error getting user listings:", error);
    res.status(500).json({ message: "Error getting user listings" });
  }
};

//Get listings by hardcoded userID (for demo)
const getUserListingsDemo = async (req, res) => {
  const userId = 1;
  try {
    const listings = await knex("listings")
      .where("user_id", userId)
      .select("title", "price", "photo");
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error getting user listings:", error);
    res.status(500).json({ message: "Error getting user listings" });
  }
};

// Get listing by ID
const getListingById = async (req, res) => {
  const { id } = req.params;
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

//Create photo storage directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//Create new Listing
const createListing = async (req, res) => {
  const {
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
  } = req.body;

  const photo = req.file ? `uploads/${req.file.filename}` : "";

  const errors = [];
  console.log("req.body", req.body)
  console.log('req.file', req.file);
  console.log('photo', photo);

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
  if (typeof height !== "number") {
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
  if (typeof price !== "number") {
    errors.push("Invalid price");
  }
  if (!delivery || !["pickup", "delivery"].includes(delivery)) {
    errors.push("Invalid delivery");
  }
  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation errors", errors });
  }

  const user_id = req.user.id;

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
  getUserListingsDemo,
};
