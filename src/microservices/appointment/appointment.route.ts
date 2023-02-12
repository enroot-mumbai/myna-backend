import express from "express";
import {
  addSlotByDoctorId,
  getAllAvailableSlots,
  getWeeklySlotByDoctorId,
  updateSlotByDoctorId,
} from "./appointment.controller";
import {
  getAvailabilityValidation,
  availableSlotValidation,
} from "./appointment.validations";

const router = express.Router();

router.get("/available-slots", getAvailabilityValidation, getAllAvailableSlots);
router.get("/weekly-slot/:doctorId", getWeeklySlotByDoctorId);

router.put(
  "/available-slots/:doctorId",
  availableSlotValidation,
  updateSlotByDoctorId
);
router.post(
  "/available-slots/:doctorId",
  availableSlotValidation,
  addSlotByDoctorId
);

export default router;
