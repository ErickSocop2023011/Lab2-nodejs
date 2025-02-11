import { Router } from "express";
import { cancelAppointment, saveAppointment, updateAppointment } from "./appointment.controller.js";
import { createAppointmentValidator, deleteAppValidator, updateAppointmentValidator } from "../middlewares/appointment-validators.js";
import { getUserByIdValidator } from "../middlewares/user-validators.js";
import { getUserById } from "../user/user.controller.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.patch("/updateAppointment/:uid", updateAppointmentValidator, updateAppointment);

router.get("/findAppUser/:uid", getUserByIdValidator, getUserById)

router.delete("/cancelApp/:uid", deleteAppValidator, cancelAppointment)

export default router;