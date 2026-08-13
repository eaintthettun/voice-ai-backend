import express, { json } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import diaryEntryRoutes from "./routes/diaryEntryRoutes.js";
import auth from "./middleware/authMiddleware.js";
const app = express();

app.use(cors());
// Middleware to parse JSON request bodies from incoming requests
app.use(json());

app.use("/api/auth",authRoutes);
app.use("/api/diaryEntries", diaryEntryRoutes); 

app.listen(3000, () => {
    console.log("Node server running on port 3000");
});
