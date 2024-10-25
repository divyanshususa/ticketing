import { app } from "./app.js";
import { connectDb } from "./configurations/connection.js";
import cloudinary from "cloudinary"
import dotenv from "dotenv";
import cors from "cors";


app.use(
  cors()
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