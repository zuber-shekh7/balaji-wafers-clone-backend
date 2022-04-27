import express from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/productControllers.js";

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
      .withMessage("description field must be a string"),
    body("price")
      .notEmpty()
      .withMessage("price field cannot be empty")
      .isDecimal()
      .withMessage("price field must be a decimal"),
    body("discountPrice")
      .notEmpty()
      .withMessage("discountPrice field cannot be empty")
      .isDecimal()
      .withMessage("discountPrice field must be a decimal"),
    body("discount")
      .notEmpty()
      .withMessage("discount field cannot be empty")
      .isDecimal()
      .withMessage("discount field must be a decimal"),
    body("quantity")
      .notEmpty()
      .withMessage("quantity field cannot be empty")
      .isDecimal()
      .withMessage("quantity field must be a decimal"),
    body("unit")
      .notEmpty()
      .withMessage("unit field cannot be empty")
      .isString()
      .withMessage("discount field must be a string"),
    body("stock")
      .notEmpty()
      .withMessage("stock field cannot be empty")
      .isDecimal()
      .withMessage("stock field must be a decimal"),
  ],
  createProduct
);

router.get("/:productId", getProduct);
router.put(
  "/:productId",
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
      .withMessage("description field must be a string"),
    body("price")
      .notEmpty()
      .withMessage("price field cannot be empty")
      .isDecimal()
      .withMessage("price field must be a decimal"),
    body("discountPrice")
      .notEmpty()
      .withMessage("discountPrice field cannot be empty")
      .isDecimal()
      .withMessage("discountPrice field must be a decimal"),
    body("discount")
      .notEmpty()
      .withMessage("discount field cannot be empty")
      .isDecimal()
      .withMessage("discount field must be a decimal"),
    body("quantity")
      .notEmpty()
      .withMessage("quantity field cannot be empty")
      .isDecimal()
      .withMessage("quantity field must be a decimal"),
    body("unit")
      .notEmpty()
      .withMessage("unit field cannot be empty")
      .isString()
      .withMessage("discount field must be a string"),
    body("stock")
      .notEmpty()
      .withMessage("stock field cannot be empty")
      .isDecimal()
      .withMessage("stock field must be a decimal"),
    body("isBestSeller")
      .notEmpty()
      .withMessage("isBestSeller field cannot be empty")
      .isBoolean()
      .withMessage("isBestSeller field must be a boolean"),
    body("isActive")
      .notEmpty()
      .withMessage("isActive field cannot be empty")
      .isBoolean()
      .withMessage("isActive field must be a boolean"),
  ],
  updateProduct
);

router.delete("/:productId", deleteProduct);
