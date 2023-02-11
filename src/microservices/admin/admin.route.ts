import express from "express";
import { allDoctors, login, signup } from "./admin.controller";
import { signInValidation, signUpValidation } from "./admin.validations";

const router = express.Router();

router.post("/signup", signUpValidation, signup);
router.post("/login", signInValidation, login);
router.get("/all-doctors", allDoctors);

export default router;
