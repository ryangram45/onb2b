import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import dbConnect from "@/lib/db/mongodb";
import BankAccount from "@/lib/models/BankAccount";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    
    const bankAccount = await BankAccount.findOne({ userId: session.user.id }).lean();
    
    if (!bankAccount) {
      return NextResponse.json(
        { error: "Bank account not found" },
        { status: 404 }
      );
    }

    const accounts = [
      {
        id: bankAccount._id.toString(),
        product: "AdvPlus Banking" as const,
        label: "My Checking",
        availableBalance: bankAccount.balance ?? 0,
      }
    ];

    return NextResponse.json({
      accounts
    });
  } catch (error) {
    console.error("GET /api/me/accounts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 }
    );
  }
}