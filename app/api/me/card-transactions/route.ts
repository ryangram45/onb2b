import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
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

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const limit = Math.max(1, Math.min(200, Number(url.searchParams.get("limit")) || 50));

    await dbConnect();
    const card = await CreditCard.findOne({ userId: session.user.id }).lean();
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
        type: t.type,
        currentBalance: t.currentBalance,
        merchant: t.description,
      }))
    );
  } catch (error) {
    console.error("GET /api/me/card-transactions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
