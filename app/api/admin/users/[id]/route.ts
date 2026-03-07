import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { UserRole } from "@/lib/constants/roles";
import dbConnect from "@/lib/db/mongodb";
import User from "@/lib/models/User";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await params;

    await dbConnect();

    const user = await User.findById(id)
      .select("-password")
      .lean();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...user,
      id: user._id.toString(),
    });

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const payload = await request.json();

    const allowed: Partial<{
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      isActive: boolean;
    }> = {};

    if (typeof payload.firstName === "string") allowed.firstName = payload.firstName;
    if (typeof payload.lastName === "string") allowed.lastName = payload.lastName;
    if (typeof payload.email === "string") allowed.email = payload.email;
    if (typeof payload.role === "string") allowed.role = payload.role;
    if (typeof payload.isActive === "boolean") allowed.isActive = payload.isActive;

    await dbConnect();

    const updated = await User.findByIdAndUpdate(
      id,
      { $set: allowed },
      { new: true }
    )
      .select("-password")
      .lean();

    if (!updated) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...updated,
      id: updated._id.toString(),
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
