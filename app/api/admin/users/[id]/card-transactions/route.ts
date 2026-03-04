import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { UserRole } from "@/lib/constants/roles";
import dbConnect from "@/lib/db/mongodb";
import CreditCard from "@/lib/models/CreditCard";
import CardTransaction from "@/lib/models/CreditCardTransaction";

function formatDate(d?: Date) {
  if (!d) return null;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const url = new URL(req.url);
    const limit = Math.max(1, Math.min(100, Number(url.searchParams.get("limit")) || 10));

    await dbConnect();

    const card = await CreditCard.findOne({ userId: id }).lean();
    if (!card) {
      return NextResponse.json(
        { error: "Credit card not found" },
        { status: 404 }
      );
    }

    const txs = await CardTransaction.find({ creditCardId: card._id })
      .sort({ date: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(
      txs.map((t) => ({
        id: t._id.toString(),
        date: formatDate(t.date),
        amount: t.amount,
        merchant: t.description,
        type: t.type,
        balance: t.currentBalance,
      }))
    );
  } catch (error) {
    console.error("Error fetching card transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
