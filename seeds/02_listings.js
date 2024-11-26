/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("listings").del();
  // Inserts seed entries
  await knex("listings").insert([
    {
      id: 1,
      user_id: 2,
      photo: "./images/ficus_tree.jpg",
      title: "Ficus Tree",
      description: "A beautiful ficus tree perfect for your home office.",
      maintenance: "medium",
      pot_included: "yes",
      pot_description: "Ceramic pot with intricate designs.",
      height: 1.5,
      sunlight: "partial sun",
      temperature: "18-25°C",
      watering: "once per week",
      price: 45.99,
      delivery: "pickup"
    },
    {
      id: 2,
      user_id: 3,
      photo: "./images/succulent_collection.jpg",
      title: "Succulent Collection",
      description: "A set of 3 different types of succulents in small pots.",
      maintenance: "low",
      pot_included: "yes",
      pot_description: "Mini ceramic pots.",
      height: 0.4,
      sunlight: "full sun",
      temperature: "20-30°C",
      watering: "every two weeks",
      price: 25.99,
      delivery: "delivery"
    },
    {
      id: 3,
      user_id: 1,
      photo: "./images/cactus_plant.jpg",
      title: "Cactus Plant",
      description: "A tall cactus plant suitable for dry, sunny areas.",
      maintenance: "low",
      pot_included: "no",
      pot_description: null,
      height: 0.8,
      sunlight: "full sun",
      temperature: "25-35°C",
      watering: "once per week",
      price: 15.49,
      delivery: "pickup"
    },
    {
      id: 4,
      user_id: 2,
      photo: "./images/fern_plant.jpg",
      title: "Fern Plant",
      description: "A lush fern that thrives in shaded, humid environments.",
      maintenance: "medium",
      pot_included: "yes",
      pot_description: "Simple plastic pot.",
      height: 0.5,
      sunlight: "partial shade",
      temperature: "15-25°C",
      watering: "every two weeks",
      price: 35.0,
      delivery: "delivery"
    },
    {
      id: 5,
      user_id: 1,
      photo: "./images/aloe_vera.jpg",
      title: "Aloe Vera",
      description:
        "Aloe Vera plant, great for medicinal use and easy to care for.",
      maintenance: "low",
      pot_included: "no",
      pot_description: null,
      height: 0.6,
      sunlight: "partial sun",
      temperature: "20-28°C",
      watering: "every month",
      price: 18.0,
      delivery: "pickup",
    },
  ]);
}
