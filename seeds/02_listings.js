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
      user_id: 4,
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
      delivery: "pickup",
    },
    {
      id: 2,
      user_id: 7,
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
      delivery: "delivery",
    },
    {
      id: 3,
      user_id: 6,
      photo: "./images/monstera.jpg",
      title: "Voluminous Monstera",
      description:
        "A lush, voluminous Monstera plant with large, vibrant green leaves.",
      maintenance: "medium",
      pot_included: "no",
      height: 1.2,
      sunlight: "partial sun",
      temperature: "20-28°C",
      watering: "once per week",
      price: 60.0,
      delivery: "delivery",
    },
    {
      id: 4,
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
      delivery: "pickup",
    },
    {
      id: 5,
      user_id: 5,
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
      delivery: "delivery",
    },
    {
      id: 6,
      user_id: 6,
      photo: "./images/snake-plant2.jpg",
      title: "Healthy Snake Plant",
      description:
        "A robust snake plant known for its air-purifying qualities and easy maintenance.",
      maintenance: "low",
      pot_included: "no",
      height: 0.7,
      sunlight: "partial sun",
      temperature: "15-23°C",
      watering: "every two weeks",
      price: 20.0,
      delivery: "pickup",
    },
    {
      id: 7,
      user_id: 6,
      photo: "./images/snake_plant1.jpg",
      title: "Beautiful Snake Plant - pot included",
      description:
        "A striking plant with tall, green leaves, perfect for adding a touch of nature to your space.",
      maintenance: "low",
      pot_included: "yes",
      pot_description: "Simple white pot to match any decor.",
      height: 0.75,
      sunlight: "partial sun",
      temperature: "18-24°C",
      watering: "every two weeks",
      price: 40.0,
      delivery: "pickup",
    },
    {
      id: 8,
      user_id: 4,
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
    {
      id: 9,
      user_id: 6,
      photo: "./images/golden-pothos.jpg",
      title: "Golden Pothos",
      description:
        "A versatile and hardy plant with trailing green and yellow leaves.",
      maintenance: "low",
      pot_included: "no",
      height: 0.5,
      sunlight: "partial shade",
      temperature: "18-24°C",
      watering: "every two weeks",
      price: 45.0,
      delivery: "delivery",
    },
    {
      id: 10,
      user_id: 3,
      photo: "./images/banana-plant.jpg",
      title: "Banana Plant",
      description:
        "An exotic banana plant that adds a tropical vibe to any space.",
      maintenance: "medium",
      pot_included: "no",
      height: 2.0,
      sunlight: "full sun",
      temperature: "20-30°C",
      watering: "once per week",
      price: 70.0,
      delivery: "delivery",
    },
    {
      id: 11,
      user_id: 1,
      photo: "./images/spider-plant.jpg",
      title: "Spider Plant",
      description:
        "A resilient spider plant that is perfect for low-maintenance indoor gardening.",
      maintenance: "low",
      pot_included: "no",
      height: 0.3,
      sunlight: "partial shade",
      temperature: "15-25°C",
      watering: "every two weeks",
      price: 25.0,
      delivery: "pickup",
    },
    {
      id: 12,
      user_id: 2,
      photo: "./images/zz-plant.jpg",
      title: "ZZ Plant - pot included",
      description:
        "A hardy ZZ plant that thrives in low light conditions, complete with a modern, minimalist pot.",
      maintenance: "low",
      pot_included: "yes",
      pot_description:
        "Modern, minimalist pot that complements the plant's sleek appearance.",
      height: 0.5,
      sunlight: "partial shade",
      temperature: "18-24°C",
      watering: "every two weeks",
      price: 35.0,
      delivery: "pickup",
    },
  ]);
}
