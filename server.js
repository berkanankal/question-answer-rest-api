const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");

// Environment Variables
dotenv.config({ path: "./config/env/config.env" });

// Creating Server
const app = express();
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api", routes);

// Starting Server
app.listen(PORT, () =>
  console.log(
    `Server is running on http://localhost:${PORT} | ${process.env.NODE_ENV}`
  )
);
