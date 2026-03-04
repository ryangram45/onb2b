import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { UserRole } from "@/lib/constants/roles";
import dbConnect from "@/lib/db/mongodb";
import BankAccount from "@/lib/models/BankAccount";

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

    const account = await BankAccount.findOne({ userId: id }).lean();
    if (!account) {
      return NextResponse.json(
        { error: "Bank account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: account._id.toString(),
      advPlusAccountNumber: account.advPlusAccountNumber,
      routingNumber: account.routingNumber,
      paperElectronicNumber: account.paperElectronicNumber,
      wiresAccountNumber: account.wiresAccountNumber,
      balance: account.balance ?? 0,
      createdAt: account.createdAt?.toISOString(),
      updatedAt: account.updatedAt?.toISOString(),
    });
  } catch (error) {
    console.error("Error fetching bank account:", error);
    return NextResponse.json(
      { error: "Failed to fetch bank account" },
      { status: 500 }
    );
  }
}
