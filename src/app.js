const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const app = express();

app.use(cors());
// Middleware to parse JSON request bodies from incoming requests
app.use(express.json());

app.use("/api/auth",authRoutes);

app.listen(3000, () => {
    console.log("Node server running on port 3000");
});