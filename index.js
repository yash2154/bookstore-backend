const express = require("express");
const mongoose = require("mongoose");
const bookRoute = require("./routes/bookRoute.js");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOW_ORIGIN, // Ensure this is a valid URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Basic route
app.get("/", async (req, res) => {
  return res.status(200).json({ message: "Welcome to the bookstore API" });
});

// Book routes
app.use("/books", bookRoute);

const URL = process.env.DATABASE_URL;
mongoose
  .connect(URL) // Added options for better connection handling
  .then(() => {
    console.log("App is connected to the database");
    app.listen(5555, () => {
      console.log("App is listening on port 5555");
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });
