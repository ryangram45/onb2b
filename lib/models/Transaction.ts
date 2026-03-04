import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    bankAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankAccount",
      required: true,
      index: true,
    },

    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    description: String,
    currentBalance: { type: Number, required: true },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);

export default Transaction;