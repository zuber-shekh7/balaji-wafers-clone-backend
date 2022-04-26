import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.authenticate = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWTToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashPassword = await bcrypt.hashSync(this.password, 10);
    this.password = hashPassword;
  }
  return next();
});

export default mongoose.model("User", UserSchema);
