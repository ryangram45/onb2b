import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["wire_transfer"],
      required: true,
      index: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipient" },
    recipientName: { type: String },
    accountId: { type: String },
    accountLabel: { type: String },
    note: { type: String },
    confirmationNumber: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
      index: true,
    },
  },
  { timestamps: true }
);

ActivitySchema.index({ userId: 1, createdAt: -1 });

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);

export default Activity;
