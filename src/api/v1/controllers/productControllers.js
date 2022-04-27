import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import Category from "../models/CategoryModel.js";
import Product from "../models/ProductModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const { msg } = errors.array()[0];
    return res.status(400).json({ error: msg });
  }

  const { categoryId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({
      error: "invalid categoryId",
    });
  }

  const category = await Category.findById(categoryId);

  const {
    name,
    description,
    price,
    discountPrice,
    discount,
    quantity,
    unit,
    stock,
  } = req.body;

  if (category) {
    const product = await Product.create({
      name,
      description,
      price,
      discountPrice,
      discount,
      quantity,
      unit,
      stock,
      category,
    });

    await category.products.push(product);

    await category.save();

    return res.status(201).json({
      product,
    });
  }

  return res.status(400).json({
    error: "invalid categoryId",
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const { msg } = errors.array()[0];
    return res.status(400).json({ error: msg });
  }

  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      error: "invalid productId",
    });
  }

  const product = await Product.findById(productId).populate("category");

  if (product) {
    return res.status(200).json({
      product,
    });
  }

  return res.status(400).json({
    error: "invalid productId",
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const { msg } = errors.array()[0];
    return res.status(400).json({ error: msg });
  }

  const { productId } = req.params;
  const { categoryId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      error: "invalid productId",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({
      error: "invalid categoryId",
    });
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    return res.status(400).json({
      error: "invalid categoryId",
    });
  }

  const product = await Product.findById(productId).populate("category");

  if (product) {
    const {
      name,
      description,
      price,
      discountPrice,
      discount,
      quantity,
      unit,
      stock,
      isBestSeller,
      isActive,
    } = req.body;

    const updatedProduct = await Product.updateOne(
      { _id: productId },
      {
        name,
        description,
        price,
        discountPrice,
        discount,
        quantity,
        unit,
        stock,
        isBestSeller,
        isActive,
      }
    );

    return res.status(200).json({
      product: updatedProduct,
    });
  }

  return res.status(400).json({
    error: "invalid productId",
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const { msg } = errors.array()[0];
    return res.status(400).json({ error: msg });
  }

  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      error: "invalid productId",
    });
  }

  const product = await Product.findById(productId);

  if (product) {
    const category = await Category.findById(product.category);

    category.products.pull(product);

    await Product.findByIdAndDelete(product._id);
    await category.save();

    return res.status(200).json({
      success: true,
    });
  }

  return res.status(400).json({
    error: "invalid productId",
  });
});
