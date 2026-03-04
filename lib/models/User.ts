import mongoose from "mongoose";
import { UserRole } from "../constants/roles";

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String },
  email: { type: String, required: [true, 'Email is required'], unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.CLIENT },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

UserSchema.pre('save', function() {
  this.fullName = `${this.firstName} ${this.lastName}`.trim();
})

UserSchema.pre('findOneAndUpdate', function() {
  const update = this.getUpdate() as any;

  if (!update) return;

  const data = update.$set || update;

  if (data.firstName || data.lastName) {
    data.fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
  }
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);


export default User;