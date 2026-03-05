import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { UserRole } from "@/lib/constants/roles";
import dbConnect from "@/lib/db/mongodb";
import CreditCard from "@/lib/models/CreditCard";
import { generateCardHistory } from "@/services/card-transaction-generator";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== UserRole.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { startDate, endDate, balance } = await request.json();

  const start = new Date(startDate);
  const end = new Date(endDate);

  const days =
    Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  await dbConnect();

  const { id } = await params;

  const creditCard = await CreditCard.findOne({
    userId: id,
  });

  if (!creditCard) {
    return NextResponse.json(
      { error: "Credit card not found" },
      { status: 404 }
    );
  }

  await generateCardHistory({
    creditCardId: creditCard._id.toString(),
    days,
    balance,
  });

  return NextResponse.json({ message: "Card history generated" });
}