import mongoose from "mongoose";

const CardTransactionSchema = new mongoose.Schema(
  {
    creditCardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreditCard",
      required: true,
      index: true,
    },

    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    description: { type: String },
    type: String,
    currentBalance: { type: Number, required: true },
  },
  { timestamps: true }
);

const CardTransaction = mongoose.models.CardTransaction || mongoose.model("CardTransaction", CardTransactionSchema);

export default CardTransaction;