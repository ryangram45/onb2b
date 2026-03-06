import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { UserRole } from "@/lib/constants/roles";
import dbConnect from "@/lib/db/mongodb";
import BankAccount from "@/lib/models/BankAccount";
import { generateBankHistory } from "@/services/transaction-generator";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== UserRole.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { startDate, endDate, startingBalance, closingBalance } = await request.json();

  const start = new Date(startDate);
  const end = new Date(endDate);

  await dbConnect();

  const  { id } = await params

  const bankAccount = await BankAccount.findOne({
    userId: id,
  });

  if (!bankAccount) {
    return NextResponse.json(
      { error: "Bank account not found" },
      { status: 404 }
    );
  }

  await generateBankHistory({
    bankAccountId: bankAccount._id.toString(),
    startingBalance,
    closingBalance,
    startDate: start,
    endDate: end,
  });

  return NextResponse.json({ message: "History generated" });
}
