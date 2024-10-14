import express from "express";
import {
    changePassword,
    deleteMyProfile,
    deleteUser,
    forgetPassword,
    getAllUsers,
    getMyProfile,
    getTickets,
    login,
    logout,
    profileUpdate,
    register,
    resetPassword,
    resolvedTicket,
    updateUserRole,
} from "../controllers/userController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/getTickets").get(isAuthenticated, getTickets);

router.route("/resolvedTicket").post(isAuthenticated, resolvedTicket);

router.route("/logout").get(logout);

//to get my profile
router.route("/profile").get(isAuthenticated, getMyProfile);

//to delete my profile
router.route("/profile").delete(isAuthenticated, deleteMyProfile);
//to update profile
router.route("/profileUpdate").put(isAuthenticated, profileUpdate);



//change password
router.route("/changePassword").put(isAuthenticated, changePassword);

//forget password
router.route("/forgetPassword").post(forgetPassword);

//reset password
router.route("/resetPassword/:token").put(resetPassword);



//Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizedAdmin, getAllUsers);

//to update user role
router
    .route("/admin/update-role/:id")
    .put(isAuthenticated, authorizedAdmin, updateUserRole);

//  to delet user through admin
router
    .route("/admin/deleteUser/:id")
    .delete(isAuthenticated, authorizedAdmin, deleteUser);

export default router;
