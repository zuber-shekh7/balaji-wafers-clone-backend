import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import User from "../models/UserModel.js";

export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const { msg } = errors.array()[0];
    return res.status(400).json({ error: msg });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.authenticate(password))) {
    return res.json({
      user: await User.findById(user._id).select("-password"),
      token: await user.generateJWTToken(),
    });
  }

  return res.status(400).json({
    error: "invalid email or password",
  });
});

export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const { msg } = errors.array()[0];
    return res.status(400).json({ error: msg });
  }

  const { email, password } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    return res
      .status(400)
      .json({ error: `User with ${email} is already exists` });
  }

  const user = await User.create({
    email,
    password,
  });

  if (user) {
    return res.json({
      user: await User.findById(user._id).select("-password"),
      token: await user.generateJWTToken(),
    });
  }

  return res.status(400).json({
    error: "invalid email or password",
  });
});
