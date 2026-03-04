import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import dbConnect from "@/lib/db/mongodb";
import Activity from "@/lib/models/Activity";
import { generateConfirmationNumber } from "@/utils/string-utils";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      type = "wire_transfer",
      amount,
      currency = "USD",
      recipientId,
      recipientName,
      accountId,
      accountLabel,
      note,
    } = body || {};

    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    await dbConnect();

    const confirmationNumber = generateConfirmationNumber(10, 20);

    const activity = await Activity.create({
      userId: new mongoose.Types.ObjectId(session.user.id),
      type,
      amount,
      currency,
      recipientId: recipientId ? new mongoose.Types.ObjectId(recipientId) : undefined,
      recipientName,
      accountId,
      accountLabel,
      note,
      confirmationNumber,
      status: "processing",
    });

    return NextResponse.json({
      success: true,
      activityId: activity._id.toString(),
      confirmationNumber,
    });
  } catch (error) {
    console.error("POST /api/me/activities error:", error);
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 });
  }
}
