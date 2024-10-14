import mongoose, { Schema } from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  creator_name: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  resolved_status: {
    type: String,
    enum: ["no", "yes"],
    default: "no",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  resolved_at: {
    type: Date,
    default: null, // Change the type to Date and default value to null
  },
  company_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null, // Change the default value to null
  },

  asigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null, // Change the default value to null
  },
  resolved_description: {
    type: String,
    default: "",
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema)

export default Ticket;