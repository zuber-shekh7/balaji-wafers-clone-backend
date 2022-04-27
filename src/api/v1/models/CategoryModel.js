import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", CategorySchema);
