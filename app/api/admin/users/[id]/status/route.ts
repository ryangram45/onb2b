import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { UserRole } from "@/lib/constants/roles";
import dbConnect from "@/lib/db/mongodb";
import User from "@/lib/models/User";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { isActive } = await req.json();
    
    const { id } = await params; 
    
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    
    const user = await User.findByIdAndUpdate(
      id,
      { isActive },
      { returnDocument: 'after', runValidators: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user status" },
      { status: 500 }
    );
  }
}
