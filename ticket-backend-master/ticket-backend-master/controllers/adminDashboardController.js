import { User } from "../model/User.js";
import Ticket from "../model/Ticket.js"
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { Company } from "../model/Company.js";

export const dashboardData = catchAsyncError(async (req, res, next) => {
    const users = await User.find({})
    const tickets = await Ticket.find({})
    const companys = await Company.find({})
    let resolved_Tickets = 0, remaining_tickets;

    tickets.forEach((ticket) => {
        if (ticket.resolved_status === "yes") resolved_Tickets++;
    })
    remaining_tickets = tickets.length - resolved_Tickets;

    res.status(200).json({
        success: "true",
        users,
        tickets,
        resolved_Tickets,
        remaining_tickets,
        companys,

    })


})