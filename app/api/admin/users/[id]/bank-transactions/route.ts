import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { UserRole } from "@/lib/constants/roles";
import dbConnect from "@/lib/db/mongodb";
import BankAccount from "@/lib/models/BankAccount";
import Transaction from "@/lib/models/Transaction";

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
    const offset = Math.max(0, Number(url.searchParams.get("offset")) || 0);

    await dbConnect();

    const account = await BankAccount.findOne({ userId: id }).lean();
    if (!account) {
      return NextResponse.json(
        { error: "Bank account not found" },
        { status: 404 }
      );
    }

    const txs = await Transaction.find({ bankAccountId: account._id })
      .sort({ date: -1, createdAt: -1, _id: -1 })
      .skip(offset)
      .limit(limit)
      .lean();

    return NextResponse.json(
      txs.map((t) => ({
        id: t._id.toString(),
        date: formatDate(t.date),
        amount: t.amount,
        description: t.description,
        balance: t.currentBalance,
        kind: "Bank",
      }))
    );
  } catch (error) {
    console.error("Error fetching bank transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
