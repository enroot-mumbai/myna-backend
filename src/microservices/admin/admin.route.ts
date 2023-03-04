import express from "express";
import { verifyToken } from "../../middleware/authentication";
// import { adminDetails, allDoctors, getAllUsers, login, signup } from "./admin.controller";
import { signInValidation, signUpValidation } from "./admin.validations";
import { getAllUsers, login, signup } from "./admin.controller";

const router = express.Router();

router.post("/signup", signUpValidation, signup);
router.post("/login", signInValidation, login);
// router.get("/all-doctors", allDoctors);
// router.get("/:id", adminDetails);

router.get("/users", getAllUsers)

export default router;
