const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/error/customErrorHandler");

// Environment Variables
dotenv.config({ path: "./config/env/config.env" });

// Creating Server
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// MongoDB Connection
connectDatabase();

// Routes
app.use("/api", routes);

// Error Handler Middleware
app.use(customErrorHandler);

// Starting Server
app.listen(PORT, () =>
  console.log(
    `Server is running on http://localhost:${PORT} | ${process.env.NODE_ENV}`
  )
);
