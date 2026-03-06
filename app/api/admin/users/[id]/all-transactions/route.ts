import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { UserRole } from "@/lib/constants/roles"
import dbConnect from "@/lib/db/mongodb"
import BankAccount from "@/lib/models/BankAccount"
import CreditCard from "@/lib/models/CreditCard"
import Transaction from "@/lib/models/Transaction"
import CardTransaction from "@/lib/models/CreditCardTransaction"

function formatDate(d?: Date) {
  if (!d) return null
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { id } = await params
    const url = new URL(req.url)
    const limit = Math.max(1, Math.min(100, Number(url.searchParams.get("limit")) || 15))
    const offset = Math.max(0, Number(url.searchParams.get("offset")) || 0)

    await dbConnect()

    const [bankAccount, creditCard] = await Promise.all([
      BankAccount.findOne({ userId: id }).select("_id"),
      CreditCard.findOne({ userId: id }).select("_id"),
    ])

    if (!bankAccount && !creditCard) {
      return NextResponse.json({ items: [], hasMore: false })
    }

    const fetchCount = limit + offset

    const [bankTxs, cardTxs] = await Promise.all([
      bankAccount
        ? Transaction.find({ bankAccountId: bankAccount._id })
            .sort({ date: -1, createdAt: -1, _id: -1 })
            .limit(fetchCount)
            .lean()
        : [],
      creditCard
        ? CardTransaction.find({ creditCardId: creditCard._id })
            .sort({ date: -1, createdAt: -1, _id: -1 })
            .limit(fetchCount)
            .lean()
        : [],
    ])

    const merged = [
      ...bankTxs.map((t) => ({
        id: t._id.toString(),
        date: formatDate(t.date),
        amount: t.amount,
        description: t.description,
        balance: t.currentBalance,
        kind: "Bank",
        rawDate: new Date(t.date),
        rawCreatedAt: new Date(t.createdAt),
        rawId: t._id.toString(),
      })),
      ...cardTxs.map((t) => ({
        id: t._id.toString(),
        date: formatDate(t.date),
        amount: t.amount,
        description: t.description,
        balance: t.currentBalance,
        kind: "Card",
        rawDate: new Date(t.date),
        rawCreatedAt: new Date(t.createdAt),
        rawId: t._id.toString(),
      })),
    ]
      .sort((a, b) => {
        const aTime = a.rawDate.getTime()
        const bTime = b.rawDate.getTime()
        if (aTime !== bTime) return bTime - aTime
        const aCreated = a.rawCreatedAt.getTime()
        const bCreated = b.rawCreatedAt.getTime()
        if (aCreated !== bCreated) return bCreated - aCreated
        return b.rawId.localeCompare(a.rawId)
      })

    const slice = merged.slice(offset, offset + limit)
    const items = slice.map(({ rawDate, rawCreatedAt, rawId, ...rest }) => rest)
    const hasMore = merged.length > offset + limit

    return NextResponse.json({ items, hasMore })
  } catch (error) {
    console.error("Error fetching all transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}
