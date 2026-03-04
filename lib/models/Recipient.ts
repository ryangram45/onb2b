 import mongoose from "mongoose";
 
 const RecipientSchema = new mongoose.Schema(
   {
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
     country: { type: String, required: true },
     currency: { type: String, enum: ["INR", "EUR", "USD"], required: true },
     accountType: { type: String, enum: ["Personal", "Business"], required: true },
     receiverAccount: { type: String, enum: ["My account", "Someone else's account"], required: true },
     firstName: { type: String, required: true },
     lastName: { type: String, required: true },
     nickName: { type: String },
     recipientAddress: { type: String, required: true },
    state: { type: String },
     city: { type: String, required: true },
     zipPostalCode: { type: String, required: true },
    swiftBic: { type: String },
    routingNumber: { type: String },
     recipientAccountNumber: { type: String, required: true, minlength: 1, maxlength: 34 },
   },
   { timestamps: true }
 );
 
 const Recipient = mongoose.models.Recipient || mongoose.model("Recipient", RecipientSchema);
 
 export default Recipient;
