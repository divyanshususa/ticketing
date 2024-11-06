import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import userRouter from "./routes/userRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import companyRouter from "./routes/companyRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";
import errorMiddleware from "./middlewares/Error.js";

export const app = express();

dotenv.config();

// Inbuilt middlewares
app.use(helmet());
app.use(morgan("combined"));

app.use(
  cors({
    origin: ["https://ticketing-b3da9.web.app", "http://localhost:5173"], // Allow requests from specific origins
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"],
    credentials: true, // Allow cookies and other credentials
  })
);


app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("server is working");
});

// Routes
app.use("/api", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/dashboard", dashboardRouter);

// Custom error handler
app.use(errorMiddleware);
