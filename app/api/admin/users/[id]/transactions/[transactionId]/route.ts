import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { UserRole } from "@/lib/constants/roles";
import dbConnect from "@/lib/db/mongodb";
import Transaction from "@/lib/models/Transaction";
import BankAccount from "@/lib/models/BankAccount";
import CreditCard from "@/lib/models/CreditCard";
import CardTransaction from "@/lib/models/CreditCardTransaction";

function formatDate(date?: Date) {
  if (!date) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function GET(
  req: Request,
  { params }: { params:  Promise<{ id: string; transactionId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id: userId, transactionId } = await params;

    await dbConnect();

    const [bankAccounts, creditCards] = await Promise.all([
      BankAccount.find({ userId }).select("_id"),
      CreditCard.find({ userId }).select("_id"),
    ]);
    if (bankAccounts.length === 0 && creditCards.length === 0) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const bankIds = bankAccounts.map((b) => b._id);
    const cardIds = creditCards.map((c) => c._id);

    let isCard = false;
    let transaction: any = await Transaction.findOne({
      _id: transactionId,
      bankAccountId: { $in: bankIds },
    }).lean();

    if (!transaction) {
      const cardTx = await CardTransaction.findOne({
        _id: transactionId,
        creditCardId: { $in: cardIds },
      }).lean();
      if (cardTx) {
        isCard = true;
        transaction = cardTx;
      }
    }

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      isCard
        ? {
            _id: transaction._id.toString(),
            date: formatDate(transaction.date),
            amount: transaction.amount,
            description: transaction.description,
            balance: transaction.currentBalance,
            type: transaction.type,
            creditCardId: transaction.creditCardId?.toString(),
          }
        : {
            _id: transaction._id.toString(),
            date: formatDate(transaction.date),
            amount: transaction.amount,
            description: transaction.description,
            balance: transaction.currentBalance,
            bankAccountId: transaction.bankAccountId?.toString(),
          }
    );
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return NextResponse.json(
      { error: "Failed to fetch transaction" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; transactionId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id: userId, transactionId } = await params;
    const body = await req.json();
    const { amount, description } = body as { amount: number; description?: string };

    await dbConnect();

    const [bankAccounts, creditCards] = await Promise.all([
      BankAccount.find({ userId }).select("_id"),
      CreditCard.find({ userId }).select("_id"),
    ]);
    if (bankAccounts.length === 0 && creditCards.length === 0) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const bankIds = bankAccounts.map((b) => b._id);
    const cardIds = creditCards.map((c) => c._id);

    let isCard = false;
    // Load the target transaction with timestamps so we can use createdAt
    let transaction: any = await Transaction.findOne({
      _id: transactionId,
      bankAccountId: { $in: bankIds },
    });

    if (!transaction) {
      const cardTx = await CardTransaction.findOne({
        _id: transactionId,
        creditCardId: { $in: cardIds },
      });
      if (cardTx) {
        isCard = true;
        transaction = cardTx;
      }
    }

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found for this user" },
        { status: 404 }
      );
    }

    const oldAmount = transaction.amount;
    const oldBalance = transaction.currentBalance;

    // Update editable fields only
    const newAmount = typeof amount === "number" ? amount : oldAmount;
    if (typeof amount === "number") {
      transaction.amount = newAmount;
    }
    if (typeof description === "string") {
      transaction.description = description;
    }
    // Recalculate running balances from this transaction onward
    // Base before this transaction is oldBalance - oldAmount (unchanged for previous transactions)
    const baseBeforeEdited = oldBalance - oldAmount;
    transaction.currentBalance = baseBeforeEdited + newAmount;

    await transaction.save();

    // Recalculate all subsequent transactions for this account
    const TxModel: any = isCard ? CardTransaction : Transaction;
    const accountKey = isCard ? "creditCardId" : "bankAccountId";
    const accountId = transaction[accountKey];

    const subsequent = await TxModel.find({
      [accountKey]: accountId,
      $or: [
        { date: { $gt: transaction.date } },
        { date: transaction.date, createdAt: { $gt: transaction.createdAt } },
      ],
    })
      .sort({ date: 1, createdAt: 1, _id: 1 });

    let runningBalance = transaction.currentBalance;
    for (const tx of subsequent) {
      runningBalance = runningBalance + tx.amount;
      tx.currentBalance = runningBalance;
      await tx.save();
    }

    // Update the owning account's balance to the last transaction's balance
    let accountToUpdate = null;
    if (!isCard && transaction.bankAccountId) {
      accountToUpdate = await BankAccount.findById(transaction.bankAccountId);
    } else if (isCard && transaction.creditCardId) {
      accountToUpdate = await CreditCard.findById(transaction.creditCardId);
    }

    if (accountToUpdate) {
      // Set account balance to the last computed running balance
      accountToUpdate.balance = runningBalance;
      await accountToUpdate.save();
    } else {
      console.warn("No associated bank or credit card account found for transaction:", transactionId);
    }

    return NextResponse.json(
      isCard
        ? {
            _id: transaction._id.toString(),
            date: formatDate(transaction.date),
            amount: transaction.amount,
            description: transaction.description,
            balance: transaction.currentBalance,
            type: transaction.type,
            creditCardId: transaction.creditCardId?.toString(),
          }
        : {
            _id: transaction._id.toString(),
            date: formatDate(transaction.date),
            amount: transaction.amount,
            description: transaction.description,
            balance: transaction.currentBalance,
            bankAccountId: transaction.bankAccountId?.toString(),
          }
    );
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json(
      { error: "Failed to update transaction" },
      { status: 500 }
    );
  }
}
