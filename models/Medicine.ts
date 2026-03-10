import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["stored", "scheduled"],
      required: true,
    },

    imageUrl:{
      type:String,
    },
    expiryDate: {
      type: Date,
    },

    quantity: {
      type: Number,
      default: 0,
    },

    instructions: {
      type: String,
    },

    warnings: {
      type: String,
    },

    dosage: {
      amount: {
        type: String,
      },

      timesPerDay: {
        type: Number,
      },

      timeSlots: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Medicine ||
  mongoose.model("Medicine", MedicineSchema);