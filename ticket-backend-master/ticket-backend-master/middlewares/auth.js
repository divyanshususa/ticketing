import jwt from "jsonwebtoken";
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../model/User.js";
import { Company } from "../model/Company.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  // const { token } = req.cookies;
  // console.log(token, "process env :", process.env.JWT_SECRET);

  // if (!token) return next(new ErrorHandler("user not logged in", 401));

  // const decodedData = jwt.verify(token, process.env.JWT_SECRET); // to get user object

  // req.user = await User.findById(decodedData._id);
  // // console.log(req.user)
  // next(); // to call next middleware

  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) throw new ErrorHandler("User not logged in", 401);

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);
    if (!user) throw new ErrorHandler("User not found", 404);

    req.user = user;
    next();
});
export const isAuthenticatedCompany = catchAsyncError(async (req, res, next) => {


  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) throw new ErrorHandler("company not logged in", 401);

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const company = await Company.findById(decodedData._id);
  if (!company) throw new ErrorHandler("User not found", 404);

  req.company = company;
  next();
});


export const authorizedAdmin = (req, res, next) => {

  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed`,
        403
      )
    );
  next();
};


