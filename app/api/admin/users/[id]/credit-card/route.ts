import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { UserRole } from "@/lib/constants/roles";
import dbConnect from "@/lib/db/mongodb";
import CreditCard from "@/lib/models/CreditCard";
import { generateExpiryDate } from "@/utils/generators";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    await dbConnect();

    const card = await CreditCard.findOne({ userId: id }).lean();
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
    console.error("Error fetching credit card:", error);
    return NextResponse.json(
      { error: "Failed to fetch credit card" },
      { status: 500 }
    );
  }
}
