import mongoose, { Schema } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
const companySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: [true, "please enter your name"],
    },
    company_email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        validate: validator.isEmail,
    },
    company_password: {
        type: String,
        required: [true, "please enter your password"],
        unique: true,
        minLength: [6, "password must be atleast 6 character"],
        select: false,
    },
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
    
    createdAt: {
        type: Date,
        default: Date.now,
    },

    ResetPasswordToken: String,
    ResetPasswordExpire: String,
});

companySchema.pre("save", async function (next) {
    if (!this.isModified("company_password")) return next();
    const hashedPassword = await bcrypt.hash(this.company_password, 10);
    this.company_password = hashedPassword;
    next();
});

companySchema.methods.getJWTToken = function () {
    // console.log(process.env.JWT_SECRET);
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
};

companySchema.methods.comparePassword = async function (password) {
    console.log("password obtained", password)
    console.log("password ", this.company_password)
    return await bcrypt.compare(password, this.company_password);
};

companySchema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.ResetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.ResetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

export const Company = mongoose.model("Company", companySchema);
