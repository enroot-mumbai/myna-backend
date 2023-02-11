import express from "express";
import {
  getAllAvailableSlots,
  updateSlotByDoctorId,
} from "./appointment.controller";
import {
  getAvailabilityValidation,
  putAvailableSlotValidation,
} from "./appointment.validations";

const router = express.Router();

router.get("/available-slots", getAvailabilityValidation, getAllAvailableSlots);

router.put(
  "/available-slots/:doctorId",
  putAvailableSlotValidation,
  updateSlotByDoctorId
);

export default router;
