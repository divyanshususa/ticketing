import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ticket_system", // Specify the database name here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB connected at host: ${connection.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process if unable to connect to DB
  }
};
