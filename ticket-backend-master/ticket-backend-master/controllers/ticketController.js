import catchAsyncError from "../middlewares/catchAsyncError.js";
import Ticket from "../model/Ticket.js";
import errorHandler from "../utils/errorHandler.js";
import { Company } from "../model/Company.js";
import { User } from "../model/User.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { sendEmail } from "../utils/sendEmail.js"; // Import the sendEmail function

export const generateTicket = catchAsyncError(async (req, res, next) => {
  const { title, description, priority } = req.body;
  const file = req.file;

  // Validate input fields
  if (!title || !description || !file || !priority) {
    return next(new errorHandler("Please enter all fields", 400));
  }

  // Upload the file to Cloudinary
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  // Create the new ticket
  const ticket = await Ticket.create({
    title,
    priority,
    description,
    image: myCloud.secure_url,
    creator_name: req.company._id, // Assuming req.company is available
    company_name: req.company._id,
  });

  // Add ticket to the company’s record
  const company = await Company.findById(req.company._id);
  company.tickets.push(ticket._id);
  await company.save();

  // Email recipient list
  const recipients = [
    "divyanshu@nowcare4u.com",
    // Add other recipients here
  ];

  // Email subject and message
  const subject = "A new ticket has been generated";
  const message = `A new ticket has been created. Please check the ticketing app for details.\n\nTicket Title: ${title}\nPriority: ${priority}\nDescription: ${description}`;

  // Send the email
  await sendEmail(recipients, subject, message);//meet.google.com/qdv-xbns-rwb

  // Send response to client
  https: res.status(201).json({
    success: true,
    ticket,
  });
});

export const getTickets = catchAsyncError(async (req, res, next) => {
  const company = await req.company.populate({
    path: "tickets",
    populate: {
      path: "asigned_to",
    },
  });
  console.log(company);
  res.status(201).json({
    success: true,
    data: company.tickets,
  });
});
export const getAdminTickets = catchAsyncError(async (req, res, next) => {
  const tickets = await Ticket.find({})
    .populate({ path: "asigned_to", select: "name email" }) // Populate assigned user details
    .populate({ path: "company_name", select: "company_name company_email" }); // Populate company details

  res.status(201).json({
    success: true,
    data: tickets,
  });
});


export const asignTicket = catchAsyncError(async (req, res, next) => {
  const { TicketId, userId } = req.body;
   console.log("userId", userId);
  const ticket = await Ticket.findOne({ _id: TicketId });
  const user = await User.findOne({ _id: userId });

  if (!ticket) return next(new errorHandler("no ticket found", 401));
  if (!user) return next(new errorHandler("user not found", 401));

  ticket.asigned_to = user._id;
  user.tickets.push(ticket._id);

  await ticket.save();
  await user.save();

  res.status(200).json({
    success: true,
    message: `ticket asigned to ${user.name}`,
  });
});

export const companyDashboardData = catchAsyncError(async (req, res, next) => {
  const company = await Company.findById(req.company._id).populate({
    path: "tickets",
  });
  // const ticket = company.tickets.pop
  // console.log(company);
  let resolved_Tickets = 0,
    remaining_tickets,
    open_tickets = 0;

  company.tickets.forEach((ticket) => {
    if (ticket.resolved_status === "yes") resolved_Tickets++;
    if (ticket.resolved_status === "no" && ticket.asigned_to !== null)
      open_tickets++;
  });
  remaining_tickets = company.tickets.length - resolved_Tickets;

  res.status(200).json({
    success: "true",
    resolved_Tickets,
    remaining_tickets,
    open_tickets,
  });
});

export const deleteTicket = catchAsyncError(async (req, res, next) => {
  const { id } = req.body;
  const ticket = await Ticket.findByIdAndDelete({ _id: id });

  if (!ticket) return next(new errorHandler("no ticket found", 401));

  const company = await Company.findOne(req.company._id);

  // console.log(company, ticket)
  let remaining_tickets = company.tickets.filter(
    (ticketValue) => ticketValue.toString() !== id.toString()
  );
  // console.log(remaining_tickets);
  company.tickets = remaining_tickets;

  await company.save();

  res.status(200).json({
    success: true,
    message: "ticket deleted successfully",
  });
});
