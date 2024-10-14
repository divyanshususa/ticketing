import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Company } from "../model/Company.js";
import sendToken from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";

import crypto from "crypto";

export const register = catchAsyncError(async (req, res, next) => {
    const { company_name, company_email, company_password } = req.body;


    if (!company_name || !company_email || !company_password)
        return next(new ErrorHandler("please enter all field", 400));

    let company = await Company.findOne({ company_email });

    if (company) return next(new ErrorHandler("Company already exist", 409));



    company = await Company.create({
        company_name, company_email, company_password,

    });

    sendToken(res, company, "registered successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
    const { company_email, company_password } = req.body;

    // console.log("login");

    if (!company_email || !company_password)
        return next(new ErrorHandler("please enter all field", 400));

    const company = await Company.findOne({ company_email }).select("+company_password");

    if (!company) return next(new ErrorHandler("Company doesn't exist", 401));

    console.log(company)

    // let passwordValidate =await bcrypt.compare(password, Company.password);
    let passwordValidate = await company.comparePassword(company_password)
    console.log(passwordValidate)

    if (!passwordValidate)
        return next(new ErrorHandler("invalid credential", 401));

    sendToken(res, company, `welcome ${company.company_name}`, 200);
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
    console.log(req.company)
    const company = await Company.findById(req.company._id);

    res.status(200).json({
        success: true,
        company,
    });
});

export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
    const company = await Company.findById(req.Company._id);


    await company.deleteOne();

    res
        .status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Company deleted successfully",
        });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
        return next(new ErrorHandler("please enter all field", 400));

    const company = await Company.findById(req.company._id).select("+company_password");

    const isMatch = await Company.comparePassword(oldPassword);

    if (!isMatch) return next(new ErrorHandler("incorrect old password", 401));

    company.company_password = newPassword;

    await company.save();

    res.status(200).json({
        success: true,
        message: "password changed successfully",
    });
});

export const profileUpdate = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;

    const company = await Company.findById(req.company._id);

    if (name) company.company_name = name;
    if (email) company.company_email = email;

    await company.save();

    res.status(200).json({
        success: true,
        message: "profile updated successfully",
    });
});


export const forgetPassword = catchAsyncError(async (req, res, next) => {
    const { company_email } = req.body;
    console.log(company_email);

    const company = await Company.findOne({ company_email });

    console.log(company);

    if (!company) return next(new ErrorHandler("Company not found", 400));

    const resetToken = await company.getResetToken();

    await company.save();

    // console.log(resetToken);

    //send an email via nodeMailer
    const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

    const message = `click on the link to reset your password. ${url}. If you have not request then please ignore`;

    await sendEmail(company.company_email, "Reset Password", message);

    res.status(200).json({
        success: true,
        message: `Reset link has been sent to ${company.company_email}`,
    });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;

    const ResetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // console.log(ResetPasswordToken);

    const company = await Company.findOne({
        ResetPasswordToken,
        ResetPasswordExpire: {
            $gt: Date.now(),
        },
    });

    // console.log(Company);
    // console.log(req.body.password);

    if (!company)
        return next(
            new ErrorHandler("invalid token or token has been expired", 400)
        );

    company.company_password = req.body.password;

    company.ResetPasswordExpire = undefined;
    company.ResetPasswordToken = undefined;

    await company.save();
    res.status(200).json({
        success: true,
        message: "password updated successfully",
    });
});



//Admin controllers
export const getAllCompanys = catchAsyncError(async (req, res, next) => {
    const companys = await Company.find({});

    res.status(200).json({
        success: true,
        companys,
    });
});


export const deleteCompany = catchAsyncError(async (req, res, next) => {
    const company = await Company.findById(req.params.id);

    if (!company) return next(new ErrorHandler("Company not found", 404));


    await company.deleteOne();

    res.status(200).json({
        success: true,
        message: "Company deleted successfully",
    });
});


