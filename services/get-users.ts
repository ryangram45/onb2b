import dbConnect from "@/lib/db/mongodb";
import User from "@/lib/models/User";

export async function getUsers() {
  await dbConnect();

  const users = await User.find()
    .select("-password")
    .lean();
    
  return users.map(user => ({
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt?.toISOString(),
    updatedAt: user.updatedAt?.toISOString(),
  }));
}