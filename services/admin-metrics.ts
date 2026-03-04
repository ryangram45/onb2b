import dbConnect from "@/lib/db/mongodb";
import User from "@/lib/models/User";

export async function getAdminMetrics() {
  await dbConnect();

  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });

  const recentSignups = await User.countDocuments({
    createdAt: {
      $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { totalUsers, activeUsers, recentSignups };
}