import { getServerSession } from "next-auth";
import { UserRole } from "@/lib/constants/roles";
import { NextResponse } from "next/server";
import { adminCreateUserSchema } from "@/lib/dto/zod-schemas";
import { z } from  "zod";
import dbConnect from "@/lib/db/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import mongoose from 'mongoose';
import BankAccount from "@/lib/models/BankAccount";
import CreditCard from "@/lib/models/CreditCard";
import { generateAdvPlusAccountNumber, generateCreditCardNumber, generatePaperElectronicNumber, generateRoutingNumber, generateWiresAccountNumber } from "@/utils/generators";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== UserRole.ADMIN) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 403 }
        )
    }

    const body = await request.json();
    const validateRequestSchema = adminCreateUserSchema.safeParse(body);

    if (!validateRequestSchema.success) {
        const flattenError = z.flattenError(validateRequestSchema.error)
        return NextResponse.json(
            { error: flattenError },
            { status: 400 }
        )
    }

    const data = validateRequestSchema.data;

    // Normalize data
    data.firstName = data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1).toLowerCase();
    data.lastName = data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1).toLowerCase();
    data.email = data.email.toLowerCase();

    await dbConnect();

    const existing = await User.findOne({
        $or: [{ email: data.email }, { userId: data.userId }],
    });

    if(existing) {
        return NextResponse.json(
            { error: "User already exists" },
            { status: 409 }
        );
    }

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    let isCommitted = false;

    try {
        const { password, ...userData } = data
        const hashedPassword = await bcrypt.hash(password, 10);

        const [user] = await User.create(
            [
                {
                    ...userData,
                    password: hashedPassword,
                },
            ],
            { session: mongoSession }
        );

        const newBankAccountData = {
            advPlusAccountNumber: generateAdvPlusAccountNumber(),
            routingNumber:  generateRoutingNumber(),
            paperElectronicNumber: generatePaperElectronicNumber(),
            wiresAccountNumber: generateWiresAccountNumber(),
        }

        await BankAccount.create(
            [{ userId: user._id, ...newBankAccountData }],
            { session: mongoSession }
        );

        const cardName = data.creditCard?.cardName ?? "Doc"
        const newCardData = {
            cardName,
            cardNumber:  generateCreditCardNumber(),
            balance: 0,
            limit: 5000,
        }

        await CreditCard.create(
            [{ userId: user._id, ...newCardData}],
            { session: mongoSession }
        );


        await mongoSession.commitTransaction();
        isCommitted = true;
        mongoSession.endSession();

        return NextResponse.json(
            { message: "User created", userId: user._id },
            { status: 201 }
        )  
    } catch (error) {

        if (!isCommitted) await mongoSession.abortTransaction();
        mongoSession.endSession();
        throw error;
    }
}