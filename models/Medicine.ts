import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["stored", "scheduled"],
      required: true,
    },

    instructions: {
      type: String,
    },

    warnings: {
      type: String,
    },

    expiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Medicine ||
  mongoose.model("Medicine", MedicineSchema);