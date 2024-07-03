// Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./Route/routes");
const dbConnect = require("./database/config");

// Initialize app and load environment variables
dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Declare port number
const PORT = process.env.PORT || 3500;

// Connect to the database
dbConnect();

// Mount routes
app.use('/api/v1', userRoute);

// Define a simple route for the homepage
app.get("/", (req, res) => {
    res.send(`<h1>This is the homepage</h1>`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
