import express from "express";
import { body } from "express-validator";

import { login, register } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/login", login);
router.post(
  "/register",
  [
    body("email")
      .notEmpty()
      .withMessage("email field cannot be empty")
      .isEmail()
      .withMessage("enter valid email"),
    body("password").notEmpty().withMessage("password field cannot be empty"),
  ],
  register
);

export default router;
