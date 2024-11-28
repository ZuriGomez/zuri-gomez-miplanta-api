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

// Get listing by ID
const getListingById = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await knex("listings")
      .join("user", "listings.user_id", "=", "user.id")
      .select (
        "listings.*",
        "user.user_name as seller_name",
        knex.raw('COUNT(reviews.id) as review_count')
      )
      .leftJoin("reviews","user.id","=","reviews.reviewed_user_id")
      .where("listings.id", id)
      .groupBy("listings.id","user.id")
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

//Create new Listing
const createListing = async (req, res) => {
  const {
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
  } = req.body;

  if (
    !user_id ||
    !photo ||
    !title ||
    !description ||
    !maintenance ||
    !pot_included ||
    !height ||
    !sunlight ||
    !temperature ||
    !watering ||
    !price ||
    !delivery ||
    typeof user_id !== "number" ||
    typeof photo !== "string" ||
    !photo.trim() ||
    typeof title !== "string" ||
    !title.trim() ||
    typeof description !== "string" ||
    !description.trim() ||
    !["low", "medium", "high"].includes(maintenance) ||
    !["yes", "no"].includes(pot_included) ||
    (pot_included === "yes" &&
      (!pot_description ||
        typeof pot_description !== "string" ||
        !pot_description.trim())) ||
    typeof height !== "number" ||
    !["full sun", "partial sun", "partial shade", "full shade"].includes(
      sunlight
    ) ||
    typeof temperature !== "string" ||
    !temperature.trim() ||
    !["once per week", "every two weeks", "every month"].includes(watering) ||
    typeof price !== "number" ||
    !["pickup", "delivery"].includes(delivery)
  ) {
    return res
      .status(400)
      .json({ message: "All fields must be filled out correctly." });
  }
  try {
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
    res.status(500).json({ message: "Error creating listing", error });
  }
};

export { createListing, getAllListings, getListingById };
