 import { NextResponse } from "next/server";
 import { getServerSession } from "next-auth";
 import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
 import dbConnect from "@/lib/db/mongodb";
 import Recipient from "@/lib/models/Recipient";
 import { recipientSchema } from "@/lib/dto/recipient-schema";
 
 export async function GET() {
   try {
     const session = await getServerSession(authOptions);
     if (!session?.user?.id) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
     await dbConnect();
     const list = await Recipient.find({ userId: session.user.id }).lean();
     return NextResponse.json(
       list.map((r) => ({
         id: r._id.toString(),
         country: r.country,
         countryCode: r.countryCode,
         currency: r.currency,
         accountType: r.accountType,
         receiverAccount: r.receiverAccount,
         firstName: r.firstName,
         lastName: r.lastName,
         nickName: r.nickName,
         recipientAddress: r.recipientAddress,
         city: r.city,
         zipPostalCode: r.zipPostalCode,
         swiftBic: r.swiftBic,
         recipientAccountNumber: r.recipientAccountNumber,
       }))
     );
   } catch {
     return NextResponse.json({ error: "Failed to fetch recipients" }, { status: 500 });
   }
 }
 
 export async function POST(req: Request) {
   try {
     const session = await getServerSession(authOptions);
     if (!session?.user?.id) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
     const body = await req.json();
     const data = recipientSchema.parse(body);
     await dbConnect();
     const created = await Recipient.create({ ...data, userId: session.user.id });
     return NextResponse.json({ id: created._id.toString() }, { status: 201 });
   } catch {
     return NextResponse.json({ error: "Failed to create recipient" }, { status: 400 });
   }
 }
