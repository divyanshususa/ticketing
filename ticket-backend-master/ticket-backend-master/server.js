import { app } from "./app.js";
import { connectDb } from "./configurations/connection.js";
import cloudinary from "cloudinary"
import dotenv from "dotenv";
import cors from "cors";


app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to the port your frontend is running on
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
connectDb()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  });

app.listen(process.env.PORT, () => {
    console.log(`server is listening to port : ${process.env.PORT}`)
})