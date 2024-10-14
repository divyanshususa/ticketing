import express from 'express'
import { authorizedAdmin, isAuthenticated, isAuthenticatedCompany } from '../middlewares/auth.js';
import { dashboardData } from '../controllers/adminDashboardController.js';
import { companyDashboardData } from '../controllers/ticketController.js';
import { userDashboardData } from '../controllers/userController.js';

const router = express.Router();

router.get("/adminDashboardData", isAuthenticated, authorizedAdmin, dashboardData)

router.get("/userDashboardData", isAuthenticated, userDashboardData)

router.get("/companyDashboardData", isAuthenticatedCompany, companyDashboardData)

export default router