import express from "express";
import { adminDetails, allDoctors, login, signup } from "./admin.controller";
import { signInValidation, signUpValidation } from "./admin.validations";

const router = express.Router();

router.post("/signup", signUpValidation, signup);
router.post("/login", signInValidation, login);
router.get("/all-doctors", allDoctors);
router.get("/:id", adminDetails);

export default router;
