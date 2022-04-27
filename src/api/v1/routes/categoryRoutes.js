import express from "express";
import { body } from "express-validator";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

export default router;

router.post(
  "",
  [
    body("name")
      .notEmpty()
      .withMessage("name field cannot be empty")
      .isString()
      .withMessage("name field must be a String"),
    body("description")
      .notEmpty()
      .withMessage("description field cannot be empty")
      .isString()
      .withMessage("description field must be a String"),
  ],
  createCategory
);

router.get("/", getCategories);
router.get("/:categoryId", getCategory);
router.put(
  "/:categoryId",
  [
    body("name")
      .notEmpty()
      .withMessage("name field cannot be empty")
      .isString()
      .withMessage("name field must be a String"),
    body("description")
      .notEmpty()
      .withMessage("description field cannot be empty")
      .isString()
      .withMessage("description field must be a String"),
    body("isActive")
      .notEmpty()
      .withMessage("isActive field cannot be empty")
      .isBoolean()
      .withMessage("description field must be a boolean"),
  ],
  updateCategory
);
router.delete("/:categoryId", deleteCategory);
