import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../model/User.js";
import sendToken from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import Ticket from "../model/Ticket.js";

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;


    if (!name || !email || !password)
        return next(new ErrorHandler("please enter all field", 400));

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("user already exist", 409));



    user = await User.create({
        name,
        email,
        password,

    });

    sendToken(res, user, "registered successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // console.log("login");
    // console.log(email, password)

    if (!email || !password)
        return next(new ErrorHandler("please enter all field", 400));

    const user = await User.findOne({ email }).select("+password");


    if (!user) return next(new ErrorHandler("user doesn't exist", 401));

    // let passwordValidate =await bcrypt.compare(password, user.password);
    let passwordValidate = await user.comparePassword(password);

    if (!passwordValidate)
        return next(new ErrorHandler("invalid credential", 401));

    sendToken(res, user, `welcome ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "logged out successfully",
        });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user,
    });
});

export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);


    await user.deleteOne();

    res
        .status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "User deleted successfully",
        });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
        return next(new ErrorHandler("please enter all field", 400));

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) return next(new ErrorHandler("incorrect old password", 401));

    user.password = newPassword;

    await user.save();

    res.status(200).json({
        success: true,
        message: "password changed successfully",
    });
});

export const profileUpdate = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
        success: true,
        message: "profile updated successfully",
    });
});


export const forgetPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    console.log(email);

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) return next(new ErrorHandler("user not found", 400));

    const resetToken = await user.getResetToken();

    await user.save();

    // console.log(resetToken);

    //send an email via nodeMailer
    const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

    const message = `click on the link to reset your password. ${url}. If you have not request then please ignore`;

    await sendEmail(user.email, "Reset Password", message);

    res.status(200).json({
        success: true,
        message: `Reset link has been sent to ${user.email}`,
    });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;

    const ResetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // console.log(ResetPasswordToken);

    const user = await User.findOne({
        ResetPasswordToken,
        ResetPasswordExpire: {
            $gt: Date.now(),
        },
    });

    // console.log(user);
    // console.log(req.body.password);

    if (!user)
        return next(
            new ErrorHandler("invalid token or token has been expired", 400)
        );

    user.password = req.body.password;

    user.ResetPasswordExpire = undefined;
    user.ResetPasswordToken = undefined;

    await user.save();
    res.status(200).json({
        success: true,
        message: "password updated successfully",
    });
});

export const getTickets = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne(req.user._id).populate({ path: "tickets" })
    console.log(user);

    res.status(200).json({
        success: true,
        ticket: user.tickets
    })

})

export const resolvedTicket = catchAsyncError(async (req, res, next) => {
    const { ticketId, resolved_status, resolved_description } = req.body
    let ticket = await Ticket.findOne({ _id: ticketId })
    // let ticket_id = user.tickets.find((value) => value === ticketId);

    console.log(ticket);
    ticket.resolved_status = resolved_status
    ticket.resolved_description = resolved_description
    ticket.resolved_at = Date.now();

    await ticket.save()

    res.status(200).json({
        success: true,
        message: "ticket status updated successfully"
    })

})

export const userDashboardData = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne(req.user._id).populate({ path: "tickets" })

    let resolved_Tickets = 0, remaining_tickets = 0;

    user.tickets.forEach((ticket) => {
        if (ticket.resolved_status === "yes") resolved_Tickets++;
    })
    remaining_tickets = user.tickets.length - resolved_Tickets;

    res.status(200).json({
        success: "true",
        resolved_Tickets,
        remaining_tickets,
        assigned_tickets: user.tickets.length

    })

})



//Admin controllers
export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find({});

    res.status(200).json({
        success: true,
        users,
    });
});

export const updateUserRole = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler("User not found", 404));

    if (user.role === "user") user.role = "admin";
    else user.role = "user";

    await user.save();

    res.status(200).json({
        success: true,
        message: "role updated",
    });
});
export const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler("User not found", 404));

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});

//adding watchers

// User.watch().on("change", async () => {
// });
