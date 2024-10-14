import express from "express";
import {
    changePassword,
    deleteCompany,
    deleteMyProfile,
    forgetPassword,
    getAllCompanys,
    getMyProfile,
    login,
    logout,
    profileUpdate,
    register,
    resetPassword,
} from "../controllers/companyController.js";
import { authorizedAdmin, isAuthenticated, isAuthenticatedCompany } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

//to get my profile
router.route("/profile").get(isAuthenticatedCompany, getMyProfile);

//to delete my profile
router.route("/profile").delete(isAuthenticatedCompany, deleteMyProfile);
//to update profile
router.route("/profileUpdate").put(isAuthenticatedCompany, profileUpdate);



//change password
router.route("/changePassword").put(isAuthenticatedCompany, changePassword);

//forget password
router.route("/forgetPassword").post(forgetPassword);

//reset password
router.route("/resetPassword/:token").put(resetPassword);



//Admin Routes
router.route("/admin/companys").get(isAuthenticated, authorizedAdmin, getAllCompanys);



//  to delet user through admin
router
    .route("/admin/deleteCompany/:id")
    .delete(isAuthenticated, authorizedAdmin, deleteCompany);

export default router;
