import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import Category from "../models/CategoryModel.js";

export const createCategory = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const { msg } = errors.array()[0];
    return res.status(400).json({ error: msg });
  }

  const { name, description } = req.body;

  const category = await Category.create({
    name,
    description,
  });

  return res.json({
    category,
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  return res.json({
    categories,
  });
});

export const getCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({
      error: "invalid categoryId ",
    });
  }

  const category = await Category.findById(categoryId);

  if (category) {
    return res.json({
      category,
    });
  }

  return res.status(400).json({
    error: "invalid categoryId ",
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({
      error: "invalid categoryId ",
    });
  }

  const category = await Category.findById(categoryId);

  if (category) {
    const { name, description, isActive } = req.body;

    const updatedCategory = await Category.updateOne(
      { _id: categoryId },
      {
        name,
        description,
        isActive,
      }
    );
    return res.json({
      category: updatedCategory,
    });
  }

  return res.status(400).json({
    error: "invalid categoryId ",
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({
      error: "invalid categoryId ",
    });
  }

  const category = await Category.findById(categoryId);

  if (category) {
    await category.delete();

    return res.json({
      success: true,
    });
  }

  return res.status(400).json({
    error: "invalid categoryId ",
  });
});
