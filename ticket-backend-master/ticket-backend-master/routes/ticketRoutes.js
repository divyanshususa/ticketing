import express from "express"
import { asignTicket, deleteTicket, generateTicket, getAdminTickets, getTickets } from "../controllers/ticketController.js";
import { isAuthenticatedCompany, authorizedAdmin, isAuthenticated } from "../middlewares/auth.js"
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.post('/generateTicket', isAuthenticatedCompany, singleUpload, generateTicket)

router.get('/getCompanyTicket', isAuthenticatedCompany, getTickets)


router.get('/getAdminTicket', isAuthenticated, authorizedAdmin, getAdminTickets)

router.post('/asignTicket', isAuthenticated, authorizedAdmin, asignTicket)

router.delete('/deleteTicket', isAuthenticatedCompany, deleteTicket)

export default router