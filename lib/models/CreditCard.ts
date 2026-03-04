import mongoose from "mongoose";

const CreditCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    cardName: { type: String, required: true },
    cardNumber: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    limit: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const CreditCard = mongoose.models.CreditCard || mongoose.model("CreditCard", CreditCardSchema);

export default CreditCard;