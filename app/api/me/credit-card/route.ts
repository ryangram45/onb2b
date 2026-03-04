import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import dbConnect from "@/lib/db/mongodb";
import CreditCard from "@/lib/models/CreditCard";
import { generateExpiryDate } from "@/utils/generators";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const card = await CreditCard.findOne({ userId: session.user.id }).lean();
    if (!card) {
      return NextResponse.json(
        { error: "Credit card not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: card._id.toString(),
      cardName: card.cardName,
      cardNumber: card.cardNumber,
      balance: card.balance ?? 0,
      limit: card.limit ?? 0,
      expiryDate: generateExpiryDate(),
      createdAt: card.createdAt?.toISOString(),
      updatedAt: card.updatedAt?.toISOString(),
    });
  } catch (error) {
    console.error("GET /api/me/credit-card error:", error);
    return NextResponse.json(
      { error: "Failed to fetch credit card" },
      { status: 500 }
    );
  }
}
