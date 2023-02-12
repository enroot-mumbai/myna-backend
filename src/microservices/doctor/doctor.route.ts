import { Router } from "express";
import { addDoctor } from "./doctor.controller";
import { addDoctorValidation } from "./doctor.validation";

const router = Router();

router.post("/", addDoctorValidation, addDoctor);

export default router;
