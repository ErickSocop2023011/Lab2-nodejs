import { Router } from "express";
import { saveAppointment, updateAppointment } from "./appointment.controller.js";
import { createAppointmentValidator, updateAppointmentValidator } from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.put("/updateAppointment/:uid", updateAppointmentValidator, updateAppointment);

export default router;