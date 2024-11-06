import { app } from "./app.js";
import { connectDb } from "./configurations/connection.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load environment variables

app.use(
  cors({
    origin: ["https://ticketing-b3da9.web.app", "http://localhost:5173"], // Allow requests from specific origins
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"],
    credentials: true, // Allow cookies and other credentials
  })
);


connectDb();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
