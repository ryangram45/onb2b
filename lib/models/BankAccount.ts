import mongoose from "mongoose";

const BankAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    advPlusAccountNumber: { type: String, required: true, unique: true },
    routingNumber: { type: String, required: true },
    paperElectronicNumber: { type: String, required: true },
    wiresAccountNumber: { type: String, required: true },

    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const BankAccount = mongoose.models.BankAccount || mongoose.model("BankAccount", BankAccountSchema);

export default BankAccount;